//using ClientPortal.WebApi;
using System.Web.Http;
using Autofac.Integration.Web;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace CdT.ClientPortal.WebApi
{
    public class WebApiApplication : System.Web.HttpApplication, IContainerProviderAccessor
    {
        public static IContainerProvider _containerProvider;

        // Instance property that will be used by Autofac HttpModules
        // to resolve and inject dependencies.
        public IContainerProvider ContainerProvider
        {
            get
            {
                return _containerProvider;
            }
        }

        protected void Application_Start()
        {
            //GlobalConfiguration.Configure(WebApiConfig.Register);
            // change json casing to camelCase for ApiController only:http://stackoverflow.com/questions/15040838/mvc-jsonresult-camelcase-serialization
            // for returning custom json from mvc controller see:http://www.matskarlsson.se/blog/serialize-net-objects-as-camelcase-json
            var formatters = GlobalConfiguration.Configuration.Formatters;
            var settings = formatters.JsonFormatter.SerializerSettings;
            settings.Formatting = Formatting.None;
            settings.ContractResolver = new CamelCasePropertyNamesContractResolver();
        }
    }
}
