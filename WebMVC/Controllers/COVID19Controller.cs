using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace WebMVC.Controllers
{
    public class COVID19Controller : Controller
    {
        // GET: COVID19
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult USA()
        {
            ViewBag.Message = "Your USA page.";

            return View();
        }
        public ActionResult Canada()
        {
            ViewBag.Message = "Your Canada page.";

            return View();
        }
        public ActionResult Europe()
        {
            ViewBag.Message = "Your Europe page.";

            return View();
        }
        public ActionResult Africa()
        {
            ViewBag.Message = "Your Africa page.";

            return View();
        }
        public ActionResult Asia()
        {
            ViewBag.Message = "Your Asia page.";

            return View();

        }
        public ActionResult MiddleEast()
        {
            ViewBag.Message = "Your MiddleEast page.";

            return View();

        }
        public ActionResult SouthAmerica()
        {
            ViewBag.Message = "Your South America page.";

            return View();

        }
        public ActionResult Italy()
        {
            ViewBag.Message = "Your Italy page.";

            return View();

        }
        public ActionResult USATest()
        {
            ViewBag.Message = "Your USATest page.";

            return View();

        }
        public ActionResult USAStates()
        {
            ViewBag.Message = "Your USAStates page.";

            return View();

        }
        public ActionResult USACities()
        {
            ViewBag.Message = "Your USACities page.";

            return View();

        }
        public ActionResult Test()
        {
            ViewBag.Message = "Your Test page.";

            return View();

        }
        public ActionResult Navbar()
        {
            ViewBag.Message = "Your Navbar page.";

            return View();

        }
    }
}