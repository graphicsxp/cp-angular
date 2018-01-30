//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Web;
//using Cdt.ClientPortal.Dto;

//namespace ClientPortal.Helpers
//{
//    public static class PriceCalculationRules
//    {
//        public static bool IsSpecialRow(AssignmentList currentRow, List<AssignmentList> allRows)
//        {
//            bool isSpecial = false;


//            List<AssignmentList> group = allRows.Where(r => r.SourceLanguage == currentRow.SourceLanguage).OrderByDescending(r => r.Quantity).ToList();


//            //if current row has biggest quantity we'll return it for calculating special price
//            if (currentRow.TargetLanguage == group[0].TargetLanguage)
//            {
//                isSpecial = true;
//            }

//            return isSpecial;
//        }
//    }
//}