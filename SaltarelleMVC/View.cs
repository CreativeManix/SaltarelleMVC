using System;
using System.Collections.Generic;
using System.Text;

namespace SaltarelleMVC
{
    public class View<TModel>
    {
        public TModel Model;
        
        StringBuilder content = new StringBuilder();
        public virtual void Execute()
        {
            
        }

        protected void WriteLiteral(object o)
        {
            content.Append(o);
        }

        protected void Write(object o)
        {
            content.Append(o);
        }
    }
}
