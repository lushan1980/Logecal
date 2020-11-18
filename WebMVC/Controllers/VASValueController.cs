using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Security.Cryptography.X509Certificates;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;
using System.Web.UI.WebControls;
using WebMVC.Models;

namespace WebMVC.Controllers
{
    public class VASValueController : Controller
    {
        public static string GetString(object o)
        {
            return o == DBNull.Value ? null : (string)o;
        }
        public static int? GetInt(object o)
        {
            return o == DBNull.Value ? default(int) : (int?)Convert.ToInt32(o);
        }
        public static float? GetFloat(object o)
        {
            return o == DBNull.Value ? default(float) : (float?)Convert.ToSingle(o);
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
        public ActionResult InsertVASUser111(VASUser user)
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

                SqlDataReader rdr = cmd.ExecuteReader();

                string SubjID = "";
                if (rdr.HasRows)
                {
                    while (rdr.Read())
                    {
                        SubjID = rdr["SubjID"].ToString();
                    }
                }

                con.Close();
                return Json(new { returnvalue = SubjID });

            }

        }
        public ActionResult CheckLumendiUser(VASUser user)
        {
            List<VASUser> AllUser = new List<VASUser>();
            string CS = ConfigurationManager.ConnectionStrings["String"].ConnectionString;
            using (SqlConnection con = new SqlConnection(CS))
            {
                SqlCommand cmd = new SqlCommand("CheckLumendiUser", con)
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

                string UserID = "";
                if (rdr.HasRows)
                {
                    while (rdr.Read())
                    {
                        UserID = rdr["UserID"].ToString();
                    }
                }

                con.Close();
                return Json(new { returnvalue = UserID });

            }

        }
        public ActionResult CheckVASUserEmail(VASUser user)
        {

            string CS = ConfigurationManager.ConnectionStrings["String"].ConnectionString;
            using (SqlConnection con = new SqlConnection(CS))
            {
                SqlCommand cmd = new SqlCommand("CheckVASUserEmail", con)
                {
                    CommandType = CommandType.StoredProcedure
                };

                con.Open();

                cmd.Parameters.Add(new SqlParameter()
                {
                    ParameterName = "@Email",
                    Value = user.Email
                });

                SqlDataReader rdr = cmd.ExecuteReader();

                string UserID = "";
                if (rdr.HasRows)
                {
                    while (rdr.Read())
                    {
                        UserID = rdr["UserID"].ToString();
                    }
                }

                con.Close();
                return Json(new { returnvalue = UserID });

            }

        }

        public ActionResult CheckLumendiUserEmail(VASUser user)
        {

            string CS = ConfigurationManager.ConnectionStrings["String"].ConnectionString;
            using (SqlConnection con = new SqlConnection(CS))
            {
                SqlCommand cmd = new SqlCommand("CheckLumendiUserEmail", con)
                {
                    CommandType = CommandType.StoredProcedure
                };

                con.Open();

                cmd.Parameters.Add(new SqlParameter()
                {
                    ParameterName = "@Email",
                    Value = user.Email
                });

                SqlDataReader rdr = cmd.ExecuteReader();

                string UserID = "";
                if (rdr.HasRows)
                {
                    while (rdr.Read())
                    {
                        UserID = rdr["UserID"].ToString();
                    }
                }

                con.Close();
                return Json(new { returnvalue = UserID });

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
                        UserID = (int)GetInt(rdr["ID"]),
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
                    ParameterName = "SubjID",
                    Value = val.SubjID
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
        public ActionResult CheckInviteCode(VASUser user)
        {
            string CS = ConfigurationManager.ConnectionStrings["String"].ConnectionString;
            using (SqlConnection con = new SqlConnection(CS))
            {
                SqlCommand cmd = new SqlCommand("CheckSurvey", con)
                {
                    CommandType = CommandType.StoredProcedure
                };

                con.Open();

                cmd.Parameters.Add(new SqlParameter()
                {
                    ParameterName = "@SurveyID",
                    Value = user.SurveyID
                });

                string record = (string)cmd.ExecuteScalar();
                bool result;
                if (record == user.InviteCode)
                {
                    result = true;
                }
                else
                {
                    result = false;
                }

                con.Close();
                return Json(new { returnvalue = result });

            }
        }
        public JsonResult InsertVASUser(VASUser user)
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
                    ParameterName = "@SurveyID",
                    Value = user.SurveyID
                });

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

                string SubjID = "";
                if (rdr.HasRows)
                {
                    while (rdr.Read())
                    {
                        SubjID = rdr["SubjID"].ToString();
                    }
                }

                con.Close();
                return Json(new { returnvalue = SubjID });

            }
        }
        public JsonResult InsertLumendiUser(VASUser user)
        {
            string CS = ConfigurationManager.ConnectionStrings["String"].ConnectionString;
            using (SqlConnection con = new SqlConnection(CS))
            {
                SqlCommand cmd = new SqlCommand("InsertLumendiUser", con)
                {
                    CommandType = CommandType.StoredProcedure
                };

                con.Open();

                cmd.Parameters.Add(new SqlParameter()
                {
                    ParameterName = "@SurveyID",
                    Value = user.SurveyID
                });

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

                string UserID = "";
                if (rdr.HasRows)
                {
                    while (rdr.Read())
                    {
                        UserID = rdr["UserID"].ToString();
                    }
                }

                con.Close();
                return Json(new { returnvalue = UserID });

            }
        }
        public ActionResult UpdatePwd1111111(VASUser user)   //give a record a password and send a temporary password to his Email
        {
            string CS = ConfigurationManager.ConnectionStrings["String"].ConnectionString;
            using (SqlConnection con = new SqlConnection(CS))
            {
                SqlCommand cmd = new SqlCommand("UpdatePwd", con)
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

                    string to = user.Email;
                    string from = "s.lu@logecal.com";
                    MailMessage mail = new MailMessage(from, to)
                    {
                        Subject = "Temporary Password",
                        Body = $"this is your Temprorary Password : {reader.GetString(3)}"
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
        public ActionResult SendEmailSecurityCode(VASUser user)
        {
            string SecurityCode = CreateRandomPassword();
            string CS = ConfigurationManager.ConnectionStrings["String"].ConnectionString;
            using (SqlConnection con = new SqlConnection(CS))
            {
                SqlCommand cmd = new SqlCommand("UpdateSecurityCode", con)
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
                    ParameterName = "@SecurityCode",
                    Value = SecurityCode
                });

                cmd.ExecuteNonQuery();
                con.Close();
            }
            
            string to = user.Email;
            string from = "s.lu@logecal.com";
            MailMessage mail = new MailMessage(from, to)
            {
                Subject = "Security Code",
                Body = $"This is your Security Code: {SecurityCode}"
            };

            SmtpClient client = new SmtpClient("smtp.office365.com", 587)
            {
                Credentials = new NetworkCredential("s.lu@logecal.com", "TaGha_6W"),
                EnableSsl = true
            };
            string result = "";
            try
            {
                client.Send(mail);
                result = "1";
            }
            catch (SmtpException ex)
            {
                Console.WriteLine(ex.ToString());
            }
            return Json(new { returnvalue = result });
        }

        public ActionResult InviteUser(VASUser user)   //insert a record to LumendiUser and give it a tempory password and send a link and password to Email
        {
            string TemporyPassword = CreateRandomPassword();
            string CS = ConfigurationManager.ConnectionStrings["String"].ConnectionString;
            using (SqlConnection con = new SqlConnection(CS))
            {
                SqlCommand cmd = new SqlCommand("InviteUser", con)
                {
                    CommandType = CommandType.StoredProcedure
                };
                con.Open();

                cmd.Parameters.Add(new SqlParameter()
                {
                    ParameterName = "@SurveyID",
                    Value = 3
                });
                cmd.Parameters.Add(new SqlParameter()
                {
                    ParameterName = "@Email",
                    Value = user.Email
                });
                cmd.Parameters.Add(new SqlParameter()
                {
                    ParameterName = "@Password",
                    Value = TemporyPassword
                });
                cmd.Parameters.Add(new SqlParameter()
                {
                    ParameterName = "@Administrator",
                    Value = user.Administrator
                });

                cmd.ExecuteNonQuery();
                con.Close();
            }

            string to = user.Email;
            string from = "s.lu@logecal.com";
            MailMessage mail = new MailMessage(from, to)
            {
                Subject = "Tempory Password",
                Body = $"This is your Tempory Password: {TemporyPassword}, Please reset your Password: https://localhost:44343/VAS/ResetPwd"
            };

            SmtpClient client = new SmtpClient("smtp.office365.com", 587)
            {
                Credentials = new NetworkCredential("s.lu@logecal.com", "TaGha_6W"),
                EnableSsl = true
            };
            string result = "";
            try
            {
                client.Send(mail);
                result = "1";
            }
            catch (SmtpException ex)
            {
                Console.WriteLine(ex.ToString());
            }
            return Json(new { returnvalue = result });
        }
        public ActionResult UpdatePwd(VASUser user)
        {
            string CS = ConfigurationManager.ConnectionStrings["String"].ConnectionString;
            using (SqlConnection con = new SqlConnection(CS))
            {
                SqlCommand cmd = new SqlCommand("UpdatePwd", con)
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
                    ParameterName = "@SecurityCode",
                    Value = user.SecurityCode
                });
                cmd.Parameters.Add(new SqlParameter()
                {
                    ParameterName = "@Password",
                    Value = user.Password
                });

                int result = cmd.ExecuteNonQuery();
                bool resetPwd;
                if (result > 0)
                {
                    resetPwd = true;
                }
                else
                {
                    resetPwd = false;
                }

                con.Close();
                return Json(new { returnvalue = resetPwd });
            }
        }
        public ActionResult CheckexistsSubj(VASUser user)
        {

            string CS = ConfigurationManager.ConnectionStrings["String"].ConnectionString;
            using (SqlConnection con = new SqlConnection(CS))
            {
                SqlCommand cmd = new SqlCommand("CheckexistsSubj", con)
                {
                    CommandType = CommandType.StoredProcedure
                };

                con.Open();

                cmd.Parameters.Add(new SqlParameter()
                {
                    ParameterName = "@SubjID",
                    Value = user.SubjID
                });

                SqlDataReader rdr = cmd.ExecuteReader();

                string VisitNo = "";
                if (rdr.HasRows)
                {
                    while (rdr.Read())
                    {
                        VisitNo = rdr["VisitNo"].ToString();
                    }
                }
                if (VisitNo == "")
                {
                    VisitNo = "0";
                }

                con.Close();
                return Json(new { returnvalue = VisitNo });
            }
        }
        public ActionResult CheckLumendiSubjExists(VASUser user)
        {

            string CS = ConfigurationManager.ConnectionStrings["String"].ConnectionString;
            using (SqlConnection con = new SqlConnection(CS))
            {
                SqlCommand cmd = new SqlCommand("CheckLumendiSubjExists", con)
                {
                    CommandType = CommandType.StoredProcedure
                };

                con.Open();

                cmd.Parameters.Add(new SqlParameter()
                {
                    ParameterName = "@UserID",
                    Value = user.UserID
                });
                cmd.Parameters.Add(new SqlParameter()
                {
                    ParameterName = "@SubjID",
                    Value = user.SubjID
                });

                SqlDataReader rdr = cmd.ExecuteReader();

                string VisitNo = "";
                if (rdr.HasRows)
                {
                    while (rdr.Read())
                    {
                        VisitNo = rdr["VisitNo"].ToString();
                    }
                }

                con.Close();
                return Json(new { returnvalue = VisitNo });
            }
        }
        public ActionResult InsertStudy2first(Survey val)
        {

            string CS = ConfigurationManager.ConnectionStrings["String"].ConnectionString;
            using (SqlConnection con = new SqlConnection(CS))
            {
                SqlCommand cmd = new SqlCommand("InsertStudy2first", con)
                {
                    CommandType = CommandType.StoredProcedure
                };

                con.Open();

                cmd.Parameters.Add(new SqlParameter()
                {
                    ParameterName = "SubjID",
                    Value = val.SubjID
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
                    ParameterName = "@Ethnicity",
                    Value = val.Ethnicity
                });
                cmd.Parameters.Add(new SqlParameter()
                {
                    ParameterName = "@Race",
                    Value = val.Race
                });
                cmd.Parameters.Add(new SqlParameter()
                {
                    ParameterName = "@Assessment",
                    Value = val.Assessment
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
        public ActionResult InsertStudy2(Survey val)
        {

            string CS = ConfigurationManager.ConnectionStrings["String"].ConnectionString;
            using (SqlConnection con = new SqlConnection(CS))
            {
                SqlCommand cmd = new SqlCommand("InsertStudy2", con)
                {
                    CommandType = CommandType.StoredProcedure
                };

                con.Open();                

                cmd.Parameters.Add(new SqlParameter()
                {
                    ParameterName = "SubjID",
                    Value = val.SubjID
                });
                cmd.Parameters.Add(new SqlParameter()
                {
                    ParameterName = "VisitNo",
                    Value = val.VisitNo
                });
                cmd.Parameters.Add(new SqlParameter()
                {
                    ParameterName = "@Assessment",
                    Value = val.Assessment
                });
                cmd.Parameters.Add(new SqlParameter()
                {
                    ParameterName = "@AEDiscription1",
                    Value = val.AEDiscription1
                });
                cmd.Parameters.Add(new SqlParameter()
                {
                    ParameterName = "@Severity1",
                    Value = val.Severity1
                });
                cmd.Parameters.Add(new SqlParameter()
                {
                    ParameterName = "@AEDiscription2",
                    Value = GetString(val.AEDiscription2)
                });
                cmd.Parameters.Add(new SqlParameter()
                {
                    ParameterName = "@Severity2",
                    Value = GetString(val.Severity2)
                });
                cmd.Parameters.Add(new SqlParameter()
                {
                    ParameterName = "@AEDiscription3",
                    Value = val.AEDiscription3
                });
                cmd.Parameters.Add(new SqlParameter()
                {
                    ParameterName = "@Severity3",
                    Value = val.Severity3
                });
                cmd.Parameters.Add(new SqlParameter()
                {
                    ParameterName = "@AEDiscription4",
                    Value = val.AEDiscription4
                });
                cmd.Parameters.Add(new SqlParameter()
                {
                    ParameterName = "@Severity4",
                    Value = val.Severity4
                });

                foreach (SqlParameter parameter in cmd.Parameters)
                {
                    if (parameter.Value == null)
                    {
                        parameter.Value = DBNull.Value;
                    }
                };

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
        public ActionResult InsertLumendi(Survey val)
        {

            string CS = ConfigurationManager.ConnectionStrings["String"].ConnectionString;
            using (SqlConnection con = new SqlConnection(CS))
            {
                SqlCommand cmd = new SqlCommand("InsertLumendi", con)
                {
                    CommandType = CommandType.StoredProcedure
                };

                con.Open();
                cmd.Parameters.Add(new SqlParameter()
                {
                    ParameterName = "VisitTime",
                    Value = val.VisitTime
                });
                cmd.Parameters.Add(new SqlParameter()
                {
                    ParameterName = "UserID",
                    Value = val.UserID
                });
                cmd.Parameters.Add(new SqlParameter()
                {
                    ParameterName = "SubjID",
                    Value = val.SubjID
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
                    ParameterName = "@RaceEthni",
                    Value = val.RaceEthni
                });
                cmd.Parameters.Add(new SqlParameter()
                {
                    ParameterName = "@ColonPolyp",
                    Value = val.ColonPolyp
                });
                cmd.Parameters.Add(new SqlParameter()
                {
                    ParameterName = "@BiopsyDone",
                    Value = val.BiopsyDone
                });
                cmd.Parameters.Add(new SqlParameter()
                {
                    ParameterName = "@Hemorrhoids",
                    Value = val.Hemorrhoids
                });
                cmd.Parameters.Add(new SqlParameter()
                {
                    ParameterName = "@Diverticulitis",
                    Value = val.Diverticulitis
                });
                cmd.Parameters.Add(new SqlParameter()
                {
                    ParameterName = "@Diabetes",
                    Value = val.Diabetes
                });
                cmd.Parameters.Add(new SqlParameter()
                {
                    ParameterName = "@Anemia",
                    Value = val.Anemia
                });
                cmd.Parameters.Add(new SqlParameter()
                {
                    ParameterName = "@Hysterectomy",
                    Value = val.Hysterectomy
                });
                cmd.Parameters.Add(new SqlParameter()
                {
                    ParameterName = "@ASA",
                    Value = val.ASA
                });
                cmd.Parameters.Add(new SqlParameter()
                {
                    ParameterName = "@Kudo",
                    Value = val.Kudo
                });
                cmd.Parameters.Add(new SqlParameter()
                {
                    ParameterName = "@Paris",
                    Value = val.Paris
                });
                cmd.Parameters.Add(new SqlParameter()
                {
                    ParameterName = "@Randomization",
                    Value = val.Randomization
                });
                cmd.Parameters.Add(new SqlParameter()
                {
                    ParameterName = "@Successful",
                    Value = val.Successful
                });
                cmd.Parameters.Add(new SqlParameter()
                {
                    ParameterName = "@Comment",
                    Value = val.Comment
                });
                cmd.Parameters.Add(new SqlParameter()
                {
                    ParameterName = "@Length",
                    Value = val.Length
                });
                cmd.Parameters.Add(new SqlParameter()
                {
                    ParameterName = "@Width",
                    Value = val.Width
                });
                cmd.Parameters.Add(new SqlParameter()
                {
                    ParameterName = "@Location",
                    Value = val.Location
                });
                cmd.Parameters.Add(new SqlParameter()
                {
                    ParameterName = "@Navigating",
                    Value = val.Navigating
                });
                cmd.Parameters.Add(new SqlParameter()
                {
                    ParameterName = "@CleanMargins",
                    Value = val.CleanMargins
                });
                cmd.Parameters.Add(new SqlParameter()
                {
                    ParameterName = "@TBegan",
                    Value = val.TBegan
                });
                cmd.Parameters.Add(new SqlParameter()
                {
                    ParameterName = "@DProc",
                    Value = val.DProc
                });
                cmd.Parameters.Add(new SqlParameter()
                {
                    ParameterName = "@TEnded",
                    Value = val.TEnded
                });
                cmd.Parameters.Add(new SqlParameter()
                {
                    ParameterName = "@TCeReached",
                    Value = val.TCeReached
                });
                cmd.Parameters.Add(new SqlParameter()
                {
                    ParameterName = "@TLeReached",
                    Value = val.TLeReached
                });

                foreach (SqlParameter parameter in cmd.Parameters)
                {
                    if (parameter.Value == null)
                    {
                        parameter.Value = DBNull.Value;
                    }
                };

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
        public ActionResult EditDemog(Survey val)
        {

            string CS = ConfigurationManager.ConnectionStrings["String"].ConnectionString;
            using (SqlConnection con = new SqlConnection(CS))
            {
                SqlCommand cmd = new SqlCommand("EditDemog", con)
                {
                    CommandType = CommandType.StoredProcedure
                };

                con.Open();
                cmd.Parameters.Add(new SqlParameter()
                {
                    ParameterName = "UserID",
                    Value = val.UserID
                });
                cmd.Parameters.Add(new SqlParameter()
                {
                    ParameterName = "SubjID",
                    Value = val.SubjID
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
                    ParameterName = "@RaceEthni",
                    Value = val.RaceEthni
                });
  
                foreach (SqlParameter parameter in cmd.Parameters)
                {
                    if (parameter.Value == null)
                    {
                        parameter.Value = DBNull.Value;
                    }
                };

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
        public ActionResult EditProc(Survey val)
        {

            string CS = ConfigurationManager.ConnectionStrings["String"].ConnectionString;
            using (SqlConnection con = new SqlConnection(CS))
            {
                SqlCommand cmd = new SqlCommand("EditProc", con)
                {
                    CommandType = CommandType.StoredProcedure
                };

                con.Open();

                cmd.Parameters.Add(new SqlParameter()
                {
                    ParameterName = "SubjID",
                    Value = val.SubjID
                });
                cmd.Parameters.Add(new SqlParameter()
                {
                    ParameterName = "@Randomization",
                    Value = val.Randomization
                });
                cmd.Parameters.Add(new SqlParameter()
                {
                    ParameterName = "@Length",
                    Value = val.Length
                });
                cmd.Parameters.Add(new SqlParameter()
                {
                    ParameterName = "@Width",
                    Value = val.Width
                });
                cmd.Parameters.Add(new SqlParameter()
                {
                    ParameterName = "@DProc",
                    Value = val.DProc
                });
                cmd.Parameters.Add(new SqlParameter()
                {
                    ParameterName = "@TBegan",
                    Value = val.TBegan
                });
                cmd.Parameters.Add(new SqlParameter()
                {
                    ParameterName = "@TEnded",
                    Value = val.TEnded
                });
                cmd.Parameters.Add(new SqlParameter()
                {
                    ParameterName = "@TCeReached",
                    Value = val.TCeReached
                });
                cmd.Parameters.Add(new SqlParameter()
                {
                    ParameterName = "@TLeReached",
                    Value = val.TLeReached
                });

                foreach (SqlParameter parameter in cmd.Parameters)
                {
                    if (parameter.Value == null)
                    {
                        parameter.Value = DBNull.Value;
                    }
                };

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
        public ActionResult EditAE(Survey val)
        {

            string CS = ConfigurationManager.ConnectionStrings["String"].ConnectionString;
            using (SqlConnection con = new SqlConnection(CS))
            {
                SqlCommand cmd = new SqlCommand("EditAE", con)
                {
                    CommandType = CommandType.StoredProcedure
                };

                con.Open();

                cmd.Parameters.Add(new SqlParameter()
                {
                    ParameterName = "SubjID",
                    Value = val.SubjID
                });
                cmd.Parameters.Add(new SqlParameter()
                {
                    ParameterName = "@VisitNo",
                    Value = val.VisitNo
                });
                cmd.Parameters.Add(new SqlParameter()
                {
                    ParameterName = "@AEDiscription",
                    Value = val.AEDiscription
                });
                cmd.Parameters.Add(new SqlParameter()
                {
                    ParameterName = "@Severity",
                    Value = val.Severity
                });

                foreach (SqlParameter parameter in cmd.Parameters)
                {
                    if (parameter.Value == null)
                    {
                        parameter.Value = DBNull.Value;
                    }
                };

                int result = cmd.ExecuteNonQuery();

                con.Close();
                return Json(new { returnvalue = result });
            }
        }
        public ActionResult DeleteDemog(Survey val)
        {

            string CS = ConfigurationManager.ConnectionStrings["String"].ConnectionString;
            using (SqlConnection con = new SqlConnection(CS))
            {
                SqlCommand cmd = new SqlCommand("DeleteDemog", con)
                {
                    CommandType = CommandType.StoredProcedure
                };

                con.Open();
                cmd.Parameters.Add(new SqlParameter()
                {
                    ParameterName = "UserID",
                    Value = val.UserID
                });
                cmd.Parameters.Add(new SqlParameter()
                {
                    ParameterName = "SubjID",
                    Value = val.SubjID
                });


                foreach (SqlParameter parameter in cmd.Parameters)
                {
                    if (parameter.Value == null)
                    {
                        parameter.Value = DBNull.Value;
                    }
                };

                int result = cmd.ExecuteNonQuery();

                con.Close();
                return Json(new { returnvalue = result });
            }
        }
        public ActionResult DeleteProc(Survey val)
        {

            string CS = ConfigurationManager.ConnectionStrings["String"].ConnectionString;
            using (SqlConnection con = new SqlConnection(CS))
            {
                SqlCommand cmd = new SqlCommand("DeleteProc", con)
                {
                    CommandType = CommandType.StoredProcedure
                };

                con.Open();

                cmd.Parameters.Add(new SqlParameter()
                {
                    ParameterName = "SubjID",
                    Value = val.SubjID
                });


                foreach (SqlParameter parameter in cmd.Parameters)
                {
                    if (parameter.Value == null)
                    {
                        parameter.Value = DBNull.Value;
                    }
                };

                int result = cmd.ExecuteNonQuery();

                con.Close();
                return Json(new { returnvalue = result });
            }
        }
        public ActionResult DeleteAE(Survey val)
        {

            string CS = ConfigurationManager.ConnectionStrings["String"].ConnectionString;
            using (SqlConnection con = new SqlConnection(CS))
            {
                SqlCommand cmd = new SqlCommand("DeleteAE", con)
                {
                    CommandType = CommandType.StoredProcedure
                };

                con.Open();

                cmd.Parameters.Add(new SqlParameter()
                {
                    ParameterName = "SubjID",
                    Value = val.SubjID
                });
                cmd.Parameters.Add(new SqlParameter()
                {
                    ParameterName = "VisitNo",
                    Value = val.VisitNo
                });

                foreach (SqlParameter parameter in cmd.Parameters)
                {
                    if (parameter.Value == null)
                    {
                        parameter.Value = DBNull.Value;
                    }
                };

                int result = cmd.ExecuteNonQuery();

                con.Close();
                return Json(new { returnvalue = result });
            }
        }
        public ActionResult InsertLumendiAE(Survey val)
        {

            string CS = ConfigurationManager.ConnectionStrings["String"].ConnectionString;
            using (SqlConnection con = new SqlConnection(CS))
            {
                SqlCommand cmd = new SqlCommand("InsertLumendiAE", con)
                {
                    CommandType = CommandType.StoredProcedure
                };

                con.Open();
                cmd.Parameters.Add(new SqlParameter()
                {
                    ParameterName = "UserID",
                    Value = val.UserID
                });
                cmd.Parameters.Add(new SqlParameter()
                {
                    ParameterName = "SubjID",
                    Value = val.SubjID
                });
                cmd.Parameters.Add(new SqlParameter()
                {
                    ParameterName = "VisitNo",
                    Value = val.VisitNo
                });
                cmd.Parameters.Add(new SqlParameter()
                {
                    ParameterName = "WhichAE",
                    Value = val.WhichAE
                });
                cmd.Parameters.Add(new SqlParameter()
                {
                    ParameterName = "Satification",
                    Value = val.Satification
                });
                cmd.Parameters.Add(new SqlParameter()
                {
                    ParameterName = "@AEDiscription1",
                    Value = val.AEDiscription1
                });
                cmd.Parameters.Add(new SqlParameter()
                {
                    ParameterName = "@Severity1",
                    Value = val.Severity1
                });
                cmd.Parameters.Add(new SqlParameter()
                {
                    ParameterName = "@AEDiscription2",
                    Value = GetString(val.AEDiscription2)
                });
                cmd.Parameters.Add(new SqlParameter()
                {
                    ParameterName = "@Severity2",
                    Value = GetString(val.Severity2)
                });
                cmd.Parameters.Add(new SqlParameter()
                {
                    ParameterName = "@AEDiscription3",
                    Value = val.AEDiscription3
                });
                cmd.Parameters.Add(new SqlParameter()
                {
                    ParameterName = "@Severity3",
                    Value = val.Severity3
                });
                cmd.Parameters.Add(new SqlParameter()
                {
                    ParameterName = "@AEDiscription4",
                    Value = val.AEDiscription4
                });
                cmd.Parameters.Add(new SqlParameter()
                {
                    ParameterName = "@Severity4",
                    Value = val.Severity4
                });

                foreach (SqlParameter parameter in cmd.Parameters)
                {
                    if (parameter.Value == null)
                    {
                        parameter.Value = DBNull.Value;
                    }
                };

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
        public JsonResult GetStudy2Demog(VASUser user)
        {
            List<Survey> Demoginfo = new List<Survey>();
            string CS = ConfigurationManager.ConnectionStrings["String"].ConnectionString;
            using (SqlConnection con = new SqlConnection(CS))
            {
                SqlCommand cmd = new SqlCommand("getStudy2Demog", con)
                {
                    CommandType = CommandType.StoredProcedure
                };

                con.Open();

                cmd.Parameters.Add(new SqlParameter()
                {
                    ParameterName = "@SubjID",
                    Value = user.SubjID
                });

                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    Survey Demog = new Survey
                    {
                        Age = (int)GetInt(rdr["Age"]),
                        Gender = GetString(rdr["Gender"]),
                        Ethnicity = GetString(rdr["Ethnicity"]),
                        Race = GetString(rdr["Race"]),
                        Assessment = (float)GetFloat(rdr["Assessment"])

                    };
                    Demoginfo.Add(Demog);
                }
                con.Close();
            }
            JavaScriptSerializer js = new JavaScriptSerializer();
            return Json(js.Serialize(Demoginfo), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetStudy2AllValue(VASUser user)
        {
            List<Survey> AllValueinfo = new List<Survey>();
            string CS = ConfigurationManager.ConnectionStrings["String"].ConnectionString;
            using (SqlConnection con = new SqlConnection(CS))
            {
                SqlCommand cmd = new SqlCommand("getStudy2AllValue", con)
                {
                    CommandType = CommandType.StoredProcedure
                };

                con.Open();

                cmd.Parameters.Add(new SqlParameter()
                {
                    ParameterName = "@SubjID",
                    Value = user.SubjID
                });

                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    Survey AllValue = new Survey
                    {
                        Age = (int)GetInt(rdr["Age"]),
                        Gender = GetString(rdr["Gender"]),
                        Ethnicity = GetString(rdr["Ethnicity"]),
                        Race = GetString(rdr["Race"]),
                        VisitNo = (int)GetInt(rdr["VisitNo"]),
                        Assessment = (float)GetFloat(rdr["Assessment"]),
                        AEDiscription = GetString(rdr["AEDiscription"]),
                        Severity = GetString(rdr["Severity"])
                    };
                    AllValueinfo.Add(AllValue);
                }
                con.Close();
            }
            JavaScriptSerializer js = new JavaScriptSerializer();
            return Json(js.Serialize(AllValueinfo), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetLumendiAllValue(VASUser user)
        {
            List<Survey> AllValueinfo = new List<Survey>();
            string CS = ConfigurationManager.ConnectionStrings["String"].ConnectionString;
            using (SqlConnection con = new SqlConnection(CS))
            {
                SqlCommand cmd = new SqlCommand("GetLumendiAllValue", con)
                {
                    CommandType = CommandType.StoredProcedure
                };

                con.Open();

                cmd.Parameters.Add(new SqlParameter()
                {
                    ParameterName = "@SubjID",
                    Value = user.SubjID
                });

                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    Survey AllValue = new Survey
                    {
                        UserID = (int)GetInt(rdr["UserID"]),
                        SubjID = GetString(rdr["SubjID"]),
                        Age = (int)GetInt(rdr["Age"]),
                        Gender = GetString(rdr["Gender"]),
                        RaceEthni = GetString(rdr["RaceEthni"]),
                        ColonPolyp = GetString(rdr["ColonPolyp"]),
                        BiopsyDone = GetString(rdr["BiopsyDone"]),
                        Hemorrhoids = GetString(rdr["Hemorrhoids"]),
                        Diverticulitis = GetString(rdr["Diverticulitis"]),
                        Diabetes = GetString(rdr["Diabetes"]),
                        Anemia = GetString(rdr["Anemia"]),
                        Hysterectomy = GetString(rdr["Hysterectomy"]),
                        ASA = GetString(rdr["ASA"]),
                        Kudo = GetString(rdr["Kudo"]),
                        Paris = GetString(rdr["Paris"]),
                        Randomization = GetString(rdr["Randomization"]),
                        Successful = GetString(rdr["Successful"]),
                        Comment = GetString(rdr["Comment"]),
                        Length = (float)GetFloat(rdr["Length"]),
                        Width = (float)GetFloat(rdr["Width"]),
                        Location = GetString(rdr["Location"]),
                        Navigating = GetString(rdr["Navigating"]),
                        CleanMargins = GetString(rdr["CleanMargins"]),
                        DProc = GetString(rdr["DProc"]),
                        TBegan = GetString(rdr["TBegan"]),
                        TEnded = GetString(rdr["TEnded"]),
                        TCeReached = GetString(rdr["TCeReached"]),
                        TLeReached = GetString(rdr["TLeReached"]),
                        VisitNo = (int)GetInt(rdr["VisitNo"]),
                        AEDiscription = GetString(rdr["AEDiscription"]),
                        Severity = GetString(rdr["Severity"]),
                        Satification = (float)GetFloat(rdr["Satification"])
                    };
                    AllValueinfo.Add(AllValue);
                }
                con.Close();
            }
            JavaScriptSerializer js = new JavaScriptSerializer();
            return Json(js.Serialize(AllValueinfo), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetLumendiDemog(VASUser user)
        {
            List<Survey> AllValueinfo = new List<Survey>();
            string CS = ConfigurationManager.ConnectionStrings["String"].ConnectionString;
            using (SqlConnection con = new SqlConnection(CS))
            {
                SqlCommand cmd = new SqlCommand("GetLumendiDemog", con)
                {
                    CommandType = CommandType.StoredProcedure
                };

                con.Open();

                cmd.Parameters.Add(new SqlParameter()
                {
                    ParameterName = "@UserID",
                    Value = user.UserID
                });

                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    Survey AllValue = new Survey
                    {
                        SubjID = GetString(rdr["SubjID"]),
                        Age = (int)GetInt(rdr["Age"]),
                        Gender = GetString(rdr["Gender"]),
                        RaceEthni = GetString(rdr["RaceEthni"]),

                    };
                    AllValueinfo.Add(AllValue);
                }
                con.Close();
            }
            JavaScriptSerializer js = new JavaScriptSerializer();
            return Json(js.Serialize(AllValueinfo), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetLumendiAllDemog()
        {
            List<Survey> AllValueinfo = new List<Survey>();
            string CS = ConfigurationManager.ConnectionStrings["String"].ConnectionString;
            using (SqlConnection con = new SqlConnection(CS))
            {
                SqlCommand cmd = new SqlCommand("GetLumendiAllDemog", con);

                con.Open();

                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    Survey AllValue = new Survey
                    {
                        UserID = (int)GetInt(rdr["UserID"]),
                        SubjID = GetString(rdr["SubjID"]),
                        Age = (int)GetInt(rdr["Age"]),
                        Gender = GetString(rdr["Gender"]),
                        RaceEthni = GetString(rdr["RaceEthni"]),

                    };
                    AllValueinfo.Add(AllValue);
                }
                con.Close();
            }
            JavaScriptSerializer js = new JavaScriptSerializer();
            return Json(js.Serialize(AllValueinfo), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetLumendiAllProc()
        {
            List<Survey> AllValueinfo = new List<Survey>();
            string CS = ConfigurationManager.ConnectionStrings["String"].ConnectionString;
            using (SqlConnection con = new SqlConnection(CS))
            {
                SqlCommand cmd = new SqlCommand("GetLumendiAllProc", con);

                con.Open();

                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    Survey AllValue = new Survey
                    {                        
                        SubjID = GetString(rdr["SubjID"]),
                        Randomization = GetString(rdr["Randomization"]),
                        Length = GetFloat(rdr["Length"]),
                        Width = GetFloat(rdr["Width"]),
                        DProc = GetString(rdr["DProc"]),
                        TBegan = GetString(rdr["TBegan"]),
                        TEnded = GetString(rdr["TEnded"]),
                        TCeReached = GetString(rdr["TCeReached"]),
                        TLeReached = GetString(rdr["TLeReached"])
                    };
                    AllValueinfo.Add(AllValue);
                }
                con.Close();
            }
            JavaScriptSerializer js = new JavaScriptSerializer();
            return Json(js.Serialize(AllValueinfo), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetLumendiAllAE()
        {
            List<Survey> AllValueinfo = new List<Survey>();
            string CS = ConfigurationManager.ConnectionStrings["String"].ConnectionString;
            using (SqlConnection con = new SqlConnection(CS))
            {
                SqlCommand cmd = new SqlCommand("GetLumendiAllAE", con);

                con.Open();

                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    Survey AllValue = new Survey
                    {                        
                        SubjID = GetString(rdr["SubjID"]),
                        VisitNo = (int)GetInt(rdr["VisitNo"]),
                        AEDiscription = GetString(rdr["AEDiscription"]),
                        Severity = GetString(rdr["Severity"])
                    };
                    AllValueinfo.Add(AllValue);
                }
                con.Close();
            }
            JavaScriptSerializer js = new JavaScriptSerializer();
            return Json(js.Serialize(AllValueinfo), JsonRequestBehavior.AllowGet);
        }
        public JsonResult SummaryDemog(VASUser user)
        {
            List<LumendiSummary> AllValueinfo = new List<LumendiSummary>();
            string CS = ConfigurationManager.ConnectionStrings["String"].ConnectionString;
            using (SqlConnection con = new SqlConnection(CS))
            {
                SqlCommand cmd = new SqlCommand("SummaryDemog", con)
                {
                    CommandType = CommandType.StoredProcedure
                };

                con.Open();

                cmd.Parameters.Add(new SqlParameter()
                {
                    ParameterName = "@UserID",
                    Value = user.UserID
                });

                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    LumendiSummary AllValue = new LumendiSummary
                    {
                        Parameter1 = GetString(rdr["Parameter1"]),
                        Parameter2 = GetString(rdr["Parameter2"]),
                        Control = (float)GetFloat(rdr["Control"]),
                        Device = (float)GetFloat(rdr["Device"]),
                        Overall = (float)GetFloat(rdr["Overall"])

                    };
                    AllValueinfo.Add(AllValue);
                }
                con.Close();
            }
            JavaScriptSerializer js = new JavaScriptSerializer();
            return Json(js.Serialize(AllValueinfo), JsonRequestBehavior.AllowGet);
        }
        public JsonResult SummarySatification(VASUser user)
        {
            List<SatificationSummary> AllValueinfo = new List<SatificationSummary>();
            string CS = ConfigurationManager.ConnectionStrings["String"].ConnectionString;
            using (SqlConnection con = new SqlConnection(CS))
            {
                SqlCommand cmd = new SqlCommand("SummarySatification", con)
                {
                    CommandType = CommandType.StoredProcedure
                };

                con.Open();

                cmd.Parameters.Add(new SqlParameter()
                {
                    ParameterName = "@UserID",
                    Value = user.UserID
                });

                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    SatificationSummary AllValue = new SatificationSummary
                    {
                        N = (int)GetInt(rdr["N"]),
                        Mean_SD = GetString(rdr["Mean(SD)"]),
                        Median = GetFloat(rdr["Median"]),
                        Min_Max = GetString(rdr["Min, Max"])

                    };
                    AllValueinfo.Add(AllValue);
                }
                con.Close();
            }
            JavaScriptSerializer js = new JavaScriptSerializer();
            return Json(js.Serialize(AllValueinfo), JsonRequestBehavior.AllowGet);
        }

        public JsonResult SummaryProcedure()
        {
            List<ProcedureSummary> AllValueinfo = new List<ProcedureSummary>();
            List<ProcedureSummary> Outliers = new List<ProcedureSummary>();
            string CS = ConfigurationManager.ConnectionStrings["String"].ConnectionString;
            using (SqlConnection con = new SqlConnection(CS))
            {
                SqlCommand cmd = new SqlCommand("SumarySurgeryTimebyGender", con)
                {
                    CommandType = CommandType.StoredProcedure
                };

                con.Open();            

                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    ProcedureSummary AllValue = new ProcedureSummary
                    {
                        Gender = GetString(rdr["Gender"]),
                        Minimum = GetFloat(rdr["Minimum"]),
                        Q1 = GetFloat(rdr["Q1"]),
                        Median = GetFloat(rdr["Median"]),
                        Q3 = GetFloat(rdr["Q3"]),
                        Maximum = GetFloat(rdr["QuartileMax"]),
                        Mean = GetFloat(rdr["Mean"])
                    };
                    AllValueinfo.Add(AllValue);
                }
                rdr.NextResult();
                while (rdr.Read())
                {
                    ProcedureSummary AllValue = new ProcedureSummary
                    {
                        Gender = GetString(rdr["Gender"]),
                        SurgeryTime = GetFloat(rdr["SurgeryTime"])
                    };
                    Outliers.Add(AllValue);
                }
                con.Close();
            }
            JavaScriptSerializer js = new JavaScriptSerializer();
            return Json(js.Serialize(AllValueinfo.Concat(Outliers)), JsonRequestBehavior.AllowGet);
        }

        public JsonResult SummarySurgeryTimebyMonth()
        {
            List<ProcedureSummary> AllValueinfo = new List<ProcedureSummary>();
            string CS = ConfigurationManager.ConnectionStrings["String"].ConnectionString;
            using (SqlConnection con = new SqlConnection(CS))
            {
                SqlCommand cmd = new SqlCommand("SurgeryTimebyMonth", con)
                {
                    CommandType = CommandType.StoredProcedure
                };

                con.Open();

                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    ProcedureSummary AllValue = new ProcedureSummary
                    {
                        Randomization = GetString(rdr["Randomization"]),
                        MonthProc = GetString(rdr["MonthProc"]),
                        Mean = GetFloat(rdr["Mean"]),
                        Std = GetFloat(rdr["Std"]),
                        Lower = GetFloat(rdr["Lower"]),
                        Upper = GetFloat(rdr["Upper"])
                    };
                    AllValueinfo.Add(AllValue);
                }

                con.Close();
            }
            JavaScriptSerializer js = new JavaScriptSerializer();
            return Json(js.Serialize(AllValueinfo), JsonRequestBehavior.AllowGet);
        }
        public ActionResult CountSubj(VASUser user)
        {
            List<LumendiSummary> AllValueinfo = new List<LumendiSummary>();
            string CS = ConfigurationManager.ConnectionStrings["String"].ConnectionString;
            using (SqlConnection con = new SqlConnection(CS))
            {
                SqlCommand cmd = new SqlCommand("CountSubj", con)
                {
                    CommandType = CommandType.StoredProcedure
                };

                con.Open();

                cmd.Parameters.Add(new SqlParameter()
                {
                    ParameterName = "@UserID",
                    Value = user.UserID
                });

                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    LumendiSummary AllValue = new LumendiSummary
                    {
                        Device = (int)GetInt(rdr["Device"]),
                        Control = (int)GetInt(rdr["Control"]),
                        Overall = (int)GetInt(rdr["Overall"])

                    };
                    AllValueinfo.Add(AllValue);
                }
                con.Close();
            }
            JavaScriptSerializer js = new JavaScriptSerializer();
            return Json(js.Serialize(AllValueinfo), JsonRequestBehavior.AllowGet);
        }
        private static string CreateRandomPassword(int length = 8)
        {
            // Create a string of characters, numbers, special characters that allowed in the password  
            string validChars = "ABCDEFGHJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            Random random = new Random();
            // Select one random character at a time from the string  
            // and create an array of chars  
            char[] chars = new char[length];
            for (int i = 0; i < length; i++)
            {
                chars[i] = validChars[random.Next(0, validChars.Length)];
            }
            return new string(chars);
        }
    }
}