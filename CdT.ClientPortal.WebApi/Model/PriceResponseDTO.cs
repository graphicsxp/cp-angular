namespace ClientPortal.Model
{
    using ClientPortal.WebApi.FinancialService;
    using System;

    /// <summary>
    /// Dto for requesting price
    /// </summary>
    public class PriceResponseDTO
    {
        public Guid JobId { get; set; }
        public PriceStructureDTO Price { get; set; }
    }
}