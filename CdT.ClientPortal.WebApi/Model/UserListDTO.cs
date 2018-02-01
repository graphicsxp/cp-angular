// <copyright file="UserListDTO.cs" company="Translation Centre for the Bodies of the European Union">
//  Copyright (c) 2013 All Rights Reserved
// </copyright>

using System;

namespace CdT.ClientPortal.WebApi.Model
{
    public class UserListDTO
    {
        public DateTime CreationDateUtc { get; set; }
        public string Department { get; set; }
        public string Email { get; set; }
        public string FirstName { get; set; }
        public bool IsApproved { get; set; }
        public bool IsLockedOut { get; set; }
        public bool IsOnline { get; set; }
        public DateTime? LastLoginDateUtc { get; set; }
        public string LastName { get; set; }
        public DateTime? LastPasswordResetDateUtc { get; set; }
        public DateTime? LockOutEndDateUtc { get; set; }
        public string UserName { get; set; }
    }
}