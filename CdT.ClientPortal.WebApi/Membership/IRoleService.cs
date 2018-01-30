

using ClientPortal.Membership.Utils;

namespace ClientPortal.Membership
{
    public interface IRoleService
    {
        bool IsUserInRole(string roleName);

        string CurrentName { get; }

        UserProfile GetProfile();
    }
}
