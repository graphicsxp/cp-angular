using Cdt.ClientPortal.Core.Helpers;
using System.Collections.Generic;
using System.Linq;

namespace ClientPortal.Helpers.Roles
{
    /// <summary>
    /// 
    /// </summary>
    public static class RolesHelper
    {

        /// <summary>
        /// Gets the external roles.
        /// </summary>
        /// <returns></returns>
        public static string[] GetExternalRoles()
        {
            IList<string> roles = new List<string>();
            foreach (string s in System.Web.Security.Roles.GetAllRoles())
            {
                if (s != ClientPortalRoles.PortalManager)
                    roles.Add(s);
            }
            return roles.ToArray();
        }

        /// <summary>
        /// Gets the external roles.
        /// </summary>
        /// <param name="user">The user.</param>
        /// <returns></returns>
        public static string[] GetExternalRoles(string user)
        {
            IList<string> roles = new List<string>();
            foreach (string s in System.Web.Security.Roles.GetRolesForUser(user))
            {
                if (s != ClientPortalRoles.PortalManager)
                    roles.Add(s);
            }
            return roles.ToArray();
        }

        //TODO find something better
        public static IList<string> GetElementsToHide(string page, string user)
        {
            IList<string> elements = new List<string>();
            string[] userRoles = System.Web.Security.Roles.GetRolesForUser(user);

            switch (page.ToLower())
            {
                case "usersettings":
                    {
                        if (!userRoles.Contains(ClientPortalRoles.Forecast))
                        {
                            elements.Add("uxForecastSettingsPage");
                            elements.Add("i1"); // hide forecast tab
                        }

                        if (!userRoles.Contains(ClientPortalRoles.SuperUser))
                        {
                            elements.Add("uxDefaultPasswordPanel");
                        }

                        if (!userRoles.Contains(ClientPortalRoles.CSFManager))
                        {
                            elements.Add("uxCsfSettingsPage");
                            elements.Add("i2"); // = hide csf tab
                        }
                        if (!userRoles.Contains(ClientPortalRoles.Draft) && !userRoles.Contains(ClientPortalRoles.DraftAll)
                            && !userRoles.Contains(ClientPortalRoles.Sender) && !userRoles.Contains(ClientPortalRoles.SenderAll))
                        {
                            elements.Add("uxYearPanel");
                        }
                        break;
                    }

                default:
                    break;
            }

            return elements;
        }
    }
}
