using Microsoft.Web.WebSockets;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebMVC
{
    /// <summary>
    /// Summary description for Ws
    /// </summary>
    public class Ws : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            if (context.IsWebSocketRequest)
                context.AcceptWebSocketRequest(new TestWebsocketHandler());
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