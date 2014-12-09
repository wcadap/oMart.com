using oMart.Core.Interface;
using oMart.Data.SQLUnitOfWork;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace oMart.UI.Controllers
{
    public class HomeProductController : ApiController
    {
        private IUnitOfWork sqlUnitOfWork;
        
        
        public HomeProductController()
        {
            sqlUnitOfWork = new SQLUnitOfWork();
        }
        public HomeProductController(IUnitOfWork _sqlUnitOfWork)
        {
            sqlUnitOfWork = _sqlUnitOfWork;
        }

        //For updating View Count
        [HttpPost]
        public HttpResponseMessage UpdateViews(int id)
        {
            var _product = sqlUnitOfWork.Products.GetById(id);
            if (_product != null)
            {
                _product.ViewCount++;
                if (sqlUnitOfWork.Commit())
                {
                    return Request.CreateResponse(HttpStatusCode.Accepted);
                }
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }
            return Request.CreateResponse(HttpStatusCode.BadRequest);
        }
        
    }
}
