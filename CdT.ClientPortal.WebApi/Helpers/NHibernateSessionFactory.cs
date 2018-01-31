using CdT.EAI.Dal.NH;
using CdT.EAI.Dal.NH.NamingStrategy;
using NHibernate;
using NHibernate.AspNet.Identity.Helpers;
using NHibernate.Cfg;
using NHibernate.Tool.hbm2ddl;
using System.IO;
using System.Text;

namespace CdT.ClientPortal.WebApi.Helpers
{
    public class NHibernateSessionFactory
    {
        private const string DefaultSchemaName = "USR";

        // used to prefix table when executing query
        private const string FactoryName = "USR";

        static NHibernateSessionFactory()
        {
            Configuration = new Configuration().XConfigure(FactoryName)
                .SetNamingStrategy(new CdtNamingStrategy())
                .SetProperty(Environment.UseProxyValidator, "true")
                .SetProperty(Environment.DefaultSchema, DefaultSchemaName);
            //.SetProperty(Environment.DefaultCatalog, DefaultCatalog);

            // get mappings for identity
            var myEntities = new[] { typeof(ClientPortalUser), typeof(ClientPortalRole) };
            Configuration.AddDeserializedMapping(MappingHelper.GetIdentityMappings(myEntities), null);

            var mapper = new OracleModelMapper();

            var path = Utils.GetExcutablePath();

            var mapping = mapper.CompileMappingForAllExplicitlyAddedEntities();

            // fix import of classes with same name in different namespaces http://stackoverflow.com/questions/1290466/fluent-nhibernate-duplicatemappingexception-with-automapping
            mapping.autoimport = false;

            Configuration.AddMapping(mapping);

            SessionFactory = Configuration.BuildSessionFactory();

            // Generate Delete and Create Script
            StringBuilder databaseScript = new StringBuilder();
            var schemaExporter = new SchemaExport(Configuration);
            schemaExporter.SetDelimiter(";");
            using (StringWriter sw = new StringWriter(databaseScript))
            {
                schemaExporter.Execute(false, false, false, null, sw);
            }
            string scripts = null;

            scripts = databaseScript.ToString();
        }

        /// <summary>
        /// Gets the configuration.
        /// </summary>
        /// <value>The configuration.</value>
        public static Configuration Configuration { get; }

        /// <summary>
        /// Gets the session factory.
        /// </summary>
        /// <value>The session factory.</value>
        public static ISessionFactory SessionFactory { get; }
    }
}