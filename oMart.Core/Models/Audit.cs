using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace oMart.Core.Models
{
    public class Audit
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public string UserId { get; set; }
        public string Module { get; set; }
        public string Description { get; set; }
    }
}
