using oMart.Core.Models;
using oMart.Core.Interface;
using oMart.Data.SQLUnitOfWork;
using System;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace oMart.UI.Controllers
{
    public class CategoryController : ApiController
    {
        private IUnitOfWork sqlUnitOfWork;
        //List<Category> Categories = DBoMart.getCategories().ToList();
        public CategoryController()
        {
            sqlUnitOfWork = new SQLUnitOfWork();
        }
        public CategoryController(IUnitOfWork _sqlUnitOfWork)
        {
            sqlUnitOfWork = _sqlUnitOfWork;
        }
        
        [HttpGet]
        public IHttpActionResult GetCategory()
        {
            var Categories = sqlUnitOfWork.Categories.Query();

            return Ok(Categories.OrderBy(o=>o.CategoryDesc));
            //return NotFound();

        }

        [TraceMethod]
        [HttpPost]
        public HttpResponseMessage AddCategory([FromBody]Category _Category)
        {
            try
            {
                sqlUnitOfWork.Categories.Add(_Category);
                sqlUnitOfWork.Commit();
                return Request.CreateResponse(HttpStatusCode.Created,_Category);
            } catch
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }
        }

        [TraceMethod]
        [HttpPut]
        public HttpResponseMessage EditCategory([FromBody]Category _Category)
        {
            sqlUnitOfWork.Categories.Update(_Category);
            if (sqlUnitOfWork.Commit())
            {
                return Request.CreateResponse(HttpStatusCode.Accepted);
            }
            return Request.CreateResponse(HttpStatusCode.BadRequest);
        }

        [HttpDelete]
        [Authorize]
        public HttpResponseMessage DeleteCategory(int id)
        {
            try
            {
                var _category = sqlUnitOfWork.Categories.GetById(id);
                if (DeletedCategory(_category))
                    return Request.CreateResponse(HttpStatusCode.Accepted);
            }
            catch
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }

            return Request.CreateResponse(HttpStatusCode.BadRequest);
        }


        //Note: Another Method was created for Aspect to record the deleted record.
        //      The Problem is delete verb cannot accept records passed by headers. It only through URL.
        //       I haven't found the solution yet.

        [TraceMethod]
        private Boolean DeletedCategory(Category _Category)
        {
            sqlUnitOfWork.Categories.Delete(_Category);
            if (sqlUnitOfWork.Commit())
            {
                return true;
            }
            return false;
        }


    }
}
