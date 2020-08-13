using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebMVC
{
    public class USASamples
    {
        public string Type { get; set; }
        //public string Continent { get; set; }
        //public string Country { get; set; }
        //public string State { get; set; }
        public string Plot { get; set; }
        public string Date { get; set; }
        public int? Dcases { get; set; }
        public int? Death { get; set; }
        public int? Day { get; set; }
        public float? Proj { get; set; }
        public float? Proj_death { get; set; }
        public string Text { get; set; }
        public float? Proj_death_upper { get; set; }
        public float? Proj_death_lower { get; set; }
        public float? Proj_upper { get; set; }
        public float? Proj_lower { get; set; }
        public float? Inflection { get; set; }
        public float? Dotted_proj { get; set; }
        public float? Dotted_proj_death { get; set; }
        public string Death_proj_date { get; set; }
        public int? Death_proj_total { get; set; }
    }
}