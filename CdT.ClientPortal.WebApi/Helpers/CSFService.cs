//// <copyright file="CSFService.cs" company="Translation Centre for the Bodies of the European Union">
////  Copyright (c) 2015 All Rights Reserved
//// </copyright>

//namespace ClientPortal.Helpers
//{
//    using Cdt.ClientPortal.Core;
//    using Cdt.ClientPortal.Dto;
//    using CdT.EAI.Commands.Mailing;
//    using CdT.EAI.Model.Business;
//    using NHibernate;
//    using NHibernate.Linq;
//    using NServiceBus;
//    using RazorEngine;
//    using RazorEngine.Templating;
//    using System;
//    using System.Collections.Generic;
//    using System.Configuration;
//    using System.Linq;
//    using System.Security.Principal;

//    internal class CSFService : ICSFService
//    {
//        #region PRIVATE VARS
//        private readonly ISession _session;
//        private IQueryable<CustomerSatisfactionForm> _query;
//        private readonly IMessageSession _messageSession;
//        #endregion

//        #region CTOR
//        public CSFService(ISession session, IPrincipal user, IMessageSession messageSession)
//        {
//            _messageSession = messageSession;
//            _session = session;
//            var userProfile = UserProfile.GetProfile(user.Identity.Name);

//            var roles = System.Web.Security.Roles.GetRolesForUser(user.Identity.Name).ToList();

//            var contact = _session.Query<Contact>().Where(x => x.UserName == user.Identity.Name);

//            _query = _session.Query<CustomerSatisfactionForm>()
//                /*.Select(p =>new
//                {
//                    eCdtRequestId = p.Job.SourceMaterial.Request.RequestIdentifier,
//                    SourceLanguage = p.Job.SourceLanguage.Code,
//                    TargetLanguage = p.Job.TargetLanguage.Code,
//                    Status = p.Status.ToString(),
//                    Title = p.Job.SourceMaterial.Material.As<PhysicalFile>().FileName,
//                    eCdtCSFtId = p.Id.ToString(),
//                    SentTo = p.AssignedToUsername,
//                    ExpirationDate=p.ExpirationDate,
//                    ClientPortalId=p.Client.ClientPortalId
//                })*/
//                .Fetch(p => p.Job).ThenFetch(p => p.SourceLanguage)
//                .Fetch(p => p.Job).ThenFetch(p => p.TargetLanguage)
//                .Fetch(p => p.Job).ThenFetch(p => p.SourceMaterial).ThenFetch(p => p.Request)
//                .Fetch(p => p.Job).ThenFetch(p => p.SourceMaterial).ThenFetch(p => p.Material)
//                .Fetch(p => p.Job).ThenFetch(p => p.SourceMaterial)
//                .Where(x => x.ExpirationDate > DateTime.UtcNow && x.Client.ClientPortalId == userProfile.Personal.OrganisationId)
//                .OrderByDescending(p => p.Job.SourceMaterial.Request.RequestIdentifier).ThenBy(p => ((PhysicalFile)p.Job.SourceMaterial.Material).FileName);

//            if (roles.Contains("csfeditor"))
//            {
//                _query = _query.Where(x => x.AssignedToUsername == userProfile.UserName);
//            }
//        }
//        #endregion

//        #region PUBLIC METHODS
//        public IList<CsfList> GetRequests(FilterExpressionCollection filters, int startRowIndex, int maximumRow, out int rowCount)
//        {
//            var resultList = GetAndFilterCSFList(filters, startRowIndex, maximumRow, out rowCount);

//            return resultList;
//        }

//        public void AssignTo(Guid csfID, string sendTo)
//        {
//            var csf = _session.Query<CustomerSatisfactionForm>().SingleOrDefault(x => x.Id == csfID);
//            csf.Status = CustomerSatisfactionForm.CSFStatus.Assigned;
//            csf.AssignedToUsername = sendTo;
//            _session.Save(csf);
//            _session.Flush();



//            var contact = _session.Query<Contact>().SingleOrDefault(x => x.UserName == sendTo);
//            if (contact != null)
//            {
//                var model = new
//                {
//                    Client = csf.Job.SourceMaterial.Request.Client.Abbreviation,
//                    Identifier = csf.Job.SourceMaterial.Request.RequestIdentifier,
//                    Source = csf.Job.SourceLanguage.Code,
//                    Target = csf.Job.TargetLanguage.Code,
//                    Filename = csf.Job.SourceMaterial.Material.As<PhysicalFile>().FileName,
//                    Website = ConfigurationManager.AppSettings["ClientPortalAddress"],

//                };

//                var template = _session.Query<EmailTemplate>().Where(x => x.Code == "CSFTO").SingleOrDefault();
//                var mail = new SendEmail
//                {
//                    Subject = Engine.Razor.RunCompile(template.EmailSubject, "emailCSFSubject", null, model, null),
//                    Body = Engine.Razor.RunCompile(template.EmailBody, "emailCSFBody", null, model, null),
//                    Priority = (EmailPriorityEnum)template.Priority
//                };

//                mail.To.Add(contact.Email);
//                _messageSession.Send(mail);
//            }
//        }

//        public void UpdateStatus(Guid csfId, string status)
//        {
//            var csf = _session.Query<CustomerSatisfactionForm>().SingleOrDefault(x => x.Id == csfId);
//            csf.Status = (CustomerSatisfactionForm.CSFStatus)System.Enum.Parse(typeof(CustomerSatisfactionForm.CSFStatus), status);
//            _session.Save(csf);
//            _session.Flush();
//        }
//        #endregion

//        #region PRIVATE FUNCTIONS

//        private IList<CsfList> GetAndFilterCSFList(FilterExpressionCollection filters, int startRowIndex, int maximumRow, out int rowCount)
//        {
//            IList<CsfList> csfs = new List<CsfList>();
//            _query = ApplyFilters(_query, filters);
//            //var newQuery = query.GroupBy(p => new { p.Job.SourceMaterial.Request.RequestIdentifier, ((PhysicalFile)p.Job.SourceMaterial.Material).FileName }, p => p);
//            rowCount = _query.Count();

//            // If selected tab is greater than the total amount of returned records, we must set the startRowIndex to 0
//            if (rowCount < startRowIndex * maximumRow + 1)
//            {
//                startRowIndex = 0;
//            }

//            var queryFinal = _query.OrderBy(x => x.Job.TargetLanguage.Code).Skip(startRowIndex * maximumRow).Take(maximumRow).ToList();

//            foreach (var item in queryFinal)
//            {
//                /*foreach (var group in queryFinal)
//                {
//                    foreach (var item in group)
//                    {*/
//                CsfList csf = new CsfList
//                {
//                    eCdtRequestId = item.Job.SourceMaterial.Request.RequestIdentifier,
//                    SourceLanguage = item.Job.SourceLanguage.Code,
//                    TargetLanguage = item.Job.TargetLanguage.Code,
//                    Status = item.Status.ToString(),
//                    Title = item.Job.SourceMaterial.Material.As<PhysicalFile>().FileName,
//                    eCdtCSFtId = item.Id.ToString(),
//                    SentTo = item.AssignedToUsername,
//                };
//                csfs.Add(csf);
//                //}
//            }

//            return csfs;
//        }
//        private IQueryable<CustomerSatisfactionForm> ApplyFilters(IQueryable<CustomerSatisfactionForm> query, FilterExpressionCollection filters)
//        {
//            foreach (var filter in filters)
//            {
//                switch (filter.FieldName)
//                {
//                    case "eCdtRequestId":
//                        query = eCdtRequestIdFilter(query, filter.Value, filter.Operator.ToString());
//                        break;
//                    case "SentTo":
//                        query = sendToFilter(query, filter.Value, filter.Operator.ToString());
//                        break;
//                    case "ecdtCSFStatus":
//                        query = StatusFilter(query, filter.Value, filter.Operator.ToString());
//                        break;
//                    case "Title":
//                        query = eCdtSourceMaterialFilter(query, filter.Value, filter.Operator.ToString());
//                        break;
//                }
//            }
//            return query;
//        }

//        #region Request Filter
//        private IQueryable<CustomerSatisfactionForm> StatusFilter(IQueryable<CustomerSatisfactionForm> query, string value, string comparison)
//        {
//            var realEnum = (CustomerSatisfactionForm.CSFStatus)System.Enum.Parse(typeof(CustomerSatisfactionForm.CSFStatus), value);

//            return query.Where(x => x.Status == realEnum);
//        }

//        private IQueryable<CustomerSatisfactionForm> sendToFilter(IQueryable<CustomerSatisfactionForm> query, string value, string comparison)
//        {
//            switch (comparison)
//            {
//                case "Contains":
//                    return query.Where(x => x.AssignedToUsername.Contains(value));
//                case "StartsWith":
//                    return query.Where(x => x.AssignedToUsername.StartsWith(value));
//                case "EndsWith":
//                    return query.Where(x => x.AssignedToUsername.EndsWith(value));
//                case "EqualTo":
//                    return query.Where(x => x.AssignedToUsername == value);
//                case "GreaterThan":
//                    return query.Where(x => x.AssignedToUsername.CompareTo(value) > 0);
//                case "GreaterThanOrEqualTo":
//                    return query.Where(x => x.AssignedToUsername.CompareTo(value) > 0 || x.AssignedToUsername == value);
//                case "LessThanOrEqualTo":
//                    return query.Where(x => x.AssignedToUsername.CompareTo(value) < 0 || x.AssignedToUsername == value);
//                case "LessThan":
//                    return query.Where(x => x.AssignedToUsername.CompareTo(value) < 0);
//                default:
//                    return query.Where(x => x.AssignedToUsername.Contains(value));
//            }
//        }

//        private IQueryable<CustomerSatisfactionForm> eCdtRequestIdFilter(IQueryable<CustomerSatisfactionForm> query, string value, string comparison)
//        {
//            switch (comparison)
//            {
//                case "Contains":
//                    return query.Where(x => x.Job.SourceMaterial.Request.RequestIdentifier.Contains(value));
//                case "StartsWith":
//                    return query.Where(x => x.Job.SourceMaterial.Request.RequestIdentifier.StartsWith(value));
//                case "EndsWith":
//                    return query.Where(x => x.Job.SourceMaterial.Request.RequestIdentifier.EndsWith(value));
//                case "EqualTo":
//                    return query.Where(x => x.Job.SourceMaterial.Request.RequestIdentifier == value);
//                case "GreaterThan":
//                    return query.Where(x => x.Job.SourceMaterial.Request.RequestIdentifier.CompareTo(value) > 0);
//                case "GreaterThanOrEqualTo":
//                    return query.Where(x => x.Job.SourceMaterial.Request.RequestIdentifier.CompareTo(value) > 0 || x.Job.SourceMaterial.Request.RequestIdentifier == value);
//                case "LessThanOrEqualTo":
//                    return query.Where(x => x.Job.SourceMaterial.Request.RequestIdentifier.CompareTo(value) < 0 || x.Job.SourceMaterial.Request.RequestIdentifier == value);
//                case "LessThan":
//                    return query.Where(x => x.Job.SourceMaterial.Request.RequestIdentifier.CompareTo(value) < 0);
//                default:
//                    return query.Where(x => x.Job.SourceMaterial.Request.RequestIdentifier.Contains(value));
//            }
//        }

//        private IQueryable<CustomerSatisfactionForm> eCdtSourceMaterialFilter(IQueryable<CustomerSatisfactionForm> query, string value, string comparison)
//        {
//            switch (comparison)
//            {
//                case "Contains":
//                    return query.Where(x => ((PhysicalFile)x.Job.SourceMaterial.Material).FileName.Contains(value));
//                case "StartsWith":
//                    return query.Where(x => ((PhysicalFile)x.Job.SourceMaterial.Material).FileName.StartsWith(value));
//                case "EndsWith":
//                    return query.Where(x => ((PhysicalFile)x.Job.SourceMaterial.Material).FileName.EndsWith(value));
//                case "EqualTo":
//                    return query.Where(x => ((PhysicalFile)x.Job.SourceMaterial.Material).FileName == value);
//                case "GreaterThan":
//                    return query.Where(x => ((PhysicalFile)x.Job.SourceMaterial.Material).FileName.CompareTo(value) > 0);
//                case "GreaterThanOrEqualTo":
//                    return query.Where(x => ((PhysicalFile)x.Job.SourceMaterial.Material).FileName.CompareTo(value) > 0 || ((PhysicalFile)x.Job.SourceMaterial.Material).FileName == value);
//                case "LessThanOrEqualTo":
//                    return query.Where(x => ((PhysicalFile)x.Job.SourceMaterial.Material).FileName.CompareTo(value) < 0 || ((PhysicalFile)x.Job.SourceMaterial.Material).FileName == value);
//                case "LessThan":
//                    return query.Where(x => ((PhysicalFile)x.Job.SourceMaterial.Material).FileName.CompareTo(value) < 0);
//                default:
//                    return query.Where(x => ((PhysicalFile)x.Job.SourceMaterial.Material).FileName.Contains(value));
//            }
//        }
//        #endregion

//        #endregion
//    }
//}
