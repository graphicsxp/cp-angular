// <copyright file="UserRolesDTO.cs" company="Translation Centre for the Bodies of the European Union">
// Copyright (c) 2013 All Rights Reserved
// </copyright>

using System.Collections.Generic;

namespace CdT.ClientPortal.WebApi.Model
{
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