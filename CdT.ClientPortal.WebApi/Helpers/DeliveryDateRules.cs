using Cdt.ClientPortal.Services;
using Cdt.Common.BE;
using ClientPortal.Helpers.Constants;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Principal;

namespace ClientPortal.Helpers
{
    /// <summary>
    /// 
    /// </summary>
    public static class DeliveryDateRules
    {
        /// <summary>
        /// Gets the min allowed date.
        /// Minimum allowed date ends on the last working day at 16:00
        /// </summary>
        /// <value>The min allowed date.</value>
        public static DateTime GetMinDate(decimal nbrOfPages, string priority, string product, IPrincipal User, int addMinutes)
        {

            DateTime minDelivery= DateTime.Now; 
            Tools.UseWcfService<IClientPortalService>(WcfEndPoint.ClientPortal, User.Identity.Name, User.Identity.Name, client =>
            {
                minDelivery = client.GetMinimumDeliveryDate(product, priority, nbrOfPages, addMinutes);

            });

            //minDelivery = DateTime.Now;
            return minDelivery;
        }

        private static int CalculateNbreOfDays(int nbrOfPages, string priority)
        {
            int nbrDays = 0;
            if (nbrOfPages > 100)
            {
                int a = nbrOfPages / 100;
                int b = nbrOfPages % 100;

                switch (priority)
                {
                    case "PR":
                        {
                            nbrDays += a * 45;
                            break;
                        }
                    default:
                    case "NO":
                        {
                            nbrDays += a * 40;
                            break;
                        }
                    case "TU":
                        {
                            nbrDays += a * 35;
                            break;
                        }
                }
                nbrDays += CalculateNbreOfDays(b, priority);

            }
            else if (nbrOfPages > 50)
            {
                switch (priority)
                {
                    case "PR":
                        {
                            nbrDays += 45;
                            break;
                        }
                    default:
                    case "NO":
                        {
                            nbrDays += 35;
                            break;
                        }
                    case "TU":
                        {
                            nbrDays += 20;
                            break;
                        }
                }
            }
            else if (nbrOfPages > 30)
            {
                switch (priority)
                {
                    case "PR":
                        {
                            nbrDays += 30;
                            break;
                        }
                    default:
                    case "NO":
                        {
                            nbrDays += 25;
                            break;
                        }
                    case "TU":
                        {
                            nbrDays += 10;
                            break;
                        }
                }
            }
            else if (nbrOfPages > 20)
            {
                switch (priority)
                {
                    case "PR":
                        {
                            nbrDays += 20;
                            break;
                        }
                    default:
                    case "NO":
                        {
                            nbrDays += 15;
                            break;
                        }
                    case "TU":
                        {
                            nbrDays += 6;
                            break;
                        }
                }
            }
            else if (nbrOfPages > 10)
            {
                switch (priority)
                {
                    case "PR":
                        {
                            nbrDays += 15;
                            break;
                        }
                    default:
                    case "NO":
                        {
                            nbrDays += 10;
                            break;
                        }
                    case "TU":
                        {
                            nbrDays += 4;
                            break;
                        }

                }
            }
            else if (nbrOfPages > 4)
            {
                switch (priority)
                {
                    case "PR":
                        {
                            nbrDays += 10;
                            break;
                        }
                    default:
                    case "NO":
                        {
                            nbrDays += 7;
                            break;
                        }
                    case "TU":
                        {
                            nbrDays += 2;
                            break;
                        }
                }
            }
            else
            {
                switch (priority)
                {
                    case "PR":
                        {
                            nbrDays += 10;
                            break;
                        }
                    default:
                    case "NO":
                        {
                            nbrDays += 3;
                            break;
                        }
                    case "TU":
                        {
                            nbrDays += 1;
                            break;
                        }
                }
            }


            return nbrDays;
        }

        private static int CalculateNbreOfDaysPerProduct(int nbrOfPages, string priority, string product)
        {
            int nbrDays = 0;

            if (nbrOfPages != 0)
            {

                switch (product)
                {



                    //Ediiting rules
                    case "ED":
                        {
                            if (nbrOfPages > 100)
                            {
                                int a = nbrOfPages / 30;
                                int b = nbrOfPages % 30;

                                switch (priority)
                                {
                                    case "PR":
                                        {
                                            nbrDays += a * 10;
                                            break;
                                        }
                                    default:
                                    case "NO":
                                        {
                                            nbrDays += a * 5;
                                            break;
                                        }
                                    case "TU":
                                        {
                                            nbrDays += a * 2;
                                            break;
                                        }
                                }
                                nbrDays += CalculateNbreOfDaysPerProduct(b, priority, product);

                            }
                            else if (nbrOfPages > 50)
                            {
                                switch (priority)
                                {
                                    case "PR":
                                        {
                                            nbrDays += 20;
                                            break;
                                        }
                                    default:
                                    case "NO":
                                        {
                                            nbrDays += 10;
                                            break;
                                        }
                                    case "TU":
                                        {
                                            nbrDays += 7;
                                            break;
                                        }
                                }
                            }
                            else if (nbrOfPages > 30)
                            {
                                switch (priority)
                                {
                                    case "PR":
                                        {
                                            nbrDays += 15;
                                            break;
                                        }
                                    default:
                                    case "NO":
                                        {
                                            nbrDays += 7;
                                            break;
                                        }
                                    case "TU":
                                        {
                                            nbrDays += 4;
                                            break;
                                        }
                                }
                            }
                            else if (nbrOfPages > 10)
                            {
                                switch (priority)
                                {
                                    case "PR":
                                        {
                                            nbrDays += 10;
                                            break;
                                        }
                                    default:
                                    case "NO":
                                        {
                                            nbrDays += 5;
                                            break;
                                        }
                                    case "TU":
                                        {
                                            nbrDays += 2;
                                            break;
                                        }
                                }
                            }
                            else
                            {
                                switch (priority)
                                {
                                    case "PR":
                                        {
                                            nbrDays += 8;
                                            break;
                                        }
                                    default:
                                    case "NO":
                                        {
                                            nbrDays += 3;
                                            break;
                                        }
                                    case "TU":
                                        {
                                            nbrDays += 1;
                                            break;
                                        }
                                }
                            }
                            break;
                        }
                    default:
                        {
                            if (nbrOfPages > 100)
                            {
                                int a = nbrOfPages / 30;
                                int b = nbrOfPages % 30;

                                switch (priority)
                                {
                                    case "PR":
                                        {
                                            nbrDays += a * 12;
                                            break;
                                        }
                                    default:
                                    case "NO":
                                        {
                                            nbrDays += a * 10;
                                            break;
                                        }
                                    case "TU":
                                        {
                                            nbrDays += a * 6;
                                            break;
                                        }
                                }
                                nbrDays += CalculateNbreOfDaysPerProduct(b, priority, product);

                            }
                            else if (nbrOfPages > 50)
                            {
                                switch (priority)
                                {
                                    case "PR":
                                        {
                                            nbrDays += 45;
                                            break;
                                        }
                                    default:
                                    case "NO":
                                        {
                                            nbrDays += 35;
                                            break;
                                        }
                                    case "TU":
                                        {
                                            nbrDays += 20;
                                            break;
                                        }
                                }
                            }
                            else if (nbrOfPages > 30)
                            {
                                switch (priority)
                                {
                                    case "PR":
                                        {
                                            nbrDays += 30;
                                            break;
                                        }
                                    default:
                                    case "NO":
                                        {
                                            nbrDays += 25;
                                            break;
                                        }
                                    case "TU":
                                        {
                                            nbrDays += 10;
                                            break;
                                        }
                                }
                            }
                            else if (nbrOfPages > 20)
                            {
                                switch (priority)
                                {
                                    case "PR":
                                        {
                                            nbrDays += 20;
                                            break;
                                        }
                                    default:
                                    case "NO":
                                        {
                                            nbrDays += 15;
                                            break;
                                        }
                                    case "TU":
                                        {
                                            nbrDays += 6;
                                            break;
                                        }
                                }
                            }
                            else if (nbrOfPages > 10)
                            {
                                switch (priority)
                                {
                                    case "PR":
                                        {
                                            nbrDays += 15;
                                            break;
                                        }
                                    default:
                                    case "NO":
                                        {
                                            nbrDays += 10;
                                            break;
                                        }
                                    case "TU":
                                        {
                                            nbrDays += 4;
                                            break;
                                        }

                                }
                            }
                            else if (nbrOfPages > 4)
                            {
                                switch (priority)
                                {
                                    case "PR":
                                        {
                                            nbrDays += 10;
                                            break;
                                        }
                                    default:
                                    case "NO":
                                        {
                                            nbrDays += 7;
                                            break;
                                        }
                                    case "TU":
                                        {
                                            nbrDays += 2;
                                            break;
                                        }
                                }
                            }
                            else
                            {
                                switch (priority)
                                {
                                    case "PR":
                                        {
                                            nbrDays += 10;
                                            break;
                                        }
                                    default:
                                    case "NO":
                                        {
                                            nbrDays += 3;
                                            break;
                                        }
                                    case "TU":
                                        {
                                            nbrDays += 1;
                                            break;
                                        }
                                }
                            }
                            break;
                        }
                }

            }

            return nbrDays;
        }
    }
}
