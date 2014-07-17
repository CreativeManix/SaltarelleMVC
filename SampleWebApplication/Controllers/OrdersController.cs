using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading;
using System.Web.Http;

namespace SampleWebApplication.Controllers
{
    public class Customer
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }

    public class CustomersController : ApiController
    {
        public IEnumerable<Customer> Get()
        {
            List<Customer> customers = new List<Customer>();
            for (int i = 1; i <= 15; i++)
            {
                customers.Add(new Customer() { Id = i, Name = "Customer " + i.ToString() });
            }
            Thread.Sleep(2000);
            return customers;
        }

        public Customer Get(int id)
        {
            Thread.Sleep(2000);
            return new Customer() { Id = id, Name = "Customer " + id.ToString() };
        }
    }
    public class OrdersController : ApiController
    {
        // GET: api/Orders
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/Orders/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Orders
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/Orders/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Orders/5
        public void Delete(int id)
        {
        }
    }
}
