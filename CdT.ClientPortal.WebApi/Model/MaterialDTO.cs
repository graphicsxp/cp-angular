using System;

namespace CdT.ClientPortal.WebApi.Model
{
    public class MaterialDTO
    {
        public Guid Id { get; set; }

        public string Name { get; set; }

        public string Path { get; set; }

        public string Type { get; set; }

        public long Size { get; set; }

        public bool IsSecured { get; set; }

        public string UserName { get; set; }

        public string Password { get; set; }
    }
}