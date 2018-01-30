using ClientPortal.Helpers.Enum;
using System.Collections.Generic;
using System.IO;
using System.Web.UI;
using System.Web;
using System;
using Telerik.Web.UI;

namespace ClientPortal.Helpers
{
    /// <summary>
    /// 
    /// </summary>
    public static class PageExtensions
    {
        /// <summary>
        /// Gets the themed path of a resource.
        /// </summary>
        /// <param name="page">The page.</param>
        /// <param name="path">The path.</param>
        /// <returns></returns>
        public static string GetThemedPath(this UserControl userControl, string path)
        {
            return userControl.ResolveClientUrl(string.Format("~/app_themes/{0}/{1}", userControl.Page.Theme, path));
        }

        /// <summary>
        /// Gets the themed path of a resource.
        /// </summary>
        /// <param name="page">The page.</param>
        /// <param name="path">The path.</param>
        /// <returns></returns>
        public static string GetThemedPath(this Page page, string path)
        {
            return page.ResolveClientUrl(string.Format("~/app_themes/{0}/{1}", page.Theme, path));
        }

        /// <summary>
        /// Gets the themed path of a resource.
        /// </summary>
        /// <param name="page">The page.</param>
        /// <param name="path">The path.</param>
        /// <returns></returns>
        public static string GetUnresolvedThemedPath(this Page page, string path)
        {
            return string.Format("~/app_themes/{0}/{1}", page.Theme, path);
        }

        /// <summary>
        /// Iteratives the find control.
        /// </summary>
        /// <param name="controleSource">The controle source.</param>
        /// <param name="idATrouver">The id A trouver.</param>
        /// <returns></returns>
        public static Control IterativeFindControl(Control controleSource, string idATrouver)
        {
            Control control = controleSource;
            Queue<Control> queue = new Queue<Control>();
            while (control != null)
            {
                if (string.Compare(control.ID, idATrouver, StringComparison.InvariantCultureIgnoreCase) == 0)
                    return control;
                foreach (Control ctrl in control.Controls)
                {
                    if (string.Compare(ctrl.ID, idATrouver, StringComparison.InvariantCultureIgnoreCase) == 0)
                        return ctrl;
                    if (ctrl.HasControls())
                        queue.Enqueue(ctrl);
                }
                if (queue.Count > 0)
                {
                    control = queue.Dequeue();
                }
                else
                {
                    control = null;
                }
            }
            return null;
        }

        /// <summary>
        /// Recursives the find control.
        /// </summary>
        /// <param name="controleSource">The controle source.</param>
        /// <param name="idATrouver">The id A trouver.</param>
        /// <returns></returns>
        public static Control RecursiveFindControl(Control controleSource, string idATrouver)
        {
            Control control = controleSource.FindControl(idATrouver);
            if (control != null)
                return control;
            for (int i = 0; i < controleSource.Controls.Count; i++)
            {
                control = controleSource.Controls[i].FindControl(idATrouver);
                if (control == null)
                {
                    control = RecursiveFindControl(controleSource.Controls[i], idATrouver);
                    if (control != null && string.Compare(control.ID, idATrouver, StringComparison.InvariantCultureIgnoreCase) == 0)
                        return control;
                }
                else
                    return control;
            }
            return control;
        }

        /// <summary>
        /// Sends the data to client.
        /// </summary>
        /// <param name="page">The page.</param>
        /// <param name="fileName">Name of the file.</param>
        /// <param name="length">The length.</param>
        /// <param name="input">The input.</param>
        public static void SendDataToClient(this Page page, string fileName, long? length, Stream input)
        {
            int BufferSize = 16384;
            page.Response.ClearHeaders();
            page.Response.ClearContent();
            page.Response.ContentType = "application/octet-stream";
            page.Response.Buffer = false;
            page.Response.Cache.SetNoStore();
            page.Response.Cache.SetCacheability(HttpCacheability.Private); //changed for ie6

            page.Response.Cache.SetExpires(DateTime.MinValue);
            page.Response.AddHeader("content-disposition", "attachment; filename=\"" + fileName + "\"");
            Stream stream = page.Response.Filter; //to fix bug ASP.NET  3.5  error: "Response filter is not valid!" produced only with IE browsers
            page.Response.Filter = null;
            try
            {
                byte[] buffer = new Byte[BufferSize];
                int chunkLength;
                while ((chunkLength = input.Read(buffer, 0, BufferSize)) > 0)
                {
                    if (!page.Response.IsClientConnected)
                    {
                        break;
                    }
                    page.Response.OutputStream.Write(buffer, 0, chunkLength);
                }
            }
            finally
            {
                if (input != null)
                {
                    //input.Close();
                    input.Dispose();
                }
                page.Response.End();
            }
        }

        /// <summary>
        /// Shows the errors.
        /// </summary>
        /// <param name="page">The page.</param>
        /// <param name="text">The text.</param>
        public static void ShowError(this Page page, string text)
        {
            ShowNotification(page, NotificationType.Error, text, false);
        }

        /// <summary>
        /// Shows the information.
        /// </summary>
        /// <param name="page">The page.</param>
        /// <param name="text">The text.</param>
        public static void ShowInformation(this Page page, string text)
        {
            ShowNotification(page, NotificationType.Information, text, true);
        }

        /// <summary>
        /// Shows the errors.
        /// </summary>
        /// <param name="page">The page.</param>
        /// <param name="text">The text.</param>
        public static void ShowNotification(this Page page, NotificationType notificationType, string text, bool autoClose)
        {
            string className = null;
            switch (notificationType)
            {
                case NotificationType.Error:
                    className = "fail";
                    break;
                case NotificationType.Information:
                    className = "notification";
                    break;
                case NotificationType.Success:
                    className = "success";
                    break;
            }

            string notification = "jQuery('body').showMessage({'thisMessage':['" + text.Replace(Environment.NewLine, "','") + "'],'className':'" + className + "','autoClose':" + autoClose.ToString().ToLower() + ",'delayTime':4000,'displayNavigation':" + (!autoClose).ToString().ToLower() + ",'useEsc':" + (!autoClose).ToString().ToLower() + ",'closeText':'" + Tools.GetGlobalResource("UI", "closeText") + "','escText':'" + Tools.GetGlobalResource("UI", "escText") + "'});";

            if (RadAjaxManager.GetCurrent(page) != null)
            {
                RadAjaxManager.GetCurrent(page).ResponseScripts.Add(notification);
            }
            else
            {
                if (ScriptManager.GetCurrent(page) != null)
                {
                    ScriptManager.RegisterStartupScript(page, page.GetType(),
                                                        "notification",
                                                        notification,
                                                        true);
                }
                else
                {
                    page.ClientScript.RegisterStartupScript(page.GetType(),
                                                            "notification",
                                                            notification,
                                                            true);
                }
            }
        }

        /// <summary>
        /// Shows the notifications.
        /// </summary>
        /// <param name="page">The page.</param>
        /// <param name="text">The text.</param>
        public static void ShowSuccess(this Page page, string text)
        {
            ShowNotification(page, NotificationType.Success, text, true);
        }
    }
}

