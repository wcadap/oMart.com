using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Formatting;
using System.Web.Http;
using Microsoft.Owin.Security.OAuth;
using Newtonsoft.Json.Serialization;


namespace oMart.UI
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Web API configuration and services
            // Configure Web API to use only bearer token authentication.
            config.SuppressDefaultHostAuthentication();
            config.Filters.Add(new HostAuthenticationFilter(OAuthDefaults.AuthenticationType));

            var jsonFormatter = config.Formatters.OfType<JsonMediaTypeFormatter>().First();
            jsonFormatter.SerializerSettings.ContractResolver =
                new CamelCasePropertyNamesContractResolver();

            // Web API routes
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );

            config.Routes.MapHttpRoute(
               name: "ApiWithMultipleGets",
               routeTemplate: "api/{controller}/{action}/{id}",
               defaults: new { id = RouteParameter.Optional }
           );

            config.Routes.MapHttpRoute(
                name: "ProductRoute",
                routeTemplate: "api/{controller}/{action}/{pageIndex}/{caterogyId}/{orderBy}/{searchKey}",
                defaults: new
                {
                    controller = "Product",
                    pageIndex = RouteParameter.Optional,
                    caterogyId = RouteParameter.Optional,
                    orderBy = RouteParameter.Optional,
                    searchKey = RouteParameter.Optional
                }
            );
        }
    }
}
