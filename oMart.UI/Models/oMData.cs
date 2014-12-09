using oMart.Core.Models;
using oMart.UI.Migrations;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Migrations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace oMart.UI.Models
{
    public class oMData :DbContext
    {
        public oMData()
            : base("DefaultConnection")
        {
            this.Configuration.LazyLoadingEnabled = true;
            //this.Configuration.ProxyCreationEnabled = false;

            //Database.SetInitializer(
            //    new MigrateDatabaseToLatestVersion<oMData,DbMigrationsConfiguration>(this)
            //    );

            //Database.SetInitializer(
            //    new MigrateDatabaseToLatestVersion<oMartDbContext, oMartContextDBContextMigrationConfig>()
            //    );
        }
        public DbSet<Category> Categories { set; get; }
        public DbSet<Product> Products { set; get; }
        public DbSet<Audit> Audits { set; get; }
    }

    
}