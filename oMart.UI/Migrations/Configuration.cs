namespace oMart.UI.Migrations
{
    using oMart.Core.Models;
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<oMart.UI.Models.oMData>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = true;
            this.AutomaticMigrationDataLossAllowed = true;
        }

        protected override void Seed(oMart.UI.Models.oMData context)
        {
            if (!context.Products.Any())
            {

                context.Products.Add(new Product()
                {
                    ProductName = "Round Table",
                    Description = "3 Meters Diameter, Hard Rock Surface.",
                    Unit = "Piece",
                    UnitPrice = 2500.00M,
                    DateRegistered = DateTime.Now,
                    DateExpired = DateTime.Now.AddDays(30),
                    CategoryId = 1,
                    ViewCount = 0,
                    Rating = 1
                });

                context.Products.Add(new Product()
                    {
                        ProductName = "Rolex 360",
                        Description = "Gold Platted Rolex watch.",
                        Unit = "Piece",
                        UnitPrice = 65000.00M,
                        DateRegistered = DateTime.Now,
                        DateExpired = DateTime.Now.AddDays(30),
                        CategoryId = 2,
                        ViewCount = 0,
                        Rating = 1
                    });

                context.SaveChanges();
                }
        }

        
    }
}
