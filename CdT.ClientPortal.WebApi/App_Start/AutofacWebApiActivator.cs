using System.Reflection;
using System.Web.Http;
using Autofac.Integration.WebApi;
using Autofac.Features.AttributeFilters;

[assembly: WebActivatorEx.PreApplicationStartMethod(typeof(ClientPortal.WebApi.App_Start.AutofacWebApiActivator), "Start")]
[assembly: WebActivatorEx.ApplicationShutdownMethod(typeof(ClientPortal.WebApi.App_Start.AutofacWebApiActivator), "Shutdown")]

namespace ClientPortal.WebApi.App_Start
{
    /// <summary>Provides the bootstrapping for integrating Unity with WebApi when it is hosted in ASP.NET</summary>
    public static class AutofacWebApiActivator
    {
        /// <summary>Disposes the Autofac container when the application is shut down.</summary>
        public static void Shutdown()
        {
        }

        /// <summary>Integrates Autofac when the application starts.</summary>
        public static void Start()
        {
            var containerBuilder = AutofacConfig.GetConfiguredContainer();

            containerBuilder.RegisterApiControllers(Assembly.GetExecutingAssembly()).WithAttributeFiltering();

            var container = containerBuilder.Build();
            GlobalConfiguration.Configuration.DependencyResolver = new AutofacWebApiDependencyResolver(container);
        }
    }
}