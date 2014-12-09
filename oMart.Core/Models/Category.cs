using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
namespace oMart.Core.Models
{
    public class Category
    {
        public int Id { get; set; }
        [Required]
        public string CategoryDesc { get; set; }
        
        public virtual ICollection<Product> Products { get; set; }
    }
}