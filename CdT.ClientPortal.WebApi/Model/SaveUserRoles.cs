// <copyright file="SaveUserRoles.cs" company="Translation Centre for the Bodies of the European Union">
// Copyright (c) 2013 All Rights Reserved
// </copyright>

using System.Collections.Generic;

namespace CdT.ClientPortal.WebApi.Model
{
    public class AddUserRoles
    {
        public UserRolesDTO UserRoles { get; set; }
    }

    [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.StyleCop.CSharp.MaintainabilityRules", "SA1402:FileMayOnlyContainASingleClass", Justification = "ok")]
    public class AddUsersToRole
    {
        public string Role { get; set; }
        public List<string> Users { get; set; }
    }

    public class RemoveUserRoles
    {
        public UserRolesDTO UserRoles { get; set; }
    }

    public class RemoveUsersFromRole
    {
        public string Role { get; set; }
        public List<string> Users { get; set; }
    }

    public class SetDefaultRole
    {
        public UserDefaultRoleDTO DefaultRole { get; set; }
    }
}