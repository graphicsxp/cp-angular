// <copyright file="HomeModel.cs" company="Translation Centre for the Bodies of the European Union">
// Copyright (c) 2013 All Rights Reserved
// </copyright>

using System.Collections.Generic;

namespace CdT.ClientPortal.WebApi.Model
{
    /// <summary>
    /// Model injected in the start page
    /// </summary>
    public class HomeModel
    {
        public HomeModel()
        {
            Roles = new List<string>();
        }

        public string UserName { get; set; }

        public string CurrentRole { get; set; }

        public List<string> Roles { get; set; }

        public string WebApiHost { get; set; }

        public string WebApiBreeze { get; set; }

        public string WebApiExport { get; set; }

        public string WebApiAudit { get; set; }

        public string WebApiExternal { get; set; }

        public string SignalRHost { get; set; }

        public bool SignalRDebug { get; set; }

        public bool PasswordReset { get; set; }
        public string Website { get; set; }

        public int OrganisationId { get; set; }

        public int DepartmentId { get; set; }

        /// <summary>
        /// Toggle angular debug mode
        /// </summary>
        public bool EnableDebug { get; set; }
    }
}