using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Text;
using System.Web.Mvc;
using System.Web.Script.Serialization;
using WebMVC.Models;

namespace WebMVC.Controllers
{
    public class DataController : Controller
    {

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
        // GET: Data
        [HttpPost]
        public JsonResult GetData(Request obj)
        {
            Request request = new Request
            {
                Type = obj.Type,
                Plot = obj.Plot
            };
            //var js = new JavaScriptSerializer();
            //Request request = js.Deserialize<Request>(userJson);

            //return Json(request, JsonRequestBehavior.AllowGet);

            List<TypeplotData> datalist = new List<TypeplotData>();

            datalist.Clear();

            string CS = ConfigurationManager.ConnectionStrings["String"].ConnectionString;
            using (SqlConnection con = new SqlConnection(CS))
            {
                ///////////////////////Loop to get Plot array.
                con.Open();

                //////////////////////count the number of plot                
                SqlCommand countPlot = new SqlCommand("countPlots", con)
                {
                    CommandType = CommandType.StoredProcedure
                };
                countPlot.Parameters.Add(new SqlParameter()
                {
                    ParameterName = "@type",
                    Value = request.Type
                });

                int contPlots = Convert.ToInt32(countPlot.ExecuteScalar());

                string[] Plots = new string[contPlots];
                int contPlot = 0;
                SqlCommand getPlots = new SqlCommand("getPlots", con)
                {
                    CommandType = CommandType.StoredProcedure
                };
                getPlots.Parameters.Add(new SqlParameter()
                {
                    ParameterName = "@type",
                    Value = request.Type
                });

                SqlDataAdapter daplot = new SqlDataAdapter(getPlots);
                DataTable dtplot = new DataTable();
                daplot.Fill(dtplot);
                foreach (DataRow row in dtplot.Rows)
                {
                    Plots[contPlot] = row.Field<string>(0);
                    contPlot++;
                }
                con.Close();


                for (int i = 0; i < Plots.Length; i++)
                {
                    List<Samples> Samplelist = new List<Samples>();
                    Samplelist.Clear();

                    con.Open();
                    SqlCommand cmd = new SqlCommand("getSample", con)
                    {
                        CommandType = CommandType.StoredProcedure
                    };
                    cmd.Parameters.Add(new SqlParameter()
                    {
                        ParameterName = "@type",
                        Value = request.Type
                    });

                    string value;

                    if (request.Type == "Country")
                    {
                        value = request.Plot;
                    }
                    else { value = Plots[i]; };

                    cmd.Parameters.Add(new SqlParameter()
                    {
                        ParameterName = "@plot",
                        Value = value
                    });
                    SqlDataReader rdr = cmd.ExecuteReader();

                    while (rdr.Read())
                    {
                        Samples sample = new Samples
                        {
                            Date = Convert.ToDateTime(rdr["date"]).Date.ToString("MM/dd"),
                            Proj = GetFloat(rdr["proj"]),
                            Dotted_proj = GetFloat(rdr["dotted_proj"]),
                            Dcases = GetInt(rdr["dcases"]),
                            Proj_upper = GetFloat(rdr["proj_upper"]),
                            Proj_lower = GetFloat(rdr["proj_lower"]),
                            Inflection = GetFloat(rdr["inflection"]),
                            Plot = GetString(rdr["plot"]),
                            Death = GetInt(rdr["death"]),
                            Proj_death = GetFloat(rdr["proj_death"]),
                            Dotted_proj_death = GetFloat(rdr["dotted_proj_death"]),
                            Proj_death_upper = GetFloat(rdr["proj_death_upper"]),
                            Proj_death_lower = GetFloat(rdr["proj_death_lower"]),
                            Death_proj_date = Convert.ToDateTime(rdr["death_proj_date"]).Date.ToString("MM/dd"),
                            Death_proj_total = GetInt(rdr["death_proj_total"])

                        };
                        Samplelist.Add(sample);
                    }

                    TypeplotData Data = new TypeplotData
                    {
                        Type = request.Type,
                        Plot = value,
                        ListSamples = Samplelist
                    };
                    datalist.Add(Data);
                    con.Close();
                }
            }
            JavaScriptSerializer js = new JavaScriptSerializer()
            {
                MaxJsonLength = Int32.MaxValue
            };

            return Json(js.Serialize(datalist), JsonRequestBehavior.AllowGet);

        }

        protected override JsonResult Json(object data, string contentType,
        Encoding contentEncoding, JsonRequestBehavior behavior)
        {
            return new JsonResult()
            {
                Data = data,
                ContentType = contentType,
                ContentEncoding = contentEncoding,
                JsonRequestBehavior = behavior,
                MaxJsonLength = Int32.MaxValue
            };
        }

        public JsonResult GetSampleData()
        {
            List<TestSample> Samplelist = new List<TestSample>();
            string CS = ConfigurationManager.ConnectionStrings["String"].ConnectionString;
            using (SqlConnection con = new SqlConnection(CS))
            {                
                con.Open();
                SqlCommand getdata = new SqlCommand("select * from cases_sample", con);
                SqlDataReader testrdr = getdata.ExecuteReader();
                while (testrdr.Read())
                {
                    TestSample testSample = new TestSample
                    {
                        Date = Convert.ToDateTime(testrdr["date"]).Date.ToString("MM/dd"),
                        Actual_cases = GetInt(testrdr["actual_cases"]),
                        New_cases = GetInt(testrdr["new_cases"]),
                        Projected = GetFloat(testrdr["projected"]),
                        Projected_lower = GetFloat(testrdr["projected_lower"]),
                        Projected_upper = GetFloat(testrdr["projected_upper"])

                    };
                    Samplelist.Add(testSample);
                }
                con.Close();
            }
            JavaScriptSerializer js = new JavaScriptSerializer();
            return Json(js.Serialize(Samplelist), JsonRequestBehavior.AllowGet);
        }
    }
}