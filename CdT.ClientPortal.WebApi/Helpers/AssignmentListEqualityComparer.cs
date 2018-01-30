//using Cdt.ClientPortal.Dto;
//using System.Collections.Generic;

//namespace ClientPortal.Helpers
//{
//    public class AssignmentListEqualityComparer:IEqualityComparer<AssignmentList>
//    {
//        public bool Equals(AssignmentList x, AssignmentList y)
//        {
//            return x.SourceLanguage == y.SourceLanguage &&
//                   x.TargetLanguage == y.TargetLanguage;
//        }

//        public int GetHashCode(AssignmentList obj)
//        {
//            unchecked
//            {
//                int result = (obj.SourceLanguage != null ? obj.SourceLanguage.GetHashCode() : 0);
//                result = (result * 397) ^ (obj.TargetLanguage != null ? obj.TargetLanguage.GetHashCode() : 0);
//                return result;
//            }
//        }
//        #region IEqualityComparer<AssignmentList> Members
//        #endregion
//    }
//}
