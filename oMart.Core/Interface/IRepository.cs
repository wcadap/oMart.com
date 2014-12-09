using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace oMart.Core.Interface
{
    public interface  IRepository<T> where T : class 
    {
        IQueryable<T> Query();
        int Count();
        IQueryable<T> QueryIncluding(params Expression<Func<T, object>>[] includeProperties);
        T GetById(int id);
        void Add(T entity);
        void Update(T entity);
        void Delete(T entity);
    }
}
