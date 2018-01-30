using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace ClientPortal.Controllers
{
    public class UtilityController : ApiController
    {
        [HttpGet]
        public HttpResponseMessage CheckUrl(string url)
        {
            return new HttpResponseMessage(HttpStatusCode.OK);

            //from DMZ internet is not accessible
            //var request = (HttpWebRequest)WebRequest.Create(url);
            //request.Method = "HEAD";
            //request.UserAgent = "Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1)";
            //try
            //{
            //    var response = (HttpWebResponse)request.GetResponse();
            //    return new HttpResponseMessage(HttpStatusCode.OK);
            //}
            //catch
            //{
            //    return new HttpResponseMessage(HttpStatusCode.BadRequest);
            //}


        }
    }
}
