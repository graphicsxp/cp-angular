using ClientPortal.Membership.Web.Security;
using Oracle.DataAccess.Client;
using System;
using System.Collections.Specialized;
using System.Configuration.Provider;
using System.Data;
using System.Web.Security;

namespace ClientPortal.Membership
{
    public class OracleRoleProvider : RoleProvider
    {
        private string m_OracleConnectionString;

        private string m_ApplicationName;

        private int m_CommandTimeout;

        private static int MAX_NAME_SIZE;

        public override string ApplicationName
        {
            get
            {
                return this.m_ApplicationName;
            }
            set
            {
                if (value == null)
                {
                    throw new ArgumentNullException("value");
                }
                if (string.Empty == value)
                {
                    throw new ArgumentException("value");
                }
                if (value.Length > 256)
                {
                    throw new ProviderException(MsgManager.GetMsg(ErrRes.PROVIDER_APPLICATION_NAME_TOO_LONG, new string[0]));
                }
                this.m_ApplicationName = value;
            }
        }

        public int CommandTimeout
        {
            get
            {
                return this.m_CommandTimeout;
            }
        }

        static OracleRoleProvider()
        {
            OracleRoleProvider.MAX_NAME_SIZE = 256;
        }

        public OracleRoleProvider()
        {
        }

        public override void AddUsersToRoles(string[] userNames, string[] roleNames)
        {
            Util.CheckArrayParameter(ref roleNames, true, true, true, 256, "roleNames");
            Util.CheckArrayParameter(ref userNames, true, true, true, 256, "userNames");
            string empty = string.Empty;
            string str = string.Empty;
            OracleConnectionHolder connection = null;
            OracleCommand oracleCommand = null;
            try
            {
                try
                {
                    connection = OracleConnectionHelper.GetConnection(this.m_OracleConnectionString);
                    oracleCommand = new OracleCommand("ora_aspnet_UIR_AddUsersToRoles", connection.Connection)
                    {
                        CommandTimeout = this.m_CommandTimeout,
                        CommandType = CommandType.StoredProcedure
                    };
                    OracleParameter oracleParameter = oracleCommand.Parameters.Add("OutResult", OracleDbType.Int32, ParameterDirection.ReturnValue);
                    oracleParameter.DbType = DbType.Int32;
                    OracleParameter mApplicationName = oracleCommand.Parameters.Add("ApplicationName_", OracleDbType.NVarchar2);
                    mApplicationName.Value = this.m_ApplicationName;
                    OracleParameter length = oracleCommand.Parameters.Add("UserNames_", OracleDbType.NVarchar2);
                    length.CollectionType = OracleCollectionType.PLSQLAssociativeArray;
                    length.Size = (int)userNames.Length;
                    length.Value = userNames;
                    OracleParameter length1 = oracleCommand.Parameters.Add("UserNames_Arr_Size", OracleDbType.Int32);
                    length1.Value = (int)userNames.Length;
                    OracleParameter oracleParameter1 = oracleCommand.Parameters.Add("RoleNames_", OracleDbType.NVarchar2);
                    oracleParameter1.CollectionType = OracleCollectionType.PLSQLAssociativeArray;
                    oracleParameter1.Size = (int)roleNames.Length;
                    oracleParameter1.Value = roleNames;
                    OracleParameter length2 = oracleCommand.Parameters.Add("RoleNames_Arr_Size", OracleDbType.Int32);
                    length2.Value = (int)roleNames.Length;
                    OracleParameter oracleParameter2 = oracleCommand.Parameters.Add("UserName", OracleDbType.NVarchar2, OracleRoleProvider.MAX_NAME_SIZE);
                    oracleParameter2.Direction = ParameterDirection.Output;
                    OracleParameter oracleParameter3 = oracleCommand.Parameters.Add("RoleName", OracleDbType.NVarchar2, OracleRoleProvider.MAX_NAME_SIZE);
                    oracleParameter3.Direction = ParameterDirection.Output;
                    oracleCommand.ExecuteNonQuery();
                    int value = (int)oracleCommand.Parameters[0].Value;
                    if (oracleCommand.Parameters[6].Value.ToString() != "null")
                    {
                        str = oracleCommand.Parameters[6].Value.ToString();
                    }
                    if (oracleCommand.Parameters[7].Value.ToString() != "null")
                    {
                        empty = oracleCommand.Parameters[7].Value.ToString();
                    }
                    int num = value;
                    switch (num)
                    {
                        case -3002:
                            {
                                int pROVIDERTHISUSERALREADYINROLE = ErrRes.PROVIDER_THIS_USER_ALREADY_IN_ROLE;
                                string[] strArrays = new string[] { str, empty };
                                throw new ProviderException(MsgManager.GetMsg(pROVIDERTHISUSERALREADYINROLE, strArrays));
                            }
                        case -3001:
                            {
                                int pROVIDERROLENOTFOUND = ErrRes.PROVIDER_ROLE_NOT_FOUND;
                                string[] strArrays1 = new string[] { empty };
                                throw new ProviderException(MsgManager.GetMsg(pROVIDERROLENOTFOUND, strArrays1));
                            }
                        default:
                            {
                                if (num != 0)
                                {
                                    break;
                                }
                                else
                                {
                                    return;
                                }
                            }
                    }
                }
                catch
                {
                    throw;
                }
            }
            finally
            {
                if (oracleCommand != null)
                {
                    oracleCommand.Dispose();
                }
                if (connection != null)
                {
                    connection.Close();
                    connection = null;
                }
            }
        }

        public override void CreateRole(string roleName)
        {
            Util.CheckParameter(ref roleName, true, true, true, 256, "roleName");
            OracleConnectionHolder connection = null;
            OracleCommand oracleCommand = null;
            try
            {
                try
                {
                    connection = OracleConnectionHelper.GetConnection(this.m_OracleConnectionString);
                    oracleCommand = new OracleCommand("ora_aspnet_Roles_CreateRole", connection.Connection)
                    {
                        CommandTimeout = this.m_CommandTimeout,
                        CommandType = CommandType.StoredProcedure
                    };
                    oracleCommand.Parameters.Add(new OracleParameter("OutResult", OracleDbType.Int32, ParameterDirection.ReturnValue));
                    oracleCommand.Parameters[0].DbType = DbType.Int32;
                    oracleCommand.Parameters.Add(new OracleParameter("ApplicationName_", OracleDbType.NVarchar2));
                    oracleCommand.Parameters[1].Value = this.m_ApplicationName;
                    oracleCommand.Parameters.Add(new OracleParameter("RoleName_", OracleDbType.NVarchar2));
                    oracleCommand.Parameters[2].Value = roleName;
                    oracleCommand.ExecuteNonQuery();
                    int value = (int)oracleCommand.Parameters[0].Value;
                    if (value == -3000)
                    {
                        int pROVIDERROLEALREADYEXISTS = ErrRes.PROVIDER_ROLE_ALREADY_EXISTS;
                        string[] strArrays = new string[] { roleName };
                        throw new ProviderException(MsgManager.GetMsg(pROVIDERROLEALREADYEXISTS, strArrays));
                    }
                    if (value == 0)
                    {
                        return;
                    }
                }
                catch
                {
                    throw;
                }
            }
            finally
            {
                if (oracleCommand != null)
                {
                    oracleCommand.Dispose();
                }
                if (connection != null)
                {
                    connection.Close();
                    connection = null;
                }
            }
        }

        public override bool DeleteRole(string roleName, bool throwOnPopulatedRole)
        {
            bool flag;
            Util.CheckParameter(ref roleName, true, true, true, 256, "roleName");
            OracleConnectionHolder connection = null;
            OracleCommand oracleCommand = null;
            try
            {
                try
                {
                    connection = OracleConnectionHelper.GetConnection(this.m_OracleConnectionString);
                    oracleCommand = new OracleCommand("ora_aspnet_Roles_DeleteRole", connection.Connection)
                    {
                        CommandTimeout = this.m_CommandTimeout,
                        CommandType = CommandType.StoredProcedure
                    };
                    oracleCommand.Parameters.Add(new OracleParameter("OutResult", OracleDbType.Int32, ParameterDirection.ReturnValue));
                    oracleCommand.Parameters[0].DbType = DbType.Int32;
                    oracleCommand.Parameters.Add(new OracleParameter("ApplicationName_", OracleDbType.NVarchar2));
                    oracleCommand.Parameters[1].Value = this.m_ApplicationName;
                    oracleCommand.Parameters.Add(new OracleParameter("RoleName_", OracleDbType.NVarchar2));
                    oracleCommand.Parameters[2].Value = roleName;
                    oracleCommand.Parameters.Add(new OracleParameter("DeleteOnlyIfRoleIsEmpty", OracleDbType.Int32));
                    if (!throwOnPopulatedRole)
                    {
                        oracleCommand.Parameters[3].Value = 0;
                    }
                    else
                    {
                        oracleCommand.Parameters[3].Value = 1;
                    }
                    oracleCommand.ExecuteNonQuery();
                    int value = (int)oracleCommand.Parameters[0].Value;
                    if (value == -3005)
                    {
                        throw new ProviderException(MsgManager.GetMsg(ErrRes.ROLE_IS_NOT_EMPTY, new string[0]));
                    }
                    flag = value == 0;
                }
                catch
                {
                    throw;
                }
            }
            finally
            {
                if (oracleCommand != null)
                {
                    oracleCommand.Dispose();
                }
                if (connection != null)
                {
                    connection.Close();
                    connection = null;
                }
            }
            return flag;
        }

        public override string[] FindUsersInRole(string roleName, string userNameToMatch)
        {
            string[] strArrays;
            Util.CheckParameter(ref roleName, true, true, true, 256, "roleName");
            Util.CheckParameter(ref userNameToMatch, true, true, false, 256, "userNameToMatch");
            OracleConnectionHolder connection = null;
            OracleCommand oracleCommand = null;
            OracleDataReader oracleDataReader = null;
            try
            {
                try
                {
                    StringCollection stringCollections = new StringCollection();
                    connection = OracleConnectionHelper.GetConnection(this.m_OracleConnectionString);
                    oracleCommand = new OracleCommand("ora_aspnet_UIR_FindUsersInRole", connection.Connection)
                    {
                        CommandTimeout = this.m_CommandTimeout,
                        CommandType = CommandType.StoredProcedure
                    };
                    OracleParameter oracleParameter = oracleCommand.Parameters.Add("OutResult", OracleDbType.Int32, ParameterDirection.ReturnValue);
                    oracleParameter.DbType = DbType.Int32;
                    OracleParameter mApplicationName = oracleCommand.Parameters.Add("ApplicationName_", OracleDbType.NVarchar2);
                    mApplicationName.Value = this.m_ApplicationName;
                    oracleCommand.Parameters.Add("RoleName_", OracleDbType.NVarchar2).Value = roleName;
                    oracleCommand.Parameters.Add("UserNameToMatch", OracleDbType.NVarchar2).Value = userNameToMatch;
                    oracleCommand.Parameters.Add("UserCursor", OracleDbType.RefCursor).Direction = ParameterDirection.Output;
                    oracleDataReader = oracleCommand.ExecuteReader();
                    int value = (int)oracleCommand.Parameters[0].Value;
                    while (oracleDataReader.Read())
                    {
                        stringCollections.Add(oracleDataReader.GetString(0));
                    }
                    if (stringCollections.Count >= 1)
                    {
                        string[] strArrays1 = new string[stringCollections.Count];
                        stringCollections.CopyTo(strArrays1, 0);
                        strArrays = strArrays1;
                    }
                    else
                    {
                        int num = value;
                        if (num == -3001)
                        {
                            int pROVIDERROLENOTFOUND = ErrRes.PROVIDER_ROLE_NOT_FOUND;
                            string[] strArrays2 = new string[] { roleName };
                            throw new ProviderException(MsgManager.GetMsg(pROVIDERROLENOTFOUND, strArrays2));
                        }
                        strArrays = (num != 0 ? new string[0] : new string[0]);
                    }
                }
                catch
                {
                    throw;
                }
            }
            finally
            {
                if (oracleDataReader != null)
                {
                    oracleDataReader.Dispose();
                }
                if (oracleCommand != null)
                {
                    oracleCommand.Dispose();
                }
                if (connection != null)
                {
                    connection.Close();
                    connection = null;
                }
            }
            return strArrays;
        }

        public override string[] GetAllRoles()
        {
            string[] strArrays;
            OracleConnectionHolder connection = null;
            OracleCommand oracleCommand = null;
            OracleDataReader oracleDataReader = null;
            try
            {
                try
                {
                    StringCollection stringCollections = new StringCollection();
                    connection = OracleConnectionHelper.GetConnection(this.m_OracleConnectionString);
                    oracleCommand = new OracleCommand("ora_aspnet_Roles_GetAllRoles", connection.Connection)
                    {
                        CommandTimeout = this.m_CommandTimeout,
                        CommandType = CommandType.StoredProcedure
                    };
                    OracleParameter oracleParameter = oracleCommand.Parameters.Add("OutResult", OracleDbType.Int32, ParameterDirection.ReturnValue);
                    oracleParameter.DbType = DbType.Int32;
                    OracleParameter mApplicationName = oracleCommand.Parameters.Add("ApplicationName_", OracleDbType.NVarchar2);
                    mApplicationName.Value = this.m_ApplicationName;
                    oracleCommand.Parameters.Add("RoleCursor", OracleDbType.RefCursor).Direction = ParameterDirection.Output;
                    oracleDataReader = oracleCommand.ExecuteReader();
                    while (oracleDataReader.Read())
                    {
                        stringCollections.Add(oracleDataReader.GetString(0));
                    }
                    string[] strArrays1 = new string[stringCollections.Count];
                    stringCollections.CopyTo(strArrays1, 0);
                    strArrays = strArrays1;
                }
                catch
                {
                    throw;
                }
            }
            finally
            {
                if (oracleDataReader != null)
                {
                    oracleDataReader.Dispose();
                }
                if (oracleCommand != null)
                {
                    oracleCommand.Dispose();
                }
                if (connection != null)
                {
                    connection.Close();
                    connection = null;
                }
            }
            return strArrays;
        }

        public override string[] GetRolesForUser(string userName)
        {
            string[] strArrays;
            Util.CheckParameter(ref userName, true, false, true, 256, "userName");
            if (userName.Length < 1)
            {
                return new string[0];
            }
            OracleConnectionHolder connection = null;
            OracleCommand oracleCommand = null;
            OracleDataReader oracleDataReader = null;
            try
            {
                try
                {
                    StringCollection stringCollections = new StringCollection();
                    connection = OracleConnectionHelper.GetConnection(this.m_OracleConnectionString);
                    oracleCommand = new OracleCommand("ora_aspnet_UIR_GetRolesForUser", connection.Connection)
                    {
                        CommandTimeout = this.m_CommandTimeout,
                        CommandType = CommandType.StoredProcedure
                    };
                    OracleParameter oracleParameter = oracleCommand.Parameters.Add("OutResult", OracleDbType.Int32, ParameterDirection.ReturnValue);
                    oracleParameter.DbType = DbType.Int32;
                    OracleParameter mApplicationName = oracleCommand.Parameters.Add("ApplicationName_", OracleDbType.NVarchar2);
                    mApplicationName.Value = this.m_ApplicationName;
                    oracleCommand.Parameters.Add("UserName_", OracleDbType.NVarchar2).Value = userName;
                    oracleCommand.Parameters.Add("RoleCursor", OracleDbType.RefCursor).Direction = ParameterDirection.Output;
                    oracleDataReader = oracleCommand.ExecuteReader();
                    int value = (int)oracleCommand.Parameters[0].Value;
                    while (oracleDataReader.Read())
                    {
                        stringCollections.Add(oracleDataReader.GetString(0));
                    }
                    if (stringCollections.Count >= 1)
                    {
                        string[] strArrays1 = new string[stringCollections.Count];
                        stringCollections.CopyTo(strArrays1, 0);
                        strArrays = strArrays1;
                    }
                    else
                    {
                        strArrays = new string[0];
                    }
                }
                catch
                {
                    throw;
                }
            }
            finally
            {
                if (oracleDataReader != null)
                {
                    oracleDataReader.Dispose();
                }
                if (oracleCommand != null)
                {
                    oracleCommand.Dispose();
                }
                if (connection != null)
                {
                    connection.Close();
                    connection = null;
                }
            }
            return strArrays;
        }

        public override string[] GetUsersInRole(string roleName)
        {
            string[] strArrays;
            Util.CheckParameter(ref roleName, true, true, true, 256, "roleName");
            OracleConnectionHolder connection = null;
            OracleCommand oracleCommand = null;
            OracleDataReader oracleDataReader = null;
            try
            {
                try
                {
                    StringCollection stringCollections = new StringCollection();
                    connection = OracleConnectionHelper.GetConnection(this.m_OracleConnectionString);
                    oracleCommand = new OracleCommand("ora_aspnet_UIR_GetUsersInRoles", connection.Connection)
                    {
                        CommandTimeout = this.m_CommandTimeout,
                        CommandType = CommandType.StoredProcedure
                    };
                    OracleParameter oracleParameter = oracleCommand.Parameters.Add("OutResult", OracleDbType.Int32, ParameterDirection.ReturnValue);
                    oracleParameter.DbType = DbType.Int32;
                    OracleParameter mApplicationName = oracleCommand.Parameters.Add("ApplicationName_", OracleDbType.NVarchar2);
                    mApplicationName.Value = this.m_ApplicationName;
                    oracleCommand.Parameters.Add("RoleName_", OracleDbType.NVarchar2).Value = roleName;
                    oracleCommand.Parameters.Add("UserCursor", OracleDbType.RefCursor).Direction = ParameterDirection.Output;
                    oracleDataReader = oracleCommand.ExecuteReader();
                    int value = (int)oracleCommand.Parameters[0].Value;
                    while (oracleDataReader.Read())
                    {
                        stringCollections.Add(oracleDataReader.GetString(0));
                    }
                    if (stringCollections.Count >= 1)
                    {
                        string[] strArrays1 = new string[stringCollections.Count];
                        stringCollections.CopyTo(strArrays1, 0);
                        strArrays = strArrays1;
                    }
                    else
                    {
                        int num = value;
                        if (num == -3001)
                        {
                            int pROVIDERROLENOTFOUND = ErrRes.PROVIDER_ROLE_NOT_FOUND;
                            string[] strArrays2 = new string[] { roleName };
                            throw new ProviderException(MsgManager.GetMsg(pROVIDERROLENOTFOUND, strArrays2));
                        }
                        strArrays = (num != 0 ? new string[0] : new string[0]);
                    }
                }
                catch
                {
                    throw;
                }
            }
            finally
            {
                if (oracleDataReader != null)
                {
                    oracleDataReader.Dispose();
                }
                if (oracleCommand != null)
                {
                    oracleCommand.Dispose();
                }
                if (connection != null)
                {
                    connection.Close();
                    connection = null;
                }
            }
            return strArrays;
        }

        public override void Initialize(string name, NameValueCollection config)
        {
            if (config == null)
            {
                throw new ArgumentNullException("config");
            }
            if (string.IsNullOrEmpty(name))
            {
                name = "Cdt.Membership.Security.OracleRoleProvider";
            }
            Util.HandleDescriptionAttribute(config, ErrRes.ROLE_PROVIDER_DESCRIPTION);
            base.Initialize(name, config);
            this.m_CommandTimeout = Convert.ToInt32(Util.GetConfigValue(config["commandTimeout"], "30"));
            if (this.m_CommandTimeout < 0 || this.m_CommandTimeout > 2147483647)
            {
                throw new ProviderException(MsgManager.GetMsg(ErrRes.PROVIDER_INVALID_COMMANDTIMEOUT_VALUE, new string[0]));
            }
            this.m_OracleConnectionString = Util.ReadConnectionString(config).Trim();
            this.m_ApplicationName = Util.ReadAndVerifyApplicationName(config);
            config.Remove("connectionStringName");
            config.Remove("applicationName");
            config.Remove("commandTimeout");
            Util.CheckForUnrecognizedAttribute(config);
        }

        public override bool IsUserInRole(string userName, string roleName)
        {
            bool flag;
            Util.CheckParameter(ref roleName, true, true, true, 256, "roleName");
            Util.CheckParameter(ref userName, true, false, true, 256, "userName");
            if (userName.Length < 1)
            {
                return false;
            }
            OracleConnectionHolder connection = null;
            OracleCommand oracleCommand = null;
            try
            {
                try
                {
                    connection = OracleConnectionHelper.GetConnection(this.m_OracleConnectionString);
                    oracleCommand = new OracleCommand("ora_aspnet_UIR_IsUserInRole", connection.Connection)
                    {
                        CommandTimeout = this.m_CommandTimeout,
                        CommandType = CommandType.StoredProcedure
                    };
                    oracleCommand.Parameters.Add(new OracleParameter("OutResult", OracleDbType.Int32, ParameterDirection.ReturnValue));
                    oracleCommand.Parameters[0].DbType = DbType.Int32;
                    oracleCommand.Parameters.Add(new OracleParameter("ApplicationName_", OracleDbType.NVarchar2));
                    oracleCommand.Parameters[1].Value = this.m_ApplicationName;
                    oracleCommand.Parameters.Add(new OracleParameter("UserName_", OracleDbType.NVarchar2));
                    oracleCommand.Parameters[2].Value = userName;
                    oracleCommand.Parameters.Add(new OracleParameter("RoleName_", OracleDbType.NVarchar2));
                    oracleCommand.Parameters[3].Value = roleName;
                    oracleCommand.ExecuteNonQuery();
                    switch ((int)oracleCommand.Parameters[0].Value)
                    {
                        case 0:
                            {
                                flag = true;
                                return flag;
                            }
                        case 1:
                            {
                                flag = false;
                                return flag;
                            }
                        case 2:
                            {
                                flag = false;
                                return flag;
                            }
                        case 3:
                            {
                                flag = false;
                                return flag;
                            }
                    }
                    flag = false;
                }
                catch
                {
                    throw;
                }
            }
            finally
            {
                if (oracleCommand != null)
                {
                    oracleCommand.Dispose();
                }
                if (connection != null)
                {
                    connection.Close();
                    connection = null;
                }
            }
            return flag;
        }

        public override void RemoveUsersFromRoles(string[] userNames, string[] roleNames)
        {
            Util.CheckArrayParameter(ref roleNames, true, true, true, 256, "roleNames");
            Util.CheckArrayParameter(ref userNames, true, true, true, 256, "userNames");
            string empty = string.Empty;
            string str = string.Empty;
            OracleConnectionHolder connection = null;
            OracleCommand oracleCommand = null;
            try
            {
                try
                {
                    connection = OracleConnectionHelper.GetConnection(this.m_OracleConnectionString);
                    oracleCommand = new OracleCommand("ora_aspnet_UIR_RemUsersFmRoles", connection.Connection)
                    {
                        CommandTimeout = this.m_CommandTimeout,
                        CommandType = CommandType.StoredProcedure
                    };
                    OracleParameter oracleParameter = oracleCommand.Parameters.Add("OutResult", OracleDbType.Int32, ParameterDirection.ReturnValue);
                    oracleParameter.DbType = DbType.Int32;
                    OracleParameter mApplicationName = oracleCommand.Parameters.Add("ApplicationName_", OracleDbType.NVarchar2);
                    mApplicationName.Value = this.m_ApplicationName;
                    OracleParameter length = oracleCommand.Parameters.Add("UserNames_", OracleDbType.NVarchar2);
                    length.CollectionType = OracleCollectionType.PLSQLAssociativeArray;
                    length.Size = (int)userNames.Length;
                    length.Value = userNames;
                    OracleParameter length1 = oracleCommand.Parameters.Add("UserNames_Arr_Size", OracleDbType.Int32);
                    length1.Value = (int)userNames.Length;
                    OracleParameter oracleParameter1 = oracleCommand.Parameters.Add("RoleNames_", OracleDbType.NVarchar2);
                    oracleParameter1.CollectionType = OracleCollectionType.PLSQLAssociativeArray;
                    oracleParameter1.Size = (int)roleNames.Length;
                    oracleParameter1.Value = roleNames;
                    OracleParameter length2 = oracleCommand.Parameters.Add("RoleNames_Arr_Size", OracleDbType.Int32);
                    length2.Value = (int)roleNames.Length;
                    OracleParameter oracleParameter2 = oracleCommand.Parameters.Add("UserName", OracleDbType.NVarchar2, OracleRoleProvider.MAX_NAME_SIZE);
                    oracleParameter2.Direction = ParameterDirection.Output;
                    OracleParameter oracleParameter3 = oracleCommand.Parameters.Add("RoleName", OracleDbType.NVarchar2, OracleRoleProvider.MAX_NAME_SIZE);
                    oracleParameter3.Direction = ParameterDirection.Output;
                    oracleCommand.ExecuteNonQuery();
                    int value = (int)oracleCommand.Parameters[0].Value;
                    if (oracleCommand.Parameters[6].Value.ToString() != "null")
                    {
                        str = oracleCommand.Parameters[6].Value.ToString();
                    }
                    if (oracleCommand.Parameters[7].Value.ToString() != "null")
                    {
                        empty = oracleCommand.Parameters[7].Value.ToString();
                    }
                    int num = value;
                    switch (num)
                    {
                        case -3004:
                            {
                                int pROVIDERTHISUSERNOTFOUND = ErrRes.PROVIDER_THIS_USER_NOT_FOUND;
                                string[] strArrays = new string[] { str };
                                throw new ProviderException(MsgManager.GetMsg(pROVIDERTHISUSERNOTFOUND, strArrays));
                            }
                        case -3003:
                            {
                                int pROVIDERTHISUSERALREADYNOTINROLE = ErrRes.PROVIDER_THIS_USER_ALREADY_NOT_IN_ROLE;
                                string[] strArrays1 = new string[] { str, empty };
                                throw new ProviderException(MsgManager.GetMsg(pROVIDERTHISUSERALREADYNOTINROLE, strArrays1));
                            }
                        case -3002:
                            {
                                break;
                            }
                        case -3001:
                            {
                                int pROVIDERROLENOTFOUND = ErrRes.PROVIDER_ROLE_NOT_FOUND;
                                string[] strArrays2 = new string[] { empty };
                                throw new ProviderException(MsgManager.GetMsg(pROVIDERROLENOTFOUND, strArrays2));
                            }
                        default:
                            {
                                if (num != 0)
                                {
                                    goto case -3002;
                                }
                                return;
                            }
                    }
                }
                catch
                {
                    throw;
                }
            }
            finally
            {
                if (oracleCommand != null)
                {
                    oracleCommand.Dispose();
                }
                if (connection != null)
                {
                    connection.Close();
                    connection = null;
                }
            }
        }

        public override bool RoleExists(string roleName)
        {
            bool flag;
            Util.CheckParameter(ref roleName, true, true, true, 256, "roleName");
            OracleConnectionHolder connection = null;
            OracleCommand oracleCommand = null;
            try
            {
                try
                {
                    connection = OracleConnectionHelper.GetConnection(this.m_OracleConnectionString);
                    oracleCommand = new OracleCommand("ora_aspnet_Roles_RoleExists", connection.Connection)
                    {
                        CommandTimeout = this.m_CommandTimeout,
                        CommandType = CommandType.StoredProcedure
                    };
                    oracleCommand.Parameters.Add(new OracleParameter("OutResult", OracleDbType.Int32, ParameterDirection.ReturnValue));
                    oracleCommand.Parameters[0].DbType = DbType.Int32;
                    oracleCommand.Parameters.Add(new OracleParameter("ApplicationName_", OracleDbType.NVarchar2));
                    oracleCommand.Parameters[1].Value = this.m_ApplicationName;
                    oracleCommand.Parameters.Add(new OracleParameter("RoleName_", OracleDbType.NVarchar2));
                    oracleCommand.Parameters[2].Value = roleName;
                    oracleCommand.ExecuteNonQuery();
                    flag = ((int)oracleCommand.Parameters[0].Value != 0 ? false : true);
                }
                catch
                {
                    throw;
                }
            }
            finally
            {
                if (oracleCommand != null)
                {
                    oracleCommand.Dispose();
                }
                if (connection != null)
                {
                    connection.Close();
                    connection = null;
                }
            }
            return flag;
        }
    }
}
