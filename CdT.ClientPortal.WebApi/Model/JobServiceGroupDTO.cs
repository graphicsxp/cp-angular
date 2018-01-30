using System;

namespace ClientPortal.WebApi.Model
{
    public class JobServiceGroupDTO
    {
        public decimal Volume { get; set; }
        public DateTime Deadline { get; set; }
        public string Priority { get; set; }
        public string Service { get; set; }
        public DateTime MinimumDeliveryDate { get; set; }
        public DateTime ReceiptDate { get; set; }
        public int Turnaround { get; set; }
    }
}