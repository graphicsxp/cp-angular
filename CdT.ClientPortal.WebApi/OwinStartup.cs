// <copyright file="OwinStartup.cs" company="Translation Centre for the Bodies of the European Union">
//  Copyright (c) 2013 All Rights Reserved
// </copyright>

using Microsoft.Owin;
using Microsoft.Owin.Security.DataProtection;
using Owin;

[assembly: OwinStartup(typeof(CdT.ClientPortal.WebApi.OwinStartup))]

namespace CdT.ClientPortal.WebApi
{
    public partial class OwinStartup
    {
        internal static IDataProtectionProvider DataProtectionProvider { get; private set; }

        public void Configuration(IAppBuilder app)
        {
            this.ConfigureAuth(app);
        }
    }
}