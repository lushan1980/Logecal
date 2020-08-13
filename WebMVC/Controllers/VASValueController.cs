using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;
using WebMVC.Models;

namespace WebMVC.Controllers
{
    public class VASValueController : Controller
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
        // GET: VASValue
        public ActionResult GetVASValue(VASValue val)
        {

            //VASValue value = new VASValue
            //{

            //    OneDim = val.OneDim,
            //    TwoDimF1 = val.TwoDimF1,
            //    TwoDimF2 = val.TwoDimF2
            //};

            string CS = ConfigurationManager.ConnectionStrings["String"].ConnectionString;
            using (SqlConnection con = new SqlConnection(CS))
            {
                SqlCommand cmd = new SqlCommand("getVASValue", con)
                {
                    CommandType = CommandType.StoredProcedure
                };

                con.Open();

                cmd.Parameters.Add(new SqlParameter()
                {
                    ParameterName = "@OneDim",
                    Value = val.OneDim
                });

                cmd.Parameters.Add(new SqlParameter()
                {
                    ParameterName = "@TwoDimF1",
                    Value = val.TwoDimF1
                });
                cmd.Parameters.Add(new SqlParameter()
                {
                    ParameterName = "@TwoDimF2",
                    Value = val.TwoDimF2
                });

                int result = cmd.ExecuteNonQuery();

                bool insertData;
                if (result > 0)
                {
                    insertData = true;
                }
                else
                {
                    insertData = false;
                }
                con.Close();
                return Json(new { returnvalue = insertData });
            }
        }

        public ActionResult InsertVASUser(VASUser user)
        {            
            string CS = ConfigurationManager.ConnectionStrings["String"].ConnectionString;
            using (SqlConnection con = new SqlConnection(CS))
            {
                SqlCommand cmd = new SqlCommand("InsertVASUser", con)
                {
                    CommandType = CommandType.StoredProcedure
                };

                con.Open();

                cmd.Parameters.Add(new SqlParameter()
                {
                    ParameterName = "@Email",
                    Value = user.Email
                });

                cmd.Parameters.Add(new SqlParameter()
                {
                    ParameterName = "@Password",
                    Value = user.Password
                });

                int result = cmd.ExecuteNonQuery();
                bool insertData;
                if (result > 0)
                {
                    insertData = true;
                }
                else
                {
                    insertData = false;
                }

                //send a temporary passwork to an Email

                SqlCommand cmd2 = new SqlCommand("CheckVASUser", con)
                {
                    CommandType = CommandType.StoredProcedure
                };


                cmd2.Parameters.Add(new SqlParameter()
                {
                    ParameterName = "@Email",
                    Value = user.Email
                });

                cmd2.Parameters.Add(new SqlParameter()
                {
                    ParameterName = "@Password",
                    Value = user.Password
                });

                var reader = cmd2.ExecuteReader();

                if (reader.HasRows)
                {
                    reader.Read();
                    //MailAddress to = new MailAddress(VASUser.Email);
                    //MailAddress from = new MailAddress("shanswork@yahoo.com");
                    //string to = "shanswork@yahoo.com";
                    string to = user.Email;
                    string from = "s.lu@logecal.com";
                    MailMessage mail = new MailMessage(from, to)
                    {
                        Subject = "Temporary Password",
                        Body = $"this is your Temprorary Password : {reader.GetString(2)}"
                    };

                    SmtpClient client = new SmtpClient("smtp.office365.com", 587)
                    {
                        Credentials = new NetworkCredential("s.lu@logecal.com", "TaGha_6W"),
                        EnableSsl = true
                    };

                    try
                    {
                        client.Send(mail);
                    }
                    catch (SmtpException ex)
                    {
                        Console.WriteLine(ex.ToString());
                    }

                }

                //end send a temporary passwork to an Email

                con.Close();
                return Json(new { returnvalue = insertData });
            }
        }

        public ActionResult CheckVASUser(VASUser user)
        {

            string CS = ConfigurationManager.ConnectionStrings["String"].ConnectionString;
            using (SqlConnection con = new SqlConnection(CS))
            {
                SqlCommand cmd = new SqlCommand("CheckVASUser", con)
                {
                    CommandType = CommandType.StoredProcedure
                };

                con.Open();

                cmd.Parameters.Add(new SqlParameter()
                {
                    ParameterName = "@Email",
                    Value = user.Email
                });

                cmd.Parameters.Add(new SqlParameter()
                {
                    ParameterName = "@Password",
                    Value = user.Password
                });

                //int record = (int)cmd.ExecuteScalar();
                object record = cmd.ExecuteScalar();
                bool result;
                if (record == null || record == DBNull.Value)
                {
                    result = false;
                }
                else
                {
                    result = true;
                }

                con.Close();
                return Json(new { returnvalue = result });

            }

        }

        //check VAS user return record
        [HttpPost]
        public JsonResult CheckVASUser1(VASUser user)
        {
            List<VASUser> userinfo = new List<VASUser>();
            string CS = ConfigurationManager.ConnectionStrings["String"].ConnectionString;
            using (SqlConnection con = new SqlConnection(CS))
            {
                SqlCommand cmd = new SqlCommand("CheckVASUser", con)
                {
                    CommandType = CommandType.StoredProcedure
                };

                con.Open();

                cmd.Parameters.Add(new SqlParameter()
                {
                    ParameterName = "@Email",
                    Value = user.Email
                });

                cmd.Parameters.Add(new SqlParameter()
                {
                    ParameterName = "@Password",
                    Value = user.Password
                });
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    VASUser VASUser = new VASUser
                    {
                        ID = (int)GetInt(rdr["ID"]),
                        Email = GetString(rdr["Email"]),
                        Password = GetString(rdr["Password"])
                    };
                    userinfo.Add(VASUser);
                }
                con.Close();
            }
            JavaScriptSerializer js = new JavaScriptSerializer();
            return Json(js.Serialize(userinfo), JsonRequestBehavior.AllowGet);
        }
        //end 

        //using session
        [HttpPost]
        public ActionResult CheckVASUser2(VASUser user)
        {
            
            string CS = ConfigurationManager.ConnectionStrings["String"].ConnectionString;
            using (SqlConnection con = new SqlConnection(CS))
            {
                SqlCommand cmd = new SqlCommand("CheckVASUser", con)
                {
                    CommandType = CommandType.StoredProcedure
                };

                con.Open();

                cmd.Parameters.Add(new SqlParameter()
                {
                    ParameterName = "@Email",
                    Value = user.Email
                });

                cmd.Parameters.Add(new SqlParameter()
                {
                    ParameterName = "@Password",
                    Value = user.Password
                });

                SqlDataReader rdr = cmd.ExecuteReader();
                if (rdr.HasRows)
                {
                    Session["UserID"] = rdr["ID"].ToString();
                    Session["UserName"] = rdr["Email"].ToString();
                    return RedirectToAction("test3");
                }

                con.Close();
            }
            return View(user);
        }
        //end 


        [HttpPost]
        public ActionResult InsertASurvey(Survey val)
        {

            string CS = ConfigurationManager.ConnectionStrings["String"].ConnectionString;
            using (SqlConnection con = new SqlConnection(CS))
            {
                SqlCommand cmd = new SqlCommand("InsertASurvey", con)
                {
                    CommandType = CommandType.StoredProcedure
                };

                con.Open();

                cmd.Parameters.Add(new SqlParameter()
                {
                    ParameterName = "ID",
                    Value = val.ID
                });
                cmd.Parameters.Add(new SqlParameter()
                {
                    ParameterName = "@Age",
                    Value = val.Age
                });
                cmd.Parameters.Add(new SqlParameter()
                {
                    ParameterName = "@Gender",
                    Value = val.Gender
                });

                cmd.Parameters.Add(new SqlParameter()
                {
                    ParameterName = "@F1",
                    Value = val.F1
                });
                cmd.Parameters.Add(new SqlParameter()
                {
                    ParameterName = "@F2",
                    Value = val.F2
                });
                int result = cmd.ExecuteNonQuery();

                bool insertData;
                if (result > 0)
                {
                    insertData = true;
                }
                else
                {
                    insertData = false;
                }
                con.Close();
                return Json(new { returnvalue = insertData });
            }
        }



    }
}