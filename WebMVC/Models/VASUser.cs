using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace WebMVC.Models
{
    public class VASUser
    {
        public int SurveyID { get; set; }
        public int UserID { get; set; }
        public string Email { get; set; }
        public string InviteCode { get; set; }
        public string Password { get; set; }
    }
}