using System;
using System.Collections.Generic;
using System.Text;

namespace SaltarelleMVC
{
    public class ControllerInfo
    {
        public string Name;
        public Dictionary<string, ActionInfo> Actions = new Dictionary<string, ActionInfo>();
        public Type ControllerType = null;
    }

}
