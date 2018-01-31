using System;

namespace CdT.ClientPortal.WebApi.Model
{
    public class CreateTemplateDto
    {
        public string TemplateName { get; set; }
        public int OrganizationId { get; set; }
        public Guid Id { get; set; }
    }
}