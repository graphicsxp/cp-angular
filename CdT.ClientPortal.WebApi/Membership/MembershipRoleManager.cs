using System.ServiceModel;
using System.Web.Security;
using ClientPortal.Membership.Utils;

namespace ClientPortal.Membership
{
    public class MembershipRoleManager : IRoleService
    {
        public string CurrentName => ServiceSecurityContext.Current.PrimaryIdentity.Name;

        public UserProfile GetProfile()
        {
            return UserProfile.GetProfile(CurrentName);
        }

        public bool IsUserInRole(string roleName)
        {
            return Roles.IsUserInRole(CurrentName, roleName);
        }
    }
}
