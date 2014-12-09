using oMart.Core.Interface;
using oMart.Core.Models;
using oMart.Core.SubModels;
using oMart.Data.SQLUnitOfWork;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using oMart.UI.Helpers;

namespace oMart.UI.Controllers
{
    public class AuditController : ApiController
    {
        private IUnitOfWork sqlUnitOfWork;
        private int pageSize = 15;

        public AuditController()
        {
            sqlUnitOfWork = new SQLUnitOfWork();
        }
        public AuditController(IUnitOfWork _sqlUnitOfWork)
        {
            sqlUnitOfWork = _sqlUnitOfWork;
        }

        [HttpGet]
        //[Route("{controller}/{action}/{pageIndex}/{orderBy}/{searchKey}")]
        //[Route("~/api/authors/{authorId:int}/books")]

        //[Route("~/api/Audit/GetAudits/{pageIndex}/{orderBy}/{searchKey}")]
        public IHttpActionResult GetAudits(int pageIndex = 0, int caterogyId = 0, string orderBy = "", string searchKey = "")
        {
            pageSize = 15;
            var auditObject = GetAuditsFromService(pageIndex, orderBy, searchKey);
            IEnumerable<Audit> Audits = auditObject.Audits;
            int TotalRecords = auditObject.TotalRecords;

            return Ok(new { Audits, TotalRecords });
            //return Ok(Products);
        }


        //======================================================================

        //Need to refactor this. The CRUD should live in the oMart.Data Services
        //======================================================================
        AuditObject GetAuditsFromService(int pageIndex, string orderBy = "", string searchKey = "")
        {
            IEnumerable<Audit> Audits;
            int TotalRecords;
            searchKey = searchKey.ToUpper();

            orderBy = orderBy.ToLower();
            string OrderBy = "";
            switch (orderBy)
            {
                case "description":
                    OrderBy = "Description";
                    break;
                case "module":
                    OrderBy = "Module";
                    break;
                default :
                    OrderBy = "Date descending";
                    break;
            }

            Audits = sqlUnitOfWork.Audits.Query()
                    .WhereIf(!string.IsNullOrEmpty(searchKey), a => a.Description.ToUpper().Contains(searchKey) || a.Module.ToUpper().Contains(searchKey))
                    .SortOrderBy(OrderBy)
                    .Skip(pageSize * pageIndex)
                    .Take(pageSize);

            //Get the total records: 
            if (searchKey == "")
            {
                TotalRecords = sqlUnitOfWork.Audits.Count();
            }
            else
            {
                TotalRecords = Audits.Count();
            }


            //Return the product and total records
            AuditObject _AuditObject = new AuditObject()
            {
                Audits = Audits,
                TotalRecords = TotalRecords
            };

            return _AuditObject;
        }
    }
}
