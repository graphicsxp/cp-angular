// <copyright file="RequestExtensions.cs" company="Translation Centre for the Bodies of the European Union">
//  Copyright (c) 2013 All Rights Reserved
// </copyright>
  
using System;
using System.Linq;
using System.Web;

namespace ClientPortal.Helpers
{
    /// <summary>
    /// 
    /// </summary>
    public static class RequestExtensions
    {
        /// <summary>
        /// Determines whether it's a ansychronous request.
        /// </summary>
        /// <param name="request">The request.</param>
        /// <returns>
        /// 	<c>true</c> if's an async postback; otherwise, <c>false</c>.
        /// </returns>
        public static bool IsAsyncPostBackRequest(this HttpRequest request)
        {
            string[] values = request.Headers.GetValues("X-MicrosoftAjax");
            if (values == null || values.Length == 0)
            {
                return false;
            }

            foreach (string v in values)
            {
                return string.Compare(v, "Delta=true", StringComparison.OrdinalIgnoreCase) == 0;
            }

            string item = request.Form["__ASYNCPOST"];
            if (!string.IsNullOrEmpty(item))
            {
                return string.Compare(item.Trim(), "true", StringComparison.OrdinalIgnoreCase) == 0;
            }
            return false;
        }
    }
}