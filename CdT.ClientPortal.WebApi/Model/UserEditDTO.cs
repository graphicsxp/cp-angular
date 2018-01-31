// <copyright file="UserEditDTO.cs" company="Translation Centre for the Bodies of the European Union">
//  Copyright (c) 2013 All Rights Reserved
// </copyright>

using System;

namespace CdT.ClientPortal.WebApi.Model
{
    public class UserEditDTO
    {
        public int? CdtId { get; set; }
        public DateTime CreationDateUtc { get; set; }
        public string Email { get; set; }
        public string FirstName { get; set; }
        public bool IsApproved { get; set; }
        public string Department { get; set; }

        public bool IsLockedOut { get; set; }

        public DateTime? LastLoginDateUtc { get; set; }
        public string LastName { get; set; }
        public DateTime? LastPasswordResetDateUtc { get; set; }
        public DateTime? LockOutEndDateUtc { get; set; }
        public string Phone { get; set; }
        public string ProviderUserKey { get; set; }
        public string UserName { get; set; }
        public string Type { get { return nameof(UserEditDTO); } }
    }
}