using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebMVC.Models
{
    public class SatificationSummary
    {
        public int? N { get; set; }
        public string Mean_SD { get; set; }
        public float? Median { get; set; }
        public string Min_Max { get; set; }

    }
}