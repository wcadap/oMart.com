using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace oMart.Core.Models
{
    public class Product
    {
        public int Id { get; set; }
        [Required]
        public string ProductName{ get; set; }
        [Required]
        public string Description { get; set; }
        [Required]
        public DateTime DateRegistered { get; set; }
        [Required]
        public DateTime DateExpired { get; set; }
        public int ViewCount { get; set; }
        public int Rating { get; set; }
        [Required]
        public string Unit { get; set; }
        [Required]
        public decimal UnitPrice { get; set; }
        public string ImageURL { get; set; }
        public string ImageThumbUrl { get; set; }
        [Required]
        public int CategoryId { get; set; }
    }
}