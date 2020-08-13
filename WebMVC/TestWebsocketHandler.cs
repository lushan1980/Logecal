using Microsoft.Web.WebSockets;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Web.Script.Serialization;

namespace WebMVC
{
    public class TestWebsocketHandler : WebSocketHandler
    {
        private static readonly WebSocketCollection clients = new WebSocketCollection();

        public override void OnOpen()  // Do when Connection Is Open
        {
            clients.Add(this);
            clients.Broadcast(GetSampleData());
        }

        public static string GetString(object o)
        {
            if (o == DBNull.Value) return null;
            return (string)o;
        }
        public static int? GetInt(object o)
        {

            if (o == DBNull.Value) return null;
            return Convert.ToInt32(o);
        }
        public static float? GetFloat(object o)
        {
            if (o == DBNull.Value) return null;
            return Convert.ToSingle(o);
        }
        public string GetSampleData()
        {
            List<Samples> listSamples = new List<Samples>();
            string CS = ConfigurationManager.ConnectionStrings["WebMVCString"].ConnectionString;
            using (SqlConnection con = new SqlConnection(CS))
            {
                SqlCommand cmd = new SqlCommand("getItalyData", con)
                {
                    CommandType = CommandType.StoredProcedure
                };
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();

                while (rdr.Read())
                {
                    Samples sample = new Samples
                    {
                        Date = Convert.ToDateTime(rdr["Date"]).Date.ToString("MM/dd/yyyy"),
                        //Spline_Interpolation = Convert.ToSingle(rdr["Spline_Interpolation"])
                        //Spline_Interpolation = GetFloat(rdr["Spline_Interpolation"]),
                        //New_Cases = GetInt(rdr["New_Cases"]),
                        //Inflection_Regression = GetFloat(rdr["Inflection_Regression"]),
                        //Projected_New_Cases = GetFloat(rdr["Projected_New_Cases"]),
                        //Projected_New_Cases_Upper_Bound = GetFloat(rdr["Projected_New_Cases_Upper_Bound"]),
                        //Projected_New_Cases_Lower_Bound = GetFloat(rdr["Projected_New_Cases_Lower_Bound"]),
                        //Date_of_Inflection_Point = Convert.ToDateTime(rdr["Date_of_Inflection_Point"]).Date.ToString("MM/dd/yyyy")
                        //Spline_Interpolation = rdr["Spline_Interpolation"] == DBNull.Value ? 0 : Convert.ToSingle(rdr["Spline_Interpolation"]),
                    };

                    listSamples.Add(sample);
                }
            }
            JavaScriptSerializer js = new JavaScriptSerializer();
            return js.Serialize(listSamples);
        }

        public override void OnMessage(string msg)  // When Any Message Sent to Client
        {


        }
        public override void OnClose() // Close Connection
        {
            clients.Remove(this);

        }
    }
}