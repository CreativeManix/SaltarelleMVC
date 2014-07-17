using System;
using System.Collections.Generic;
using System.Text;

namespace SaltarelleMVC
{
    public abstract class ViewHandler
    {
        Dictionary<string, object> Views = new Dictionary<string, object>();
        public abstract void Init();
        public abstract void RenderView(ViewActionResult result);

        public void RegisterNamedView(string name,object view)
        {
            Views.Add(name, view);
        }

        public object GetNamedView(string name)
        {
            return Views[name];
        }
    }
}
