using System;
using System.Collections.Generic;
using Microsoft.Web.WebSockets;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;
using System.Web.Script.Serialization;
using System.Web.SessionState;
using System.Linq;
using System.Windows.Documents;
using WebMVC.Models;

namespace WebMVC
{
    public class USAHandler : WebSocketHandler
    {
        private static readonly WebSocketCollection clients = new WebSocketCollection();
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
        public string GetData(Request request)            
        {         
            
            List<StateData> statedatalist = new List<StateData>();
            statedatalist.Clear();
            
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

                    
                for (int i = 0; i < Plots.Length; i++ )
                {
                    List<USASamples> listSamples = new List<USASamples>();
                    listSamples.Clear();

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
                        USASamples sample = new USASamples
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
                        listSamples.Add(sample);
                    }

                    StateData stateData = new StateData
                    {
                        Type = request.Type,
                        Plot = value,
                        ListSamples = listSamples
                    };
                    statedatalist.Add(stateData);
                    con.Close();   
                }                                                   
            }

            JavaScriptSerializer js = new JavaScriptSerializer
            {
                MaxJsonLength = Int32.MaxValue
            };
            return js.Serialize(statedatalist);
            
            }
        public override void OnOpen()  // Do when Connection Is Open
        {
            clients.Add(this);   
        }       

        public override void OnMessage(string msg)  // When receive a Message from Client
        {
            var obj = new JavaScriptSerializer().Deserialize<Request>(msg);
            if (obj == null)
            {
                clients.Remove(this);
            }
            else
            {
                clients.Broadcast(GetData(obj));
            }
            
        }
        public override void OnClose() // Close Connection
        {
            clients.Remove(this);

        }
    }
}







/////////////////////////Loop to get Continents array.
//con.Open();

////////////////////////count the number of Continents                
//SqlCommand countContinent = new SqlCommand("select count(continent) from (select continent from large_dataset_example group by continent) AS continents;;", con);
//int contContinent = Convert.ToInt32(countContinent.ExecuteScalar());

//string[] Continents = new string[contContinent];
//int contCon = 0;
//SqlCommand getContinents = new SqlCommand("select continent from large_dataset_example group by continent;", con);
//SqlDataAdapter daContinents = new SqlDataAdapter(getContinents);
//DataTable dtContinents = new DataTable();
//daContinents.Fill(dtContinents);
//foreach (DataRow row in dtContinents.Rows)
//{
//    Continents[contCon] = row.Field<string>(0);
//    contCon++;
//}
//con.Close();
////var a = Continents;
/////////////////////////Loop to get Countries array.
//con.Open();
////////////////////////count the number of Country        

//SqlCommand countCountry = new SqlCommand("select count(country) from (select country from large_dataset_example group by country) AS countries;;", con);
//int contCountry = Convert.ToInt32(countCountry.ExecuteScalar());
//string[] Countries = new string[contCountry];

//int contCoun = 0;
//SqlCommand getCountries = new SqlCommand("select country from large_dataset_example group by country;", con);
//SqlDataAdapter daCountries = new SqlDataAdapter(getCountries);
//DataTable dtCountries = new DataTable();
//daCountries.Fill(dtCountries);
//foreach (DataRow row in dtCountries.Rows)
//{
//    Countries[contCoun] = row.Field<string>(0);
//    contCoun++;
//}
//con.Close();
////var b = Countries;
/////////////////////////Loop to get States array.
//con.Open();
////////////////////////count the number of states                
//SqlCommand countState = new SqlCommand("select count(state) from (select state from large_dataset_example group by state) AS states;;", con);
//int contState = Convert.ToInt32(countState.ExecuteScalar());
//string[] States = new string[contState];

//int contStat = 0;
//SqlCommand getStates = new SqlCommand("select state from large_dataset_example group by state;", con);
//SqlDataAdapter daStates = new SqlDataAdapter(getStates);
//DataTable dtStates = new DataTable();
//daStates.Fill(dtStates);
//foreach (DataRow row in dtStates.Rows)
//{
//    States[contStat] = row.Field<string>(0);
//    contStat++;
//}
//con.Close();
////var c = States;
/////////////////////////Loop to get States array.
//con.Open();
////////////////////////count the number of states                
//SqlCommand countcity = new SqlCommand("select count(city) from (select city from large_dataset_example group by city) AS cities;;", con);
//int contcities = Convert.ToInt32(countState.ExecuteScalar());
//string[] Cities = new string[contcities];

//int contcity = 0;
//SqlCommand getCities = new SqlCommand("select city from large_dataset_example group by city;", con);
//SqlDataAdapter daCities = new SqlDataAdapter(getCities);
//DataTable dtCities = new DataTable();
//daCities.Fill(dtCities);
//foreach (DataRow row in dtCities.Rows)
//{
//    Cities[contcity] = row.Field<string>(0);
//    contcity++;
//}
//con.Close();
////var d = Cities;







/////////////////////////Loop to get type array.
//con.Open();
////string[] Types = new string[] { "Country", "State", "City" };
////string[] Plots = new string[] {"United States", "Belgium",  "Pennsylvania", "Delaware", "Baltimore", "Philadelphia" };

////////////////////////count the number of type                
//SqlCommand countType = new SqlCommand("select count(type) from (select type from large_dataset_example group by type) AS Types;;", con);
//int contType = Convert.ToInt32(countType.ExecuteScalar());

//string[] Types = new string[contType];
//int cont = 0;                
//SqlCommand gettypes = new SqlCommand("select type from large_dataset_example group by type order by type;", con);
//SqlDataAdapter da = new SqlDataAdapter(gettypes);
//DataTable dt = new DataTable();
//da.Fill(dt);
//foreach (DataRow row in dt.Rows)
//{
//    Types[cont] = row.Field<string>(0);
//    cont++;
//}
//con.Close();
