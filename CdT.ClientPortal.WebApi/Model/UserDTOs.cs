// <copyright file="UsersDTO.cs" company="Translation Centre for the Bodies of the European Union">
// Copyright (c) 2013 All Rights Reserved
// </copyright>

using System;
using System.Collections.Generic;

namespace CdT.ClientPortal.WebApi.Model
{
    public abstract class BaseUserDTO
    {
        public string UserName { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Department { get; set; }
        public string Email { get; set; }
        public bool IsApproved { get; set; }
        public bool IsLockedOut { get; set; }
        public DateTime CreationDateUtc { get; set; }
        public DateTime? LastLoginDateUtc { get; set; }
        public DateTime? LastPasswordResetDateUtc { get; set; }
        public DateTime? LockOutEndDateUtc { get; set; }
    }

    public class UserListDTO : BaseUserDTO
    { 
        public bool IsOnline { get; set; }
    }

    public class UserEditDTO : BaseUserDTO
    {
        public int? CdtId { get; set; }
        public string Phone { get; set; }
        public string ProviderUserKey { get; set; }
        public string Type => nameof(UserEditDTO);
    }

    public class UserDefaultRoleDTO
    {
        public string Rolename { get; set; }
        public string UserName { get; set; }
    }

    [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.StyleCop.CSharp.MaintainabilityRules", "SA1402:FileMayOnlyContainASingleClass", Justification = "ok")]
    public class UserRolesDTO
    {
        public List<string> Roles { get; set; }
        public string User { get; set; }
    }
}