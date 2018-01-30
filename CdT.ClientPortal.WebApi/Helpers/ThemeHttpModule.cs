using System.Web.UI;
using System.Web;
using System;

namespace ClientPortal.Helpers
{
    public class ThemeHttpModule:IHttpModule
    {
        private const string _theme = "Theme";

        public void Dispose()
        {
        }

        public void Init(HttpApplication context)
        {
            context.PreRequestHandlerExecute += new EventHandler(context_PreRequestHandlerExecute);
        }

        void context_PreRequestHandlerExecute(object sender, EventArgs e)
        {
            Page currentPage = HttpContext.Current.CurrentHandler as Page;
            if (currentPage != null)
            {
                currentPage.PreInit += delegate 
                {
                    //check if the user selected a theme
                    //assume there is a property called "Theme" in the user profile
                    string theme = HttpContext.Current.Profile[_theme] == null ? null : (string)HttpContext.Current.Profile[_theme];
                    if (!string.IsNullOrEmpty(theme))
                    {
                        currentPage.Theme = theme;
                    }
                };
            }
        }
        #region IHttpModule Members
        #endregion
    }
}

