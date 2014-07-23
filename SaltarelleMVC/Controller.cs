using System;
using System.Collections.Generic;
using System.Text;

namespace SaltarelleMVC
{
    public class Controller
    {
        public ActionResult View(string view,Object model=null)
        {
            return new ViewActionResult() { ViewName=view, Model=model};
        }

        public ActionResult None()
        {
            return new NoneActionResult();
        }

        public void RenderView(string view, Object model = null)
        {
            ViewActionResult r=new  ViewActionResult() { ViewName = view, Model = model };
            MVC.DefaultViewHandler.RenderView(r);
        }
    }
}
