//// <copyright file="RequestsService.cs" company="Translation Centre for the Bodies of the European Union">
////  Copyright (c) 2015 All Rights Reserved
//// </copyright>

//namespace ClientPortal.Helpers
//{
//    using Cdt.ClientPortal.Core;
//    using Cdt.ClientPortal.Dto;
//    using Cdt.ClientPortal.Services.Message;
//    using CdT.EAI.Dal.NH.Audit;
//    using CdT.EAI.Model.Business;
//    using CdT.EAI.Model.Workflow;
//    using NHibernate;
//    using NHibernate.Criterion;
//    using NHibernate.Linq;
//    using NHibernate.Transform;
//    using System;
//    using System.Collections.Generic;
//    using System.Linq;
//    using System.Security.Principal;
//    using System.Text;
//    using System.Globalization;

//    internal class RequestsService : IRequestsService
//    {
//        #region PRIVATE VARS
//        private readonly ISession _session;
//        private IQueryable<Request> query;
//        private IQueryable<Job> queryJob;
//        private bool isAdmin = false;

//        // The queryOver is used because OrderByAlias is not available in Linq and OrderBy expression does not work in SqlServer
//        private IQueryOver<Request, Request> queryOver;
//        // alias used by the QueryOver
//        private Client clientAlias = null;
//        private RequestType requestTypeAlias = null;
//        private Request rootAlias = null;
//        private Department departmentAlias = null;
//        private Contact contactAlias = null;

//        private bool includeSnapshots = true;
//        private bool CPImprovements = false;
//        #endregion

//        #region CTOR
//        public RequestsService(ISession session, IPrincipal user)
//        {
//            _session = session;
//            var userProfile = UserProfile.GetProfile(user.Identity.Name);
//            var roles = System.Web.Security.Roles.GetRolesForUser(user.Identity.Name).ToList();

//            GlobalParameter param = this._session.Query<GlobalParameter>().Single(x => x.CodeParameter == "CPImprovements");
//            DateTime applyCPImprovements;
//            if (DateTime.TryParseExact(param.Value, "dd/MM/yyyy HH:mm:ss", CultureInfo.InvariantCulture, DateTimeStyles.AssumeUniversal, out applyCPImprovements))
//            {
//                CPImprovements = DateTime.UtcNow > applyCPImprovements;
//            }

              

//            query = _session.Query<Request>().Where(r => r.Client.ClientPortalId == userProfile.Personal.OrganisationId && (r.RequestType.Code == "RST001" || r.RequestType.Code == "RST002"));
//            queryJob = _session.Query<Job>().Where(r => r.SourceMaterial.Request.Client.ClientPortalId == userProfile.Personal.OrganisationId);

//            queryOver = session.QueryOver(() => rootAlias)
//                                .JoinAlias(p => p.Client, () => clientAlias)
//                                .Where(p => clientAlias.ClientPortalId == userProfile.Personal.OrganisationId)
//                                .JoinAlias(p => p.RequestType, () => requestTypeAlias)
//                                .Where(p => requestTypeAlias.Code == "RST001" || requestTypeAlias.Code == "RST002");

//            var contact = _session.Query<Contact>().Where(x => x.UserName == user.Identity.Name);
//            if (!roles.Contains("draft_all") && !roles.Contains("sender_all"))
//            {
//                query = query.Where(p => p.Department.ClientPortalId == userProfile.Personal.DepartmentId
//                                         || p.RequestContacts.Any(q => contact.Contains(q.Contact))
//                                         || p.RequestDeliveryContacts.Any(r => contact.Contains(r.Contact)));
//                queryJob = queryJob.Where(p => p.SourceMaterial.Request.Department.ClientPortalId == userProfile.Personal.DepartmentId
//                                        || p.SourceMaterial.Request.RequestContacts.Any(q => contact.Contains(q.Contact))
//                                        || p.SourceMaterial.Request.RequestDeliveryContacts.Any(r => contact.Contains(r.Contact)));

//                queryOver = queryOver
//                            .JoinAlias(p => p.Department, () => departmentAlias)
//                            .Where(Restrictions.Disjunction()
//                                                .Add(Restrictions.Where(() => departmentAlias.ClientPortalId == userProfile.Personal.DepartmentId))
//                                                .Add(Subqueries.WhereExists(QueryOver.Of<RequestContact>()
//                                                                                    .JoinAlias(p => p.Contact, () => contactAlias)
//                                                                                    .Where(p => contactAlias.UserName == user.Identity.Name)
//                                                                                    .And(p => p.RequestId == rootAlias.Id)
//                                                                                    .Select(p => p.Id)
//                                                                                    ))
//                                                .Add(Subqueries.WhereExists(QueryOver.Of<RequestDeliveryContact>()
//                                                                                    .JoinAlias(p => p.Contact, () => contactAlias)
//                                                                                    .Where(p => contactAlias.UserName == user.Identity.Name)
//                                                                                    .And(p => p.RequestId == rootAlias.Id)
//                                                                                    .Select(p => p.Id)
//                                                                                    ))
//                            );
//            }
//        }
//        #endregion

//        #region PUBLIC METHODS
//        public IList<EcdtRequestList> GetRequestsListAdmin(FilterExpressionCollection filters, int startRowIndex, int maximumRow, out int rowCount)
//        {
//            isAdmin = true;

//            query = _session.Query<Request>().Where(r => r.RequestType.Code == "RST001" || r.RequestType.Code == "RST002" || r.RequestType.Code == "RST004");
//            query = ApplyFilters(query, filters);
//            var lst = new List<EcdtRequestList>();

//            var queryComp = query.OrderBy(x => x.CreationDate)
//                             .Fetch(p => p.Department)
//                             .Fetch(p => p.Status)
//                             .Fetch(p => p.Purpose)
//                             .Fetch(p => p.SourceMaterials)
//                             .Fetch(p => p.Client)
//                             .ToList();

//            // maximum=-1 --> Export, no need for paging
//            if (maximumRow >= 0)
//            {
//                queryComp = queryComp.Skip(startRowIndex * maximumRow).Take(maximumRow).ToList();
//            }

//            foreach (var _request in queryComp)
//            {
//                lst.Add(CreateEcdtRequestAdmin(_request, _request.CreationDate));
//            }

//            lst = lst.OrderBy(x => x.CreationDate).ToList();
//            rowCount = query.Count();

//            return lst;
//        }

//        public IList<EcdtRequestList> GetRequestsList(FilterExpressionCollection filters, int startRowIndex, int maximumRow, out int rowCount)
//        {
//            query = ApplyFilters(query, filters);

//            var lst = new List<EcdtRequestList>();

//            // Get the initial requests so we can get the snapshots and the correct paging
//            var initialPaging = query.OrderBy(x => x.CreationDate)
//                                     .Skip(startRowIndex * maximumRow)
//                                     .Take(maximumRow)
//                                     .Select(x => new { x.Id, Status = x.Status.Code, CreationDate = x.CreationDate })
//                                     .ToList();

//            if (includeSnapshots)
//            {
//                var requestsUnderQuotation = initialPaging.Where(x => x.Status == "UNDE").Select(x => new { x.Id, x.CreationDate }).ToList();
//                if (requestsUnderQuotation.Any())
//                {
//                    var reqs = AuditHelper.GetRequestsSnapshots(_session, requestsUnderQuotation.Select(p => p.Id).ToList());
//                    reqs = reqs.Where(x => initialPaging.Any(c => c.Id == x.Id)).ToList();
//                    if (reqs != null)
//                    {
//                        foreach (var reqAndDate in reqs)
//                        {
//                            lst.Add(CreateEcdtRequest(reqAndDate, requestsUnderQuotation.Where(p => p.Id == reqAndDate.Id).Select(p => p.CreationDate).Single()));
//                        }
//                    }
//                }
//            }

//            // Now get the request that are not under quotation
//            var filteredNotUnderQuotation = initialPaging.Where(x => x.Status != "UNDE").Select(x => x.Id);
//            var queryComp = query.Where(x => filteredNotUnderQuotation.Contains(x.Id))
//                                 .OrderBy(x => x.CreationDate)
//                                 .Fetch(p => p.Department)
//                                 .Fetch(p => p.Status)
//                                 .Fetch(p => p.Purpose)
//                                 .Fetch(p => p.SourceMaterials)
//                                 .ToFuture();

//            var queryComp2 = this._session.Query<SourceMaterial>()
//                                 .Where(x => filteredNotUnderQuotation.Contains(x.Request.Id))
//                                 .Fetch(x => x.Material)
//                                 .Fetch(x => x.DeliverableDocumentFormat)
//                                 .Fetch(x => x.Jobs)
//                                 .ToFuture();

//            var queryComp3 = this._session.Query<Job>()
//                                 .Where(x => filteredNotUnderQuotation.Contains(x.SourceMaterial.Request.Id))
//                                 .Fetch(x => x.Priority)
//                                 .Fetch(x => x.Service).ThenFetch(x => x.Unit)
//                                 .Fetch(x => x.TargetLanguage)
//                                 .Fetch(x => x.SourceLanguage)
//                                 .Fetch(x => x.ScopingInfo)
//                                 .ToFuture();

//            foreach (var _request in queryComp)
//            {
//                lst.Add(CreateEcdtRequest(_request, _request.CreationDate));
//            }

//            lst = lst.OrderBy(x => x.CreationDate).ToList();
//            rowCount = query.Count();

//            return lst;
//        }

//        public IList<EcdtRequestList> GetLastNRequests(int NumberOfRows)
//        {
//            var lst = new List<EcdtRequestList>();

//            var requests = query
//                .OrderByDescending(x => x.CreationDate)
//                .Take(NumberOfRows)
//                .Select(x => new { x.Id, x.RequestIdentifier, x.CreationDate, x.Status.Code });

//            // foreach is necessary due to the addMinutes call
//            foreach (var _request in requests)
//            {
//                lst.Add(new EcdtRequestList()
//                {
//                    RequestId = _request.Id,
//                    RequestIdentifier = _request.RequestIdentifier,
//                    CreationDate = _request.CreationDate,
//                    Status = _request.Code
//                });
//            }

//            return lst;
//        }

//        /// <summary>
//        /// Projection class for GetLastNDeliveries query
//        /// </summary>
//        private class LatestDeliveryProjection
//        {
//            public DateTime? LastJob { get; set; }
//            public string RequestIdentifier { get; set; }
//            public Guid Id { get; set; }
//            public string Status { get; set; }
//        }

//        public IList<EcdtRequestList> GetLastNDeliveries(int NumberOfRows)
//        {
//            var lst = new List<EcdtRequestList>();

//            // alias used for the queryover
//            Status statusAlias = null;
//            WorkflowStep workflowStepAlias = null;
//            WorkflowInstance workflowInstanceAlias = null;
//            TaskDefinition taskDefinitionAlias = null;
//            JobStatus jobStatusAlias = null;
//            SourceMaterial sourceMaterialAlias = null;
//            Request subQueryAlias = null;
//            LatestDeliveryProjection result = null;

//            var subQuery = QueryOver.Of<WorkflowTask>()
//                                                .JoinAlias(p => p.WorkflowStep, () => workflowStepAlias)
//                                                .JoinAlias(p => workflowStepAlias.WorkflowInstance, () => workflowInstanceAlias)
//                                                .JoinAlias(p => p.TaskDefinition, () => taskDefinitionAlias)
//                                                .Where(p => p.WorkflowTaskStatus == WorkflowTask.WorkflowTaskStatuses.Complete)
//                                                .And(p => taskDefinitionAlias.TaskType == TaskDefinition.TaskTypes.Delivery)
//                                                .And(p => workflowInstanceAlias.RequestId == rootAlias.Id)
//                                                .Select(Projections.Max<WorkflowTask>(x => x.CompletionDate));

//            var subQueryJob = QueryOver.Of<Job>()
//                    .JoinAlias(p => p.JobStatus, () => jobStatusAlias)
//                    .JoinAlias(p => p.SourceMaterial, () => sourceMaterialAlias)
//                    .JoinAlias(p => sourceMaterialAlias.Request, () => subQueryAlias)
//                    .Where(p => jobStatusAlias.Code == "CMP")
//                    .And(p => subQueryAlias.Id == rootAlias.Id)
//                    .Select(p => p.Id);

//            var requests = queryOver
//                  .JoinAlias(p => p.Status, () => statusAlias)
//                  .Select(
//                          Projections.Distinct(
//                          Projections.ProjectionList()
//                              .Add(Projections.Property(() => rootAlias.Id).WithAlias(() => result.Id))
//                              .Add(Projections.Property(() => rootAlias.RequestIdentifier).WithAlias(() => result.RequestIdentifier))
//                              .Add(Projections.SubQuery(subQuery).WithAlias(() => result.LastJob))
//                              .Add(Projections.Property(() => statusAlias.Code).WithAlias(() => result.Status))
//                          )
//                      )
//                  .WithSubquery.WhereExists(subQueryJob)
//                  .OrderByAlias(() => result.LastJob).Desc
//                  .TransformUsing(Transformers.AliasToBean<LatestDeliveryProjection>())
//                  .Take(NumberOfRows)
//                  .ReadOnly()
//                  .List<LatestDeliveryProjection>();

//            if (requests.Count > 0)
//            {
//                // foreach is necessary due to the addMinutes call
//                foreach (var _request in requests)
//                {
//                    lst.Add(new EcdtRequestList()
//                    {
//                        RequestId = _request.Id,
//                        RequestIdentifier = _request.RequestIdentifier,
//                        CreationDate = _request.LastJob.HasValue == true ? _request.LastJob.Value : default(DateTime?),
//                        Status = _request.Status
//                    });
//                }
//            }

//            return lst;
//        }

//        public AssignmentDetailsListResponse GetRequestRange(DateTime fromDate, DateTime todate)
//        {
//            var assignmentDetailsListResponse = new AssignmentDetailsListResponse();

//            var fromUtc = fromDate.ToUniversalTime();
//            var toUtc = todate.ToUniversalTime();

//            var results = (from job in this.queryJob
//                           where job.Deadline >= fromUtc && job.Deadline <= toUtc
//                           group job by new { job.Deadline, job.SourceMaterial.Request.Id, job.SourceMaterial.Request.RequestIdentifier, job.SourceMaterial.Request.Title, job.SourceMaterial.Request.Status.Code } into g
//                           orderby g.Key.RequestIdentifier
//                           select new
//                           {
//                               Id = g.Key.Id,
//                               RequestIdentifier = g.Key.RequestIdentifier,
//                               Title = g.Key.Title,
//                               Deadline = g.Key.Deadline.ToLocalTime(),
//                               StatusCode = g.Key.Code,
//                               JobCount = g.Count()
//                           });

//            foreach (var req in results)
//            {
//                assignmentDetailsListResponse.AssignmentsDetails.Add(new AssignmentDetailsList()
//                {
//                    RequestIdEcdt = req.Id,
//                    RequestIdenfifierEcdt = req.RequestIdentifier,
//                    Title = req.Title,
//                    ClientDueDate = req.Deadline.RoundDown(TimeSpan.FromMinutes(30)),
//                    JobCount = req.JobCount,
//                    StatusCode = req.StatusCode
//                });
//            }

//            return assignmentDetailsListResponse;
//        }
//        #endregion

//        #region PRIVATE FUNCTIONS
//        private IQueryable<Request> ApplyFilters(IQueryable<Request> query, FilterExpressionCollection filters)
//        {
//            foreach (var filter in filters)
//            {
//                switch (filter.FieldName)
//                {
//                    case "Status":
//                        query = CreateStatusFilter(query, filter.Value);
//                        break;
//                    case "RequestIdentifier":
//                        query = CreateIdentifierFilter(query, filter.Value, filter.Operator.ToString());
//                        break;
//                    case "Title":
//                        query = CreateTitleFilter(query, filter.Value, filter.Operator.ToString());
//                        break;
//                    case "CreationDate":
//                        query = CreateDateCreationFilter(query, filter.Value, filter.Operator.ToString());
//                        break;
//                    case "Department":
//                        query = CreateDepartmentFilter(query, filter.Value, filter.Operator.ToString());
//                        break;
//                    case "ClientReference":
//                        query = CreateReferenceFilter(query, filter.Value, filter.Operator.ToString());
//                        break;
//                    case "OrganisationId":
//                        query = CreateClientFilter(query, filter.Value);
//                        break;
//                }
//            }
//            return query;
//        }

//        #region Request Filter
//        private IQueryable<Request> CreateReferenceFilter(IQueryable<Request> query, string value, string comparison)
//        {
//            switch (comparison)
//            {
//                case "Contains":
//                    return query.Where(x => x.ClientReference.Contains(value));
//                case "StartsWith":
//                    return query.Where(x => x.ClientReference.StartsWith(value));
//                case "EndsWith":
//                    return query.Where(x => x.ClientReference.EndsWith(value));
//                case "EqualTo":
//                    return query.Where(x => x.ClientReference == value);
//                case "GreaterThan":
//                    return query.Where(x => x.ClientReference.CompareTo(value) > 0);
//                case "GreaterThanOrEqualTo":
//                    return query.Where(x => x.ClientReference.CompareTo(value) > 0 || x.ClientReference == value);
//                case "LessThanOrEqualTo":
//                    return query.Where(x => x.ClientReference.CompareTo(value) < 0 || x.ClientReference == value);
//                case "LessThan":
//                    return query.Where(x => x.ClientReference.CompareTo(value) < 0);
//                default:
//                    return query.Where(x => x.ClientReference.Contains(value));
//            }
//        }

//        private IQueryable<Request> CreateDepartmentFilter(IQueryable<Request> query, string value, string comparison)
//        {
//            switch (comparison)
//            {
//                case "Contains":
//                    return query.Where(x => x.Department.DefaultLabel.Contains(value));
//                case "StartsWith":
//                    return query.Where(x => x.Department.DefaultLabel.StartsWith(value));
//                case "EndsWith":
//                    return query.Where(x => x.Department.DefaultLabel.EndsWith(value));
//                case "EqualTo":
//                    return query.Where(x => x.Department.DefaultLabel == value);
//                case "GreaterThan":
//                    return query.Where(x => x.Department.DefaultLabel.CompareTo(value) > 0);
//                case "GreaterThanOrEqualTo":
//                    return query.Where(x => x.Department.DefaultLabel.CompareTo(value) > 0 || x.Department.DefaultLabel == value);
//                case "LessThanOrEqualTo":
//                    return query.Where(x => x.Department.DefaultLabel.CompareTo(value) < 0 || x.Department.DefaultLabel == value);
//                case "LessThan":
//                    return query.Where(x => x.Department.DefaultLabel.CompareTo(value) < 0);
//                default:
//                    return query.Where(x => x.Department.DefaultLabel.Contains(value));
//            }
//        }

//        private IQueryable<Request> CreateDateCreationFilter(IQueryable<Request> query, string value, string comparison)
//        {
//            DateTime day = DateTime.Parse(value);
//            switch (comparison)
//            {

//                case "EqualTo":
//                    return query.Where(x => x.CreationDate.Date == day.Date);
//                case "GreaterThan":
//                    return query.Where(x => x.CreationDate.Date > day.Date);
//                case "GreaterThanOrEqualTo":
//                    return query.Where(x => x.CreationDate.Date > day.Date || x.CreationDate.Date == day.Date);
//                case "LessThanOrEqualTo":
//                    return query.Where(x => x.CreationDate.Date < day.Date || x.CreationDate.Date == day.Date);
//                case "LessThan":
//                    return query.Where(x => x.CreationDate.Date < day.Date);
//                default:
//                    return query.Where(x => x.CreationDate.Date == day.Date);
//            }
//        }

//        private IQueryable<Request> CreateTitleFilter(IQueryable<Request> query, string value, string comparison)
//        {
//            switch (comparison)
//            {
//                case "Contains":
//                    return query.Where(x => x.Title.Contains(value));
//                case "StartsWith":
//                    return query.Where(x => x.Title.StartsWith(value));
//                case "EndsWith":
//                    return query.Where(x => x.Title.EndsWith(value));
//                case "EqualTo":
//                    return query.Where(x => x.Title == value);
//                case "GreaterThan":
//                    return query.Where(x => x.Title.CompareTo(value) > 0);
//                case "GreaterThanOrEqualTo":
//                    return query.Where(x => x.Title.CompareTo(value) > 0 || x.Title == value);
//                case "LessThanOrEqualTo":
//                    return query.Where(x => x.Title.CompareTo(value) < 0 || x.Title == value);
//                case "LessThan":
//                    return query.Where(x => x.Title.CompareTo(value) < 0);
//                default:
//                    return query.Where(x => x.Title.Contains(value));
//            }
//        }

//        private IQueryable<Request> CreateIdentifierFilter(IQueryable<Request> query, string value, string comparison)
//        {
//            switch (comparison)
//            {
//                case "Contains":
//                    return query.Where(x => x.RequestIdentifier.Contains(value));
//                case "StartsWith":
//                    return query.Where(x => x.RequestIdentifier.StartsWith(value));
//                case "EndsWith":
//                    return query.Where(x => x.RequestIdentifier.EndsWith(value));
//                case "EqualTo":
//                    return query.Where(x => x.RequestIdentifier == value);
//                case "GreaterThan":
//                    return query.Where(x => x.RequestIdentifier.CompareTo(value) > 0);
//                case "GreaterThanOrEqualTo":
//                    return query.Where(x => x.RequestIdentifier.CompareTo(value) > 0 || x.RequestIdentifier == value);
//                case "LessThanOrEqualTo":
//                    return query.Where(x => x.RequestIdentifier.CompareTo(value) < 0 || x.RequestIdentifier == value);
//                case "LessThan":
//                    return query.Where(x => x.RequestIdentifier.CompareTo(value) < 0);
//                default:
//                    return query.Where(x => x.RequestIdentifier.Contains(value));
//            }
//        }

//        private IQueryable<Request> CreateStatusFilter(IQueryable<Request> query, string value)
//        {
//            if (!isAdmin)
//            {
//                if (value != "In Progress" && value != "Under Quotation")
//                {
//                    includeSnapshots = false;
//                    return query.Where(x => x.Status.DefaultLabel == value);
//                }
//                else
//                {
//                    return query.Where(x => x.Status.Code == "INPR" || x.Status.Code == "UNDE");// In progress covers status IN progress and under quotation
//                }
//            }
//            else
//            {
//                return query.Where(x => x.Status.DefaultLabel == value);
//            }
//        }

//        private IQueryable<Request> CreateClientFilter(IQueryable<Request> query, string value)
//        {
//            return query.Where(x => x.Client.ClientPortalId.ToString() == value.ToString());
//        }

//        #endregion

//        private EcdtRequestList CreateEcdtRequest(Request request, DateTime creationDate)
//        {
//            var sourceMaterials = request.SourceMaterials;
//            IList<Job> jobs = new List<Job>();
//            if (sourceMaterials != null && sourceMaterials.Any())
//            {
//                jobs = sourceMaterials
//                    .SelectMany(x => x.Jobs)
//                    .ToList();
//            }
//            var status = request.QuotationOnly.HasValue && !request.QuotationOnly.Value && (request.Status.Code == "NEW" || request.Status.Code == "UNDE") ? "In Progress" : request.Status.DefaultLabel;

//            var r = new EcdtRequestList()
//            {
//                ClientReference = request.ClientReference,
//                CreationDate = creationDate,
//                Deadline = jobs.Count > 0 ? (DateTime?)jobs.Select(n => n.Deadline).Max() : null,
//                Department = request.Department.DefaultLabel,
//                DepartmentId = request.Department.ClientPortalId.HasValue ? request.Department.ClientPortalId.Value : 0,
//                // Confidentiality = sourceMaterials.Select(p => p.Confidentiality)?.OrderByDescending(x => x.DisplayOrder).First().DefaultLabel,
//                NumberOfDocuments = sourceMaterials.Any() ? request.SourceMaterials.Count() : 0,
//                OriginalFormats = null,
//                Purpose = request.Purpose.DefaultLabel,
//                RequestIdentifier = request.RequestIdentifier,
//                ServicesAndVolumes = this.GetVolumeByService(sourceMaterials),
//                SourceLanguages = this.GetSourceLanguages(jobs, sourceMaterials),
//                Status = status,
//                TargetLanguages = this.GetTargetLanguages(jobs),
//                Title = request.Title,
//                RequestId = request.Id
//            };

//            // confidentiality workaround(from old to new system, otherwise audit has to be rewritten for every request update)
//            // TODO check if it can be improved
//            if (sourceMaterials.Any())
//            {
//                if (sourceMaterials[0].ConfidentialityId == null)
//                {
//                    // old requests
//                    if (sourceMaterials.Any(p => p.IsConfidential))
//                    {
//                        r.Confidentiality = this._session.Query<Confidentiality>().First(p => p.Code == "SN").DefaultLabel;
//                    }
//                    else
//                    {
//                        r.Confidentiality = this._session.Query<Confidentiality>().First(p => p.Code == "NO").DefaultLabel;
//                    }
//                }
//                else
//                {
//                    // requests with new confidentiality
//                    r.Confidentiality = sourceMaterials.Select(p => p.Confidentiality)?.OrderByDescending(x => x.DisplayOrder).First().DefaultLabel;
//                }
//            }
//            else
//            {
//                // request without source materials
//                r.Confidentiality = this._session.Query<Confidentiality>().First(p => p.Code == "NO").DefaultLabel;
//            }
//            return r;
//        }

//        private EcdtRequestList CreateEcdtRequestAdmin(Request request, DateTime creationDate)
//        {
//            var sourceMaterials = request.SourceMaterials;
//            IList<Job> jobs = new List<Job>();
//            if (sourceMaterials != null && sourceMaterials.Any())
//            {
//                jobs = sourceMaterials
//                    .SelectMany(x => x.Jobs)
//                    .ToList();
//            }

//            var r = new EcdtRequestList()
//            {
//                ClientReference = request.ClientReference,
//                CreationDate = creationDate.ToLocalTime(),
//                Deadline = jobs.Count > 0 ? (DateTime?)jobs.Select(n => n.Deadline).Max().ToLocalTime() : null,
//                Department = request.Department.DefaultLabel,
//                DepartmentId = request.Department.ClientPortalId.HasValue ? request.Department.ClientPortalId.Value : 0,
//                //Confidentiality = sourceMaterials.Select(p => p.Confidentiality).OrderByDescending(x => x.DisplayOrder).First().DefaultLabel,
//                NumberOfDocuments = sourceMaterials.Any() ? request.SourceMaterials.Count() : 0,
//                OriginalFormats = null,
//                Purpose = request.Purpose.DefaultLabel,
//                RequestIdentifier = request.RequestIdentifier,
//                ServicesAndVolumes = this.GetVolumeByService(sourceMaterials),
//                SourceLanguages = this.GetSourceLanguages(jobs, sourceMaterials),
//                Status = request.Status.DefaultLabel,
//                TargetLanguages = this.GetTargetLanguages(jobs),
//                Title = request.Title,
//                RequestId = request.Id,
//                Client = request.Client.Abbreviation
//            };

//            if (sourceMaterials.Any())
//            {

//                // confidentiality workaroudn(from old to new system, otherwise audit has to be rewritten for every request update)
//                if (sourceMaterials[0].ConfidentialityId == null)
//                {
//                    if (sourceMaterials.Any(p => p.IsConfidential))
//                    {
//                        r.Confidentiality = this._session.Query<Confidentiality>().First(p => p.Code == "SN").DefaultLabel;
//                    }
//                    else
//                    {
//                        r.Confidentiality = this._session.Query<Confidentiality>().First(p => p.Code == "NO").DefaultLabel;
//                    }
//                }
//                else
//                {
//                    r.Confidentiality = sourceMaterials.Select(p => p.Confidentiality)?.OrderByDescending(x => x.DisplayOrder).FirstOrDefault().DefaultLabel;
//                }
//            }
//            else
//            {
//                // request without source materials
//                r.Confidentiality = this._session.Query<Confidentiality>().First(p => p.Code == "NO").DefaultLabel;
//            }

//            return r;
//        }

//        private string GetSourceLanguages(IList<Job> jobs, IList<SourceMaterial> sourceMaterials)
//        {
//            return jobs != null ? string.Join(" ", jobs.Where(n => sourceMaterials.Contains(n.SourceMaterial)).OrderBy(x => x.SourceLanguage.Code).Select(n => n.SourceLanguage.Code).Distinct()) : string.Empty;
//        }

//        private string GetTargetLanguages(IList<Job> jobs)
//        {
//            return jobs != null ? string.Join(" ", jobs.OrderBy(x => x.TargetLanguage.Code).Select(x => x.TargetLanguage.Code).Distinct()) : string.Empty;
//        }

//        private string GetVolumeByService(IList<SourceMaterial> materials)
//        {
//            Dictionary<string, decimal> volumes = new Dictionary<string, decimal>();

//            foreach (SourceMaterial mat in materials)
//            {
//                foreach (Job job in mat.Jobs)
//                {
//                    decimal volume = job.Volume;

//                    if (job.Service.Unit.Abbreviation == "PG")
//                    {
//                        volume = convertVolumeToPages(volume);
//                    }

//                    if (job.Service.Code.Equals("TR") && job.ScopingInfo != null && job.ScopingInfo.TotalClientVolumeBilled.HasValue)
//                    {
//                        // In that case take the billed volume
//                        volume = convertVolumeToPages(job.ScopingInfo.TotalClientVolumeBilled.Value);
//                    }

//                    if (!volumes.ContainsKey(job.Service.Abbreviation))
//                    {
//                        volumes.Add(job.Service.Abbreviation, volume);
//                    }
//                    else
//                    {
//                        volumes[job.Service.Abbreviation] += volume;
//                    }
//                }
//            }

//            StringBuilder sb = new StringBuilder();
//            foreach (var item in volumes)
//            {
//                if (sb.Length > 0)
//                {
//                    sb.Append(",");
//                }
//                if (item.Key == "TE" && CPImprovements)
//                {
//                    sb.Append(string.Format("{0} / {1}", item.Key, item.Value.ToString("0.###")));
//                }
//                else
//                {
//                    sb.Append(string.Format("{0} / {1}", item.Key, item.Value.ToString("0.#")));
//                }
//            }

//            return sb.ToString();
//        }

//        private decimal convertVolumeToPages(decimal volume)
//        {
//            var modulo = volume % 750;
//            var quotient = (volume - modulo) / 1500;
//            return modulo > 0 ? quotient + 0.5m : quotient;
//        }
//        #endregion
//    }
//}
