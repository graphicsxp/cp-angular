using ClientPortal.Helpers.Constants;
using System.Globalization;
using System.Web;
using System;

namespace ClientPortal.Helpers
{
    public class LocalizationHttpModule:IHttpModule
    {
        #region IHttpModule Members
        public void Dispose()
        {
        }

        public void Init(HttpApplication context)
        {
            context.PreRequestHandlerExecute += new EventHandler(context_PreRequestHandlerExecute);
        }

        void context_PreRequestHandlerExecute(object sender, EventArgs e)
        {
            //set language for the user
            HttpCookie languageCookie = HttpContext.Current.Request.Cookies[Cookies.LanguageCookie];
            if (languageCookie != null)
            {
                string userLanguage = "en-gb";
                if (!string.IsNullOrEmpty(userLanguage))
                {
                    //set culture to french lux for date format,etc
                    System.Threading.Thread.CurrentThread.CurrentCulture = CultureInfo.GetCultureInfo("fr-lu");
                    //set culture to the user selected culture for text
                    System.Threading.Thread.CurrentThread.CurrentUICulture = CultureInfo.GetCultureInfo(userLanguage);
                }
            }
        }
        #endregion
    }
}

