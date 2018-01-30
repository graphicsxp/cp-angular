using ClientPortal.Dto;

namespace ClientPortal.Model
{
    public class DeliveredAndLatestRequest
    {
        public EcdtRequestList Request { get; set; }
        public string Url { get; set; }
        public string CssClass { get; set; }
        public string DeliveredColor { get; set; }
        public string Title { get; set; }
    }
}