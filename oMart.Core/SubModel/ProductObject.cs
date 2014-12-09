using oMart.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace oMart.Core.SubModel
{
    public class ProductObject
    {
        public IEnumerable<Product> Products { get; set; }
        public int TotalRecords { get; set; }
    }
}