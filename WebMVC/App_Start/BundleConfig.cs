﻿using System.Web;
using System.Web.Optimization;

namespace WebMVC
{
    public class BundleConfig
    {
        // For more information on bundling, visit https://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            BundleTable.EnableOptimizations = true;
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.validate*"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at https://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      //"~/Scripts/App.js",
                      //"~/Scripts/Vendor-d51e336ec01.js",
                      "~/Scripts/bootstrap.js"
                      ));
            bundles.Add(new ScriptBundle("~/bundles/App").Include(
                      "~/assets/scripts/Vendor*",
                      "~/assets/Scripts/App*"));

            bundles.Add(new StyleBundle("~/Content/css").Include(                       
                      "~/Content/bootstrap4.min.css",
                      "~/Content/site.css"));

            bundles.Add(new StyleBundle("~/Assets/css").Include(
                      "~/assets/styles/styles.css",
                      "~/assets/styles/site.css"
                      ));
        }
    }
}
