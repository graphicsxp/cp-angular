using System;
using System.Text.RegularExpressions;
using System.Web;
using System.Web.Routing;

namespace ClientPortal.Helpers
{
    /// <summary>
    /// 
    /// </summary>
    public class LowerCaseUrlModule : IHttpModule
    {
        #region IHttpModule Members

        public void Dispose()
        {

        }

        public void Init(HttpApplication context)
        {
            context.BeginRequest += new EventHandler(context_BeginRequest);

        }

        void context_BeginRequest(object sender, EventArgs e)
        {
            HttpApplication application = (HttpApplication)sender;
            // If upper case letters are found in the URL, redirect to lower case URL (keep querystring the same).
            string requestedUrl = ((application.Context.Request.Url.Scheme + "://" + application.Context.Request.Url.Authority + application.Context.Request.Url.AbsolutePath));
            if (Regex.IsMatch(requestedUrl, @"[A-Z]") == true)
            {
                string lowercaseUrl = requestedUrl.ToLower();
                lowercaseUrl += HttpContext.Current.Request.Url.Query;
                application.Context.Response.Clear();
                application.Context.Response.Status = "301 Moved Permanently";
                application.Context.Response.AddHeader("Location", lowercaseUrl);
                application.Context.Response.End();
            }
        }
        #endregion
    }

    /// <summary>
    /// 
    /// </summary>
    public class LowercaseRoute : Route
    {
        public LowercaseRoute(string url, IRouteHandler routeHandler)
            : base(url, routeHandler)
        {
        }

        public LowercaseRoute(string url, RouteValueDictionary defaults, IRouteHandler routeHandler)
            : base(url, defaults, routeHandler)
        {
        }

        public LowercaseRoute(string url, RouteValueDictionary defaults, RouteValueDictionary constraints, IRouteHandler routeHandler)
            : base(url, defaults, constraints, routeHandler)
        {
        }

        public override VirtualPathData GetVirtualPath(RequestContext requestContext, RouteValueDictionary values)
        {
            var virtualPath = base.GetVirtualPath(requestContext, values);

            if (virtualPath != null)
            {
                virtualPath.VirtualPath = virtualPath.VirtualPath.ToLowerInvariant();
            }

            return virtualPath;
        }
    }
}
