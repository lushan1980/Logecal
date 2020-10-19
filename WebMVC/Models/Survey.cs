using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebMVC.Models
{
    public class Survey
    {
        public int VisitTime { get; set; }
        public int? UserID { get; set; }
        public string SubjID { get; set; }
        public string Fname { get; set; }
        public string Lname { get; set; }
        public int Age { get; set; }
        public string Gender { get; set; }
        public float F1 { get; set; }
        public float F2 { get; set; }
        public string Ethnicity { get; set; }
        public string ColonPolyp { get; set; }
        public string BiopsyDone { get; set; }
        public string Hemorrhoids { get; set; }
        public string Diverticulitis { get; set; }
        public string Diabetes { get; set; }
        public string Anemia { get; set; }
        public string Hysterectomy { get; set; }
        public string ASA { get; set; }
        public string Kudo { get; set; }
        public string Paris { get; set; }


        public string Race { get; set; }
        public string RaceEthni { get; set; }
        public int? VisitNo { get; set; }
        public float? Assessment { get; set; }
        public string Randomization { get; set; }
        public string Successful { get; set; }
        public string Comment { get; set; }

        public float? Length { get; set; }
        public float? Width { get; set; }

        public string Location { get; set; }
        public string Navigating { get; set; }
        public string CleanMargins { get; set; }

        public string DProc { get; set; }
        public string TBegan { get; set; }
        public string TEnded { get; set; }
        public string TCeReached { get; set; }
        public string TLeReached { get; set; }
        public string AEDiscription { get; set; }
        public string Severity { get; set; }
        public string AEDiscription1 { get; set; }
        public string Severity1 { get; set; }
        public string AEDiscription2 { get; set; }
        public string Severity2 { get; set; }
        public string AEDiscription3 { get; set; }
        public string Severity3 { get; set; }
        public string AEDiscription4 { get; set; }
        public string Severity4 { get; set; }


    }
}