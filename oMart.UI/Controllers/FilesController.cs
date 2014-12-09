using System.IO;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using System.Collections.Generic;
using oMart.UI.Models;
using oMart.UI.Helpers;
using System;
using System.Drawing;
using System.Web.Script.Serialization;

using System.Drawing.Drawing2D;

namespace oMart.UI.Controllers
{
    public class FilesController : ApiController
    {
        [HttpPost] // This is from System.Web.Http, and not from System.Web.Mvc
        public async Task<HttpResponseMessage> Upload()
        {
            if (Request.Content.IsMimeMultipartContent())
            {
                var uploadFolder = "/products/"; // you could put this to web.config
                string FullPathImageName = "";
                string FullPathThumbnail = "";

                var root = HttpContext.Current.Server.MapPath(uploadFolder);
                Directory.CreateDirectory(root);

                string uploadPath = HttpContext.Current.Server.MapPath(uploadFolder);

                MyStreamProvider streamProvider = new MyStreamProvider(uploadPath);
                

                var result = await Request.Content.ReadAsMultipartAsync(streamProvider);
                var model = result.FormData["fileUploadObj"];

                UploadDataModel fileData = new System.Web.Script.Serialization.JavaScriptSerializer().Deserialize<UploadDataModel>(model);

                var LocalFileName = fileData.imageLocalName;

                List<string> messages = new List<string>();
                foreach (var file in streamProvider.FileData)
                {
                    FileInfo fi = new FileInfo(file.LocalFileName);
                    FullPathImageName = uploadFolder + fi.Name;
                    FullPathThumbnail = "thumb" + fi.Name;
                    ProductsHelper.UpdateProductImage(Convert.ToInt32(fileData.productId), FullPathImageName, uploadFolder + FullPathThumbnail);

                    ResizeStream(100, uploadPath + fi.Name, root + FullPathThumbnail);
                }

                var returnData = "ReturnTest";
                return this.Request.CreateResponse(HttpStatusCode.OK, new { returnData });
            }
            else
            {
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.BadRequest, "Invalid Request!");
                throw new HttpResponseException(response);
            }
        }


        private void ResizeStream(int imageSize, string filePath, string outputPath)
        {
            var image = Image.FromFile(filePath);

            int thumbnailSize = imageSize;
            int newWidth, newHeight;

            if (image.Width > image.Height)
            {
                newWidth = thumbnailSize;
                newHeight = image.Height * thumbnailSize / image.Width;
            }
            else
            {
                newWidth = image.Width * thumbnailSize / image.Height;
                newHeight = thumbnailSize;
            }

            var thumbnailBitmap = new Bitmap(newWidth, newHeight);

            var thumbnailGraph = Graphics.FromImage(thumbnailBitmap);
            thumbnailGraph.CompositingQuality = CompositingQuality.HighQuality;
            thumbnailGraph.SmoothingMode = SmoothingMode.HighQuality;
            thumbnailGraph.InterpolationMode = InterpolationMode.HighQualityBicubic;

            var imageRectangle = new Rectangle(0, 0, newWidth, newHeight);
            thumbnailGraph.DrawImage(image, imageRectangle);

            thumbnailBitmap.Save(outputPath, image.RawFormat);
            thumbnailGraph.Dispose();
            thumbnailBitmap.Dispose();
            image.Dispose();
        }

        
    }

    
}
