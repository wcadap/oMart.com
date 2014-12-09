using oMart.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace oMart.Core.SubModels
{
    public class AuditObject
    {
        public IEnumerable<Audit> Audits { get; set; }
        public int TotalRecords { get; set; }
    }
}