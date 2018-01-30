using Cdt.ClientPortal.Core;
using Cdt.Common.Utils;
using ClientPortal.Helpers.Configuration;
using Microsoft.Practices.Unity;
using System;
using System.Globalization;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.HtmlControls;
using System.Xml.Linq;

namespace ClientPortal
{
    /// <summary>
    /// Custom class deriving from Page. Used to change culture when the dropdown is used on the master page.
    /// </summary>
    public class BasePageTest<T> : Page where T :class
    {

        public BasePageTest()
        {
            InjectDependencies();
        }

        protected virtual void InjectDependencies()
        {
            HttpContext context = HttpContext.Current;

            if (context == null)
                return;

            IContainerAccessor accessor = context.ApplicationInstance as IContainerAccessor;

            if (accessor == null)
                return;

            IUnityContainer container = accessor.Container;

            if (container == null)
                throw new InvalidOperationException("Container on Global Application Class is Null. Cannot perform BuildUp.");

            container.BuildUp(this as T);
        }

        /// <summary>
        /// Gets the profile.
        /// </summary>
        /// <value>The profile.</value>
        public UserProfile Profile
        {
            get
            {
                return (UserProfile)Context.Profile;
            }
        }

        /// <summary>
        /// Sets the <see cref="P:System.Web.UI.Page.Culture"/> and <see cref="P:System.Web.UI.Page.UICulture"/> for the current thread of the page.
        /// </summary>
        protected override void InitializeCulture()
        {
            //string userLanguage = "en-gb";
            //if (!string.IsNullOrEmpty(userLanguage))
            //{
            //    //set culture to french lux for date format,etc
            //    System.Threading.Thread.CurrentThread.CurrentCulture = CultureInfo.GetCultureInfo("en-gb");
                
                
            //    //set culture to the user selected culture for text
            //    System.Threading.Thread.CurrentThread.CurrentUICulture = CultureInfo.GetCultureInfo(userLanguage);
            //}
            base.InitializeCulture();
        }

        protected override void OnInit(System.EventArgs e)
        {
            base.OnInit(e);
            ViewStateUserKey = Session.SessionID;
        }

        /// <summary>
        /// Raises the <see cref="E:System.Web.UI.Page.PreInit"/> event at the beginning of page initialization.
        /// </summary>
        /// <param name="e">An <see cref="T:System.EventArgs"/> that contains the event data.</param>
        protected override void OnPreInit(System.EventArgs e)
        {
            //check if the user selected a theme
            if (!string.IsNullOrEmpty(Profile.Settings.Theme))
            {
                this.Theme = Profile.Settings.Theme;
            }
            base.OnPreInit(e);
        }

        /// <summary>
        /// Raises the <see cref="E:System.Web.UI.Control.PreRender"/> event.
        /// </summary>
        /// <param name="e">An <see cref="T:System.EventArgs"/> object that contains the event data.</param>
        protected override void OnPreRender(System.EventArgs e)
        {
            CombineCssLinks();
            base.OnPreRender(e);
            //Change page title based on site navigation
            SetPageTitleBasedOnSiteNavigation();
        }

        private void CombineCssLinks()
        {
            var theme = this.Theme;

            if (!string.IsNullOrEmpty(theme))
            {
                //remove all css and call the handler to merge all in one minified file cached by the server
                string themePath = string.Format("~/App_Themes/{0}", theme);

                //remove all them related css from header
                var themeRelatedCss = (from p in Page.Header.Controls.OfType<HtmlLink>()
                                       where (p.Attributes["type"] != null && p.Attributes["type"].Equals("text/css", StringComparison.InvariantCultureIgnoreCase)) &&
                                             (p.Attributes["rel"] != null && p.Attributes["rel"].Equals("stylesheet", StringComparison.InvariantCultureIgnoreCase)) &&
                                             (p.Attributes["href"] != null && p.Attributes["href"].Contains(themePath, StringComparison.InvariantCultureIgnoreCase))
                                       select p).ToList();

                for (int i = 0; i < themeRelatedCss.Count; i++)
                {
                    Page.Header.Controls.Remove(themeRelatedCss[i]);
                }

                //add the scriptcombine handler 
                var cssVersion = ConfigurationHelper.CssVersionNumber;
                var query = String.Format("ClientPortalWeb.CssCombine.axd?t={0}&v={1}",
                                          theme,
                                          cssVersion);
                string newHRef = ResolveUrl(themePath + "/" + query);
                HtmlLink combineLink = new HtmlLink();
                combineLink.Attributes["href"] = newHRef;
                combineLink.Attributes["type"] = "text/css";
                combineLink.Attributes["rel"] = "stylesheet";
                Header.Controls.Add(combineLink);
            }
        }

        /// <summary>
        /// Gets the page title based on site navigation.
        /// </summary>
        /// <returns></returns>
        private void SetPageTitleBasedOnSiteNavigation()
        {
            // put the "default" title here
            string title = string.Empty;
            if (SiteMap.CurrentNode != null)
            {
                SiteMapNode current = SiteMap.CurrentNode;
                title = current.Title;
                current = current.ParentNode;
                while (current != null)
                {
                    title = string.Concat(current.Title, " :: ", title);
                    current = current.ParentNode;
                }
            }
            // finally, set the page's title to the title variable
            Page.Title = title;
        }
    }
}
