using Breeze.ContextProvider;
using Breeze.ContextProvider.NH;
//using Cdt.ClientPortal.Core.Helpers;
using CdT.EAI.BL.Workflow;
using CdT.EAI.Commands.Mailing;
using CdT.EAI.Model.Business;
using CdT.EAI.Model.Common;
using CdT.EAI.Model.Workflow;
using CdT.EAI.Wcf;
//using ClientPortalWeb.FileManagement;
//using ClientPortalWeb.Helpers;
using NHibernate.Linq;
using NServiceBus;
using RazorEngine;
using RazorEngine.Templating;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Threading;
using System.Web.Security;
using Language = CdT.EAI.Model.Business.Language;
using System.ServiceModel;
using CdT.EAI.BL.Interfaces;
using CdT.EAI.BL.Request;
using System.Web;
using ISession = NHibernate.ISession;
using CdT.EAI.BL.Documents.Embedded;
using CdT.UI.Common.Linq;
using ClientPortal.Helpers;
using CdT.ClientPortal.WebApi.FileManagement;

namespace ClientPortal.WebApi
{
    public class EAIContext : NHContext
    {
        private readonly IMessageSession _messageSession;
        private readonly IRequestBL _requestBL;

        public EAIContext(/*IMessageSession messageSession,*/ ISession session, IRequestBL requestBL) : base(session)
        {
            _requestBL = requestBL;
            //_messageSession = messageSession;
            TypeFilter = t =>
            {
                if (t.Name == "CustomRevisionEntity")
                {
                    return false;
                }
                else
                {
                    return true;
                }
            };
            BeforeSaveEntityDelegate += BeforeSaveEntity;
            BeforeSaveEntitiesDelegate += BeforeSaveEntities;
            AfterSaveEntitiesDelegate += AfterSaveEntities;
        }
        public NhQueryableInclude<CdT.EAI.Model.Business.Client> Clients
        {
            get
            {
                return GetQuery<CdT.EAI.Model.Business.Client>();
            }
        }

        public NhQueryableInclude<Contact> Contacts
        {
            get
            {
                return GetQuery<Contact>();
            }
        }

        public NhQueryableInclude<MaterialClassification> MaterialClassifications
        {
            get
            {
                return GetQuery<MaterialClassification>();
            }
        }

        public NhQueryableInclude<RequestTemplate> RequestTemplates
        {
            get
            {
                return GetQuery<RequestTemplate>();
            }
        }

        public NhQueryableInclude<CustomerSatisfactionForm> CustomerSatisfactionForms
        {
            get
            {
                return GetQuery<CustomerSatisfactionForm>();
            }
        }

        public NhQueryableInclude<Country> Countries
        {
            get
            {
                return GetQuery<Country>();
            }
        }

        public NhQueryableInclude<ClientCountry> ClientCountries
        {
            get
            {
                return GetQuery<ClientCountry>();
            }
        }

        public NhQueryableInclude<Department> Departments
        {
            get
            {
                return GetQuery<Department>();
            }
        }

        public NhQueryableInclude<Request> Requests
        {
            get
            {
                return GetQuery<Request>();
            }
        }

        public NhQueryableInclude<Status> Statuses
        {
            get
            {
                return GetQuery<Status>();
            }
        }

        public NhQueryableInclude<RequestSubStatus> RequestSubStatuses
        {
            get
            {
                return GetQuery<RequestSubStatus>();
            }
        }

        public NhQueryableInclude<Language> Languages
        {
            get
            {
                return GetQuery<Language>();
            }
        }

        public NhQueryableInclude<Purpose> Purposes
        {
            get
            {
                return GetQuery<Purpose>();
            }
        }

        public NhQueryableInclude<Domain> Domains
        {
            get
            {
                return GetQuery<Domain>();
            }
        }

        public NhQueryableInclude<CdT.EAI.Model.Business.Service> Services
        {
            get
            {
                return GetQuery<CdT.EAI.Model.Business.Service>();
            }
        }

        public NhQueryableInclude<DocumentFormatTarget> DocumentFormatTargets
        {
            get
            {
                return GetQuery<DocumentFormatTarget>();
            }
        }

        public NhQueryableInclude<DocumentFormat> DocumentFormats
        {
            get
            {
                return GetQuery<DocumentFormat>();
            }
        }

        public NhQueryableInclude<Priority> Priorities
        {
            get
            {
                return GetQuery<Priority>();
            }
        }

        public NhQueryableInclude<AddressBook> AddressBooks
        {
            get
            {
                return GetQuery<AddressBook>();
            }
        }

        public NhQueryableInclude<Currency> Currencies
        {
            get
            {
                return GetQuery<Currency>();
            }
        }

        public NhQueryableInclude<UnitConversion> UnitConversions
        {
            get
            {
                return GetQuery<UnitConversion>();
            }
        }

        public NhQueryableInclude<Unit> Units
        {
            get
            {
                return GetQuery<Unit>();
            }
        }

        public NhQueryableInclude<UnitType> UnitTypes
        {
            get
            {
                return GetQuery<UnitType>();
            }
        }

        public NhQueryableInclude<TurnaroundTime> TurnaroundTimes
        {
            get
            {
                return GetQuery<TurnaroundTime>();
            }
        }

        public NhQueryableInclude<Capability> Capabilities
        {
            get
            {
                return GetQuery<Capability>();
            }
        }

        public NhQueryableInclude<Specialisation> Specialisations
        {
            get
            {
                return GetQuery<Specialisation>();
            }
        }

        public NhQueryableInclude<PriceList> PriceLists
        {
            get
            {
                return GetQuery<PriceList>();
            }
        }

        public NhQueryableInclude<PriorityMultiplier> PriorityMultipliers
        {
            get
            {
                return GetQuery<PriorityMultiplier>();
            }
        }

        public NhQueryableInclude<PhysicalFile> PhysicalFiles
        {
            get
            {
                return GetQuery<PhysicalFile>();
            }
        }

        public NhQueryableInclude<Url> Urls
        {
            get
            {
                return GetQuery<Url>();
            }
        }

        public NhQueryableInclude<DocumentFormatExtension> DocumentFormatExtensions
        {
            get
            {
                return GetQuery<DocumentFormatExtension>();
            }
        }

        public NhQueryableInclude<DeliveryMode> DeliveryModes
        {
            get
            {
                return GetQuery<DeliveryMode>();
            }
        }

        public NhQueryableInclude<Holiday> Holidays
        {
            get
            {
                return GetQuery<Holiday>();
            }
        }

        public NhQueryableInclude<ReceiptDate> ReceiptDateHours
        {
            get
            {
                return GetQuery<ReceiptDate>();
            }
        }

        public NhQueryableInclude<Job> Jobs
        {
            get
            {
                return GetQuery<Job>();
            }
        }

        public NhQueryableInclude<TaskDefinition> TaskDefinitions
        {
            get
            {
                return GetQuery<TaskDefinition>();
            }
        }

        public NhQueryableInclude<GlobalParameter> GlobalParameters
        {
            get
            {
                return this.GetQuery<GlobalParameter>();
            }
        }

        private Dictionary<Type, List<EntityInfo>> BeforeSaveEntities(Dictionary<Type, List<EntityInfo>> saveMap)
        {
            var entityInfos = saveMap.Where(e => e.Key == typeof(JobPricing)).Select(e => e.Value).FirstOrDefault();

            if (entityInfos != null)
            {
                foreach (var entityInfo in entityInfos)
                {
                    var jobPricing = (JobPricing)(entityInfo.Entity);

                    // single query without lazy loading
                    var temp = (from p in Session.Query<JobTranslation>()
                                where p.Id == jobPricing.JobId
                                select new { JobTranslation = p, p.SourceMaterial.Request }).FirstOrDefault();

                    if (temp == null)
                        continue;
                    var anyJob = CheckForObjectTypeInSaveMap(temp.JobTranslation, saveMap);

                    if (!anyJob)
                    {
                        temp.JobTranslation.UpdateDate = DateTime.UtcNow;
                        saveMap.AddCustomEntity(temp.JobTranslation, this);
                    }

                    if (saveMap.Any(e => e.Key == typeof(Request)))
                        continue;
                    temp.Request.UpdateDate = DateTime.UtcNow;
                    saveMap.AddCustomEntity(temp.Request, this);
                }
            }

            entityInfos = saveMap.Where(e => e.Key == typeof(JobMaterial)).Select(e => e.Value).FirstOrDefault();
            if (entityInfos != null)
            {
                foreach (var entityInfo in entityInfos)
                {
                    var jobMaterial = (JobMaterial)(entityInfo.Entity);


                    if (!saveMap.Any(e => e.Key.IsSubclassOf(typeof(Job)) && e.Value.Any(f => ((Job)f.Entity).Id == jobMaterial.JobId)))
                    {
                        // single query without lazy loading
                        var temp = (from p in Session.Query<Job>()
                                    where p.Id == jobMaterial.JobId
                                    select new { Job = p, Request = p.SourceMaterial.Request }).FirstOrDefault();

                        if (temp != null)
                        {

                            temp.Job.UpdateDate = DateTime.UtcNow;
                            saveMap.AddCustomEntity(temp.Job, this);

                            if (!saveMap.Any(e => e.Key == typeof(Request)))
                            {
                                temp.Request.UpdateDate = DateTime.UtcNow;
                                saveMap.AddCustomEntity(temp.Request, this);
                            }
                        }
                    }
                }
            }

            entityInfos = saveMap.Where(e => e.Key == typeof(Reference)).Select(e => e.Value).FirstOrDefault();
            if (entityInfos != null)
            {
                foreach (var entityInfo in entityInfos)
                {
                    var reference = (Reference)(entityInfo.Entity);


                    var request = saveMap.Where(e => e.Key == typeof(Request)).SelectMany(e => e.Value).Select(c => (Request)c.Entity).FirstOrDefault();

                    if (request != null)
                    {
                        request.UpdateDate = DateTime.UtcNow;
                    }
                    else
                    {
                        // single query without lazy loading
                        request = (from p in Session.Query<Request>()
                                   where p.ReferenceSet.Id == reference.ReferenceSetId
                                   select p).FirstOrDefault();
                        if (request != null)
                        {

                            request.UpdateDate = DateTime.UtcNow;
                            saveMap.AddCustomEntity(request, this);
                        }
                    }
                }
            }

            entityInfos = saveMap.Where(e => e.Key == typeof(JobComment)).Select(e => e.Value).FirstOrDefault();

            if (entityInfos != null)
            {
                foreach (var entityInfo in entityInfos)
                {
                    var jobComment = (JobComment)(entityInfo.Entity);

                    // single query without lazy loading
                    var temp = (from p in Session.Query<Job>()
                                where p.Id == jobComment.JobId
                                select new { Job = p, Request = p.SourceMaterial.Request }).First();

                    temp.Job.UpdateDate = DateTime.UtcNow;
                    saveMap.AddCustomEntity(temp.Job, this);

                    if (!saveMap.Any(e => e.Key == typeof(Request)))
                    {
                        temp.Request.UpdateDate = DateTime.UtcNow;
                        saveMap.AddCustomEntity(temp.Request, this);
                    }
                }
            }

            entityInfos = saveMap.Where(e => e.Key.IsSubclassOf(typeof(Job))).Select(e => e.Value).FirstOrDefault();

            if (entityInfos != null)
            {
                foreach (var entityInfo in entityInfos)
                {
                    if (!saveMap.Any(e => e.Key == typeof(Request)))
                    {
                        var request = GetQuery<SourceMaterial>().Where(e => e.Id == ((Job)entityInfo.Entity).SourceMaterialId).Select(e => e.Request).FirstOrDefault();
                        if (request == null)
                        {
                            var id = ((Job)entityInfo.Entity).SourceMaterialId;
                            id = saveMap.Where(e => e.Key == typeof(SourceMaterial))
                                .SelectMany(e => e.Value)
                                .Select(x => (SourceMaterial)x.Entity)
                                .Where(x => x.Id == id).Select(x => x.RequestId).SingleOrDefault();

                            request = GetQuery<Request>().FirstOrDefault(e => e.Id == id);
                        }
                        saveMap.AddCustomEntity(request, this);
                    }
                }
            }

            entityInfos = saveMap.Where(e => e.Key == typeof(Material) || e.Key.IsSubclassOf(typeof(Material))).Select(e => e.Value).FirstOrDefault();
            if (entityInfos != null)
            {
                // Update 'UploadedBy' field only for new entities
                foreach (EntityInfo entityInfo in entityInfos.Where(e => e.EntityState == EntityState.Added))
                {
                    Material material = (Material)entityInfo.Entity;
                    if (string.IsNullOrEmpty(material.UploadedBy))
                    {
                        material.UploadedBy = material.CreatedBy;
                    }
                    if (!material.UploaderType.HasValue)
                    {
                        material.UploaderType = UploaderType.Other;
                    }
                }
            }

            var tmp = saveMap.Where(p => p.Key.IsSubclassOf(typeof(Job)))
                                    .Select(p => p.Value.Where(x => x.EntityState == EntityState.Deleted).ToList())
                                    .FirstOrDefault();
            var jobs = tmp == null ? null : tmp.Select(x => (Job)x.Entity).ToList();

            var requestToChange = saveMap
                        .Where(p => p.Key.IsAssignableFrom(typeof(Request)))
                        .Select(p => p.Value)
                        .FirstOrDefault();
            var smToChange = saveMap
                                    .Where(p => p.Key.IsAssignableFrom(typeof(SourceMaterial)))
                                    .Select(p => p.Value.Where(x => x.EntityState == EntityState.Added).ToList())
                                    .FirstOrDefault();

            if (requestToChange != null)
            {
                var rq = ((Request)requestToChange.First().Entity);
                List<SourceMaterial> sms = new List<SourceMaterial>();
                sms = Session.Query<SourceMaterial>().Where(x => x.RequestId == rq.Id).Where(x => !x.Jobs.Any()).Distinct().ToList();
                if (jobs != null)
                    foreach (var job in jobs)
                        sms.AddRange(Session.Query<SourceMaterial>().Where(x => x.RequestId == rq.Id).Where(v => v.Jobs.Contains(job)).Distinct().ToList());

                if (rq.RequestTemplateId != null)
                {
                    foreach (var sm in sms)
                        if (!CheckForObjectTypeInSaveMap(sm, saveMap))
                        {
                            sm.UpdateDate = DateTime.UtcNow;
                            saveMap.AddCustomEntity<SourceMaterial>(sm, this);
                        }
                }
            }

            Session.Clear();
            return saveMap;
        }

        private bool CheckForObjectTypeInSaveMap<T>(T value, Dictionary<Type, List<EntityInfo>> saveMap) where T : BaseEntity
        {
            return saveMap.Any(x => x.Key == typeof(T) && x.Value.Any(y => ((T)y.Entity).Id == value.Id));
        }


        private bool BeforeSaveEntity(EntityInfo entityInfo)
        {
            if (entityInfo.Entity is Request)
            {
                var r = (Request)entityInfo.Entity;

                //// check if right client
                //if (r.Client.ClientPortalId != userProfile.Personal.OrganisationId)
                //{
                //    throw new Exception("You're trying to save a Request for another Organisation than yours");
                //}

                // check if request can be saved
                var originalRequest = Session.Query<Request>().Fetch(p => p.Status).Fetch(t => t.RequestType).FirstOrDefault(p => p.Id == r.Id);
                var newStatus = Session.Query<Status>().FirstOrDefault(x => x.Id == r.StatusId);

                if (originalRequest != null && originalRequest.RequestType?.Code == "RST003" && newStatus.Code != "ASAC" && originalRequest.Status.Code != "DRAF" && originalRequest.Status.Code != "PEND" && originalRequest.Status.Code != "UNDE" && originalRequest.Status.Code != "CANC")
                {
                    throw new Exception("ASA Request has already been submitted");
                }

                if (originalRequest != null && (originalRequest.RequestType?.Code == "RST001" || originalRequest.RequestType?.Code == "RST002") && originalRequest.Status.Code != "MTS" && originalRequest.Status.Code != "DRAF" && originalRequest.Status.Code != "PEND" && originalRequest.Status.Code != "UNDE" && originalRequest.Status.Code != "CANC")
                {
                    throw new Exception("Request has already been submitted");
                }

                // check if new request and set status
                if (r.Status == null && r.StatusId == new Guid())
                {
                    r.StatusId = GetQuery<Status>().Where(p => p.Code == "DRAF").Select(p => p.Id).First();
                    r.FromApplication = Application.ClientPortal;
                }

                // check status changes
                // TODO : move to business logic layer
                if (entityInfo.OriginalValuesMap.ContainsKey("StatusId"))
                {
                    // retrieve original from db
                    var originalRequestStatus = originalRequest.Status;

                    if ((originalRequestStatus.Code == "DRAF" || originalRequestStatus.Code == "MTS") && newStatus.Code == "NEW")
                    {
                        r.SubmissionDate = DateTime.UtcNow;
                        var sender = GetQuery<Contact>().FirstOrDefault(p => p.UserName == Thread.CurrentPrincipal.Identity.Name && p.Client.Id == originalRequest.Client.Id);
                        r.SentBy = sender;

                        if (r.RequestDeliveryContacts == null)
                            r.RequestDeliveryContacts = new List<RequestDeliveryContact>();

                        foreach (SourceMaterial sourceMaterial in originalRequest.SourceMaterials.Where(sm => sm.IsPrivate))
                        {
                            if (!r.RequestDeliveryContacts.Any(c => c.Contact.UserName.ToUpper().Equals(sourceMaterial.UploadedBy.ToUpper())))
                            {
                                Contact contact = this.Contacts.First(c => c.UserName.ToUpper().Equals(sourceMaterial.UploadedBy.ToUpper()));
                                r.RequestDeliveryContacts.Add(new RequestDeliveryContact()
                                {
                                    Contact = contact,
                                    ContactId = contact.Id,
                                    Request = r,
                                    RequestId = r.Id,
                                    CreationDate = DateTime.UtcNow,
                                    CreatedBy = Thread.CurrentPrincipal.Identity.Name
                                });
                            }
                        }
                    }

                    //when approving a request for a quotation still valid the tat is not calculated so the receipt date is null
                    //but we don't need to recalculate it here because the quotations expire at the end of the day so
                    if (originalRequestStatus.Code == "PEND" && !r.ReceiptDate.HasValue)
                    {
                        r.ApprovalDate = r.ReceiptDate = DateTime.UtcNow;
                    }
                }
            }
            else if (entityInfo.Entity is SourceMaterial)
            {
                if (entityInfo.EntityState == EntityState.Added)
                {
                    SourceMaterial sourceMaterial = (SourceMaterial)entityInfo.Entity;
                    if (string.IsNullOrEmpty(sourceMaterial.UploadedBy))
                        sourceMaterial.UploadedBy = Thread.CurrentPrincipal.Identity.Name;
                }
            }
            else if (entityInfo.Entity.GetType().IsSubclassOf(typeof(Material)) && entityInfo.EntityState == EntityState.Added)
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
                    MaterialClassification mc = Session.Query<MaterialClassification>().First(x => x.Id == material.MaterialClassificationId);
                    material.ActivityLabel = "Request creation";
                    if (mc.Code.Equals("SOUR") || mc.Code.Equals("OLDO") || mc.Code.Equals("OLDT") || mc.Code.Equals("CREF"))
                    {
                        material.ActivityLabel = "Request creation";
                    }
                }
            }
            else if (entityInfo.Entity.GetType().IsSubclassOf(typeof(Job)))
            {
                //overwrite the DMS volume with the client volume 
                ((Job)entityInfo.Entity).Volume = ((Job)entityInfo.Entity).ClientVolume;
            }

            // clear session before giving it to breeze
            // alternative to creating a new session
            Session.Clear();
            return true; // true means the entity must be saved
        }

        /*  
        overidden method to access saveMap, which contains all the entities that will be saved
        saveMap allows you to modifed & pass new entites back to the front-end
                 
        if you query it from the session, you must include it in saveMap back to the client
        the UI will update automatically
        */
        private void AfterSaveEntities(Dictionary<Type, List<EntityInfo>> saveMap, List<KeyMapping> keyMappings)
        {
            var requestToChange = saveMap
                                    .Where(p => p.Key.IsAssignableFrom(typeof(Request)))
                                    .Select(p => p.Value)
                                    .FirstOrDefault();
            var smToChange = saveMap
                                    .Where(p => p.Key.IsAssignableFrom(typeof(SourceMaterial)))
                                    .Select(p => p.Value.Where(x => x.EntityState == EntityState.Added).ToList())
                                    .FirstOrDefault();

            if (requestToChange != null)
            {
                var rq = ((Request)requestToChange.First().Entity);
                if (rq.RequestTemplateId != null)
                {
                    bool selectedTemplateChangedValue = false;
                    var selectedTemplateChanged = requestToChange.First().UnmappedValuesMap.SingleOrDefault(x => x.Key == "SelectedTemplateChanged");
                    // only if true, if false or null don't create jobs
                    if (!string.IsNullOrEmpty(selectedTemplateChanged.Key) && (bool.TryParse(selectedTemplateChanged.Value.ToString(), out selectedTemplateChangedValue) && selectedTemplateChangedValue))
                    {
                        _requestBL.CreateJobsBasedOnRequestTemplate(rq);
                        var sms = Session.Query<SourceMaterial>().Where(x => x.RequestId == rq.Id).Where(x => !x.Jobs.Any()).ToList();
                        foreach (var sm in sms)
                        {
                            if (!CheckForObjectTypeInSaveMap(sm, saveMap))
                            {
                                sm.UpdateDate = DateTime.UtcNow;
                                saveMap.AddCustomEntity<SourceMaterial>(sm, this);
                            }
                        }
                    }
                }
            }
            else if (smToChange != null && smToChange.Count > 0)
            {
                var rq = Session.Query<Request>().SingleOrDefault(x => x.Id == ((SourceMaterial)smToChange.First().Entity).RequestId);

                if (rq.RequestTemplateId != null)
                {
                    _requestBL.CreateJobsBasedOnRequestTemplate(rq);
                }
            }

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
                        var file = Session.Load<PhysicalFile>(((PhysicalFile)physicalFile.Entity).Id);

                        // call external storage service
                        StoreFileResponse resp = null;
                        Helper.UseWcfService<IFileManagement>("FileManagement", null, null, p =>
                        {
                            try
                            {
                                // Copying from a physical file (case we use a template with references they must be cloned)
                                if (file.ExternalStorageFileId == null)
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
                                    // check embedded only if it's a sourcematerial
                                    if (file.MaterialClassification.Code != "CREF" && new EmbeddedFileBL().IsEmbedded(filePath, file.FileName))
                                    {
                                        file.IsEmbedded = true;
                                    }
                                }
                                else
                                {
                                    resp = p.CloneFile(new CloneFileRequest() { ExternalStorageFileId = file.ExternalStorageFileId.Value, FileName = file.FileName });
                                }
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
                        Session.Save(file);
                    }
                }
            }

            var entityInfos = saveMap
                 .Where(p => p.Key.IsAssignableFrom(typeof(Request)))
                 .Select(p => p.Value)
                 .FirstOrDefault();
            if (entityInfos != null)
            {
                foreach (var entityInfo in entityInfos)
                {
                    // initialize workflow or send email only if the status of the request has changed
                    if (entityInfo.OriginalValuesMap.ContainsKey("StatusId"))
                    {
                        Request request = (Request)entityInfo.Entity;
                        if (request.Status.Code == "MTS" && request.RequestType.Code == "RST001")
                        {
                            this.SendMarkedToSendEmail(request);
                        }

                        Status oldStatus = Session.Query<Status>().First(x => x.Id == Guid.Parse(entityInfo.OriginalValuesMap["StatusId"].ToString()));

                        if (request.Status.Code == "DRAF" && request.RequestType.Code == "RST001" && oldStatus.Code == Status.Codes.MTS)
                        {
                            this.SendBackToDraftEmail(request);
                        }

                        if (request.Status.Code == "NEW" && request.RequestType.Code == "RST003")
                        {
                            WorkflowInitializer.Initialize(request, "AsaDefaultFlow", this.Session);
                        }
                        else if (request.Status.Code == "NEW" && request.RequestType.Code == "RST001")
                        {
                            WorkflowInitializer.Initialize(request, "EcdtDefaultFlow", this.Session);
                        }
                    }
                }
            }

            this.AfterSaveSourceMaterial(saveMap);
            this.AfterSaveJob(saveMap);


            Session.Flush();
        }

        private void AfterSaveSourceMaterial(Dictionary<Type, List<EntityInfo>> saveMap)
        {
            var sourceMaterials = saveMap.Where(e => e.Key == typeof(SourceMaterial)).Select(e => e.Value).FirstOrDefault();

            if (sourceMaterials == null)
            {
                return;
            }

            foreach (var sm in from sourceMaterial in sourceMaterials
                               where sourceMaterial.EntityState == EntityState.Deleted
                               select new { val = (SourceMaterial)sourceMaterial.Entity })
            {
                List<Job> jobs = Session.Query<Job>().FetchMany(p => p.JobComments).ThenFetch(p => p.Comment).Where(j => j.SourceMaterialId == sm.val.Id).ToList();

                foreach (Job j in jobs)
                {
                    j.IsDeleted = true;

                    List<JobMaterial> jms = GetQuery<JobMaterial>().Where(e => e.JobId == j.Id).ToList();

                    foreach (var jm in jms)
                    {
                        jm.IsDeleted = jm.Material.IsDeleted = true;
                        saveMap.AddCustomEntity(jm, this);
                    }

                    foreach (var jc in j.JobComments)
                    {
                        jc.IsDeleted = jc.Comment.IsDeleted = true;
                        saveMap.AddCustomEntity(jc, this);
                    }

                    saveMap.AddCustomEntity(j, this);
                }
            }
        }

        private void AfterSaveJob(Dictionary<Type, List<EntityInfo>> saveMap)
        {
            var jobs = saveMap.Where(e => e.Key.IsSubclassOf(typeof(Job))).Select(e => e.Value).FirstOrDefault();

            if (jobs == null)
            {
                return;
            }

            foreach (var myJob in from job in jobs
                                  where job.EntityState == EntityState.Deleted
                                  select new { val = (Job)job.Entity })
            {
                List<JobMaterial> jobMaterials = Session.Query<JobMaterial>().Fetch(p => p.Material).Where(j => j.JobId == myJob.val.Id).ToList();

                foreach (JobMaterial jm in jobMaterials)
                {
                    jm.IsDeleted = jm.Material.IsDeleted = true;
                    saveMap.AddCustomEntity(jm, this);
                }
            }
        }

        private IList<string> getReqUpdMailTo(Request request)
        {
            IList<string> to = new List<string>();

            // Add Request Submitter
            if (request.SentBy != null)
            {
                to.Add(request.SentBy.Email);
            }

            // Add Request Active Contacts
            foreach (string address in request.RequestContacts.Where(rc => rc.Contact.IsActive).Select(rc => rc.Contact.Email))
            {
                to.Add(address);
            }

            return to;
        }

        private T CreateOrDuplicateMaterial<T>(Reference _ref, ReferenceSet referenceSet) where T : Material, new()
        {
            var mat = ((T)_ref.Material).CloneThis();
            mat.MaterialClassification = Session.Query<MaterialClassification>().SingleOrDefault(x => x.Code == "CREF");
            Session.Save(mat);
            var newRef = new Reference() { Material = mat, ReferenceSet = referenceSet };
            Session.Save(newRef);
            foreach (var rl in _ref.ReferenceLanguages)
            {
                var newRefLang = new ReferenceLanguage() { Reference = newRef, Language = rl.Language };
                Session.Save(newRefLang);
                newRef.ReferenceLanguages.Add(newRefLang);
                Session.Save(newRef);
            }
            referenceSet.References.Add(newRef);
            Session.Save(referenceSet);

            return (T)mat;
        }

        private void CheckAndDeleteDuplicatedMaterial<T>(Func<T, bool> predicate, ReferenceSet referenceSet) where T : Material
        {
            if (referenceSet.References == null || referenceSet.References.Count == 0)
                return;

            var duplicatedMaterialReference = referenceSet.References
                .Where(x => x.Material is T).Select(x => (T)x.Material)
                .SingleOrDefault(predicate);

            if (duplicatedMaterialReference != null)
            {
                var _ref = referenceSet.References.SingleOrDefault(x => x.Material.Id == duplicatedMaterialReference.Id);
                referenceSet.References.Remove(_ref);
                Session.Delete(_ref);
                Session.Save(referenceSet);
            }
        }

        private IList<string> getMailTo(Request request, bool includeDrafters = false)
        {
            var senders = new string[] { "" };// Roles.GetUsersInRole(ClientPortalRoles.Sender);
            var sendersAll = new string[] { "" }; //Roles.GetUsersInRole(ClientPortalRoles.SenderAll);
            // main condition of the query
            var predicate = PredicateBuilder.True<Contact>();
            predicate = predicate.And(x => x.IsActive && x.Client.ClientPortalId == request.Client.ClientPortalId);

            var predicate2 = PredicateBuilder.False<Contact>();
            predicate2 = predicate2.Or(x => sendersAll.Contains(x.UserName) || (senders.Contains(x.UserName) && x.Department.ClientPortalId == request.Department.ClientPortalId));
            if (includeDrafters)
            {
                var drafters = new string[] { "" }; //Roles.GetUsersInRole(ClientPortalRoles.Draft);
                var draftersAll = new string[] { "" };// Roles.GetUsersInRole(ClientPortalRoles.DraftAll);
                // add senderall and drafterall of the client and senders/drafters of the department
                predicate2 = predicate2.Or(x => draftersAll.Contains(x.UserName) || (drafters.Contains(x.UserName) && x.Department.ClientPortalId == request.Department.ClientPortalId));
            }
            predicate = predicate.And(predicate2);
            return Session.Query<Contact>().Where(predicate).Select(p => p.Email).Distinct().ToList();
        }

        private void SendMarkedToSendEmail(Request req)
        {
            // Send mail only if there are jobs (e.g. request was MTS and the service is changed)
            if (req.SourceMaterials.SelectMany(sm => sm.Jobs).Any())
            {
                string priority = req.SourceMaterials.SelectMany(x => x.Jobs).OrderByDescending(j => j.Priority.DisplayOrder).First().Priority.DefaultLabel;
                string status = req.Status.Code == "MTS" ? "Marked to Send" : "Submitted";
                var model = new
                {
                    Client = req.Client.Abbreviation,
                    Id = req.Id,
                    Identifier = req.RequestIdentifier,
                    Status = status,
                    Priority = priority,
                    Website = ConfigurationManager.AppSettings["ClientPortalAddress"],
                    Username = HttpContext.Current.User.Identity.Name,
                    NumberOfSourceMaterials = req.SourceMaterials.Count,
                    Drafter = req.CreatedBy,
                    ClientReference = req.ClientReference
                };

                var template = Session.Query<EmailTemplate>().Where(x => x.Code == "CPMTS").SingleOrDefault();
                var mail = new SendEmail
                {
                    Subject = Engine.Razor.RunCompile(template.EmailSubject, "emailSubject", null, model, null),
                    Body = Engine.Razor.RunCompile(template.EmailBody, "emailMTS", null, model, null),
                    Priority = (EmailPriorityEnum)template.Priority
                };

                //get all users in roles senders
                IList<string> to = getMailTo(req);
                mail.ReplyTo.Add(ConfigurationManager.AppSettings["ReplyToAddress"]);
                mail.To.AddRange(to);
                _messageSession.Send(mail);
            }
        }

        private void SendBackToDraftEmail(Request req)
        {
            // Send mail only if there are jobs 
            if (req.SourceMaterials.Any(p => p.Jobs.Any()))
            {
                string priority = req.SourceMaterials.SelectMany(x => x.Jobs).OrderByDescending(j => j.Priority.DisplayOrder).First().Priority.DefaultLabel;
                var model = new
                {
                    Client = req.Client.Abbreviation,
                    ClientReference = req.ClientReference,
                    Id = req.Id,
                    Identifier = req.RequestIdentifier,
                    NumberOfSourceMaterials = req.SourceMaterials.Count,
                    Priority = priority,
                    Website = ConfigurationManager.AppSettings["ClientPortalAddress"],
                    Username = HttpContext.Current.User.Identity.Name,
                    Drafter = req.CreatedBy
                };

                var template = Session.Query<EmailTemplate>().Where(x => x.Code == "CPBTD").SingleOrDefault();
                var mail = new SendEmail
                {
                    Subject = Engine.Razor.RunCompile(template.EmailSubject, "emailSubjectBTD", null, model, null),
                    Body = Engine.Razor.RunCompile(template.EmailBody, "emailBTD", null, model, null),
                    Priority = (EmailPriorityEnum)template.Priority
                };

                //get all users in roles senders and drafters
                IList<string> to = getMailTo(req, true);
                mail.ReplyTo.Add(ConfigurationManager.AppSettings["ReplyToAddress"]);
                mail.To.AddRange(to);
                _messageSession.Send(mail);
            }
        }
    }
}
