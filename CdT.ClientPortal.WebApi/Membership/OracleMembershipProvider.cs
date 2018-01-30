using Oracle.DataAccess.Client;
using Oracle.DataAccess.Types;
using System;
using System.Collections.Specialized;
using System.Configuration;
using System.Configuration.Provider;
using System.Data;
using System.Globalization;
using System.Security.Cryptography;
using System.Text;
using System.Web.Configuration;
using System.Web.Security;
using System.Resources;
using System.Reflection;
using System.Threading;
using System.Collections;
using System.Web;
using System.Web.Hosting;
using System.Diagnostics;

namespace ClientPortal.Membership.Web.Security
{
    public class OracleMembershipProvider : MembershipProvider
    {
        private const int PASSWORD_SIZE = 14;

        private string m_OracleConnectionString;

        private bool m_EnablePasswordRetrieval;

        private bool m_EnablePasswordReset;

        private bool m_RequiresQuestionAndAnswer;

        private string m_ApplicationName;

        private bool m_RequiresUniqueEmail;

        private int m_MaxInvalidPasswordAttempts;

        private int m_CommandTimeout;

        private int m_PasswordAttemptWindow;

        private int m_MinRequiredPasswordLength;

        private int m_MinRequiredNonAlphanumericCharacters;

        private string m_PasswordStrengthRegularExpression;

        private MembershipPasswordFormat m_PasswordFormat;

        private string m_passwordCompatMode = "Framework20";

        private string m_hashAlgorithmType = "SHA1";

        private static string m_spCreateUser;

        private static string m_spChangePwdQAndA;

        private static string m_spSetPassword;

        private static string m_spResetPassword;

        private static string m_spUpdateUser;

        private static string m_spUnlockUser;

        private static string m_spGetUserByUid;

        private static string m_spGetUserByName;

        private static string m_spGetUserByEml;

        private static string m_spDeleteUser;

        private static string m_spDeleteUser2;

        private static string m_spGetAllUsers;

        private static string m_spGetNumOfUsersOn;

        private static string m_spFindUsersByName;

        private static string m_spFindUsersByEml;

        private static string m_spUpdateUserInfo;

        private static string m_spGetPwdWithFmt;

        private static string m_spGetPassword;

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

        public override bool EnablePasswordReset
        {
            get
            {
                return this.m_EnablePasswordReset;
            }
        }

        public override bool EnablePasswordRetrieval
        {
            get
            {
                return this.m_EnablePasswordRetrieval;
            }
        }

        public override int MaxInvalidPasswordAttempts
        {
            get
            {
                return this.m_MaxInvalidPasswordAttempts;
            }
        }

        public override int MinRequiredNonAlphanumericCharacters
        {
            get
            {
                return this.m_MinRequiredNonAlphanumericCharacters;
            }
        }

        public override int MinRequiredPasswordLength
        {
            get
            {
                return this.m_MinRequiredPasswordLength;
            }
        }

        public override int PasswordAttemptWindow
        {
            get
            {
                return this.m_PasswordAttemptWindow;
            }
        }

        public string PasswordCompatMode
        {
            get
            {
                return this.m_passwordCompatMode;
            }
        }

        public override MembershipPasswordFormat PasswordFormat
        {
            get
            {
                return this.m_PasswordFormat;
            }
        }

        public override string PasswordStrengthRegularExpression
        {
            get
            {
                return this.m_PasswordStrengthRegularExpression;
            }
        }

        public override bool RequiresQuestionAndAnswer
        {
            get
            {
                return this.m_RequiresQuestionAndAnswer;
            }
        }

        public override bool RequiresUniqueEmail
        {
            get
            {
                return this.m_RequiresUniqueEmail;
            }
        }

        static OracleMembershipProvider()
        {
            OracleMembershipProvider.m_spCreateUser = "ora_aspnet_Mem_CreateUser";
            OracleMembershipProvider.m_spChangePwdQAndA = "ora_aspnet_Mem_ChangePwdQAndA";
            OracleMembershipProvider.m_spSetPassword = "ora_aspnet_Mem_SetPassword";
            OracleMembershipProvider.m_spResetPassword = "ora_aspnet_Mem_ResetPassword";
            OracleMembershipProvider.m_spUpdateUser = "ora_aspnet_Mem_UpdateUser";
            OracleMembershipProvider.m_spUnlockUser = "ora_aspnet_Mem_UnlockUser";
            OracleMembershipProvider.m_spGetUserByUid = "ora_aspnet_Mem_GetUserByUid";
            OracleMembershipProvider.m_spGetUserByName = "ora_aspnet_Mem_GetUserByName";
            OracleMembershipProvider.m_spGetUserByEml = "ora_aspnet_Mem_GetUserByEml";
            OracleMembershipProvider.m_spDeleteUser = "ora_aspnet_Users_DeleteUser";
            OracleMembershipProvider.m_spDeleteUser2 = "ora_aspnet_Mem_DeleteUser";
            OracleMembershipProvider.m_spGetAllUsers = "ORA_ASPNET_GETALLUSERS";//"ora_aspnet_Mem_GetAllUsers";
            OracleMembershipProvider.m_spGetNumOfUsersOn = "ora_aspnet_Mem_GetNumOfUsersOn";
            OracleMembershipProvider.m_spFindUsersByName = "ora_aspnet_Mem_FindUsersByName";
            OracleMembershipProvider.m_spFindUsersByEml = "ora_aspnet_Mem_FindUsersByEml";
            OracleMembershipProvider.m_spUpdateUserInfo = "ora_aspnet_Mem_UpdateUserInfo";
            OracleMembershipProvider.m_spGetPwdWithFmt = "ora_aspnet_Mem_GetPwdWithFmt";
            OracleMembershipProvider.m_spGetPassword = "ora_aspnet_Mem_GetPassword";
        }

        public OracleMembershipProvider()
        {
        }

        public override MembershipUser GetUser(object providerUserKey, bool userIsOnline)
        {
            MembershipUser membershipUser;
            if (providerUserKey == null)
            {
                throw new ArgumentNullException("providerUserKey");
            }
            if (!(providerUserKey is Guid))
            {
                throw new ArgumentException(MsgManager.GetMsg(ErrRes.MEMBERSHIP_INVALID_PROVIDER_USER_KEY, new string[0]));
            }
            try
            {
                OracleCommand oracleCommand = null;
                OracleParameter oracleParameter = null;
                OracleParameter oracleParameter1 = null;
                OracleConnectionHolder connection = null;
                try
                {
                    connection = OracleConnectionHelper.GetConnection(this.m_OracleConnectionString);
                    oracleCommand = new OracleCommand(OracleMembershipProvider.m_spGetUserByUid, connection.Connection)
                    {
                        CommandTimeout = this.m_CommandTimeout,
                        CommandType = CommandType.StoredProcedure
                    };
                    oracleParameter = oracleCommand.Parameters.Add("ReturnValue", OracleDbType.Int32, ParameterDirection.ReturnValue);
                    OracleParameterCollection parameters = oracleCommand.Parameters;
                    Guid guid = (Guid)providerUserKey;
                    parameters.Add(this.CreateInputParam("UserId_", OracleDbType.Raw, guid.ToByteArray()));
                    oracleParameter1 = oracleCommand.Parameters.Add("CurrentTimeUtc", DateTime.UtcNow);
                    oracleParameter1.DbType = DbType.DateTime;
                    if (!userIsOnline)
                    {
                        oracleCommand.Parameters.Add(this.CreateInputParam("UpdateLastActivity", OracleDbType.Int32, 0));
                    }
                    else
                    {
                        oracleCommand.Parameters.Add(this.CreateInputParam("UpdateLastActivity", OracleDbType.Int32, 1));
                    }
                    oracleCommand.Parameters.Add("Email_", OracleDbType.NVarchar2, 256, null, ParameterDirection.Output);
                    oracleCommand.Parameters.Add("PasswordQuestion_", OracleDbType.NVarchar2, 256, null, ParameterDirection.Output);
                    oracleCommand.Parameters.Add("Comments_", OracleDbType.NClob, ParameterDirection.Output);
                    oracleCommand.Parameters.Add("IsApproved_", OracleDbType.Int32, ParameterDirection.Output);
                    oracleCommand.Parameters.Add("CreateDate_", OracleDbType.Date, ParameterDirection.Output);
                    oracleCommand.Parameters.Add("LastLoginDate_", OracleDbType.Date, ParameterDirection.Output);
                    oracleCommand.Parameters.Add("LastActivityDate_", OracleDbType.Date, ParameterDirection.Output);
                    oracleCommand.Parameters.Add("LastPasswordChangedDate_", OracleDbType.Date, ParameterDirection.Output);
                    oracleCommand.Parameters.Add("UserName_", OracleDbType.NVarchar2, 256, null, ParameterDirection.Output);
                    oracleCommand.Parameters.Add("IsLockedOut_", OracleDbType.Int32, ParameterDirection.Output);
                    oracleCommand.Parameters.Add("LastLockoutDate_", OracleDbType.Date, ParameterDirection.Output);
                    oracleCommand.ExecuteNonQuery();
                    if (oracleParameter.Value == null || !((OracleDecimal)oracleParameter.Value == 0))
                    {
                        membershipUser = null;
                    }
                    else
                    {
                        string value = null;
                        if (!((OracleString)oracleCommand.Parameters["Email_"].Value).IsNull)
                        {
                            value = ((OracleString)oracleCommand.Parameters["Email_"].Value).Value;
                        }
                        string str = null;
                        if (!((OracleString)oracleCommand.Parameters["PasswordQuestion_"].Value).IsNull)
                        {
                            str = ((OracleString)oracleCommand.Parameters["PasswordQuestion_"].Value).Value;
                        }
                        string value1 = null;
                        if (!((OracleClob)oracleCommand.Parameters["Comments_"].Value).IsNull)
                        {
                            value1 = ((OracleClob)oracleCommand.Parameters["Comments_"].Value).Value;
                        }
                        bool flag = false;
                        if ((OracleDecimal)oracleCommand.Parameters["IsApproved_"].Value > 0)
                        {
                            flag = true;
                        }
                        OracleDate oracleDate = (OracleDate)oracleCommand.Parameters["CreateDate_"].Value;
                        DateTime localTime = oracleDate.Value.ToLocalTime();
                        OracleDate oracleDate1 = (OracleDate)oracleCommand.Parameters["LastLoginDate_"].Value;
                        DateTime dateTime = oracleDate1.Value.ToLocalTime();
                        OracleDate value2 = (OracleDate)oracleCommand.Parameters["LastActivityDate_"].Value;
                        DateTime localTime1 = value2.Value.ToLocalTime();
                        OracleDate oracleDate2 = (OracleDate)oracleCommand.Parameters["LastPasswordChangedDate_"].Value;
                        DateTime dateTime1 = oracleDate2.Value.ToLocalTime();
                        string str1 = ((OracleString)oracleCommand.Parameters["UserName_"].Value).Value;
                        bool flag1 = false;
                        if ((OracleDecimal)oracleCommand.Parameters["IsLockedOut_"].Value > 0)
                        {
                            flag1 = true;
                        }
                        OracleDate value3 = (OracleDate)oracleCommand.Parameters["LastLockoutDate_"].Value;
                        DateTime localTime2 = value3.Value.ToLocalTime();
                        membershipUser = new MembershipUser(this.Name, str1, providerUserKey, value, str, value1, flag, flag1, localTime, dateTime, localTime1, dateTime1, localTime2);
                    }
                }
                finally
                {
                    if (oracleParameter != null)
                    {
                        oracleParameter.Dispose();
                    }
                    if (oracleParameter1 != null)
                    {
                        oracleParameter1.Dispose();
                    }
                    if (oracleCommand != null)
                    {
                        oracleCommand.Parameters.Clear();
                        oracleCommand.Dispose();
                    }
                    if (connection != null)
                    {
                        connection.Close();
                        connection = null;
                    }
                }
            }
            catch
            {
                throw;
            }
            return membershipUser;
        }

        public override MembershipUser GetUser(string username, bool userIsOnline)
        {
            MembershipUser membershipUser;
            Util.CheckParameter(ref username, true, false, true, 256, "username");
            try
            {
                OracleCommand oracleCommand = null;
                OracleParameter oracleParameter = null;
                OracleParameter oracleParameter1 = null;
                OracleConnectionHolder connection = null;
                try
                {
                    connection = OracleConnectionHelper.GetConnection(this.m_OracleConnectionString);
                    oracleCommand = new OracleCommand(OracleMembershipProvider.m_spGetUserByName, connection.Connection)
                    {
                        CommandTimeout = this.m_CommandTimeout,
                        CommandType = CommandType.StoredProcedure
                    };
                    oracleParameter = oracleCommand.Parameters.Add("ReturnValue", OracleDbType.Int32, ParameterDirection.ReturnValue);
                    oracleCommand.Parameters.Add(this.CreateInputParam("ApplicationName_", OracleDbType.NVarchar2, this.m_ApplicationName));
                    oracleCommand.Parameters.Add(this.CreateInputParam("UserName_", OracleDbType.NVarchar2, username));
                    oracleParameter1 = oracleCommand.Parameters.Add("CurrentTimeUtc", DateTime.UtcNow);
                    oracleParameter1.DbType = DbType.DateTime;
                    if (!userIsOnline)
                    {
                        oracleCommand.Parameters.Add(this.CreateInputParam("UpdateLastActivity", OracleDbType.Int32, 0));
                    }
                    else
                    {
                        oracleCommand.Parameters.Add(this.CreateInputParam("UpdateLastActivity", OracleDbType.Int32, 1));
                    }
                    oracleCommand.Parameters.Add("Email_", OracleDbType.NVarchar2, 256, null, ParameterDirection.Output);
                    oracleCommand.Parameters.Add("PasswordQuestion_", OracleDbType.NVarchar2, 256, null, ParameterDirection.Output);
                    oracleCommand.Parameters.Add("Comments_", OracleDbType.NClob, ParameterDirection.Output);
                    oracleCommand.Parameters.Add("IsApproved_", OracleDbType.Int32, ParameterDirection.Output);
                    oracleCommand.Parameters.Add("CreateDate_", OracleDbType.Date, ParameterDirection.Output);
                    oracleCommand.Parameters.Add("LastLoginDate_", OracleDbType.Date, ParameterDirection.Output);
                    oracleCommand.Parameters.Add("LastActivityDate_", OracleDbType.Date, ParameterDirection.Output);
                    oracleCommand.Parameters.Add("LastPasswordChangedDate_", OracleDbType.Date, ParameterDirection.Output);
                    byte[] numArray = new byte[16];
                    oracleCommand.Parameters.Add("UserId_", OracleDbType.Raw, 16, numArray, ParameterDirection.Output);
                    oracleCommand.Parameters.Add("IsLockedOut_", OracleDbType.Int32, ParameterDirection.Output);
                    oracleCommand.Parameters.Add("LastLockoutDate_", OracleDbType.Date, ParameterDirection.Output);
                    oracleCommand.ExecuteNonQuery();
                    if (oracleParameter.Value == null || !((OracleDecimal)oracleParameter.Value == 0))
                    {
                        membershipUser = null;
                    }
                    else
                    {
                        string value = null;
                        if (!((OracleString)oracleCommand.Parameters["Email_"].Value).IsNull)
                        {
                            value = ((OracleString)oracleCommand.Parameters["Email_"].Value).Value;
                        }
                        string str = null;
                        if (!((OracleString)oracleCommand.Parameters["PasswordQuestion_"].Value).IsNull)
                        {
                            str = ((OracleString)oracleCommand.Parameters["PasswordQuestion_"].Value).Value;
                        }
                        string value1 = null;
                        if (!((OracleClob)oracleCommand.Parameters["Comments_"].Value).IsNull)
                        {
                            value1 = ((OracleClob)oracleCommand.Parameters["Comments_"].Value).Value;
                        }
                        bool flag = false;
                        if ((OracleDecimal)oracleCommand.Parameters["IsApproved_"].Value > 0)
                        {
                            flag = true;
                        }
                        OracleDate oracleDate = (OracleDate)oracleCommand.Parameters["CreateDate_"].Value;
                        DateTime localTime = oracleDate.Value.ToLocalTime();
                        OracleDate oracleDate1 = (OracleDate)oracleCommand.Parameters["LastLoginDate_"].Value;
                        DateTime dateTime = oracleDate1.Value.ToLocalTime();
                        OracleDate value2 = (OracleDate)oracleCommand.Parameters["LastActivityDate_"].Value;
                        DateTime localTime1 = value2.Value.ToLocalTime();
                        OracleDate oracleDate2 = (OracleDate)oracleCommand.Parameters["LastPasswordChangedDate_"].Value;
                        DateTime dateTime1 = oracleDate2.Value.ToLocalTime();
                        OracleBinary oracleBinary = (OracleBinary)oracleCommand.Parameters["UserId_"].Value;
                        Guid guid = new Guid(oracleBinary.Value);
                        bool flag1 = false;
                        if ((OracleDecimal)oracleCommand.Parameters["IsLockedOut_"].Value > 0)
                        {
                            flag1 = true;
                        }
                        OracleDate value3 = (OracleDate)oracleCommand.Parameters["LastLockoutDate_"].Value;
                        DateTime localTime2 = value3.Value.ToLocalTime();
                        membershipUser = new MembershipUser(this.Name, username, (object)guid, value, str, value1, flag, flag1, localTime, dateTime, localTime1, dateTime1, localTime2);
                    }
                }
                finally
                {
                    if (oracleParameter != null)
                    {
                        oracleParameter.Dispose();
                    }
                    if (oracleParameter1 != null)
                    {
                        oracleParameter1.Dispose();
                    }
                    if (oracleCommand != null)
                    {
                        oracleCommand.Parameters.Clear();
                        oracleCommand.Dispose();
                    }
                    if (connection != null)
                    {
                        connection.Close();
                        connection = null;
                    }
                }
            }
            catch
            {
                throw;
            }
            return membershipUser;
        }

        private OracleParameter CreateInputParam(string paramName, OracleDbType dbType, object objValue)
        {
            OracleParameter oracleParameter = new OracleParameter(paramName, dbType);
            if (objValue != null)
            {
                oracleParameter.Value = objValue;
            }
            else
            {
                oracleParameter.IsNullable = true;
                oracleParameter.Value = DBNull.Value;
            }
            return oracleParameter;
        }

        private void GetPasswordWithFormat(string username, bool updateLastLoginActivityDate, out int status, out string password, out int passwordFormat, out string passwordSalt, out int failedPasswordAttemptCount, out int failedPasswordAnswerAttemptCount, out bool isApproved, out DateTime lastLoginDate, out DateTime lastActivityDate)
        {
            try
            {
                OracleCommand oracleCommand = null;
                OracleParameter oracleParameter = null;
                OracleParameter oracleParameter1 = null;
                OracleConnectionHolder connection = null;
                try
                {
                    connection = OracleConnectionHelper.GetConnection(this.m_OracleConnectionString);
                    oracleCommand = new OracleCommand(OracleMembershipProvider.m_spGetPwdWithFmt, connection.Connection)
                    {
                        CommandTimeout = this.m_CommandTimeout,
                        CommandType = CommandType.StoredProcedure
                    };
                    oracleParameter = oracleCommand.Parameters.Add("ReturnValue", OracleDbType.Int32, ParameterDirection.ReturnValue);
                    oracleCommand.Parameters.Add(this.CreateInputParam("ApplicationName_", OracleDbType.NVarchar2, this.m_ApplicationName));
                    oracleCommand.Parameters.Add(this.CreateInputParam("UserName_", OracleDbType.NVarchar2, username));
                    if (!updateLastLoginActivityDate)
                    {
                        oracleCommand.Parameters.Add(this.CreateInputParam("UpdateLastLoginActivityDate", OracleDbType.Int32, 0));
                    }
                    else
                    {
                        oracleCommand.Parameters.Add(this.CreateInputParam("UpdateLastLoginActivityDate", OracleDbType.Int32, 1));
                    }
                    oracleParameter1 = oracleCommand.Parameters.Add("CurrentTimeUtc", DateTime.UtcNow);
                    oracleParameter1.DbType = DbType.DateTime;
                    oracleCommand.Parameters.Add("Password_", OracleDbType.NVarchar2, 128, null, ParameterDirection.Output);
                    oracleCommand.Parameters.Add("PasswordFormat_", OracleDbType.Decimal, 38, 0, ParameterDirection.Output);
                    oracleCommand.Parameters.Add("PasswordSalt_", OracleDbType.NVarchar2, 128, null, ParameterDirection.Output);
                    oracleCommand.Parameters.Add("FailedPwdAttemptCount_", OracleDbType.Decimal, 38, 0, ParameterDirection.Output);
                    oracleCommand.Parameters.Add("FailedPwdAnswerAttemptCount_", OracleDbType.Decimal, 38, 0, ParameterDirection.Output);
                    oracleCommand.Parameters.Add("IsApproved_", OracleDbType.Int32, ParameterDirection.Output);
                    oracleCommand.Parameters.Add("LastLoginDate_", OracleDbType.Date, ParameterDirection.Output);
                    oracleCommand.Parameters.Add("LastActivityDate_", OracleDbType.Date, ParameterDirection.Output);
                    oracleCommand.ExecuteNonQuery();
                    status = -1;
                    if (oracleParameter == null || !((OracleDecimal)oracleParameter.Value == 0))
                    {
                        password = null;
                        passwordFormat = 0;
                        passwordSalt = null;
                        failedPasswordAttemptCount = 0;
                        failedPasswordAnswerAttemptCount = 0;
                        isApproved = false;
                        lastLoginDate = DateTime.UtcNow;
                        lastActivityDate = DateTime.UtcNow;
                        status = ErrRes.MEMBERSHIP_PROVIDER_ERROR;
                    }
                    else
                    {
                        OracleString value = (OracleString)oracleCommand.Parameters["Password_"].Value;
                        password = value.Value;
                        passwordFormat = (int)((OracleDecimal)oracleCommand.Parameters["PasswordFormat_"].Value);
                        OracleString oracleString = (OracleString)oracleCommand.Parameters["PasswordSalt_"].Value;
                        passwordSalt = oracleString.Value;
                        failedPasswordAttemptCount = (int)((OracleDecimal)oracleCommand.Parameters["FailedPwdAttemptCount_"].Value);
                        failedPasswordAnswerAttemptCount = (int)((OracleDecimal)oracleCommand.Parameters["FailedPwdAnswerAttemptCount_"].Value);
                        if ((OracleDecimal)oracleCommand.Parameters["IsApproved_"].Value != 0)
                        {
                            isApproved = true;
                        }
                        else
                        {
                            isApproved = false;
                        }
                        OracleDate oracleDate = (OracleDate)oracleCommand.Parameters["LastLoginDate_"].Value;
                        lastLoginDate = oracleDate.Value.ToLocalTime();
                        OracleDate value1 = (OracleDate)oracleCommand.Parameters["LastActivityDate_"].Value;
                        lastActivityDate = value1.Value.ToLocalTime();
                        status = 0;
                    }
                }
                finally
                {
                    if (oracleParameter != null)
                    {
                        oracleParameter.Dispose();
                    }
                    if (oracleParameter1 != null)
                    {
                        oracleParameter1.Dispose();
                    }
                    if (oracleCommand != null)
                    {
                        oracleCommand.Parameters.Clear();
                        oracleCommand.Dispose();
                    }
                    if (connection != null)
                    {
                        connection.Close();
                        connection = null;
                    }
                }
            }
            catch
            {
                throw;
            }
        }

        internal string EncodePassword(string pass, int passwordFormat, string salt)
        {
            int num = 0;
            if (passwordFormat == 0)
            {
                return pass;
            }
            if (System.Web.Security.Membership.HashAlgorithmType != null)
            {
                this.m_hashAlgorithmType = System.Web.Security.Membership.HashAlgorithmType;
            }
            if (this.m_passwordCompatMode == "Framework20")
            {
                if (this.m_hashAlgorithmType.ToUpper(CultureInfo.InvariantCulture) != "MD5")
                {
                    this.m_hashAlgorithmType = "SHA1";
                }
            }
            else if (this.m_hashAlgorithmType.ToUpper(CultureInfo.InvariantCulture) == "AES" || this.m_hashAlgorithmType.ToUpper(CultureInfo.InvariantCulture) == "3DES")
            {
                this.m_hashAlgorithmType = "SHA1";
            }
            byte[] bytes = Encoding.Unicode.GetBytes(pass);
            byte[] numArray = Convert.FromBase64String(salt);
            byte[] numArray1 = new byte[(int)numArray.Length + (int)bytes.Length];
            byte[] numArray2 = null;
            Buffer.BlockCopy(numArray, 0, numArray1, 0, (int)numArray.Length);
            Buffer.BlockCopy(bytes, 0, numArray1, (int)numArray.Length, (int)bytes.Length);
            if (passwordFormat != 1)
            {
                numArray2 = this.EncryptPassword(numArray1);
            }
            else
            {
                HashAlgorithm hashAlgorithm = HashAlgorithm.Create(this.m_hashAlgorithmType);
                if (!(hashAlgorithm is KeyedHashAlgorithm))
                {
                    numArray2 = hashAlgorithm.ComputeHash(numArray1);
                }
                else
                {
                    KeyedHashAlgorithm keyedHashAlgorithm = (KeyedHashAlgorithm)hashAlgorithm;
                    if ((int)keyedHashAlgorithm.Key.Length == (int)numArray.Length)
                    {
                        keyedHashAlgorithm.Key = numArray;
                    }
                    else if ((int)keyedHashAlgorithm.Key.Length >= (int)numArray.Length)
                    {
                        byte[] numArray3 = new byte[(int)keyedHashAlgorithm.Key.Length];
                        for (int i = 0; i < (int)numArray3.Length; i = i + num)
                        {
                            num = Math.Min((int)numArray.Length, (int)numArray3.Length - i);
                            Buffer.BlockCopy(numArray, 0, numArray3, i, num);
                        }
                        keyedHashAlgorithm.Key = numArray3;
                    }
                    else
                    {
                        byte[] numArray4 = new byte[(int)keyedHashAlgorithm.Key.Length];
                        Buffer.BlockCopy(numArray, 0, numArray4, 0, (int)numArray4.Length);
                        keyedHashAlgorithm.Key = numArray4;
                    }
                    numArray2 = keyedHashAlgorithm.ComputeHash(numArray1);
                }
            }
            return Convert.ToBase64String(numArray2);
        }

        private bool CheckPassword(string username, string password, bool updateLastLoginActivityDate, bool failIfNotApproved)
        {
            string str;
            int num;
            return this.CheckPassword(username, password, updateLastLoginActivityDate, failIfNotApproved, out str, out num);
        }
        private bool CheckPassword(string username, string password, bool updateLastLoginActivityDate, bool failIfNotApproved, out string salt, out int passwordFormat)
        {
            string str;
            int num;
            int num1;
            int num2;
            bool flag;
            DateTime dateTime;
            DateTime dateTime1;
            bool flag1;
            this.GetPasswordWithFormat(username, updateLastLoginActivityDate, out num, out str, out passwordFormat, out salt, out num1, out num2, out flag, out dateTime, out dateTime1);
            if (num != 0)
            {
                return false;
            }
            if (!flag && failIfNotApproved)
            {
                return false;
            }
            string str1 = this.EncodePassword(password, passwordFormat, salt);
            bool flag2 = str.Equals(str1);
            if (flag2 && num1 == 0 && num2 == 0)
            {
                return true;
            }
            try
            {
                OracleCommand oracleCommand = null;
                OracleParameter oracleParameter = null;
                OracleParameter oracleParameter1 = null;
                OracleParameter oracleParameter2 = null;
                OracleParameter oracleParameter3 = null;
                OracleConnectionHolder connection = null;
                try
                {
                    connection = OracleConnectionHelper.GetConnection(this.m_OracleConnectionString);
                    oracleCommand = new OracleCommand(OracleMembershipProvider.m_spUpdateUserInfo, connection.Connection);
                    DateTime utcNow = DateTime.UtcNow;
                    oracleCommand.CommandTimeout = this.m_CommandTimeout;
                    oracleCommand.CommandType = CommandType.StoredProcedure;
                    oracleParameter = oracleCommand.Parameters.Add("ReturnValue", OracleDbType.Int32, ParameterDirection.ReturnValue);
                    oracleCommand.Parameters.Add(this.CreateInputParam("ApplicationName_", OracleDbType.NVarchar2, this.m_ApplicationName));
                    oracleCommand.Parameters.Add(this.CreateInputParam("UserName_", OracleDbType.NVarchar2, username));
                    if (!flag2)
                    {
                        oracleCommand.Parameters.Add(this.CreateInputParam("IsPasswordCorrect", OracleDbType.Int32, 0));
                    }
                    else
                    {
                        oracleCommand.Parameters.Add(this.CreateInputParam("IsPasswordCorrect", OracleDbType.Int32, 1));
                    }
                    if (!updateLastLoginActivityDate)
                    {
                        oracleCommand.Parameters.Add(this.CreateInputParam("UpdateLastLoginActivityDate", OracleDbType.Int32, 0));
                    }
                    else
                    {
                        oracleCommand.Parameters.Add(this.CreateInputParam("UpdateLastLoginActivityDate", OracleDbType.Int32, 1));
                    }
                    oracleCommand.Parameters.Add(this.CreateInputParam("MaxInvalidPasswordAttempts", OracleDbType.Int32, this.m_MaxInvalidPasswordAttempts));
                    oracleCommand.Parameters.Add(this.CreateInputParam("PasswordAttemptWindow", OracleDbType.Int32, this.m_PasswordAttemptWindow));
                    oracleParameter1 = oracleCommand.Parameters.Add("CurrentTimeUtc", utcNow);
                    oracleParameter1.DbType = DbType.DateTime;
                    oracleParameter2 = (!flag2 ? oracleCommand.Parameters.Add("LastLoginDate_", dateTime) : oracleCommand.Parameters.Add("LastLoginDate_", utcNow));
                    oracleParameter2.DbType = DbType.DateTime;
                    oracleParameter3 = (!flag2 ? oracleCommand.Parameters.Add("LastActivityDate_", dateTime1) : oracleCommand.Parameters.Add("LastActivityDate_", utcNow));
                    oracleParameter3.DbType = DbType.DateTime;
                    oracleCommand.ExecuteNonQuery();
                    flag1 = flag2;
                }
                finally
                {
                    if (oracleParameter != null)
                    {
                        oracleParameter.Dispose();
                    }
                    if (oracleParameter1 != null)
                    {
                        oracleParameter1.Dispose();
                    }
                    if (oracleParameter2 != null)
                    {
                        oracleParameter2.Dispose();
                    }
                    if (oracleParameter3 != null)
                    {
                        oracleParameter3.Dispose();
                    }
                    if (oracleCommand != null)
                    {
                        oracleCommand.Parameters.Clear();
                        oracleCommand.Dispose();
                    }
                    if (connection != null)
                    {
                        connection.Close();
                        connection = null;
                    }
                }
            }
            catch
            {
                throw;
            }
            return flag1;
        }

        public override bool ValidateUser(string username, string password)
        {
            if (Util.IsParameterOK(ref username, true, true, true, 256) && Util.IsParameterOK(ref password, true, true, false, 128) && this.CheckPassword(username, password, true, true))
            {
                return true;
            }
            return false;
        }

        public override MembershipUser CreateUser(string username, string password, string email, string passwordQuestion, string passwordAnswer, bool isApproved, object providerUserKey, out MembershipCreateStatus status)
        {
            throw new NotImplementedException();
        }

        public override bool ChangePasswordQuestionAndAnswer(string username, string password, string newPasswordQuestion, string newPasswordAnswer)
        {
            throw new NotImplementedException();
        }

        public override string GetPassword(string username, string answer)
        {
            throw new NotImplementedException();
        }

        public override bool ChangePassword(string username, string oldPassword, string newPassword)
        {
            throw new NotImplementedException();
        }

        public override string ResetPassword(string username, string answer)
        {
            throw new NotImplementedException();
        }

        public override void UpdateUser(MembershipUser user)
        {
            throw new NotImplementedException();
        }

        public override bool UnlockUser(string userName)
        {
            throw new NotImplementedException();
        }

        public override string GetUserNameByEmail(string email)
        {
            throw new NotImplementedException();
        }

        public override bool DeleteUser(string username, bool deleteAllRelatedData)
        {
            throw new NotImplementedException();
        }

        public override MembershipUserCollection GetAllUsers(int pageIndex, int pageSize, out int totalRecords)
        {
            throw new NotImplementedException();
        }

        public override int GetNumberOfUsersOnline()
        {
            throw new NotImplementedException();
        }

        public override MembershipUserCollection FindUsersByName(string usernameToMatch, int pageIndex, int pageSize, out int totalRecords)
        {
            throw new NotImplementedException();
        }

        public override MembershipUserCollection FindUsersByEmail(string emailToMatch, int pageIndex, int pageSize, out int totalRecords)
        {
            throw new NotImplementedException();
        }
    }

    internal class MsgManager
    {
        private static ResourceManager s_rm;

        static MsgManager()
        {
            MsgManager.s_rm = new ResourceManager("Cdt.Membership.Exception", Assembly.GetExecutingAssembly());
        }

        private MsgManager()
        {
        }

        internal static string GetMsg(int errorcode, params string[] args)
        {
            string str = null;
            CultureInfo currentCulture = Thread.CurrentThread.CurrentCulture;
            string str1 = MsgManager.Instance().GetString(Convert.ToString(errorcode), currentCulture);
            str = (str1 == null ? string.Empty : string.Format(str1, args));
            return str;
        }

        internal static ResourceManager Instance()
        {
            return MsgManager.s_rm;
        }
    }

    internal class ErrRes
    {
        internal static string MEMBERSHIP_PROVIDER_DESCRIPTION;

        internal static string ROLE_PROVIDER_DESCRIPTION;

        internal static string SESSIONSTATE_PROVIDER_DESCRIPTION;

        internal static string PROFILE_PROVIDER_DESCRIPTION;

        internal static string PERSONALIZATION_PROVIDER_DESCRIPTION;

        internal static string SITEMAP_PROVIDER_DESCRIPTION;

        internal static string WEBEVENTS_PROVIDER_DESCRIPTION;

        internal static int MEMBERSHIP_CUSTOM_PWD_VALIDATION_FAILED;

        internal static int MEMBERSHIP_INVALID_USER_NAME;

        internal static int MEMBERSHIP_INVALID_PASSWORD;

        internal static int MEMBERSHIP_INVALID_QUESTION;

        internal static int MEMBERSHIP_INVALID_ANSWER;

        internal static int MEMBERSHIP_INVALID_EMAIL;

        internal static int MEMBERSHIP_DUPLICATED_USER_NAME;

        internal static int MEMBERSHIP_DUPLICATED_EMAIL;

        internal static int MEMBERSHIP_USER_REJECTED;

        internal static int MEMBERSHIP_INVALID_PROVIDER_USER_KEY;

        internal static int MEMBERSHIP_DUPLICATED_PROVIDER_USERKEY;

        internal static int MEMBERSHIP_PROVIDER_ERROR;

        internal static int MEMBERSHIP_USER_NOT_FOUND;

        internal static int MEMBERSHIP_WRONG_PASSWORD;

        internal static int MEMBERSHIP_WRONG_ANSWER;

        internal static int MEMBERSHIP_ACCOUNT_LOCKED_OUT;

        internal static int MEMBERSHIP_PWD_RETRIEVAL_NOT_SUPPORTED;

        internal static int MEMBERSHIP_MIN_REQUIRED_NON_ALPHANUMERIC_CHARS_INCORRECT;

        internal static int MEMBERSHIP_MORE_THAN_ONE_USER_WITH_EMAIL;

        internal static int MEMBERSHIP_PASSWORD_TOO_LONG;

        internal static int MEMBERSHIP_PASSWORD_TOO_SHORT;

        internal static int MEMBERSHIP_PASSWORD_DOES_NOT_MATCH_REGULAR_EXPRESSION;

        internal static int MEMBERSHIP_PASSWORD_CANNOT_BE_RESET;

        internal static int PROVIDER_ERROR;

        internal static int PROVIDER_NOT_FOUND;

        internal static int PROVIDER_SCHEMA_VERSION_NOT_MATCH;

        internal static int PROVIDER_APPLICATION_NAME_TOO_LONG;

        internal static int PROVIDER_BAD_PASSWORD_FORMAT;

        internal static int PROVIDER_CANNOT_CREATE_FILE_IN_THIS_TRUST_LEVEL;

        internal static int PROVIDER_CANNOT_DECODE_HASHED_PASSWORD;

        internal static int PROVIDER_CANNOT_RETRIEVE_HASHED_PASSWORD;

        internal static int PROVIDER_MISSING_ATTRIBUTE;

        internal static int PROVIDER_MUST_IMPLEMENT_THE_INTERFACE;

        internal static int PROVIDER_MUST_IMPLEMENT_TYPE;

        internal static int PROVIDER_NO_TYPE_NAME;

        internal static int PROVIDER_UNKNOWN_FAILURE;

        internal static int PROVIDER_UNRECOGNIZED_ATTRIBUTE;

        internal static int PROVIDER_USER_NOT_FOUND;

        internal static int PROVIDER_CONNECTION_NAME_NOT_SPECIFIED;

        internal static int PROVIDER_CONNECTION_STRING_NOT_FOUND;

        internal static int PROVIDER_CANNOT_USE_ENCRYPTED_PWD_WITH_AUTOGEN_KEYS;

        internal static int PROVIDER_DEFAULT_PROVIDER_NOT_FOUND;

        internal static int PROVIDER_DEFAULT_PROVIDER_NOT_SPECIFIED;

        internal static int PROVIDER_PAGEINDEX_CANNOT_BE_LESS_THAN_ZERO;

        internal static int PROVIDER_PAGESIZE_CANNOT_BE_LESS_THAN_ONE;

        internal static int PROVIDER_PAGE_UPPER_BOUND_EXCEED_INT_MAX;

        internal static int PROVIDER_FEATURE_NOT_SUPPORTED_AT_THIS_LEVEL;

        internal static int PROVIDER_PARAMETER_ARRAY_EMPTY;

        internal static int PROVIDER_PARAMETER_CANNOT_BE_EMPTY;

        internal static int PROVIDER_PARAMETER_CANNOT_CONTAIN_COMMA;

        internal static int PROVIDER_PARAMETER_DUPLICATE_ARRAY_ELEMENT;

        internal static int PROVIDER_PARAMETER_TOO_LONG;

        internal static int PROVIDER_PASSWORD_DOES_NOT_MATCH_REGULAR_EXPRESSION;

        internal static int PROVIDER_PASSWORD_NEED_MORE_NON_ALPHA_NUMERIC_CHARS;

        internal static int PROVIDER_PASSWORD_TOO_SHORT;

        internal static int PROVIDER_PARAMETER_COLLECTION_EMPTY;

        internal static int PROVIDER_INITIALIZATION_ERROR;

        internal static int PROVIDER_INVALID_COMMANDTIMEOUT_VALUE;

        internal static int PROVIDER_ODP_CONNECTION_STRING_ERROR;

        internal static int PROVIDER_PARAMETER_ARRAY_CONTAIN_NULLOREMPTY_ELEMENT;

        internal static int PROVIDER_PARAMETER_ARRAY_ELEMENT_EXCEED_SIZE;

        internal static int PROVIDER_ROLE_ALREADY_EXISTS;

        internal static int PROVIDER_ROLE_NOT_FOUND;

        internal static int PROVIDER_THIS_USER_ALREADY_IN_ROLE;

        internal static int PROVIDER_THIS_USER_ALREADY_NOT_IN_ROLE;

        internal static int PROVIDER_THIS_USER_NOT_FOUND;

        internal static int ROLE_IS_NOT_EMPTY;

        internal static int INVALID_SESSION_STATE;

        internal static int MULTIPLE_ROOT_NODES_FOUND;

        internal static int PARENT_NODE_NOT_FOUND;

        internal static int ROOT_NODE_NOT_FOUND;

        static ErrRes()
        {
            ErrRes.MEMBERSHIP_PROVIDER_DESCRIPTION = "Oracle Membership Provider for ASP.NET";
            ErrRes.ROLE_PROVIDER_DESCRIPTION = "Oracle Role Provider for ASP.NET";
            ErrRes.SESSIONSTATE_PROVIDER_DESCRIPTION = "Oracle SessionState Provider for ASP.NET";
            ErrRes.PROFILE_PROVIDER_DESCRIPTION = "Oracle Profile Provider for ASP.NET";
            ErrRes.PERSONALIZATION_PROVIDER_DESCRIPTION = "Oracle Personalization Provider for ASP.NET";
            ErrRes.SITEMAP_PROVIDER_DESCRIPTION = "Oracle Site Map Provider for ASP.NET";
            ErrRes.WEBEVENTS_PROVIDER_DESCRIPTION = "Oracle Web Events Provider for ASP.NET";
            ErrRes.MEMBERSHIP_CUSTOM_PWD_VALIDATION_FAILED = -1000;
            ErrRes.MEMBERSHIP_INVALID_USER_NAME = -1001;
            ErrRes.MEMBERSHIP_INVALID_PASSWORD = -1002;
            ErrRes.MEMBERSHIP_INVALID_QUESTION = -1003;
            ErrRes.MEMBERSHIP_INVALID_ANSWER = -1004;
            ErrRes.MEMBERSHIP_INVALID_EMAIL = -1005;
            ErrRes.MEMBERSHIP_DUPLICATED_USER_NAME = -1006;
            ErrRes.MEMBERSHIP_DUPLICATED_EMAIL = -1007;
            ErrRes.MEMBERSHIP_USER_REJECTED = -1008;
            ErrRes.MEMBERSHIP_INVALID_PROVIDER_USER_KEY = -1009;
            ErrRes.MEMBERSHIP_DUPLICATED_PROVIDER_USERKEY = -1010;
            ErrRes.MEMBERSHIP_PROVIDER_ERROR = -1011;
            ErrRes.MEMBERSHIP_USER_NOT_FOUND = -1012;
            ErrRes.MEMBERSHIP_WRONG_PASSWORD = -1013;
            ErrRes.MEMBERSHIP_WRONG_ANSWER = -1014;
            ErrRes.MEMBERSHIP_ACCOUNT_LOCKED_OUT = -1099;
            ErrRes.MEMBERSHIP_PWD_RETRIEVAL_NOT_SUPPORTED = -1016;
            ErrRes.MEMBERSHIP_MIN_REQUIRED_NON_ALPHANUMERIC_CHARS_INCORRECT = -1017;
            ErrRes.MEMBERSHIP_MORE_THAN_ONE_USER_WITH_EMAIL = -1018;
            ErrRes.MEMBERSHIP_PASSWORD_TOO_LONG = -1020;
            ErrRes.MEMBERSHIP_PASSWORD_TOO_SHORT = -1021;
            ErrRes.MEMBERSHIP_PASSWORD_DOES_NOT_MATCH_REGULAR_EXPRESSION = -1023;
            ErrRes.MEMBERSHIP_PASSWORD_CANNOT_BE_RESET = -1024;
            ErrRes.PROVIDER_ERROR = -2000;
            ErrRes.PROVIDER_NOT_FOUND = -2001;
            ErrRes.PROVIDER_SCHEMA_VERSION_NOT_MATCH = -2002;
            ErrRes.PROVIDER_APPLICATION_NAME_TOO_LONG = -2003;
            ErrRes.PROVIDER_BAD_PASSWORD_FORMAT = -2004;
            ErrRes.PROVIDER_CANNOT_CREATE_FILE_IN_THIS_TRUST_LEVEL = -2005;
            ErrRes.PROVIDER_CANNOT_DECODE_HASHED_PASSWORD = -2006;
            ErrRes.PROVIDER_CANNOT_RETRIEVE_HASHED_PASSWORD = -2007;
            ErrRes.PROVIDER_MISSING_ATTRIBUTE = -2008;
            ErrRes.PROVIDER_MUST_IMPLEMENT_THE_INTERFACE = -2009;
            ErrRes.PROVIDER_MUST_IMPLEMENT_TYPE = -2010;
            ErrRes.PROVIDER_NO_TYPE_NAME = -2011;
            ErrRes.PROVIDER_UNKNOWN_FAILURE = -2017;
            ErrRes.PROVIDER_UNRECOGNIZED_ATTRIBUTE = -2018;
            ErrRes.PROVIDER_USER_NOT_FOUND = -2019;
            ErrRes.PROVIDER_CONNECTION_NAME_NOT_SPECIFIED = -2020;
            ErrRes.PROVIDER_CONNECTION_STRING_NOT_FOUND = -2021;
            ErrRes.PROVIDER_CANNOT_USE_ENCRYPTED_PWD_WITH_AUTOGEN_KEYS = -2022;
            ErrRes.PROVIDER_DEFAULT_PROVIDER_NOT_FOUND = -2023;
            ErrRes.PROVIDER_DEFAULT_PROVIDER_NOT_SPECIFIED = -2024;
            ErrRes.PROVIDER_PAGEINDEX_CANNOT_BE_LESS_THAN_ZERO = -2025;
            ErrRes.PROVIDER_PAGESIZE_CANNOT_BE_LESS_THAN_ONE = -2026;
            ErrRes.PROVIDER_PAGE_UPPER_BOUND_EXCEED_INT_MAX = -2027;
            ErrRes.PROVIDER_FEATURE_NOT_SUPPORTED_AT_THIS_LEVEL = -2028;
            ErrRes.PROVIDER_PARAMETER_ARRAY_EMPTY = -2029;
            ErrRes.PROVIDER_PARAMETER_CANNOT_BE_EMPTY = -2030;
            ErrRes.PROVIDER_PARAMETER_CANNOT_CONTAIN_COMMA = -2031;
            ErrRes.PROVIDER_PARAMETER_DUPLICATE_ARRAY_ELEMENT = -2032;
            ErrRes.PROVIDER_PARAMETER_TOO_LONG = -2033;
            ErrRes.PROVIDER_PASSWORD_DOES_NOT_MATCH_REGULAR_EXPRESSION = -2034;
            ErrRes.PROVIDER_PASSWORD_NEED_MORE_NON_ALPHA_NUMERIC_CHARS = -2035;
            ErrRes.PROVIDER_PASSWORD_TOO_SHORT = -2036;
            ErrRes.PROVIDER_PARAMETER_COLLECTION_EMPTY = -2037;
            ErrRes.PROVIDER_INITIALIZATION_ERROR = -2038;
            ErrRes.PROVIDER_INVALID_COMMANDTIMEOUT_VALUE = -2039;
            ErrRes.PROVIDER_ODP_CONNECTION_STRING_ERROR = -2040;
            ErrRes.PROVIDER_PARAMETER_ARRAY_CONTAIN_NULLOREMPTY_ELEMENT = -2041;
            ErrRes.PROVIDER_PARAMETER_ARRAY_ELEMENT_EXCEED_SIZE = -2042;
            ErrRes.PROVIDER_ROLE_ALREADY_EXISTS = -3000;
            ErrRes.PROVIDER_ROLE_NOT_FOUND = -3001;
            ErrRes.PROVIDER_THIS_USER_ALREADY_IN_ROLE = -3002;
            ErrRes.PROVIDER_THIS_USER_ALREADY_NOT_IN_ROLE = -3003;
            ErrRes.PROVIDER_THIS_USER_NOT_FOUND = -3004;
            ErrRes.ROLE_IS_NOT_EMPTY = -3005;
            ErrRes.INVALID_SESSION_STATE = -4000;
            ErrRes.MULTIPLE_ROOT_NODES_FOUND = -5000;
            ErrRes.PARENT_NODE_NOT_FOUND = -5001;
            ErrRes.ROOT_NODE_NOT_FOUND = -5002;
        }

        private ErrRes()
        {
        }
    }

    internal static class Util
    {
        internal static void CheckArrayParameter(ref string[] param, bool checkForNull, bool checkIfEmpty, bool checkForCommas, int maxSize, string paramName)
        {
            if (param == null)
            {
                throw new ArgumentNullException(paramName);
            }
            if ((int)param.Length < 1)
            {
                int pROVIDERPARAMETERARRAYEMPTY = ErrRes.PROVIDER_PARAMETER_ARRAY_EMPTY;
                string[] strArrays = new string[] { paramName };
                throw new ArgumentException(MsgManager.GetMsg(pROVIDERPARAMETERARRAYEMPTY, strArrays));
            }
            Hashtable hashtables = new Hashtable((int)param.Length);
            for (int i = (int)param.Length - 1; i >= 0; i--)
            {
                Util.CheckParameter(ref param[i], checkForNull, checkIfEmpty, checkForCommas, maxSize, string.Concat(paramName, "[ ", i.ToString(CultureInfo.InvariantCulture), " ]"));
                if (hashtables.Contains(param[i]))
                {
                    int pROVIDERPARAMETERDUPLICATEARRAYELEMENT = ErrRes.PROVIDER_PARAMETER_DUPLICATE_ARRAY_ELEMENT;
                    string[] strArrays1 = new string[] { paramName };
                    throw new ArgumentException(MsgManager.GetMsg(pROVIDERPARAMETERDUPLICATEARRAYELEMENT, strArrays1));
                }
                hashtables.Add(param[i], param[i]);
            }
        }

        internal static void CheckForUnrecognizedAttribute(NameValueCollection config)
        {
            if (config.Count > 0)
            {
                string key = config.GetKey(0);
                if (!string.IsNullOrEmpty(key))
                {
                    int pROVIDERUNRECOGNIZEDATTRIBUTE = ErrRes.PROVIDER_UNRECOGNIZED_ATTRIBUTE;
                    string[] strArrays = new string[] { key };
                    throw new ProviderException(MsgManager.GetMsg(pROVIDERUNRECOGNIZEDATTRIBUTE, strArrays));
                }
            }
        }

        internal static void CheckParameter(ref string param, bool checkForNull, bool checkIfEmpty, bool checkForCommas, int maxSize, string paramName)
        {
            if (param == null)
            {
                if (checkForNull)
                {
                    throw new ArgumentNullException(paramName);
                }
                return;
            }
            if (checkIfEmpty && param.Length < 1)
            {
                int pROVIDERPARAMETERCANNOTBEEMPTY = ErrRes.PROVIDER_PARAMETER_CANNOT_BE_EMPTY;
                string[] strArrays = new string[] { paramName };
                throw new ArgumentException(MsgManager.GetMsg(pROVIDERPARAMETERCANNOTBEEMPTY, strArrays));
            }
            if (maxSize > 0 && param.Length > maxSize)
            {
                int pROVIDERPARAMETERTOOLONG = ErrRes.PROVIDER_PARAMETER_TOO_LONG;
                string[] strArrays1 = new string[] { paramName, maxSize.ToString(CultureInfo.InvariantCulture) };
                throw new ArgumentException(MsgManager.GetMsg(pROVIDERPARAMETERTOOLONG, strArrays1));
            }
            if (checkForCommas && param.Contains(","))
            {
                int pROVIDERPARAMETERCANNOTCONTAINCOMMA = ErrRes.PROVIDER_PARAMETER_CANNOT_CONTAIN_COMMA;
                string[] strArrays2 = new string[] { paramName };
                throw new ArgumentException(MsgManager.GetMsg(pROVIDERPARAMETERCANNOTCONTAINCOMMA, strArrays2));
            }
        }

        internal static void CleanUpConnectionResources(ref OracleConnection con, ref OracleCommand cmd)
        {
            if (cmd != null)
            {
                foreach (OracleParameter parameter in cmd.Parameters)
                {
                    if (parameter == null)
                    {
                        continue;
                    }
                    parameter.Dispose();
                }
                cmd.Dispose();
                cmd = null;
            }
            if (con != null && con.State == ConnectionState.Open)
            {
                con.Close();
                con.Dispose();
                con = null;
            }
        }

        internal static void CleanUpConnectionResources(ref OracleCommand cmd, ref OracleConnectionHolder holder)
        {
            if (cmd != null)
            {
                foreach (OracleParameter parameter in cmd.Parameters)
                {
                    if (parameter == null)
                    {
                        continue;
                    }
                    parameter.Dispose();
                }
                cmd.Dispose();
                cmd = null;
            }
            if (holder != null)
            {
                holder.Close();
                holder = null;
            }
        }

        internal static string GetConfigValue(string configValue, string defaultValue)
        {
            if (string.IsNullOrEmpty(configValue))
            {
                return defaultValue;
            }
            return configValue;
        }

        internal static string GetDefaultAppName()
        {
            string str;
            try
            {
                string applicationVirtualPath = HostingEnvironment.ApplicationVirtualPath;
                if (string.IsNullOrEmpty(applicationVirtualPath))
                {
                    applicationVirtualPath = Process.GetCurrentProcess().MainModule.ModuleName;
                    int num = applicationVirtualPath.IndexOf('.');
                    if (num != -1)
                    {
                        applicationVirtualPath = applicationVirtualPath.Remove(num);
                    }
                }
                str = (!string.IsNullOrEmpty(applicationVirtualPath) ? applicationVirtualPath : "/");
            }
            catch
            {
                str = "/";
            }
            return str;
        }

        internal static void HandleDescriptionAttribute(NameValueCollection config, string defDescription)
        {
            if (string.IsNullOrEmpty(config["description"]))
            {
                config.Remove("description");
                config.Add("description", defDescription);
            }
        }

        internal static bool IsParameterOK(ref string param, bool checkForNull, bool checkIfEmpty, bool checkForCommas, int maxSize)
        {
            if (param == null)
            {
                return !checkForNull;
            }
            param = param.Trim();
            if (checkIfEmpty && param.Length < 1 || maxSize > 0 && param.Length > maxSize || checkForCommas && param.Contains(","))
            {
                return false;
            }
            return true;
        }

        internal static string ReadAndVerifyApplicationName(NameValueCollection config)
        {
            string item = config["applicationName"];
            if (string.IsNullOrEmpty(item))
            {
                item = Util.GetDefaultAppName();
            }
            if (item.Length > 256)
            {
                throw new ProviderException(MsgManager.GetMsg(ErrRes.PROVIDER_APPLICATION_NAME_TOO_LONG, new string[0]));
            }
            return item;
        }

        internal static string ReadConnectionString(NameValueCollection config)
        {
            string item = config["connectionStringName"];
            if (string.IsNullOrEmpty(item))
            {
                throw new ProviderException(MsgManager.GetMsg(ErrRes.PROVIDER_CONNECTION_NAME_NOT_SPECIFIED, new string[0]));
            }
            ConnectionStringsSection section = WebConfigurationManager.GetSection("connectionStrings") as ConnectionStringsSection;
            ConnectionStringSettings connectionStringSetting = section.ConnectionStrings[item];
            string empty = string.Empty;
            if (connectionStringSetting != null)
            {
                empty = connectionStringSetting.ConnectionString;
            }
            if (string.IsNullOrEmpty(empty))
            {
                int pROVIDERCONNECTIONSTRINGNOTFOUND = ErrRes.PROVIDER_CONNECTION_STRING_NOT_FOUND;
                string[] strArrays = new string[] { item };
                throw new ProviderException(MsgManager.GetMsg(pROVIDERCONNECTIONSTRINGNOTFOUND, strArrays));
            }
            return empty;
        }
    }

    internal sealed class OracleConnectionHolder
    {
        internal OracleConnection m_Connection;

        private bool m_Opened;

        internal OracleConnection Connection
        {
            get
            {
                return this.m_Connection;
            }
        }

        internal OracleConnectionHolder(string connectionString)
        {
            try
            {
                this.m_Connection = new OracleConnection(connectionString);
            }
            catch (ArgumentException argumentException1)
            {
                ArgumentException argumentException = argumentException1;
                throw new ArgumentException(MsgManager.GetMsg(ErrRes.PROVIDER_ODP_CONNECTION_STRING_ERROR, new string[0]), "connectionString", argumentException);
            }
        }

        internal void Close()
        {
            if (!this.m_Opened)
            {
                return;
            }
            this.Connection.Dispose();
            this.m_Opened = false;
        }

        internal void Open(HttpContext context, bool revertImpersonate)
        {
            if (this.m_Opened)
            {
                return;
            }
            if (!revertImpersonate)
            {
                this.Connection.Open();
            }
            else
            {
                using (IDisposable disposable = HostingEnvironment.Impersonate())
                {
                    this.Connection.Open();
                }
            }
            this.m_Opened = true;
        }
    }
    internal static class OracleConnectionHelper
    {
        private static object s_lock;

        static OracleConnectionHelper()
        {
            OracleConnectionHelper.s_lock = new object();
        }

        internal static OracleConnectionHolder GetConnection(string connectionString)
        {
            OracleConnectionHolder oracleConnectionHolder = new OracleConnectionHolder(connectionString);
            bool flag = true;
            try
            {
                try
                {
                    oracleConnectionHolder.Open(null, true);
                    flag = false;
                }
                finally
                {
                    if (flag)
                    {
                        oracleConnectionHolder.Close();
                        oracleConnectionHolder = null;
                    }
                }
            }
            catch
            {
                throw;
            }
            return oracleConnectionHolder;
        }
    }

}
