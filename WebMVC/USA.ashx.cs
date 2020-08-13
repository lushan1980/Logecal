using Microsoft.Web.WebSockets;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebMVC
{
    /// <summary>
    /// Summary description for USA
    /// </summary>
    public class USA : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            if (context.IsWebSocketRequest)
                context.AcceptWebSocketRequest(new USAHandler());
        }

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}