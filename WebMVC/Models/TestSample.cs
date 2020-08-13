using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebMVC.Models
{
    public class TestSample
    {
        public string Date { get; set; }
        public int? Actual_cases { get; set; }
        public int? New_cases { get; set; }
        public float? Projected { get; set; }
        public float? Projected_lower { get; set; }
        public float? Projected_upper { get; set; }

    }
}