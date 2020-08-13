using Microsoft.Ajax.Utilities;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Text;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;
using WebMVC.Models;



namespace WebMVC.Controllers
{
    public class MessageController : Controller
    {
        // GET: Message
        
        public ActionResult InsertMsg(Message msg)
        {
            
            Message message = new Message
            {
                Name = msg.Name,
                Email = msg.Email,
                Phone = msg.Phone,
                Company = msg.Company,
                How = msg.How,
                Questions = msg.Questions
            };

            string CS = ConfigurationManager.ConnectionStrings["String"].ConnectionString;
            using (SqlConnection con = new SqlConnection(CS))
            {
                SqlCommand cmd = new SqlCommand("InsertMsg", con)
                {
                    CommandType = CommandType.StoredProcedure
                };

                con.Open();

                foreach (SqlParameter parameter in cmd.Parameters)
                {
                    if (parameter.Value == null)
                    {
                        parameter.Value = DBNull.Value;
                    }
                }

                cmd.Parameters.Add(new SqlParameter()
                {
                    ParameterName = "@Name",
                    Value = message.Name ?? (object)DBNull.Value
                });
                cmd.Parameters.Add(new SqlParameter()
                {
                    ParameterName = "@Email",
                    Value = message.Email ?? (object)DBNull.Value
                });

                cmd.Parameters.Add(new SqlParameter()
                {
                    ParameterName = "@Phone",
                    Value = message.Phone ?? (object)DBNull.Value
                });
                cmd.Parameters.Add(new SqlParameter()
                {
                    ParameterName = "@Company",
                    Value = message.Company ?? (object)DBNull.Value
                });
                cmd.Parameters.Add(new SqlParameter()
                {
                    ParameterName = "@How",
                    Value = message.How ?? (object)DBNull.Value
                });
                cmd.Parameters.Add(new SqlParameter()
                {
                    ParameterName = "@Questions",
                    Value = message.Questions ?? (object)DBNull.Value
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