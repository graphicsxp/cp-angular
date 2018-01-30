//// <copyright file="OwinStartup.cs" company="Translation Centre for the Bodies of the European Union">
////  Copyright (c) 2013 All Rights Reserved
//// </copyright>

//using Microsoft.Owin;
//using Microsoft.Owin.Security.DataProtection;
//using Owin;

//[assembly: OwinStartupAttribute(typeof(ClientPortal.Web.OwinStartup))]

//namespace ClientPortal.Web
//{
//    public partial class OwinStartup
//    {
//        internal static IDataProtectionProvider DataProtectionProvider { get; private set; }

//        public void Configuration(IAppBuilder app)
//        {
//            DataProtectionProvider = app.GetDataProtectionProvider();
//            this.ConfigureAuth(app);
//            //Hubs.SignalRStartup.Configure(app);
//        }
//    }
//}