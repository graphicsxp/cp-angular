using Cdt.ClientPortal.Dto;
using System;
using System.Collections.Generic;

namespace ClientPortal.Helpers
{
    [Serializable]
    public class MultiPartDocumentRow
    {
        public int Id { get; set; }
        public string DocumentName { get; set; }
        public string Title { get; set; }
        public string ClientReference { get; set; }
        public string OriginalFormat { get; set; }
        public string OriginalFormatLabel { get; set; }
        public string TargetFormat { get; set; }
        public string TargetFormatLabel { get; set; }
        public decimal Quantity { get; set; }
        public string DeliveryOptionLabel { get; set; }
        public string DeliveryOptionCode { get; set; }
        public IList<AssignmentList> Assignments { get; set; }
        public string Priority { get; set; }
        public string ImportantInformation { get; set; }
        public string Confidential { get; set; }
        public IList<string> ContactsID { get; set; }
        public IList<string> RecipientsID { get; set; }
        public int DepartmentId { get; set; }
        public string DepartmentLabel { get; set; }
        public string PurposeCode { get; set; }
        public string PurposeLabel { get; set; }
        public int? AssociatedForecast { get; set; }
    }
}
