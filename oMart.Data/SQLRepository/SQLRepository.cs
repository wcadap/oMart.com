using oMart.Core.Interface;
using System;
using System.Data.Entity;
using System.Linq;


namespace oMart.Data.SQLRepository
{
    public class SQLRepository<T> : IRepository<T> where T : class
    {
        internal oMartDbContext Context;
        internal DbSet<T> dbSet;

        public SQLRepository(oMartDbContext context)
        {
            Context = context;
            dbSet = Context.Set<T>();
        }

        
        public IQueryable<T> Query()
        {
            IQueryable<T> query = dbSet;
            return dbSet;
        }
        public int Count()
        {
            return dbSet.Count();
        }

        public IQueryable<T> QueryIncluding(params System.Linq.Expressions.Expression<Func<T, object>>[] includeProperties)
        {
            IQueryable<T> query = dbSet;
            foreach (var includeProperty in includeProperties)
            {
                query = query.Include(includeProperty);
            }
            return query;
        }

        public T GetById(int id)
        {
            return dbSet.Find(id);
        }

        
        public void Add(T entity)
        {
            dbSet.Add(entity);
        }

        public void Update(T entity)
        {
            dbSet.Attach(entity);
            Context.Entry(entity).State = System.Data.Entity.EntityState.Modified;
        }

        public void Delete(T entity)
        {
           
            if (Context.Entry(entity).State == EntityState.Detached)
            {
                dbSet.Attach(entity);
            }
            dbSet.Remove(entity);
        }
        
    }
}
