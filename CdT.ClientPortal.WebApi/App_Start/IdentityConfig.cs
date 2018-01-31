// <copyright file="IdentityConfig.cs" company="Translation Centre for the Bodies of the European Union">
//  Copyright (c) 2013 All Rights Reserved
// </copyright>

using System;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin.Security;
using NHibernate.AspNet.Identity;

namespace CdT.ClientPortal.WebApi
{
    // Configure the RoleManager used in the application. RoleManager is defined in the ASP.NET Identity core assembly
    public class ClientPortalRoleManager : RoleManager<ClientPortalRole>
    {
        public ClientPortalRoleManager(IRoleStore<ClientPortalRole> roleStore) : base(roleStore)
        {
        }
    }

    [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.StyleCop.CSharp.MaintainabilityRules", "SA1402:FileMayOnlyContainASingleClass", Justification = "ok")]
    public class ClientPortalSignInManager : SignInManager<ClientPortalUser, string>
    {
        public ClientPortalSignInManager(ClientPortalUserManager userManager, IAuthenticationManager authenticationManager) : base(userManager, authenticationManager)
        {
        }

        public override Task<ClaimsIdentity> CreateUserIdentityAsync(ClientPortalUser user)
        {
            return user.GenerateUserIdentityAsync((ClientPortalUserManager)this.UserManager);
            // custom claims can be added here
        }
    }

    // Configure the application user manager used in this application. UserManager is defined in ASP.NET Identity and is used by the application.
    public class ClientPortalUserManager : UserManager<ClientPortalUser>
    {
        public ClientPortalUserManager(IUserStore<ClientPortalUser> store) : base(store)
        {
            // Configure validation logic for usernames
            this.UserValidator = new UserValidator<ClientPortalUser>(this)
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

            this.PasswordHasher = new SQLPasswordHasher();
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

    public class ClientPortalUser : IdentityUser
    {
        /// <summary>
        /// constructor
        /// </summary>
        public ClientPortalUser()
        {

        }

        /// <summary>
        /// overload
        /// </summary>
        /// <param name="userName"></param>
        public ClientPortalUser(string userName) : base(userName)
        {
        }

        /// <summary>
        /// user's default role
        /// </summary>
        public virtual string DefaultRole { get; set; }

        /// <summary>
        /// first name of the user
        /// </summary>
        public virtual string FirstName { get; set; }

        /// <summary>
        /// last name of the user
        /// </summary>
        public virtual string LastName { get; set; }

        /// <summary>
        /// is the user approved?
        /// </summary>
        public virtual bool IsApproved { get; set; }

        /// <summary>
        /// timestamp of the utc last login date
        /// </summary>
        public virtual DateTime CreationDateUtc { get; set; }

        /// <summary>
        /// timestamp of the utc last login date
        /// </summary>
        public virtual DateTime? LastLoginDateUtc { get; set; }

        /// <summary>
        /// timestamp of utc last password reset date
        /// </summary>
        public virtual DateTime? LastPasswordResetDateUtc { get; set; }

        /// <summary>
        /// Org id
        /// </summary>
        public virtual Guid OrganisationId { get; set; }

        /// <summary>
        /// Department id
        /// </summary>
        public virtual Guid DepartmentId { get; set; }

        /// <summary>
        /// contact name
        /// </summary>
        public virtual string ContactName { get; set; }

        /// <summary>
        /// method for creating a user identity
        /// </summary>
        /// <param name="manager"></param>
        /// <returns> identity of the user </returns>
        public virtual async Task<ClaimsIdentity> GenerateUserIdentityAsync(UserManager<ClientPortalUser> manager)
        {
            // Note the authenticationType must match the one defined in CookieAuthenticationOptions.AuthenticationType
            var userIdentity = await manager.CreateIdentityAsync(this, DefaultAuthenticationTypes.ApplicationCookie);

            // Add custom user claims here

            return userIdentity;
        }

    }

    public class ClientPortalRole : IdentityRole
    {
        /// <summary>
        /// consrtuctor
        /// </summary>
        public ClientPortalRole() : base()
        {
        }

        /// <summary>
        /// constructor overload
        /// </summary>
        /// <param name="name"></param>
        public ClientPortalRole(string name) : base(name)
        {
        }

    }

    public class SQLPasswordHasher : PasswordHasher
    {
        public override string HashPassword(string password)
        {
            return base.HashPassword(password);
        }

        public override PasswordVerificationResult VerifyHashedPassword(string hashedPassword, string providedPassword)
        {
            string[] passwordProperties = hashedPassword.Split('|');
            if (passwordProperties.Length != 3)
            {
                return base.VerifyHashedPassword(hashedPassword, providedPassword);
            }
            else
            {
                string passwordHash = passwordProperties[0];
                int passwordformat = 1;
                string salt = passwordProperties[2];
                if (String.Equals(EncryptPassword(providedPassword, passwordformat, salt), passwordHash, StringComparison.CurrentCultureIgnoreCase))
                {
                    return PasswordVerificationResult.SuccessRehashNeeded;
                }
                else
                {
                    return PasswordVerificationResult.Failed;
                }
            }
        }

        //This is copied from the existing SQL providers and is provided only for back-compat.
        private string EncryptPassword(string pass, int passwordFormat, string salt)
        {
            if (passwordFormat == 0) // MembershipPasswordFormat.Clear
                return pass;

            byte[] bIn = Encoding.Unicode.GetBytes(pass);
            byte[] bSalt = Convert.FromBase64String(salt);
            byte[] bRet = null;

            if (passwordFormat == 1)
            { // MembershipPasswordFormat.Hashed 
                HashAlgorithm hm = HashAlgorithm.Create("SHA1");
                if (hm is KeyedHashAlgorithm)
                {
                    KeyedHashAlgorithm kha = (KeyedHashAlgorithm)hm;
                    if (kha.Key.Length == bSalt.Length)
                    {
                        kha.Key = bSalt;
                    }
                    else if (kha.Key.Length < bSalt.Length)
                    {
                        byte[] bKey = new byte[kha.Key.Length];
                        Buffer.BlockCopy(bSalt, 0, bKey, 0, bKey.Length);
                        kha.Key = bKey;
                    }
                    else
                    {
                        byte[] bKey = new byte[kha.Key.Length];
                        for (int iter = 0; iter < bKey.Length;)
                        {
                            int len = Math.Min(bSalt.Length, bKey.Length - iter);
                            Buffer.BlockCopy(bSalt, 0, bKey, iter, len);
                            iter += len;
                        }
                        kha.Key = bKey;
                    }
                    bRet = kha.ComputeHash(bIn);
                }
                else
                {
                    byte[] bAll = new byte[bSalt.Length + bIn.Length];
                    Buffer.BlockCopy(bSalt, 0, bAll, 0, bSalt.Length);
                    Buffer.BlockCopy(bIn, 0, bAll, bSalt.Length, bIn.Length);
                    bRet = hm.ComputeHash(bAll);
                }
            }

            return Convert.ToBase64String(bRet);
        }
    }
}