using oMart.Core.Models;
using oMart.Core.Interface;
using oMart.Data.SQLRepository;
using System;
using System.Dynamic;

namespace oMart.Data.SQLUnitOfWork
{
    public class SQLUnitOfWork : IUnitOfWork, IDisposable
    {
        internal oMartDbContext Context = new oMartDbContext();

        internal SQLRepository<Category> _Categories;
        internal SQLRepository<Product> _Products;
        internal SQLRepository<Audit> _Audits;
        public IRepository<Category> Categories
        {
            get
            {

                if (this._Categories == null)
                {
                    this._Categories = new SQLRepository<Category>(Context);
                }
                return _Categories;
            }
        }
        
        public IRepository<Product> Products
        {
            get
            {

                if (this._Products == null)
                {
                    this._Products = new SQLRepository<Product>(Context);
                }
                return _Products;
            }
        }

        public IRepository<Audit> Audits
        {
            get
            {

                if (this._Audits == null)
                {
                    this._Audits = new SQLRepository<Audit>(Context);
                }
                return _Audits;
            }
        }

        public bool Commit()
        {
            try
            {
                Context.SaveChanges();
                return true;
            }
            //catch (Exception e)
            catch
            {
                return false;
            }
            
        }

        public void Dispose()
        {
            Context.Dispose();
            GC.SuppressFinalize(this);
        }
        
    }
}

