using Breeze.ContextProvider;
using Breeze.ContextProvider.NH;
using CdT.EAI.BL.Request;
using CdT.EAI.Dal.NH.Audit;
using CdT.EAI.Model.Business;
using CdT.EAI.Model.Workflow;
using CdT.UI.Common;
using Serilog;
using Newtonsoft.Json.Linq;
using NHibernate.Linq;
using NHibernate.Util;
using NServiceBus;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.ServiceModel;
using System.Threading;
using System.Web.Http;
using CdT.EAI.Wcf;
using CdT.UI.Common.SaveMap;
using CdT.ClientPortal.WebApi.FileManagement;
using CdT.ClientPortal.WebApi.Model;
using CdT.ClientPortal.WebApi;

namespace ClientPortal.Controllers
{
    //[CamelCaseControllerConfig]
    [BreezeNHController(MaxExpansionDepth = 7, MaxAnyAllExpressionDepth = 7)]
    //[Authorize]
    public class EAIController : BaseApiController
    {
        private readonly IMessageSession _messageSession;
        private ILogger _logger;

        private EAIContext _context;

        //private UserProfile userProfile;

        public EAIController(EAIContext context, ILogger logger/*, IMessageSession messageSession*/) : base(logger)
        {
            //_messageSession = messageSession;
            _context = context;
            _logger = logger;
            //userProfile = UserProfile.GetProfile(this.User.Identity.Name);
        }

        [HttpGet]
        public string Metadata()
        {
            return this._context.Metadata();
        }

        [HttpPost]
        public SaveResult SaveChanges(JObject saveBundle)
        {
            // before, save and after done in one transaction
            var txSettings = new TransactionSettings() { TransactionType = TransactionType.DbTransaction };
            return this._context.SaveChanges(saveBundle, txSettings);
        }

        public SaveResult SaveCsf(JObject saveBundle)
        {
            var transactionSettings = new TransactionSettings() { TransactionType = TransactionType.DbTransaction };

            this._context.BeforeSaveEntitiesDelegate = (saveMap) =>
            {
                // force associated job and request update
                var entityInfos = saveMap.Where(e => e.Key == typeof(JobMaterial)).Select(e => e.Value).FirstOrDefault();
                if (entityInfos != null)
                {
                    foreach (var entityInfo in entityInfos)
                    {
                        var jobMaterial = (JobMaterial)(entityInfo.Entity);


                        if (!saveMap.Any(e => e.Key.IsSubclassOf(typeof(Job)) && e.Value.Any(f => ((Job)f.Entity).Id == jobMaterial.JobId)))
                        {
                            // single query without lazy loading
                            var temp = (from p in this._context.Session.Query<Job>()
                                        where p.Id == jobMaterial.JobId
                                        select new { Job = p, Request = p.SourceMaterial.Request }).FirstOrDefault();

                            if (temp != null)
                            {

                                temp.Job.UpdateDate = DateTime.UtcNow;
                                saveMap.AddCustomEntity(temp.Job, this._context);
                                if (!saveMap.Any(e => e.Key == typeof(Request)))
                                {
                                    temp.Request.UpdateDate = DateTime.UtcNow;
                                    saveMap.AddCustomEntity(temp.Request, this._context);
                                }
                            }
                        }
                    }
                }
                return saveMap;
            };

            this._context.AfterSaveEntitiesDelegate = (saveMap, keyMappings) =>
            {
                // upload file to filemanagement service when a new file is saved
                var physicalFiles = saveMap
                                        .Where(p => p.Key.IsAssignableFrom(typeof(PhysicalFile)))
                                        .Select(p => p.Value)
                                        .FirstOrDefault();
                if (physicalFiles != null)
                {
                    foreach (var physicalFile in physicalFiles)
                    {
                        if (physicalFile.EntityState == EntityState.Added)
                        {
                            // see TFS 11203
                            var file = this._context.Session.Load<PhysicalFile>(((PhysicalFile)physicalFile.Entity).Id);

                            // call external storage service
                            StoreFileResponse resp = null;
                            Helper.UseWcfService<IFileManagement>("FileManagement", null, null, p =>
                            {
                                try
                                {
                                    var filePath = Path.Combine(ConfigurationManager.AppSettings["UploadFolder"], file.PhysicalPath);
                                    // Reads data from the client temp folder
                                    var fileBytes = File.ReadAllBytes(filePath);
                                    resp = p.StoreFile(new StoreFileRequest()
                                    {
                                        FileData = fileBytes,
                                        FileName = file.FileName,
                                        Anonymize = true
                                    });
                                }
                                catch (FaultException<FileIOFault> ex)
                                {
                                    if (ex.Detail.FaultType == FileIOFault.FaultTypes.UnableToStoreError)
                                    {
                                        // Display an error if an upload issue happened
                                        // find temp key in keymappings
                                        var tempKey = keyMappings.Where(key => (Guid)key.RealValue == file.Id).Select(key => key.TempValue);
                                        var entityError = new EntityError
                                        {
                                            ErrorName = "Store file",
                                            ErrorMessage = ex.Detail.ErrorMessage,
                                            EntityTypeName = file.GetType().FullName,
                                            PropertyName = "FileName",
                                            KeyValues = tempKey.ToArray()
                                        };
                                        throw new EntityErrorsException("Error saving file", new List<EntityError>() { entityError });
                                    }
                                }
                            });
                            file.ExternalStorageFileId = resp.FileId;
                            this._context.Session.Save(file);
                        }
                    }
                }
                this._context.Session.Flush();
            };

            this._context.BeforeSaveEntityDelegate = (entityInfo) =>
            {
                if (entityInfo.Entity.GetType().IsSubclassOf(typeof(Material)) && entityInfo.EntityState == EntityState.Added)
                {
                    Material material = (Material)entityInfo.Entity;
                    if (string.IsNullOrEmpty(material.UploadedBy))
                    {
                        material.UploadedBy = Thread.CurrentPrincipal.Identity.Name;
                    }
                    if (!material.UploaderType.HasValue)
                    {
                        material.UploaderType = UploaderType.Other;
                    }
                    if (string.IsNullOrEmpty(material.ActivityLabel))
                    {
                        // always csf in that case
                        material.ActivityLabel = "CSF";
                    }
                }
                return true;
            };

            return this._context.SaveChanges(saveBundle, transactionSettings);
        }

        [HttpGet]
        public object Lookups() // returns an object, not an IQueryable
        {
            // filtered by client
            var clients = this._context.Clients.ToFuture();
            var departments = this._context.Departments.OrderBy(p => p.DisplayOrder).ToFuture();
            var contacts = this._context.Contacts.ToFuture();

            // not filtered
            //exclude sdl format from supporte formats. can't operate at db leverl because it may be supported in another solutions Fp or Ecdt
            var countries = this._context.Countries.Where(p => p.ValidFrom <= DateTime.Now && p.ValidTo >= DateTime.Now).OrderBy(p => p.DisplayOrder).ToFuture();
            var currencies = this._context.Currencies.Where(p => p.ValidFrom <= DateTime.Now && p.ValidTo >= DateTime.Now).OrderBy(p => p.DisplayOrder).ToFuture();
            var purposes = this._context.Purposes.Where(p => p.ValidFrom <= DateTime.Now && p.ValidTo >= DateTime.Now).OrderBy(p => p.DisplayOrder).ToFuture();
            var languages = this._context.Languages.Where(p => p.ValidFrom <= DateTime.Now && p.ValidTo >= DateTime.Now).OrderBy(p => p.Code).ToFuture();
            var domains = this._context.Domains.Where(p => p.ValidFrom <= DateTime.Now && p.ValidTo >= DateTime.Now).OrderBy(p => p.DisplayOrder).ToFuture();
            var services = this._context.Services.Where(p => p.ValidFrom <= DateTime.Now && p.ValidTo >= DateTime.Now && p.IsUsedInEcdt).OrderBy(p => p.DisplayOrder).ToFuture();
            var priorities = this._context.Priorities.Where(p => p.ValidFrom <= DateTime.Now && p.ValidTo >= DateTime.Now).OrderBy(p => p.DisplayOrder).ToFuture();
            var statuses = this._context.Statuses.Where(p => p.ValidFrom <= DateTime.Now && p.ValidTo >= DateTime.Now).OrderBy(p => p.DisplayOrder).ToFuture();
            var asaStatuses = this._context.Statuses.Where(p => p.ValidFrom <= DateTime.Now && p.ValidTo >= DateTime.Now && (p.Code == "INPR" || p.Code == "DRAF" || p.Code == "COMP")).OrderBy(p => p.DisplayOrder).ToFuture();
            var requestSubStatuses = this._context.RequestSubStatuses.Where(p => p.ValidFrom <= DateTime.Now && p.ValidTo >= DateTime.Now).OrderBy(p => p.DisplayOrder).ToFuture();
            var documentFormatTargets = this._context.DocumentFormatTargets.Where(p => p.ValidFrom <= DateTime.Now && p.ValidTo >= DateTime.Now).OrderBy(p => p.DisplayOrder).ToFuture();
            var documentFormats = this._context.DocumentFormats.Where(p => p.ValidFrom <= DateTime.Now && p.ValidTo >= DateTime.Now).OrderBy(p => p.DisplayOrder).ToFuture();
            var documentFormatExtensions = this._context.DocumentFormatExtensions.Where(p => p.ValidFrom <= DateTime.Now && p.ValidTo >= DateTime.Now).OrderBy(p => p.DisplayOrder).ToFuture();
            var sourceMaterialDocumentFormatExtensionsWS = this._context.DocumentFormatExtensions.Where(p => p.ValidFrom <= DateTime.Now && p.ValidTo >= DateTime.Now && p.CanUseWorldServer).OrderBy(p => p.DisplayOrder).ToFuture();
            var sourceMaterialDocumentFormatExtensions = this._context.DocumentFormats.Where(p => p.ValidFrom <= DateTime.Now && p.ValidTo >= DateTime.Now && p.DocumentFormatTargets.Count() > 0).SelectMany(x => x.DocumentFormatExtensions).ToFuture();
            var sourceMaterialDocumentFormats = this._context.DocumentFormats.Where(p => p.ValidFrom <= DateTime.Now && p.ValidTo >= DateTime.Now && p.DocumentFormatTargets.Count() > 0).ToFuture();
            var materialClassifications = this._context.MaterialClassifications.Where(p => p.ValidFrom <= DateTime.Now && p.ValidTo >= DateTime.Now).OrderBy(p => p.DisplayOrder).ToFuture();
            var unitConversions = this._context.UnitConversions.Where(p => p.ValidFrom <= DateTime.Now && p.ValidTo >= DateTime.Now).ToFuture();
            var unitTypes = this._context.UnitTypes.Where(p => p.ValidFrom <= DateTime.Now && p.ValidTo >= DateTime.Now).OrderBy(p => p.DisplayOrder).ToFuture();
            var units = this._context.Units.Where(p => p.ValidFrom <= DateTime.Now && p.ValidTo >= DateTime.Now).OrderBy(p => p.DisplayOrder).ToFuture();
            var deliveryModes = this._context.DeliveryModes.Where(p => p.ValidFrom <= DateTime.Now && p.ValidTo >= DateTime.Now).OrderBy(p => p.DisplayOrder).ToFuture();
            var turnaroundTimes = this._context.TurnaroundTimes.Where(p => p.ValidFrom <= DateTime.Now && p.ValidTo >= DateTime.Now).ToFuture();
            var holidays = this._context.Holidays.ToFuture();
            var jobStatuses = this._context.Session.Query<JobStatus>().ToFuture();
            var taskDefinitions = this._context.TaskDefinitions.Where(e => e.ExecutionMode != TaskDefinition.ExecutionModes.System).ToFuture();
            var globalParameters = this._context.Session.Query<GlobalParameter>().ToFuture();
            var requestTypes = this._context.Session.Query<RequestType>().ToFuture();
            var confidentialities = this._context.Session.Query<Confidentiality>().Where(p => p.ValidFrom <= DateTime.Now && p.ValidTo >= DateTime.Now).OrderBy(p => p.DisplayOrder).ToFuture();

            return new
            {
                clients,
                departments,
                contacts,
                countries,
                currencies,
                purposes,
                languages,
                domains,
                services,
                priorities,
                statuses,
                asaStatuses,
                requestSubStatuses,
                documentFormatTargets,
                documentFormats,
                sourceMaterialDocumentFormatExtensions,
                sourceMaterialDocumentFormats,
                documentFormatExtensions,
                sourceMaterialDocumentFormatExtensionsWS,
                materialClassifications, 
                unitConversions,
                unitTypes,
                units,
                deliveryModes,
                turnaroundTimes,
                holidays,
                jobStatuses,
                taskDefinitions,
                globalParameters,
                requestTypes,
                confidentialities
            };
        }

        [HttpGet]
        public IQueryable<Request> RequestById(Guid requestId)
        {
            if (this.User.IsInRole("portalmanager"))
            {
                return this.Requests().Where(x => x.Id == requestId);
            }
            else
            {
                var query = this.Requests();//.Where(p => p.Client.ClientPortalId == userProfile.Personal.OrganisationId && p.RequestType.Code == "RST001");
                if (!this.User.IsInRole("draft_all") && !this.User.IsInRole("sender_all"))
                {
                    // restrict to client/department
                    // todo, check for a better/cleaner way
                    var contact = this._context.Contacts.Where(x => x.UserName == this.User.Identity.Name);
                    query = query.Where(p => //p.Department.ClientPortalId == userProfile.Personal.DepartmentId ||
                                             p.RequestContacts.Any(q => contact.Contains(q.Contact))
                                             || p.RequestDeliveryContacts.Any(r => contact.Contains(r.Contact)));
                }

                if (query.Any(x => x.Id == requestId && x.Status.Code == "UNDE"))
                {
                    return new List<Request>() { AuditHelper.GetRequestSnapshot(requestId, this._context.Session) }.AsQueryable();
                }
                else
                {
                    return query.Where(p => p.Id == requestId);
                }
            }
        }

        [HttpGet]
        public IQueryable<PhysicalFile> PhysicalFiles()
        {
            return this._context.PhysicalFiles;
        }

        [HttpGet]
        public IQueryable<Url> Urls()
        {
            return this._context.Urls;
        }

        [HttpGet]
        public IQueryable<Request> Requests()
        {
            //Filter Ecdt and ODR requests
            return this._context.Requests.Where(x => x.RequestType.Code == "RST001" || x.RequestType.Code == "RST002");
        }

        [HttpGet]
        public IQueryable<RequestTemplate> RequestTemplates()
        {
            return this._context.RequestTemplates
                        .Fetch(p => p.Client)
                        .Fetch(p => p.DeliveryMode)
                        .Fetch(p => p.DocumentFormat)
                        .Fetch(p => p.Priority)
                        .Fetch(p => p.Purpose)
                        .Fetch(p => p.ReferenceSet)
                        .Fetch(p => p.Service)
                        .OrderBy(p => p.TemplateName); // sort by template name asc
        }

        [HttpGet]
        public IQueryable<CustomerSatisfactionForm> CustomerSatisfactionForms()
        {
            return this._context.CustomerSatisfactionForms;
        }

        [HttpGet]
        public JobServiceGroupDTO GetTAT([FromUri] JobServiceGroupDTO values)
        {
            //for the first group in the user defined order the recipt date is calculated based on rules
            //for the rest we'll use the receipt date the minimum delivery date of the precedent group as a starting date

            var bl = new RequestBL(this._context.Session, _logger);

            string[] services = { "ED", "MO", "RE", "TR" };

            //var receiptDate = bl.GetReceiptDate(values.Priority, hours, holidays);

            values.ReceiptDate = bl.GetReceiptDate(values.Priority);

            if (!services.Contains(values.Service))
            {
                values.Turnaround = 1;
            }
            else
            {
                values.Turnaround = bl.GetTurnaroundTimeForParamaters(values.Volume, values.Priority, values.Service);
            }

            values.MinimumDeliveryDate = bl.GetMinDeadline(values.ReceiptDate, values.Turnaround, values.Priority);

            return values;
        }

        [HttpGet]
        public IQueryable<TaskDefinition> TaskDefinitions()
        {
            return this._context.TaskDefinitions;
        }

        [HttpGet]
        public bool IsTemplateNameDuplicated([FromUri] CreateTemplateDto values)
        {
            return _context.RequestTemplates.Any(x => x.Client.ClientPortalId == values.OrganizationId && x.TemplateName == values.TemplateName && x.Id != values.Id);
        }

        [HttpGet]
        public IQueryable<GlobalParameter> GlobalParameters()
        {
            return this._context.GlobalParameters;
        }

        /// <summary>
        /// Returns asa request only
        /// </summary>
        /// <returns>An IQueryable of Request</returns>
        [HttpGet]
        public IQueryable<Request> AsaRequests()
        {
            var roles = System.Web.Security.Roles.GetRolesForUser(this.User.Identity.Name).ToList();
            var query = this._context.Requests;//.Where(r => r.Client.ClientPortalId == this.userProfile.Personal.OrganisationId && r.RequestType.Code == "RST003" && r.Status.Code != "ASAC");

            // check if department requests only
            var contact = this._context.Session.Query<Contact>().Where(x => x.UserName == this.User.Identity.Name);
            if (!roles.Contains("draft_all") && !roles.Contains("sender_all"))
            {
               /* query = query.Where(p => p.Department.ClientPortalId == this.userProfile.Personal.DepartmentId 
                                         p.RequestContacts.Any(q => contact.Contains(q.Contact))
                                         || p.RequestDeliveryContacts.Any(r => contact.Contains(r.Contact)));*/
            }

            return query;
        }

        public SaveResult CancelRequest(JObject saveBundle)
        {
            var transactionSettings = new TransactionSettings() { TransactionType = TransactionType.DbTransaction };

            this._context.BeforeSaveEntitiesDelegate = (saveMap) =>
            {
                var entityInfos = saveMap.Where(e => e.Key == typeof(Request)).Select(e => e.Value).FirstOrDefault();

                if (entityInfos != null)
                {
                    foreach (var entityInfo in entityInfos)
                    {
                        entityInfo.EntityState = EntityState.Modified;

                        Request request = (Request)entityInfo.Entity;
                        request.StatusId = _context.Session.Query<Status>().Where(p => p.Code == (string)this._context.SaveOptions.Tag).Select(p => p.Id).First();
                        request.IsFirstAssessmentDone = null;
                        request.IsSecondAssessmentDone = null;

                        RequestBL requestBL = new RequestBL(this._context.Session, _logger);
                        requestBL.CancelRunningWorkflows(request);
                        requestBL.ResetAllVolumes(request);

                        //add modified jobs to savemap
                        _context.Session.Query<SourceMaterial>().Where(sm => sm.Request == request).ForEach(sm =>
                        {
                            foreach (var job in sm.Jobs)
                            {
                                job.LTSVolume = 0;
                                saveMap.AddCustomEntity(job, _context);
                            }
                        });
                    }
                }

                return saveMap;
            };

            this._context.AfterSaveEntitiesDelegate = (saveMap, result) => { };

            return this._context.SaveChanges(saveBundle, transactionSettings);
        }
    }
}