// <copyright file="ICSFService.cs" company="Translation Centre for the Bodies of the European Union">
//  Copyright (c) 2015 All Rights Reserved
// </copyright>

namespace ClientPortal.Helpers
{
    using Cdt.ClientPortal.Core;
    using Cdt.ClientPortal.Dto;
    using System;
    using System.Collections.Generic;

    public interface ICSFService
    {
        /// <summary>
        /// Gets the request for the CSF Admin with proper filtering
        /// </summary>
        IList<CsfList> GetRequests(FilterExpressionCollection filters, int startRowIndex, int maximumRow, out int rowCount);

        /// <summary>
        /// Assigns a task to a CSF Editor
        /// </summary>
        /// <param name="csfID"></param>
        /// <param name="sendTo"></param>
        void AssignTo(Guid csfID, string sendTo);

        /// <summary>
        /// Updates the status of a CSF Entity
        /// </summary>
        /// <param name="csfId"></param>
        /// <param name="status"></param>
        void UpdateStatus(Guid csfId, string status);
    }
}