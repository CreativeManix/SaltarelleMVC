using System;
using System.Collections.Generic;
using System.Html;
using System.Reflection;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;
using jQueryApi;
namespace SaltarelleMVC
{
    [IgnoreNamespace]
    public static class MVC
    {
        public static Dictionary<string, ControllerInfo> Controllers = new Dictionary<string, ControllerInfo>();
        public static ViewHandler DefaultViewHandler = null;
        public static void RegisterAssembly(Assembly assembly)
        {
            Type[] types= assembly.GetTypes();
            foreach (Type type in types)
            {
                
                if (type.BaseType.Name == typeof(Controller).Name)
                {
                    ControllerInfo ci = new ControllerInfo();
                    ci.ControllerType = type;
                    foreach (MethodInfo item in type.GetMethods())
                    {
                        Console.WriteLine(item.ScriptName);
                        ActionInfo ai = new ActionInfo();
                        ai.Name = item.ScriptName;
                        string[] s = Script.Eval(type.FullName + ".prototype." + item.ScriptName + @".toString().match (/function\s*\w*\s*\((.*?)\)/)[1].split (/\s*,\s*/);") as string[];
                        ai.ParameterNames.AddRange(s);
                        if (!ci.Actions.ContainsKey(item.Name.ToLower()))
                            ci.Actions.Add(item.Name.ToLower(),ai);
                    }
                    Controllers.Add(type.Name.ToLower().Replace("controller", ""), ci);
                }
            }
        }

        [PreserveCase]
        public static void HandleRequest()
        {
            JsDictionary<string, dynamic> parametrs = ParseURL(Window.Location.Hash);
            string url = parametrs["#url"];
            if (string.IsNullOrEmpty(url)) return;
            string[] paths = url.Split('/');
            string c = paths[0];
            string a = paths[1];
            if(!Controllers.ContainsKey(c))
            {
                throw new InvalidOperationException(c+" Controller not found");
            }
            ControllerInfo ci = Controllers[c];

            if (!ci.Actions.ContainsKey(a))
            {
                throw new InvalidOperationException(a + " Action not found");
            }

            ActionInfo ai = ci.Actions[a];
            var ctrler = Activator.CreateInstance(ci.ControllerType);
            List<object> inputs = new List<object>();
            if (_FormModel != null)
            {
                inputs.Add(_FormModel);
                _FormModel = null;
            }

            foreach (var p in ai.ParameterNames)
            {
                inputs.Add(parametrs[p]);
            }
            ActionResult result = null;
            switch (inputs.Count)
            {
                case 1:
                    result = Script.InvokeMethod(ctrler, ai.Name, inputs[0]) as ActionResult;
                    break;
                case 2:
                    result = Script.InvokeMethod(ctrler, ai.Name, inputs[0], inputs[1]) as ActionResult;
                    break;
                case 3:
                    result = Script.InvokeMethod(ctrler, ai.Name, inputs[0], inputs[1], inputs[2]) as ActionResult;
                    break;
                case 4:
                    result = Script.InvokeMethod(ctrler, ai.Name, inputs[0], inputs[1], inputs[2], inputs[3]) as ActionResult;
                    break;
                case 5:
                    result = Script.InvokeMethod(ctrler, ai.Name, inputs[0], inputs[1], inputs[2], inputs[3], inputs[4]) as ActionResult;
                    break;
                default:
                    result = Script.InvokeMethod(ctrler, ai.Name, inputs) as ActionResult;
                    break;
            }

            if (result != null)
            {
                if (result is ViewActionResult)
                {
                    DefaultViewHandler.RenderView(result as ViewActionResult);
                }
            }
        }

        [PreserveCase]
        private static JsDictionary<string, dynamic> ParseURL(string query)
        {
            JsDictionary<string, dynamic> values = new JsDictionary<string, dynamic>();
            var vars = query.Split('&');
            for (int i = 0; i < vars.Length; i++)
            {
                var pair = vars[i].Split('=');
                var key = string.DecodeUriComponent(pair[0]);
                var value = string.DecodeUriComponent(pair[1]);
                if (!values.ContainsKey(key))
                {
                    values[key] = value;
                }
                else if (values[key] is string)
                {
                    var r = new List<dynamic>();
                    r.Add(values[key]);
                    r.Add(value);
                    values[key] = r;

                }
                else
                {
                    List<dynamic> v = values[key];
                    v.Add(value);
                }
            }
            return values;
        }

        [PreserveCase]
        static string lastPath = "";
        public static void Nav(string path)
        {
            if (lastPath==path)
            {
                HandleRequest();
            }
            else
            {
                Window.Location.Href = "#url=" + path;
            }

            lastPath = path;
            //HandleRequest();
        }

        private static object _FormModel = null;
        [PreserveCase]
        public static bool SubmitForm(Element form)
        {
            JsDictionary<string, object> data = new JsDictionary<string, object>();
            jQueryNameValuePair[] values =jQuery.Select(form).SerializeArray();
            foreach (jQueryNameValuePair value in values)
            {
               
                data[value.Name] = value.Value;
            }
            _FormModel = data;
            Nav(form.GetAttribute("action"));
            return false;
        }

      
    }
}
