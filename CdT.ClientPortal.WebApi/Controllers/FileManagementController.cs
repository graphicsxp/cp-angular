using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using CdT.EAI.Model.Business;
using CdT.UI.Common;
using NHibernate;
using CdT.ClientPortal.WebApi.Model;
using Serilog;

namespace ClientPortal.Controllers
{
    [Authorize]
    public class FileManagementController : BaseApiController
    {
        private readonly ISession _session;
        private string _ecdtTechnicalUserLogin = ConfigurationManager.AppSettings["ecdtTechnicalUserLogin"];
        private string _ecdtTechnicalUserPassword = ConfigurationManager.AppSettings["ecdtTechnicalUserPassword"];

        /// <summary>
        /// Initializes a new instance of the <see cref="FileManagementController" /> class.
        /// </summary>
        /// <param name="session">The session.</param>
        public FileManagementController(ISession session, ILogger logger) : base(logger)
        {
            if (session == null)
            {
                throw new ArgumentNullException("session");
            }
            this._session = session;
        }

        /// <summary>
        /// Files the upload.
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public async Task<HttpResponseMessage> Upload()
        {
            this.Logger.Debug("Uploading new file");
            HttpRequestMessage request = this.Request;
            if (!request.Content.IsMimeMultipartContent())
            {
                throw new HttpResponseException(HttpStatusCode.UnsupportedMediaType);
            }

            string uploadFolder = ConfigurationManager.AppSettings["UploadFolder"];
            var provider = new MultipartFormDataStreamProvider(uploadFolder);

            await request.Content.ReadAsMultipartAsync(provider);
            List<MaterialDTO> returns = new List<MaterialDTO>();
            foreach (var s in provider.FileData)
            {
                FileInfo finfo = new FileInfo(s.LocalFileName);

                MaterialDTO fur = new MaterialDTO();
                fur.Path = Path.GetFileName(s.LocalFileName); // save the filename only, folder can be moved to any places
                fur.Name = s.Headers.ContentDisposition.FileName.Replace("\"", string.Empty);
                fur.Size = finfo.Length;
                returns.Add(fur);
            }
            return request.CreateResponse<List<MaterialDTO>>(HttpStatusCode.OK, returns);
        }

        /// <summary>
        /// Downloads the specified file name.
        /// </summary>
        /// <param name="id">The external storage id.</param>
        /// <returns></returns>
        [HttpGet]
        public async Task<HttpResponseMessage> Download(Guid id)
        {
            this.Logger.Debug("Downloading:{ExternalStorageFileId}", id);

            var pf = this._session.Query<PhysicalFile>().Where(x => x.ExternalStorageFileId == id).FirstOrDefault();

            //we check if they are private and if yest check against the current identity
            if (pf.MaterialClassification.Code == "SOUR")
            {
                var sourceMaterial = this._session.Query<SourceMaterial>().Where(x => x.MaterialId == pf.Id).FirstOrDefault();
                if (sourceMaterial != null && sourceMaterial.IsPrivate)
                {
                    if (sourceMaterial.UploadedBy != this.User.Identity.Name)
                    {
                        return this.Request.CreateErrorResponse(HttpStatusCode.Forbidden, string.Format("File has been uploaded by a different user and marked as private", id));
                    }
                }
            }

            string endpoint = string.Format("{0}/getecdtfile.ashx?fileId={1}", ConfigurationManager.AppSettings["FileManagementService"], id);
            using (var handler = new HttpClientHandler() { AutomaticDecompression = DecompressionMethods.GZip | DecompressionMethods.Deflate, Credentials = new System.Net.NetworkCredential(_ecdtTechnicalUserLogin, _ecdtTechnicalUserPassword) })
            using (var client = new HttpClient(handler))
            {
                var file = await client.GetAsync(endpoint);
                if (file.IsSuccessStatusCode)
                {
                    Stream s = await file.Content.ReadAsStreamAsync();
                    HttpResponseMessage result = new HttpResponseMessage(HttpStatusCode.OK);
                    result.Content = new StreamContent(s);
                    result.Content.Headers.ContentType = file.Content.Headers.ContentType;
                    result.Content.Headers.ContentDisposition = file.Content.Headers.ContentDisposition;
                    result.Content.Headers.ContentLength = file.Content.Headers.ContentLength;
                    return result;
                }
            }
            return this.Request.CreateErrorResponse(HttpStatusCode.NotFound, string.Format("File with id {0} not found", id));
        }


        /// <summary>
        /// Downloads an archive with original, references or translation files
        /// </summary>
        /// <param name="requestId">The id of the request</param>
        /// <param name="zipType">WHat type of files to include:ORA, REF, TRA</param>
        /// <returns></returns>
        [HttpGet]
        public async Task<HttpResponseMessage> DownloadZip(Guid requestId, string zipType)
        {
            this.Logger.Debug("Downloading request:{RequestId}", requestId);
            //check if the workflowtask exists
            var r = this._session.Query<Request>().FirstOrDefault(p => p.Id == requestId);
            if (r != null)
            {

                string user = this.User.Identity.Name;
                string endpoint = string.Format("{0}/getrequestzip.ashx?requestId={1}&zipType={2}&user={3}", ConfigurationManager.AppSettings["FileManagementService"], requestId, zipType, user);
                using (var handler = new HttpClientHandler() { AutomaticDecompression = DecompressionMethods.GZip | DecompressionMethods.Deflate, Credentials = new System.Net.NetworkCredential(_ecdtTechnicalUserLogin, _ecdtTechnicalUserPassword) })
                using (var client = new HttpClient(handler))
                {
                    var file = await client.GetAsync(endpoint);
                    if (file.IsSuccessStatusCode)
                    {
                        Stream s = await file.Content.ReadAsStreamAsync();
                        HttpResponseMessage result = new HttpResponseMessage(HttpStatusCode.OK);
                        result.Content = new StreamContent(s);
                        result.Content.Headers.ContentType = file.Content.Headers.ContentType;
                        result.Content.Headers.ContentDisposition = file.Content.Headers.ContentDisposition;
                        result.Content.Headers.ContentLength = file.Content.Headers.ContentLength;
                        return result;
                    }
                }
            }
            return this.Request.CreateErrorResponse(HttpStatusCode.NotFound, string.Format("Request id {0} not found", requestId));
        }

        /// <summary>
        /// Downloads the translation file(s) for a job
        /// </summary>
        /// <param name="id">The id of the job</param>
        /// <returns></returns>
        [HttpGet]
        public async Task<HttpResponseMessage> DownloadJobTranslation(Guid id, bool corver)
        {
            this.Logger.Debug("Downloading:{JobId}", id);

            //id=jobid
            SourceMaterial mat = this._session.Query<Job>().Where(x => x.Id == id).Select(x => x.SourceMaterial).FirstOrDefault();
            if (mat != null && mat.IsPrivate && mat.UploadedBy != this.User.Identity.Name)
            {
                return this.Request.CreateErrorResponse(HttpStatusCode.OK, string.Format("File has been uploaded by a different user and marked as private", id));
            }


            string endpoint = string.Format("{0}/getjobdelivery.ashx?jobId={1}&corver={2}", ConfigurationManager.AppSettings["FileManagementService"], id, corver);
            using (var handler = new HttpClientHandler() { AutomaticDecompression = DecompressionMethods.GZip | DecompressionMethods.Deflate, Credentials = new System.Net.NetworkCredential(_ecdtTechnicalUserLogin, _ecdtTechnicalUserPassword) })
            using (var client = new HttpClient(handler))
            {
                var file = await client.GetAsync(endpoint);
                if (file.IsSuccessStatusCode)
                {
                    Stream s = await file.Content.ReadAsStreamAsync();
                    HttpResponseMessage result = new HttpResponseMessage(HttpStatusCode.OK);
                    result.Content = new StreamContent(s);
                    result.Content.Headers.ContentType = file.Content.Headers.ContentType;
                    result.Content.Headers.ContentDisposition = file.Content.Headers.ContentDisposition;
                    result.Content.Headers.ContentLength = file.Content.Headers.ContentLength;
                    return result;
                }
            }
            return this.Request.CreateErrorResponse(HttpStatusCode.NotFound, string.Format("File with id {0} not found", id));
        }
    }
}
