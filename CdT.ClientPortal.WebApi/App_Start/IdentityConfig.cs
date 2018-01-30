// <copyright file="IdentityConfig.cs" company="Translation Centre for the Bodies of the European Union">
//  Copyright (c) 2013 All Rights Reserved
// </copyright>

using System;
using System.Security.Claims;
using System.Threading.Tasks;
using CdT.EAI.Model.Security;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin.Security;

namespace ClientPortal.WebApi
{
    // Configure the RoleManager used in the application. RoleManager is defined in the ASP.NET Identity core assembly
    public class EcdtRoleManager : RoleManager<EcdtRole>
    {
        public EcdtRoleManager(IRoleStore<EcdtRole> roleStore)
            : base(roleStore)
        {
        }
    }

    [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.StyleCop.CSharp.MaintainabilityRules", "SA1402:FileMayOnlyContainASingleClass", Justification = "ok")]
    public class EcdtSignInManager : SignInManager<EcdtUser, string>
    {
        public EcdtSignInManager(EcdtUserManager userManager, IAuthenticationManager authenticationManager)
            : base(userManager, authenticationManager)
        {
        }

        public override Task<ClaimsIdentity> CreateUserIdentityAsync(EcdtUser user)
        {
            return user.GenerateUserIdentityAsync((EcdtUserManager)this.UserManager);
            // custom claims can be added here
        }
    }

    // Configure the application user manager used in this application. UserManager is defined in ASP.NET Identity and is used by the application.
    public class EcdtUserManager : UserManager<EcdtUser>
    {
        public EcdtUserManager(IUserStore<EcdtUser> store)
            : base(store)
        {
            // Configure validation logic for usernames
            this.UserValidator = new UserValidator<EcdtUser>(this)
            {
                AllowOnlyAlphanumericUserNames = false,
                RequireUniqueEmail = false, //TODO
            };
            // Configure validation logic for passwords
            this.PasswordValidator = new PasswordValidator
            {
                RequiredLength = 8,
                RequireNonLetterOrDigit = false,
                RequireDigit = true,
                RequireLowercase = true,
                RequireUppercase = true,
            };
            // Configure user lockout defaults
            this.UserLockoutEnabledByDefault = true;
            this.DefaultAccountLockoutTimeSpan = TimeSpan.FromMinutes(5);
            this.MaxFailedAccessAttemptsBeforeLockout = 5;
        }
    }

    public class EmailService : IIdentityMessageService
    {
        public Task SendAsync(IdentityMessage message)
        {
            // Plug in your email service here to send an email.
            return Task.FromResult(0);
        }
    }

    public class SmsService : IIdentityMessageService
    {
        public Task SendAsync(IdentityMessage message)
        {
            // Plug in your sms service here to send a text message.
            return Task.FromResult(0);
        }
    }
}