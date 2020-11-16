using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebMVC.Models
{
    public class ProcedureSummary
    {
        public string Gender { get; set; }
        public float? Minimum { get; set; }
        public float? Q1 { get; set; }
        public float? Median { get; set; }
        public float? Q3 { get; set; }
        public float? Maximum { get; set; }
        public float? Mean { get; set; }
        public float? SurgeryTime { get; set; }
        public float? Std { get; set; }
        public float? Lower { get; set; }
        public float? Upper { get; set; }
        public string MonthProc { get; set; }


    }
}