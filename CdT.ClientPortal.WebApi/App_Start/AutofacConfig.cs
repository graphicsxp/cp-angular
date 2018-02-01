// <copyright file="UnityConfig.cs" company="Translation Centre for the Bodies of the European Union">
//  Copyright (c) 2013 All Rights Reserved
// </copyright>

using System;
using System.Web;
using Autofac;
using CdT.EAI.BL.Interfaces;
using CdT.EAI.Dal.NH;
using NHibernate;
using CdT.EAI.BL.Request;
using AutofacSerilogIntegration;
using System.Security.Principal;
using NHibernate.AspNet.Identity;
using Microsoft.AspNet.Identity;
using Microsoft.Owin.Security;
using CdT.ClientPortal.WebApi.Helpers;

namespace CdT.ClientPortal.WebApi.App_Start
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
            // session used by asp.net identity
            container.Register(x => NHibernateSessionFactory.SessionFactory.OpenSession()).Named<ISession>("usr_session").As<ISession>().InstancePerRequest();

            // default session
            container.Register(x =>
            {
                var session = NHibernateSessionFactoryEcdt.SessionFactory.OpenSession();
                // enable soft delete filter by default
                session.EnableFilter("SoftDeleteFilter").SetParameter("IsDeleted", false);
                return session;
            }).As<ISession>().InstancePerRequest();

            // asp.net identity registration
            container.RegisterType<RoleStore<ClientPortalRole>>()
                .WithParameter((pi, ctx) => pi.ParameterType == typeof(ISession), (pi, ctx) => ctx.ResolveNamed<ISession>("usr_session"))
                .As<IRoleStore<ClientPortalRole>>().InstancePerRequest();
            container.RegisterType<UserStore<ClientPortalUser>>()
                .WithParameter((pi, ctx) => pi.ParameterType == typeof(ISession), (pi, ctx) => ctx.ResolveNamed<ISession>("usr_session"))
                .As<IUserStore<ClientPortalUser>>().InstancePerRequest();
            container.Register(x => HttpContext.Current.GetOwinContext().Authentication).As<IAuthenticationManager>().InstancePerRequest();
            container.RegisterType<ClientPortalUserManager>().AsSelf().InstancePerRequest();
            container.RegisterType<ClientPortalRoleManager>().AsSelf().InstancePerRequest();
            container.RegisterType<ClientPortalSignInManager>().AsSelf().InstancePerRequest();

            // bl
            container.RegisterType<RequestBL>().As<IRequestBL>().InstancePerRequest();
            container.RegisterType<EAIContext>().AsSelf().InstancePerRequest();

            // breeze context
            container.RegisterType<EAIContext>().AsSelf().InstancePerRequest();

            container.Register(u => HttpContext.Current.User).As<IPrincipal>().InstancePerRequest();

            container.RegisterLogger();
        }
    }
}
