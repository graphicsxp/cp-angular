// <copyright file="UnityConfig.cs" company="Translation Centre for the Bodies of the European Union">
//  Copyright (c) 2013 All Rights Reserved
// </copyright>

using System;
using System.Web;
using Autofac;
using CdT.EAI.BL.Interfaces;
using CdT.EAI.Dal.NH;
using NHibernate;
using NServiceBus;
using CdT.EAI.BL.Request;
using CdT.EAI.BusService.Common;
using AutofacSerilogIntegration;
using System.Security.Principal;

namespace ClientPortal.WebApi.App_Start
{
    /// <summary>
    ///     Specifies the Unity configuration for the main container.
    /// </summary>
    public class AutofacConfig
    {
        #region Autofac Container

        private static readonly Lazy<ContainerBuilder> ContainerBuilder = new Lazy<ContainerBuilder>(() =>
        {
            var containerBuilder = new ContainerBuilder();
            RegisterTypes(containerBuilder);
            return containerBuilder;
        });

        /// <summary>
        /// Gets the configured Unity container.
        /// </summary>
        public static ContainerBuilder GetConfiguredContainer()
        {
            return ContainerBuilder.Value;
        }

        #endregion Unity Container

        /// <summary>Registers the type mappings with the Unity container.</summary>
        /// <param name="container">The unity container to configure.</param>
        /// <remarks>
        ///     There is no need to register concrete types such as controllers or API controllers (unless you want to
        ///     change the defaults), as Unity allows resolving a concrete type even if it was not previously registered.
        /// </remarks>
        public static void RegisterTypes(ContainerBuilder container)
        {
            // default session
            container.Register(x =>
            {
                var session = NHibernateSessionFactoryEcdt.SessionFactory.OpenSession();
                // enable soft delete filter by default
                session.EnableFilter("SoftDeleteFilter").SetParameter("IsDeleted", false);
                return session;
            }).As<ISession>().InstancePerRequest();


            container.RegisterType<RequestBL>().As<IRequestBL>().InstancePerRequest();
            container.RegisterType<EAIContext>().AsSelf().InstancePerRequest();

            container.Register(u => HttpContext.Current.User).As<IPrincipal>().InstancePerRequest();

            container.RegisterLogger();
            /*
            // NServicebus registration
            var endpointConfiguration = new EndpointConfiguration("clientportalweb2");
            endpointConfiguration.SendOnly();
            endpointConfiguration.ConfigureForEcdt();
            endpointConfiguration.Conventions().DefiningCommandsAs(t => t.Namespace != null && t.Namespace.StartsWith("CdT.EAI.Commands"));
            endpointConfiguration.AssemblyScanner().CustomExcludeAssemblies();
            IEndpointInstance endpointInstance = Endpoint.Start(endpointConfiguration).GetAwaiter().GetResult();
            container.RegisterInstance<IMessageSession>(endpointInstance).OnRelease(p => endpointInstance.Stop().GetAwaiter().GetResult());*/

        }
    }
}
