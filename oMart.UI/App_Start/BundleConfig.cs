using System.Web;
using System.Web.Optimization;

namespace oMart.UI
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/standard").Include(
                      "~/Scripts/jQuery/jquery-1.10.2.js",
                      "~/Scripts/modernizr-2.6.2.js",
                      "~/Scripts/ui/toastr.js",
                      "~/app/Utils/fileUpload/angular-file-upload-shim.js",
                      "~/Scripts/Angular1.3.5/angular.js",
                      "~/Scripts/Angular1.3.5/angular-route.js",
                      "~/Scripts/Angular1.3.5/angular-sanitize.js",
                      "~/Scripts/Bootstrap/ui-bootstrap-tpls-0.3.0.js",
                      "~/Scripts/Bootstrap/angular-ui-bootstrap.js",
                      "~/Scripts/Angular1.3.5/angular-animate.js",
                      "~/app/Utils/fileUpload/angular-file-upload.js",
                      "~/Scripts/bootstrap.js",
                      "~/Scripts/assets/underscore.js",
                      "~/Scripts/assets/angular-ui-router.js",
                      "~/Scripts/assets/angular-breadcrumb.js",
                      "~/Scripts/imageCropper/cropper.js",
                      "~/Scripts/ui/bootstrap-filestyle.js"
                      ));

            bundles.Add(new ScriptBundle("~/bundles/omartApp").Include(
                      "~/app/Directives/imageResize.js",
                      "~/app/Directives/imageDragDrop.js",
                      "~/app/Directives/timeAgoModule.js",
                      "~/app/Directives/passwordMatch.js",

                      "~/app/oMartApp.js",
                      "~/app/Utils/logInfo.js",
                      "~/app/Utils/imageCropperFactory.js",
                      "~/app/DataServices/appService.js",
                      "~/app/DataServices/categoryService.js",
                      "~/app/DataServices/productService.js",
                      "~/app/Category/js/categoryController.js",
                      "~/app/Products/js/myOmartController.js",
                      "~/app/Home/js/homeController.js",
                      "~/app/DataServices/auditServices.js",
                      "~/app/Audit/js/auditController.js",
                      "~/app/Utils/ValidationDirective.js",
                      "~/app/Users/js/userController.js",
                      "~/app/DataServices/authService.js",
                      "~/app/UniController/indexController.js",
                      "~/app/Utils/deviceCompatibility.js",
                      "~/app/test/cropcontroller.js"
                      ));

    
            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/Bootstrap/bootstrap.css",
                      "~/Content/Templates/style/font-awesome.css",
                      "~/Content/ui/toastr.css",
                      "~/Content/Templates/style/style.css",
                      "~/Content/ui/css-animate.css",
                      "~/Content/ui/wui.css",
                      "~/Content/Site.css",
                      "~/Content/cropper.css"
                 ));
        }
    }
}
