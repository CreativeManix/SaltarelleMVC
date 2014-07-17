using SaltarelleMVC;
using System;
using System.Collections.Generic;
using System.Html;
using System.Linq;
using System.Reflection;
using System.Runtime.CompilerServices;
using System.Text;


namespace SampleScriptLib
{
    public static class BootStrap
    {
        [PreserveCase]
        public static void Boot()
        {
            Console.WriteLine("Loading Assembly");
            MVC.RegisterAssembly(Assembly.GetExecutingAssembly());
            Console.WriteLine("Loading Assembly - done");
            MVC.DefaultViewHandler = new HandlebarsViewHandler();
            MVC.DefaultViewHandler.Init();
            MVC.HandleRequest();
        }
    }

    public class HandlebarsViewHandler:ViewHandler
    {
        public override void Init()
        {
            RegisterHandleBarsView("App.Wait");
            RegisterHandleBarsView("Orders.Index");
            RegisterHandleBarsView("Orders.View");
        }
        
        [ScriptAlias("Handlebars.compile")]
        private static object CompileView(string content)
        {
            return null;
        }

        private void RegisterHandleBarsView(string name)
        {
            RegisterNamedView(name, CompileView(Document.GetElementById(name).InnerHTML));
        }

        public override void RenderView(ViewActionResult result)
        {
            Console.WriteLine("Handling View:"+result.ViewName);
            dynamic compiledView= GetNamedView(result.ViewName);
            string output=compiledView(result.Model);
            Document.GetElementById("ViewHost").InnerHTML = output;
            
        }
    }
}
