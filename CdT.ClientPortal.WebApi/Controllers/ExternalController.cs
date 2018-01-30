using Serilog;

namespace ClientPortal.Controllers
{
    using System.Collections.Generic;
    using System.Configuration;
    using System.Threading.Tasks;
    using System.Web.Http;
    using CdT.EAI.Wcf;
    using CdT.UI.Common;
    using CdT.EAI.BL.Models;
    using CdT.EAI.BL.Interfaces;
    using System;
    using ClientPortal.Model;
    using ClientPortal.WebApi.FinancialService;

    public class ExternalController : BaseApiController
    {
        private readonly IRequestBL _requestBL;
        public ExternalController(ILogger logger, IRequestBL requestBL) : base(logger)
        {
            this._requestBL = requestBL;
        }

        /// <summary>
        /// Get the prices for jobs
        /// </summary>
        /// <returns>The price for each jobs</returns>
        [HttpPost]
        public async Task<IEnumerable<PriceResponseDTO>> GetPrices([FromBody] PriceRequestDTO data)
        {
            var values = this._requestBL.GetPricingCalculationDTOs(data);
            var priceList = new List<PriceResponseDTO>();
            var taskList = new Task<PriceStructureDTO>[values.Count];
            var username = ConfigurationManager.AppSettings["ecdtTechnicalUserLogin"];
            var password = ConfigurationManager.AppSettings["ecdtTechnicalUserPassword"];
            for (var i = 0; i < values.Count; i++)
            {
                var val = values[i];
                taskList[i] = Helper.UseWcfService<IFinancialService, PriceStructureDTO>("FinancialService", username, password, p => p.GetPriceRecalculatedAsync(val.serviceType, val.priority, val.referenceDate, val.sourceLanguage, val.targetLanguage, val.sourceFormat, val.isConfidential, val.quantity, val.billedQuantity, val.organizationId, val.hasReduction, val.deliveryMode));
            }
            await Task.WhenAll(taskList);
            for (var i = 0; i < taskList.Length; i++)
            {
                var taskResult = taskList[i].Result;
                priceList.Add(new PriceResponseDTO()
                {
                    JobId = new Guid(values[i].jobId),
                    Price = taskResult,
                });
            }
            return priceList;
        }
    }
}
