//using Cdt.ClientPortal.Core.Helpers;
//using Cdt.Common.BE;
//using ClientPortal.Helpers.Constants;
//using System;
//using System.Collections.Generic;
//using System.Collections.Specialized;
//using System.Globalization;
//using System.Linq;
//using System.ServiceModel;
//using System.Web;
//using Cdt.ClientPortal.Services;


//namespace ClientPortal.Helpers
//{
//    /// <summary>
//    /// Tools
//    /// </summary>
//    public static class Tools
//    {

//        /// <summary>
//        /// Gets the global resource.
//        /// </summary>
//        /// <param name="resourceNamespace">The resource namespace.</param>
//        /// <param name="resourceName">Name of the resource.</param>
//        /// <returns></returns>
//        public static string GetGlobalResource(string resourceNamespace, string resourceName)
//        {
//            return (string)HttpContext.GetGlobalResourceObject(resourceNamespace, resourceName, CultureInfo.CurrentUICulture) ?? UI.NoTranslation;
//        }

//        /// <summary>
//        /// Gets the document format (DB form) from extension.
//        /// </summary>
//        /// <param name="fileExtension">The file extension.</param>
//        /// <returns></returns>
//        public static string GetDocumentFormatFromExtension(string fileExtension)
//        {
//            string documentFormat = null;
//            Tools.UseWcfService<IClientPortalCommonService>(WcfEndPoint.Common, null, null, p =>
//            {
//                documentFormat=p.GetDocumentFormatFromExtension(fileExtension);
//            });
//            return documentFormat;
//        }

//        /// <summary>
//        /// Gets the extension image URL.
//        /// </summary>
//        /// <param name="docExtension">The doc extension.</param>
//        /// <returns></returns>
//        public static string GetExtensionImageUrl(string docExtension)
//        {
//            string documentFormat = GetDocumentFormatFromExtension(docExtension);
//            if (String.IsNullOrEmpty(docExtension)||documentFormat==null)
//                return "icon_UN.png";
//            return string.Format("Images/Extensions/20/icon_{0}.png", documentFormat); //TODO set in config file
//        }

//        /// <summary>
//        /// Uses the WCF service.
//        /// currently, username and password are not used
//        /// proxy is cached using a ClientBase<t> implemenation />
//        /// </summary>
//        /// <typeparam name="T"></typeparam>
//        /// <param name="endPoint">The end point.</param>
//        /// <param name="userName">Name of the user.</param>
//        /// <param name="password">The password.</param>
//        /// <param name="action">The action.</param>
//        public static void UseWcfService<T>(string endPoint, string userName, string password, Action<T> action) where T : class
//        {
//            GenericProxy<T> proxy = new GenericProxy<T>(endPoint);
//            //ChannelFactory<T> client = new ChannelFactory<T>(endPoint);
//            bool success = false;
//            try
//            {
                
//                //set credentials
//                //in this case, we assume that the user has already been authenticated.
//                //client.Credentials.UserName.UserName = userName;
//                //client.Credentials.UserName.Password = password;
                
//                proxy.Open();
//                //proxy.InnerChannel.
//                //T channel = proxy.ChannelFactory.CreateChannel();
                
//                action(proxy.Proxy);
//                proxy.Close();
//                success = true;
//            }
//            finally
//            {
//                if (!success)
//                {
//                    proxy.Abort();
//                }
//            }
//        }

//        /// <summary>
//        /// Determines whether [is only draft] [the specified user name].
//        /// </summary>
//        /// <param name="userName">Name of the user.</param>
//        /// <returns>
//        /// 	<c>true</c> if [is only draft] [the specified user name]; otherwise, <c>false</c>.
//        /// </returns>
//        public static bool IsOnlyDraft(string userName)
//        {
//            string[] userRoles = System.Web.Security.Roles.GetRolesForUser(userName);
//            return (userRoles.Length == 1 && string.Compare(userRoles[0], ClientPortalRoles.Draft, true) == 0);
//        }

//        /// <summary>
//        /// Gets the CDT open hours.
//        /// </summary>
//        /// <returns></returns>
//        public static IList<DateTime> GetCdtOpenHours()
//        {
//            //change open hour
//            List<DateTime> openHour = new List<DateTime>();
//            for (int i = 8; i <= 16; i++)
//            {
//                if (i <= 12 || i >= 14)
//                {
//                    DateTime d = DateTime.Today.AddHours(i);
//                    openHour.Add(d);
//                    openHour.Add(d.AddMinutes(30));
//                }
//            }
//            return openHour;
//        }

//        /// <summary>
//        /// Gets the facade value.
//        /// </summary>
//        /// <param name="lf">The lf.</param>
//        /// <param name="itemText">The item text.</param>
//        /// <returns></returns>
//        public static string getFacadeItemValue(LookupFacade lf, string itemText)
//        {
//            string result = null;
//            var item = lf.Data.FirstOrDefault(p => p.Text.Trim() == itemText.Trim());
//            if (item == null)
//            {
//                result = string.Empty;
//            }
//            else
//            {
//                result = item.Value;
//            }
//            return result;
//        }

//        /// <summary>
//        /// Gets the facade text.
//        /// </summary>
//        /// <param name="lf">The lf.</param>
//        /// <param name="itemValue">The item value.</param>
//        /// <returns></returns>
//        public static string getFacadeItemText(LookupFacade lf, string itemValue)
//        {
//            string result = null;
//            var item = lf.Data.FirstOrDefault(p => p.Value == itemValue);
//            if (item == null)
//            {
//                result = string.Empty;
//            }
//            else
//            {
//                result = item.Text;
//            }
//            return result;
//        }

//        /// <summary>
//        /// Rounds up a sate with a defined time span
//        /// </summary>
//        /// <param name="dt">Date</param>
//        /// <param name="d">TimeSpan</param>
//        public static DateTime RoundUp(this DateTime dt, TimeSpan d)
//        {
//            var delta = d.Ticks - (dt.Ticks % d.Ticks);
//            return new DateTime(dt.Ticks + delta, dt.Kind);
//        }

//        /// <summary>
//        /// Rounds down a sate with a defined time span
//        /// </summary>
//        /// <param name="dt">Date</param>
//        /// <param name="d">TimeSpan</param>
//        public static DateTime RoundDown(this DateTime dt, TimeSpan d)
//        {
//            var delta = dt.Ticks % d.Ticks;
//            return new DateTime(dt.Ticks - delta, dt.Kind);
//        }
//    }
//}
