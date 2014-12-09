using oMart.Core.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using oMart.Data.Helper;

namespace oMart.Data
{
    public class oMartDbContext : DbContext
    {
        public oMartDbContext()
            : base("DefaultConnection")
        {
            this.Configuration.LazyLoadingEnabled = true;
            this.Configuration.ProxyCreationEnabled = false;

            
            //Database.SetInitializer(
            //    new MigrateDatabaseToLatestVersion<oMartDbContext, oMartContextDBContextMigrationConfig>()
            //    );
        }
        public DbSet<Category> Categories { set; get; }
        public DbSet<Product> Products { set; get; }
        public DbSet<Audit> Audits { set; get; }
    }
}
