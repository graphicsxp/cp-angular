using Autofac;
using CdT.ClientPortal.WebApi.Model;
using CdT.EAI.Model.Business;
using CdT.UI.Common;
using NHibernate;
using Serilog;
using System;
using System.Collections.Generic;
using System.Data.SqlTypes;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.ModelBinding;

namespace CdT.ClientPortal.WebApi.Controllers
{
    public class UserManagementController : BaseApiController
    {
        private readonly ClientPortalRoleManager _roleManager;
        private readonly ClientPortalUserManager _userManager;
        private readonly ILifetimeScope _scope;
        private readonly ILogger _logger;

        public UserManagementController(ClientPortalUserManager userManager, ClientPortalRoleManager roleManager, ILogger logger, ILifetimeScope scope) : base(logger)
        {
            this._userManager = userManager;
            this._roleManager = roleManager;
            this._scope = scope;
            this._logger = logger;
        }

        [HttpPost]
        public async Task AssignRolesToUser(AddUserRoles command)
        {
            ClientPortalUser user = await this._userManager.FindByNameAsync(command.UserRoles.User);
            await this._userManager.AddToRolesAsync(user.Id, command.UserRoles.Roles.ToArray());
        }

        [HttpPost]
        public async Task AssignUsersToRole(AddUsersToRole command)
        {
            foreach (string username in command.Users)
            {
                ClientPortalUser user = await this._userManager.FindByNameAsync(username);
                await this._userManager.AddToRoleAsync(user.Id, command.Role);
            }
        }

        [HttpPost]
        public async Task ChangePassword(ChangePasswordModel model)
        {
            if (model.OldPassword == model.NewPassword)
            {
                throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.BadRequest) { Content = new StringContent("New password is the same as the current one"), ReasonPhrase = "Business exception" });
            }

            ClientPortalUser user = await this._userManager.FindByNameAsync(this.User.Identity.Name);

            var result = await this._userManager.ChangePasswordAsync(user.Id, model.OldPassword, model.NewPassword);
            if (!result.Succeeded)
            {
                StringBuilder sb = new StringBuilder();
                foreach (var error in result.Errors)
                {
                    sb.Append(string.Format("{0} <br/>", error));
                }
                throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.BadRequest) { Content = new StringContent(sb.ToString()), ReasonPhrase = "Business exception" });
            }
            else
            {
                user.LastPasswordResetDateUtc = DateTime.UtcNow;
                await this._userManager.UpdateAsync(user);
            }
        }

        [HttpGet]
        public IQueryable<UserListDTO> GetAllUsersByRole([FromUri] string[] roles)
        {
            var session = this._scope.Resolve<ISession>();
            var lst = new List<UserListDTO>();
            foreach (var u in this._userManager.Users.Where(x => x.Roles.Any(a => roles.Contains(a.Name))))
            {
                lst.Add(new UserListDTO()
                {
                    CreationDateUtc = u.CreationDateUtc,
                    //Department = session.Query<Department>().Where(x => x.Code == u.Department).Select(x => x.DefaultLabel).SingleOrDefault(),
                    Email = u.Email,
                    FirstName = u.FirstName,
                    LastName = u.LastName,
                    LastPasswordResetDateUtc = u.LastPasswordResetDateUtc,
                    UserName = u.UserName,
                    LastLoginDateUtc = u.LastLoginDateUtc,
                    LockOutEndDateUtc = u.LockoutEndDateUtc,
                    IsApproved = u.IsApproved,
                    IsLockedOut = DateTime.UtcNow < u.LockoutEndDateUtc
                });
            }
            return lst.AsQueryable();
        }

        [HttpGet]
        public IQueryable<UserListDTO> GetAllUsers([ModelBinder(typeof(SortModelBinder))]
                                                   List<Sort> sorting,
                                                   [ModelBinder(typeof(FilterModelBinder))]
                                                   List<Filter> filtering,
                                                   [ModelBinder(typeof(PagingModelBinder))]
                                                   Paging paging)
        {
            var session = this._scope.Resolve<ISession>();
            var lst = new List<UserListDTO>();
            foreach (var u in this._userManager.Users)
            {
                lst.Add(new UserListDTO()
                {
                    CreationDateUtc = u.CreationDateUtc,
                    //Department = session.Query<Department>().Where(x => x.Code == u.Department).Select(x => x.DefaultLabel).SingleOrDefault(),
                    Email = u.Email,
                    FirstName = u.FirstName,
                    LastName = u.LastName,
                    LastPasswordResetDateUtc = u.LastPasswordResetDateUtc,
                    UserName = u.UserName,
                    LastLoginDateUtc = u.LastLoginDateUtc,
                    LockOutEndDateUtc = u.LockoutEndDateUtc,
                    IsApproved = u.IsApproved,
                    IsLockedOut = DateTime.UtcNow < u.LockoutEndDateUtc
                });
            }
            return lst.AsQueryable();
        }

        /// <summary>
        /// Gets a list with all active users
        /// </summary>
        /// <param name="sorting">Grid params</param>
        /// <param name="filtering">Grid params</param>
        /// <param name="paging">Grid params</param>
        /// <returns>
        /// Returns a list with all active (IsApproved) users
        /// This is the method that should be called from everything but the user list.
        /// </returns>
        [HttpGet]
        public IQueryable<UserListDTO> GetActiveUsers([ModelBinder(typeof(SortModelBinder))] List<Sort> sorting, [ModelBinder(typeof(FilterModelBinder))] List<Filter> filtering, [ModelBinder(typeof(PagingModelBinder))] Paging paging)
        {
            return this._userManager.Users
                                        .Where(u => u.IsApproved)
                                        .Select(u => new UserListDTO()
                                        {
                                            CreationDateUtc = u.CreationDateUtc,
                                            //Department = u.Department,
                                            Email = u.Email,
                                            FirstName = u.FirstName,
                                            LastName = u.LastName,
                                            LastPasswordResetDateUtc = u.LastPasswordResetDateUtc,
                                            UserName = u.UserName,
                                            LastLoginDateUtc = u.LastLoginDateUtc,
                                            LockOutEndDateUtc = u.LockoutEndDateUtc,
                                            IsApproved = u.IsApproved,
                                            IsLockedOut = DateTime.UtcNow < u.LockoutEndDateUtc,
                                        });
        }

        [HttpGet]
        public IQueryable<UserDto> GetAllUsersDto()
        {
            return this._userManager.Users
                       .Select(p => new UserDto()
                       {
                           UserName = p.UserName,
                           FakeUserName = string.Format("{0} {1} ({2})", p.FirstName, p.LastName, p.UserName)
                       });
        }

        [HttpGet]
        public IQueryable<UserDto> GetActiveUsersDto()
        {
            return this._userManager.Users
                                        .Where(u => u.IsApproved)
                                        .Select(p => new UserDto()
                                        {
                                            UserName = p.UserName,
                                            FakeUserName = string.Format("{0} {1} ({2})", p.FirstName, p.LastName, p.UserName)
                                        });
        }

        private Task<List<ClientPortalUser>> GetUsersAsync(List<string> userNames)
        {
            return Task.Run(() => this._userManager.Users.Where(x => userNames.Contains(x.UserName)).ToList());
        }

        [HttpGet]
        public async Task<UserEditDTO> GetUser([FromUri]
                                               string userName)
        {
            ClientPortalUser user = await this._userManager.FindByNameAsync(userName);
            if (user == null)
            {
                throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.NotFound) { Content = new StringContent(string.Format("User {0} not found", userName)), ReasonPhrase = "Business exception" });
            }
            var dto = BuildCdtUser(user);
            return dto;
        }

        //[HttpGet]
        //public UserEditDTO GetUserByCdtId([FromUri]
        //                                       int correlationId)
        //{
        //    ClientPortalUser user = this._userManager.Users.SingleOrDefault(x => x.CdtId == correlationId);
        //    if (user == null)
        //    {
        //        throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.NotFound) { Content = new StringContent(string.Format("User with correlationId {0} not found", correlationId)), ReasonPhrase = "Business exception" });
        //    }
        //    var dto = BuildCdtUser(user);
        //    return dto;
        //}

        private UserEditDTO BuildCdtUser(ClientPortalUser user)
        {
            UserEditDTO dto = new UserEditDTO();
            dto.CreationDateUtc = user.CreationDateUtc;
            dto.FirstName = user.FirstName;
            dto.IsApproved = user.IsApproved;
            dto.IsLockedOut = DateTime.UtcNow < user.LockoutEndDateUtc;
            dto.LastLoginDateUtc = user.LastLoginDateUtc;
            dto.LastName = user.LastName;
            dto.LastPasswordResetDateUtc = user.LastPasswordResetDateUtc;
            dto.Phone = user.PhoneNumber;
            dto.ProviderUserKey = user.SecurityStamp;
            dto.UserName = user.UserName;
            dto.Email = user.Email;
            dto.LockOutEndDateUtc = user.LockoutEndDateUtc;
            //dto.CdtId = user.CdtId;
            //dto.Department = user.Department;

            return dto;
        }

        [HttpPost]
        public async Task<List<UserEditDTO>> GetUsers([FromBody] string[] userNames)
        {
            var users = await GetUsersAsync(userNames.ToList());

            var lst = new List<UserEditDTO>();
            foreach (var user in users)
            {
                UserEditDTO dto = new UserEditDTO();
                dto.CreationDateUtc = user.CreationDateUtc;
                dto.FirstName = user.FirstName;
                dto.IsApproved = user.IsApproved;
                dto.IsLockedOut = DateTime.UtcNow < user.LockoutEndDateUtc;
                dto.LastLoginDateUtc = user.LastLoginDateUtc;
                dto.LastName = user.LastName;
                dto.LastPasswordResetDateUtc = user.LastPasswordResetDateUtc;
                dto.Phone = user.PhoneNumber;
                dto.ProviderUserKey = user.SecurityStamp;
                dto.UserName = user.UserName;
                dto.Email = user.Email;
                dto.LockOutEndDateUtc = user.LockoutEndDateUtc;
                //dto.CdtId = user.CdtId;
                //dto.Department = user.Department;

                lst.Add(dto);
            }

            return lst;
        }

        [HttpGet]
        public async Task<IList<RoleDto>> ReadAllAvailableRoles(string userName)
        {
            IList<RoleDto> ret = new List<RoleDto>();

            var allRoles = this._roleManager.Roles.ToList();
            ClientPortalUser user = await this._userManager.FindByNameAsync(userName);
            var assignedRoles = await this._userManager.GetRolesAsync(user.Id);
            foreach (ClientPortalRole role in allRoles)
            {
                if (!assignedRoles.Contains(role.Name))
                {
                    ret.Add(new RoleDto() { RoleName = role.Name });
                }
            }

            return ret;
        }

        [HttpGet]
        public async Task<IList<UserDto>> ReadAllAvailableUsers(string roleName)
        {
            IList<UserDto> ret = new List<UserDto>();
            var allUsers = this._userManager.Users.ToList();
            var role = await this._roleManager.FindByNameAsync(roleName);
            var assignedUsers = role.Users.ToList();
            foreach (ClientPortalUser userAll in allUsers)
            {
                bool isAssigned = false;
                foreach (ClientPortalUser userAssigned in assignedUsers)
                {
                    if (userAssigned.Id == userAll.Id)
                    {
                        isAssigned = true;
                        break;
                    }
                }
                if (!isAssigned)
                {
                    UserDto dto = new UserDto();
                    dto.UserName = userAll.UserName;
                    dto.FakeUserName = string.Format("{0} {1} ({2})", userAll.FirstName, userAll.LastName, userAll.UserName);
                    ret.Add(dto);
                }
            }

            return ret;
        }

        [HttpGet]
        public IQueryable<RoleDto> ReadAllRoles()
        {
            return this._roleManager.Roles.Select(p => new RoleDto() { RoleName = p.Name });
        }

        [HttpGet]
        public async Task<IList<RoleDto>> ReadRolesForUser(string userName)
        {
            IList<RoleDto> ret = new List<RoleDto>();

            ClientPortalUser user = await this._userManager.FindByNameAsync(userName);
            var assignedRoles = await this._userManager.GetRolesAsync(user.Id);
            foreach (string role in assignedRoles)
            {
                var x = new RoleDto() { RoleName = role };
                // manage default role here
                if (role == user.DefaultRole)
                {
                    x.GroupName = "Default";
                }
                else
                {
                    x.GroupName = "Standard";
                }
                ret.Add(x);
            }
            return ret;
        }

        [HttpGet]
        public async Task<IEnumerable<UserDto>> ReadUsersInRole(string roleName)
        {
            var role = await this._roleManager.FindByNameAsync(roleName);
            return role.Users
                            .Cast<ClientPortalUser>()
                            .Where(ClientPortalUser => ClientPortalUser.IsApproved) // Get only enabled users
                            .Select(p => new UserDto()
                            {
                                UserName = p.UserName,
                                FakeUserName = string.Format("{0} {1} ({2})", p.FirstName, p.LastName, p.UserName)
                            });
        }

        [HttpPost]
        public async Task RemoveRolesFromUser(RemoveUserRoles command)
        {
            ClientPortalUser user = await this._userManager.FindByNameAsync(command.UserRoles.User);
            await this._userManager.RemoveFromRolesAsync(user.Id, command.UserRoles.Roles.ToArray());
        }

        [HttpPost]
        public async Task RemoveUsersFromRole(RemoveUsersFromRole command)
        {
            ClientPortalRole role = await this._roleManager.FindByNameAsync(command.Role);
            foreach (string username in command.Users)
            {
                ClientPortalUser user = await this._userManager.FindByNameAsync(username);
                await this._userManager.RemoveFromRoleAsync(user.Id, role.Name);
            }
        }

        [HttpPost]
        public async Task<UserEditDTO> SaveUser(UserEditDTO user)
        {
            if (string.IsNullOrEmpty(user.ProviderUserKey))
            {
                if (user.ProviderUserKey == null && this._userManager.Users.Where(u => u.UserName == user.UserName).Count() > 0)
                {
                    throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.BadRequest) { Content = new StringContent(string.Format("The username {0} is already in use", user.UserName)), ReasonPhrase = "Business exception" });
                }

                ClientPortalUser newUser = new ClientPortalUser();
                newUser.UserName = user.UserName;
                newUser.TwoFactorEnabled = false;
                newUser.PhoneNumberConfirmed = false;
                newUser.PhoneNumber = user.Phone;
                newUser.LockoutEnabled = true;
                newUser.LastName = user.LastName;
                //newUser.Department = user.Department;
                newUser.IsApproved = true;
                newUser.FirstName = user.FirstName;
                newUser.Email = user.Email;
                newUser.CreationDateUtc = DateTime.UtcNow;
                newUser.DefaultRole = "GUEST";
                //newUser.CdtId = user.CdtId ?? 0;
                await this._userManager.CreateAsync(newUser, "Welcome1"); //default password should be changed
                newUser = await this._userManager.FindByNameAsync(user.UserName);
                await this._userManager.AddToRoleAsync(newUser.Id, "GUEST");
            }
            else
            {
                ClientPortalUser userEdit = await this._userManager.FindByNameAsync(user.UserName);
                userEdit.Email = user.Email;
                userEdit.FirstName = user.FirstName;
                userEdit.LastName = user.LastName;
                userEdit.PhoneNumber = user.Phone;
                userEdit.IsApproved = user.IsApproved;
                //userEdit.Department = user.Department;
                //userEdit.CdtId = user.CdtId ?? 0;
                if (user.IsLockedOut)
                {
                    userEdit.LockoutEndDateUtc = SqlDateTime.MaxValue.Value;
                }
                else
                {
                    userEdit.LockoutEndDateUtc = null;
                }

                await this._userManager.UpdateAsync(userEdit);
            }

            UserEditDTO userDto = await this.GetUser(user.UserName);
            return userDto;
        }

        [HttpPost]
        public async Task SetDefaultRole(SetDefaultRole command)
        {
            ClientPortalUser user = await this._userManager.FindByNameAsync(command.DefaultRole.UserName);
            user.DefaultRole = command.DefaultRole.Rolename;
            await this._userManager.UpdateAsync(user);
        }

        public class ChangePasswordModel
        {
            public string NewPassword { get; set; }
            public string OldPassword { get; set; }
        }

        public class RoleDto
        {
            public string GroupName { get; set; }
            public string RoleName { get; set; }
        }

        public class UserDto
        {
            public string FakeUserName { get; set; }

            public string UserName { get; set; }
        }
    }
}

