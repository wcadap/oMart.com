using oMart.Core.Interface;
using oMart.Core.Models;
using oMart.Data.SQLUnitOfWork;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;

namespace oMart.UI.aspect
{
    public static class omartLogger
    {
        private static IUnitOfWork sqlUnitOfWork = new SQLUnitOfWork();

        public static void SaveLog(string Method, StringBuilder LogDetail) {
            sqlUnitOfWork.Audits.Add(
                new Audit()
                {
                    Date = DateTime.Now,
                    Module = Method,
                    Description = LogDetail.ToString()
                }
                );
            sqlUnitOfWork.Commit();
        }

    }
}