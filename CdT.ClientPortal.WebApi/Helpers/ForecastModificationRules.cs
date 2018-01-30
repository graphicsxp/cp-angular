using System;

namespace ClientPortal.Helpers
{
    /// <summary>
    /// 
    /// </summary>
    public static class ForecastModificationRules
    {
        /// <summary>
        /// Gets the min allowed date.
        /// </summary>
        /// <value>The min allowed date.</value>
        public static DateTime GetMinAllowedDate(decimal nbrOfPages)
        {
            DateTime minAllowedDate;
            if (nbrOfPages > 50)
            {
                minAllowedDate = DateTime.Today.AddDays(84); //add 12 weeks
            }
            else if (nbrOfPages > 20)
            {
                minAllowedDate = DateTime.Today.AddDays(56); //add 8 weeks
            }
            else
            {
                minAllowedDate = DateTime.Today.AddDays(42); //add 6 weeks
            }
            return minAllowedDate;
        }
    }
}
