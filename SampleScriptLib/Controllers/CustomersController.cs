using jQueryApi;
using SaltarelleMVC;
using SampleScriptLib.Models;
using System;
using System.Collections.Generic;
using System.Html;
using System.Runtime.CompilerServices;


namespace SampleScriptLib.Controllers
{
    [DefaultMemberReflectability(MemberReflectability.PublicAndProtected)]
    public class CustomersController:Controller
    {
        public ActionResult Index()
        {
            jQuery.GetJsonData<List<CustomerModel>>("/api/customers", (model) =>
                {
                    Console.WriteLine("Request done");
                    RenderView("Orders.Index", model);
                });
            return View("App.Wait");
        }

        public ActionResult View(int id)
        {
            jQuery.GetJsonData<List<CustomerModel>>("/api/customers?id=" + id.ToString(), (model) =>
            {
                Console.WriteLine("Request done");
                RenderView("Orders.View", model);
            });
            return View("App.Wait");
        }

        public ActionResult New()
        {
            Window.Alert("m1");
            return View("Contacts.New");
        }

        public ActionResult New(ContactModel model)
        {
            Window.Alert("m2");
            Window.Alert(model.Name);
            return None();
        }
    }
}
