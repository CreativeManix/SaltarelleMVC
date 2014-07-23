using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
using System.Text;

namespace SampleScriptLib.Models
{
    public class CustomerModel
    {
        public int Id;
        public string Name;
    }

    [PreserveMemberCase]
    public class ContactModel
    {
        public int Id;
        public string Name;
    }
}
