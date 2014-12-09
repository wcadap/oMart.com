using oMart.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace oMart.Core.Interface
{
    public interface IUnitOfWork
    {
        IRepository<Category> Categories { get;}
        IRepository<Product> Products { get; }
        IRepository<Audit> Audits { get; }
        bool Commit();
    }
}
