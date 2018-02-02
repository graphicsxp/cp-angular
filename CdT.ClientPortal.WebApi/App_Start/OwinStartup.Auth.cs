// <copyright file="Startup.Auth.cs" company="Translation Centre for the Bodies of the European Union">
//  Copyright (c) 2013 All Rights Reserved
// </copyright>

using System;
using System.Reflection;
using System.Web.Http;
using Autofac.Features.AttributeFilters;
using Autofac.Integration.WebApi;
using CdT.ClientPortal.WebApi.App_Start;
using Microsoft.AspNet.Identity;
using Microsoft.Owin;
using Microsoft.Owin.Security.Cookies;
using Microsoft.Owin.Security.OAuth;
using Owin;
using Autofac;
using CdT.ClientPortal.WebApi.Providers;
using Microsoft.Owin.Cors;

namespace CdT.ClientPortal.WebApi
{
    public partial class OwinStartup
    {
        public static OAuthAuthorizationServerOptions OAuthOptions { get; private set; }
        public static string PublicClientId { get; private set; }

        // For more information on configuring authentication, please visit http://go.microsoft.com/fwlink/?LinkId=301864
        public void ConfigureAuth(IAppBuilder app)
        {
            // Get your HttpConfiguration. In OWIN, you'll create one
            // rather than using GlobalConfiguration.
            var config = new HttpConfiguration();

            // register webapi config
            WebApiConfig.Register(config);

            // get container
            var containerBuilder = AutofacConfig.GetConfiguredContainer();

            containerBuilder.RegisterApiControllers(Assembly.GetExecutingAssembly()).WithAttributeFiltering();

            var container = containerBuilder.Build();

            // set autofac container as the dependency resolver to use for webapi
            config.DependencyResolver = new AutofacWebApiDependencyResolver(container);

            app.UseCors(CorsOptions.AllowAll);
            app.UseAutofacMiddleware(container);
            app.UseAutofacWebApi(config);

            // Configure the application for OAuth based flow
            PublicClientId = "CdT.ClientPortal.WebApi";
            OAuthOptions = new OAuthAuthorizationServerOptions
            {
                ApplicationCanDisplayErrors = true,
                TokenEndpointPath = new PathString("/Token"),
                Provider = container.Resolve<IOAuthAuthorizationServerProvider>(new NamedParameter("publicClientId", PublicClientId)),
                AuthorizeEndpointPath = new PathString("/Authorize"),
                AccessTokenExpireTimeSpan = TimeSpan.FromDays(1),
                // In production mode set AllowInsecureHttp = false
                AllowInsecureHttp = true
            };

            // Enable the application to use bearer tokens to authenticate users
            app.UseOAuthBearerTokens(OAuthOptions);

            app.UseWebApi(config);
        }
    }
}