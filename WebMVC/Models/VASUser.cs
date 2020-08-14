using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace WebMVC.Models
{
    public class VASUser
    {
        public int ID { get; set; }
        public string Email { get; set; }
        public string VerifyCode { get; set; }
        public string Password { get; set; }
    }
}