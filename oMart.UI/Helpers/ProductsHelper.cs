using oMart.Core.Interface;
using oMart.Data.SQLUnitOfWork;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace oMart.UI.Helpers
{
    public static class ProductsHelper
    {
        private static IUnitOfWork sqlUnitOfWork;
        public static void UpdateProductImage(int Id, string ProductImageUrl,string ThumbProductImgUrl) {

            sqlUnitOfWork = new SQLUnitOfWork();
            var product = sqlUnitOfWork.Products.GetById(Id);
            product.ImageURL = ProductImageUrl;
            product.ImageThumbUrl = ThumbProductImgUrl;

            sqlUnitOfWork.Commit();
        }
    }
}