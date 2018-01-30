// <copyright file="IRequestsService.cs" company="Translation Centre for the Bodies of the European Union">
//  Copyright (c) 2015 All Rights Reserved
// </copyright>

using CdT.EAI.Model.Business;
using System;
using System.Linq;
using System.Collections.Generic;
using Cdt.ClientPortal.Dto;

namespace ClientPortal.Helpers
{
    /// <summary>
    /// Client Side Template Service 
    /// </summary>
    public interface ITemplateService
    {
        /// <summary>
        /// Gets all the templates
        /// </summary>
        /// <returns></returns>
        IList<eCdtTemplateRequestList> GetTemplateList();

        /// <summary>
        /// Deletes a template
        /// </summary>
        /// <param name="templateId">Id of the Template</param>
        void DeleteTemplate(Guid templateId);
    }
}