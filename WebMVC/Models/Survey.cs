using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebMVC.Models
{
    public class Survey
    {
        public int UserID { get; set; }
        public string SubjID { get; set; }
        public string Fname { get; set; }
        public string Lname { get; set; }
        public int Age { get; set; }
        public string Gender { get; set; }
        public float F1 { get; set; }
        public float F2 { get; set; }
        public string Ethnicity { get; set; }
        public string Race { get; set; }
        public float? Assessment { get; set; }
        public string AEDiscription { get; set; }
        public string Severity { get; set; }



    }
}