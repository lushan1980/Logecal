using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Text;
using System.Web.Mvc;
using System.Web.Script.Serialization;
using WebMVC.Models;

namespace WebMVC.Controllers
{
    [AllowSameSite]
    public class HomeController : Controller
    {
        public ActionResult Form()
        {
            return View();
        }
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult IndexNew()
        {
            return View();
        }
        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }
        public ActionResult Contact()
        {
            ViewBag.Message = "Logecal Data Analytics";

            return View();
        }
        public ActionResult Services()
        {
            ViewBag.Message = "Logecal Services";

            return View();
        }
        public ActionResult ContactForm()
        {
            ViewBag.Message = "Contact Form";

            return View();
        }
        public ActionResult sitemap()
        {
            ViewBag.Message = "";

            return View();
        }
        public ActionResult termsofuse()
        {
            ViewBag.Message = "";

            return View();
        }
        public ActionResult privacypolicy()
        {
            ViewBag.Message = "";

            return View();
        }
        public ActionResult mailinglist()
        {
            ViewBag.Message = "";

            return View();
        }
        public ActionResult joinmailinglist()
        {
            ViewBag.Message = "";

            return View();
        }

        public ActionResult Logecal()
        {
            ViewBag.Message = "";

            return View();
        }

        public ActionResult VAS()
        {
            ViewBag.Message = "";

            return View();
        }
        //[ChildActionOnly]
        //public ActionResult ContactForm(string path)
        //{
        //    return new FilePathResult(path, "text/html");
        //}

    }


}