using oMart.Core.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity.Migrations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace oMart.Data.Helper
{
    public class oMartContextDBContextMigrationConfig : DbMigrationsConfiguration<oMartDbContext>
    {
        public oMartContextDBContextMigrationConfig()
	    {
            this.AutomaticMigrationDataLossAllowed = true;
            this.AutomaticMigrationsEnabled = true;
	    }

        protected override void Seed(oMartDbContext context)
        {
            base.Seed(context);
#if DEBUG
            if (!context.Categories.Any())
            {

                context.Categories.Add(new Category() { CategoryDesc = "Hardware" });
                context.Categories.Add(new Category() { CategoryDesc = "Furnitures" });
                context.Categories.Add(new Category() { CategoryDesc = "Groceries" });
                context.Categories.Add(new Category() { CategoryDesc = "Cakes" });
                context.Categories.Add(new Category() { CategoryDesc = "Flowers" });
                context.SaveChanges();
                
            }
#endif
        }
    }
}
