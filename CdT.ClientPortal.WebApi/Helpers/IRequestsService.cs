//// <copyright file="IRequestsService.cs" company="Translation Centre for the Bodies of the European Union">
////  Copyright (c) 2015 All Rights Reserved
//// </copyright>

//using Cdt.ClientPortal.Core;
//using Cdt.ClientPortal.Dto;
//using Cdt.ClientPortal.Services.Message;
//using System;
//using System.Collections.Generic;

//namespace ClientPortal.Helpers
//{
//    /// <summary>
//    /// Client Side Request Service 
//    /// </summary>
//    public interface IRequestsService
//    {
//        /// <summary>
//        /// Gets the requests with the respective snapshoot or normal state 
//        /// </summary>
//        IList<EcdtRequestList> GetRequestsList(FilterExpressionCollection filters, int startRowIndex, int maximumRow, out int rowCount);

//        IList<EcdtRequestList> GetRequestsListAdmin(FilterExpressionCollection filters, int startRowIndex, int maximumRow, out int rowCount);

//        /// <summary>
//        /// Gets last N requests
//        /// </summary>
//        /// <param name="NumberOfRows">Numbers of requests</param>
//        IList<EcdtRequestList> GetLastNRequests(int NumberOfRows);

//        /// <summary>
//        /// Gets the last N deliveries
//        /// </summary>
//        /// <param name="NumberOfRows">Numbers of deliveries</param>
//        IList<EcdtRequestList> GetLastNDeliveries(int NumberOfRows);

//        /// <summary>
//        /// Gets a range of requests from a range date
//        /// </summary>
//        /// <param name="from">From date</param>
//        /// <param name="to">To Date</param>
//        /// <param name="timeOffset">OffSet in minutes</param>
//        AssignmentDetailsListResponse GetRequestRange(DateTime from, DateTime to);
//    }
//}