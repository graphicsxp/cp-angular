using System.Web.Configuration;
using System;
using System.Linq;
namespace ClientPortal.Helpers.Configuration
{
    /// <summary>
    /// Helper class for application constants
    /// </summary>
    public static class ConfigurationHelper
    {
        /// <summary>
        /// Gets the upload folder.
        /// </summary>
        /// <value>The upload folder.</value>
        public static string UploadFolder
        {
            get
            {
                return WebConfigurationManager.AppSettings["UploadFolder"];
            }
        }

        /// <summary>
        /// Gets the temp folder.
        /// </summary>
        /// <value>The temp folder.</value>
        public static string TempFolder
        {
            get
            {
                return WebConfigurationManager.AppSettings["TempFolder"];
            }
        }

        /// <summary>
        /// Gets the contextual help file.
        /// </summary>
        /// <value>The contextual help file.</value>
        public static string ContextualHelpFile
        {
            get
            {
                return WebConfigurationManager.AppSettings["ContextualHelpFile"];
            }
        }

        /// <summary>
        /// Gets the min view year.
        /// </summary>
        /// <value>The min view year.</value>
        public static string MinViewYear
        {
            get
            {
                return WebConfigurationManager.AppSettings["MinViewYear"];
            }
        }

        /// <summary>
        /// Gets the decimal limit date.
        /// </summary>
        /// <value>The decimal limit date.</value>
        public static DateTime DecimalLimitDate
        {
            get
            {
                return DateTime.Parse(WebConfigurationManager.AppSettings["DecimalLimitDate"]);
            }
        }

        /// <summary>
        /// Gets the CSS version number.
        /// </summary>
        /// <value>The CSS version number.</value>
        public static string CssVersionNumber
        {
            get
            {
                return WebConfigurationManager.AppSettings["CssVersionNumber"];
            }
        }

        /// <summary>
        /// Gets the migrated agencies.
        /// </summary>
        /// <value>The migrated agencies.</value>
        public static int[] MigratedAgencies
        {
            get
            {
                int[] agencies = Array.ConvertAll(WebConfigurationManager.AppSettings["MigratedAgencies"].Split(';'), int.Parse);
                return agencies;
            }
        }
    }
}
