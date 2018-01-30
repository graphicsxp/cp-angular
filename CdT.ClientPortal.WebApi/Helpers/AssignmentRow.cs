using Cdt.ClientPortal.Dto;
using System;

namespace ClientPortal.Helpers
{
    /// <summary>
    /// 
    /// </summary>
    [Serializable]
    public class AssignmentRow : AssignmentList
    {
        public AssignmentRow(int rowId)
        {
            InternalID = rowId;
        }
        public int InternalID { get; set; }
    } 
}
