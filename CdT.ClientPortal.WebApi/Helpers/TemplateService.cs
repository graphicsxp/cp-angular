//// <copyright file="RequestsService.cs" company="Translation Centre for the Bodies of the European Union">
////  Copyright (c) 2015 All Rights Reserved
//// </copyright>

//namespace ClientPortal.Helpers
//{
//    using Cdt.ClientPortal.Core;
//    using Cdt.ClientPortal.Dto;
//    using CdT.EAI.Model.Business;
//    using NHibernate;
//    using NHibernate.Linq;
//    using System;
//    using System.Linq;
//    using System.Security.Principal;
//    using System.Collections.Generic;
//    internal class TemplateService : ITemplateService
//    {
//        #region PRIVATE VARS
//        private readonly ISession _session;
//        private readonly IPrincipal _user;
//        private UserProfile userProfile;
//        private IQueryable<RequestTemplate> query;
//        private IQueryable<Contact> contact;
//        #endregion

//        #region CTOR
//        public TemplateService(ISession session, IPrincipal user)
//        {
//            _session = session;
//            _user = user;

//            userProfile = UserProfile.GetProfile(_user.Identity.Name);
//            query = _session.Query<RequestTemplate>().Where(r => r.Client.ClientPortalId == userProfile.Personal.OrganisationId);
//            contact = _session.Query<Contact>().Where(x => x.UserName == _user.Identity.Name);
//        }
//        #endregion

//        #region PUBLIC METHODS
//        public IList<eCdtTemplateRequestList> GetTemplateList()
//        {
//            var lst = new List<eCdtTemplateRequestList>();
//            foreach (var _requestTemplate in query)
//            {
//                lst.Add(CreateEcdtTemplateRequest(_requestTemplate, _requestTemplate.CreationDate));
//            }
//            return lst;
//        }

//        public void DeleteTemplate(Guid templateId)
//        {
//            using (var transaction = _session.BeginTransaction())
//            {
//                var template = query.SingleOrDefault(x => x.Id == templateId);
//                _session.Delete(template);
//                transaction.Commit();
//            }
//        }
//        #endregion

//        #region PRIVATE FUNCTIONS
//        private eCdtTemplateRequestList CreateEcdtTemplateRequest(RequestTemplate requestTemplate, DateTime creationDate)
//        {
//            return new eCdtTemplateRequestList()
//            {
//                Id = requestTemplate.Id,
//                TemplateDescription = requestTemplate.TemplateName,
//                TemplateName = requestTemplate.TemplateName,
//                CreatedBy = requestTemplate.CreatedBy,
//                CreationDate = requestTemplate.CreationDate,
//                UpdateDate = requestTemplate.UpdateDate,
//                UpdatedBy = requestTemplate.UpdatedBy,
//                Description = requestTemplate.Description
//            };
//        }
//        #endregion
//    }
//}
