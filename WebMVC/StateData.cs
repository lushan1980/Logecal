using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebMVC
{
    public class StateData
    {
        public string Type;
        //public List<Types> Types;
        //public string Continent;
        //public string Country;
        //public string State;
        //public string City;
        public string Plot;
        public List<USASamples> ListSamples;


        //public List<string> ListSamples;

        //public List<string> GetSamples()
        //{
        //    var bbb = (from o in ListSamples
        //               select o.ToString()).ToList();
        //    return bbb;
        //}

        //public StateData(string plot, List<USASamples> listSamples)
        //{
        //    Plot = plot;
        //    this.listSamples = listSamples;
        //}
        //public StateData DeepCopy()
        //{
        //    StateData deepcopyStateData = new StateData(Plot,
        //                       listSamples);

        //    return deepcopyStateData;
        //}

        //public override string ToString()
        //{
        //    return "Plot:" + Plot + "Samplelist:" + ListSamples;
        //}



    }
}