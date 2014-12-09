using oMart.UI.Models;
using System;
using System.Collections.Specialized;
using System.IO;
using System.Net.Http;
using System.Net.Http.Headers;

namespace oMart.UI.Helpers
{
    public class MyStreamProvider : MultipartFormDataStreamProvider
    {
        //public NameValueCollection FormData
        //{
        //    get { return _formData; }
        //}

        public MyStreamProvider(string uploadPath)
            : base(uploadPath)
        {

        }

        //public override Stream GetStream(HttpContent parent, HttpContentHeaders headers)
        //{
        //     For form data, Content-Disposition header is a requirement
        //    ContentDispositionHeaderValue contentDisposition = headers.ContentDisposition;
        //    if (contentDisposition != null)
        //    {
        //         If we have a file name then write contents out to AWS stream. Otherwise just write to MemoryStream
        //        if (!String.IsNullOrEmpty(contentDisposition.FileName))
        //        {
                    
        //            contentDisposition.FileName = Guid.NewGuid().ToString();

        //            return new MemoryStream();

        //            _isFormData.Add(false);

        //            MyMultipartFileData fileData = new MyMultipartFileData(headers, your - aws - filelocation - url - maybe);
        //            _fileData.Add(fileData);

        //            return myAWSStream;//**return you AWS stream here**
        //        }

        //         We will post process this as form data
        //        _isFormData.Add(true);

        //         If no filename parameter was found in the Content-Disposition header then return a memory stream.
        //        return new MemoryStream();
        //    }

        //    throw new InvalidOperationException("Did not find required 'Content-Disposition' header field in MIME multipart body part..");
        //}

        public override string GetLocalFileName(HttpContentHeaders headers)
        {
            
            string fileName = headers.ContentDisposition.FileName;
            //headers.ContentDisposition
            if (string.IsNullOrWhiteSpace(fileName))
            {
                fileName = Guid.NewGuid().ToString() + ".data";
            }

            fileName = Guid.NewGuid().ToString() + fileName ;
            return fileName.Replace("\"", string.Empty);
        }
    }
}