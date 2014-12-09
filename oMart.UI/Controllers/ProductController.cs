using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using oMart.Core.Interface;
using oMart.Core.Models;
using oMart.Data.SQLUnitOfWork;
using oMart.UI.Helpers;
using oMart.Core.SubModel;

namespace oMart.UI.Controllers
{
    public class ProductController : ApiController
    {
        private IUnitOfWork sqlUnitOfWork;
        private int pageSize = 15;

        public ProductController()
        {
            sqlUnitOfWork = new SQLUnitOfWork();
        }
        public ProductController(IUnitOfWork _sqlUnitOfWork)
        {
            sqlUnitOfWork = _sqlUnitOfWork;
        }


        //For myOmart
        [HttpGet]
        public IHttpActionResult GetProducts(int pageIndex = 0, int caterogyId = 0, string orderBy = "", string searchKey = "")
        {
            pageSize = 15;
            var productObject = GetProductsFromService(pageIndex, caterogyId, orderBy, searchKey);
            IEnumerable<Product> Products = productObject.Products;
            int totalRecords = productObject.TotalRecords;

            return Ok(new { Products, totalRecords });
            //return Ok(Products);
        }

        //For Home Module
        [HttpGet]
        public IHttpActionResult GetProductsHome(int pageIndex = 0, int caterogyId = 0, string orderBy = "", string searchKey = "")
        {
            pageSize = 12;
            var productObject = GetProductsFromService(pageIndex, caterogyId, orderBy, searchKey);
            IEnumerable<Product> Products = productObject.Products;
            int totalRecords = productObject.TotalRecords;

            return Ok(new { Products, totalRecords });
        }

        [HttpGet]
        public IHttpActionResult GetTopTenProducts(int pageIndex = 0, int caterogyId = 0, string orderBy = "", string searchKey = "")
        {
            pageSize = 5;
            var productObject = GetProductsFromService(0, 0,"ViewCount", "");
            IEnumerable<Product> Products = productObject.Products;
            
            return Ok(Products);
        }

        
        //For adding Records
        [TraceMethod]
        [HttpPost]
        public HttpResponseMessage AddProduct([FromBody]Product _Product)
        {
            try
            {
                sqlUnitOfWork.Products.Add(_Product);
                if (sqlUnitOfWork.Commit())
                {
                    return Request.CreateResponse(HttpStatusCode.Created, _Product);
                }
                else
                {
                    return Request.CreateResponse(HttpStatusCode.BadRequest);
                }
            }
            catch
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }
        }

        public HttpResponseMessage Put([FromBody]Category _Category)
        {
            sqlUnitOfWork.Categories.Update(_Category);
            if (sqlUnitOfWork.Commit())
            {
                return Request.CreateResponse(HttpStatusCode.Accepted);
            }
            return Request.CreateResponse(HttpStatusCode.BadRequest);
        }

        [HttpDelete]
        public HttpResponseMessage DeleteProduct(int id)
        {
            var _product = sqlUnitOfWork.Products.GetById(id);
            if (DeletedProduct(_product))
                return Request.CreateResponse(HttpStatusCode.Accepted);
            
            return Request.CreateResponse(HttpStatusCode.BadRequest);
        }


        //Need to refactor this. The CRUD should live in the oMart.Data Services
        //======================================================================
        ProductObject GetProductsFromService(int pageIndex, int caterogyId, string orderBy = "", string searchKey = "")
        {
            IEnumerable<Product> Products;
            int totalRecords;
            searchKey = searchKey.ToUpper();

            string OrderBy = orderBy == "" ? "DateRegistered" : orderBy;

            orderBy = orderBy.ToLower();
            switch (orderBy)
            {
                case "productname":
                    OrderBy = "Description";
                    break;
                case "viewcount":
                    OrderBy = "Viewcount descending";
                    break;
                case "dateexpired":
                    OrderBy = "dateExpired";
                    break;
                default:
                    OrderBy = "DateRegistered descending";
                    break;
            }

            Products = sqlUnitOfWork.Products.Query()
                    .WhereIf((caterogyId != 0 && string.IsNullOrEmpty(searchKey)), o => o.CategoryId == caterogyId)
                    .WhereIf(!string.IsNullOrEmpty(searchKey), s => s.ProductName.ToUpper().Contains(searchKey) || s.Description.ToUpper().Contains(searchKey))
                    .SortOrderBy(OrderBy)
                    .Skip(pageSize * pageIndex).Take(pageSize);

            //Get the total records: 
            if ((caterogyId == 0) && (searchKey == ""))
            {
                totalRecords = sqlUnitOfWork.Products.Count();
            }
            else
            {
                totalRecords = Products.Count();
            }

            //Return the product and total records
            ProductObject _productObject = new ProductObject()
            {
                Products = Products,
                TotalRecords = totalRecords
            };

            return _productObject;
        }

        //for aspect Module
        [TraceMethod]
        private Boolean DeletedProduct(Product _Product)
        {
            try
            {
                sqlUnitOfWork.Products.Delete(_Product);
                if (sqlUnitOfWork.Commit())
                {
                    return true;
                }
                return false;
            }
            catch
            {
                return false;
            }
        }

       
    }

    
}
