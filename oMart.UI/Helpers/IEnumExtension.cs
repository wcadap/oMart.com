using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Linq.Dynamic;

namespace oMart.UI.Helpers
{
    public static class IEnumExtension
    {
        
        public static IEnumerable<TSource> WhereIf<TSource>(this IEnumerable<TSource> source, bool condition, Func<TSource, bool> predicate)
        {
            if (condition)
                return source.Where(predicate);
            else
                return source;
        }
        //Sort order
        
        public static IEnumerable<TSource> SortOrderBy<TSource>(this IEnumerable<TSource> source, string sortBy)
        {
            return source.OrderBy(sortBy);
        }
        
    }
}