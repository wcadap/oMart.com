
oMartApp.controller('myOmartController',
    ['$scope', 'productService', 'categoryService', '$location', 'logInfo','authService',
    function categoryController($scope, productService, categoryService, $location, logInfo, authService) {
        $scope.data = productService;
        $scope.categories = categoryService;
        $scope.isBusy = false;

        $scope.product = {};

        $scope.currentPage = 1;
        $scope.searchTxt = "";
        $scope.searchKey = "";
        $scope.orderByField = "dateRegistered";
        $scope.reverseSort = true;
        
        $scope.pageChanged = function (page) {
            $scope.currentPage = page;
            loadData();
        };

        $scope.searchItem = function () {
            goSearch();
        };

        $scope.CheckEnter = function (keyEvent) {
            if (keyEvent.which === 13) goSearch();
        }

        $scope.changeOrder = function (orderField) {
            $scope.orderByField = orderField;

            switch (orderField) {
                case 'productName':
                    $scope.reverseSort = false;
                    break;
                case 'viewCount': 
                    $scope.reverseSort = true;
                    break; 
                
                case 'dateRegistered':
                    $scope.reverseSort = true;
                    break;
                case 'dateExpired':
                    $scope.reverseSort = false;
                    break;
                default : 
                    $scope.reverseSort = false;
                    break;

                };
        };


        loadData();


        $scope.delete = function (product) {
            if (!authService.authentication.isAuth) {
                $location.path('/logIn');
                return;
            }

            $("#myModal").modal('show');
            $scope.product = angular.copy(product)
        };

        $scope.deleteFinal = function () {
            //$(".btn").attr("disabled", true);
            $("#cancelBtn").attr("disabled", true);
            $("#deleteFinal").attr("disabled", true);

            productService.deleteProduct($scope.product.id)
            .then(function (result) {
                $scope.totalRecords--;
                logInfo.success("Successfully deleted " + $scope.product.productName + ".");
                $(".btn").button("reset");

                $('#myModal').modal('hide');
                //setTimeout(function () {
                //    $window.history.back();
                //}, 400);

            },
            function () {
                $(".btn").button("reset");
                logInfo.error("Error deleting " + $scope.product.productName + ".");
            });
        };

        function filterData(filterText) {
            $scope.filteredData = $scope.data.products;
        }

        //internal

        var goSearch = function () {
            $scope.searchKey = $("#searchTxt").val();
            $scope.orderByField = "dateRegistered";
            loadData();
        }

        function loadData() {
            $scope.isBusy = true;
            productService.getProducts($scope.currentPage - 1, 0, $scope.orderByField, $scope.searchKey)
                .then(function () {
                    //success
                    //$scope.isLoaded = true;
                    $scope.pageSize = 15;
                    $scope.totalRecords = productService.getTotalRecords();

                    filterData('');
                    //logInfo.info("Successfully loaded Products.");
                },
                function () {
                    logInfo.error("Unable to load Products.");
                })
                .then(function () {
                    $scope.isBusy = false;
                });
        }
    }]);

oMartApp.controller('newProduct',
    ['$scope', 'productService', 'categoryService', '$window', 'logInfo', '$http', '$timeout', '$upload','$q','imageCropperFactory',
    function newCategoryController($scope, productService, categoryService, $window, logInfo, $http, $timeout, $upload, $q, imageCropperFactory) {

        //$scope.imageCropper = imageCropperFactory;

        var imageCropper;

        $scope.product = {};
        initProductModel();
        $scope.units = [
             { name: 'Piece'},
             { name: 'Dozen'},
             { name: 'Pair'}
        ];
        $scope.categoryNew = {};

        $scope.supportedFormats = ['image/jpg', 'image/gif', 'image/png','image/bmp'];

        $scope.productDetail = {
            partial1: "app/products/productReg.html"
        };

        $scope.categories = [];
        loadCategoryData();

        $scope.isEditDelete = false;
        $scope.sLabel = "New Product";
        $scope.panelHeader = "New Product";

        $scope.unitSelected = $scope.units[0];
        
        $scope.file = null;

        $scope.max_width = 350;
        $scope.max_height = 300;

        $scope.imageProptery = { name: "", width: 0, height: 0 };
        $scope.iScropped = false;

        $("#categorySelect").focus();

        $productImage = $('#productImage');
        $origImage = $('#origImage');


        $scope.saveData = function () {
            
            $scope.product.unit = $scope.unitSelected.name;
            $scope.product.categoryId = $scope.categoryNew.id;
            
            $scope.$broadcast('show-errors-event');

            if ($scope.productForm.$invalid) return;

            $(".btn").attr("disabled", true);
            $("#submitForm").html("Saving...");
            
            productService.addProduct($scope.product)
            .then(function () {
                //success
                $scope.uploadImage();
                logInfo.success("Successfully saved data.");
                //$window.history.back();
                //initProductModel();
                $('#categorySelect').focus();
            },
            function (error) {

                switch (error) {
                    case 401:
                        logInfo.error("Unauthorized Access");
                        break;

                    default:
                        logInfo.error("Error saving data.");
                }
            })
            .then(function () {
                $(".btn").button("reset");
                $("#submitForm").html("<i class='icon-save'/>Save");
            });
        };

        $scope.resizeToFit = function () {
            $scope.iScropped = false;
            resize($file, $scope.max_width, $scope.max_height, .7, 'image/jpg')
        };

        $scope.cancelSaveForm = function () {
            $window.history.back();
        };

        $scope.resetForm = function () {
            $scope.$broadcast('hide-errors-event');
            initProductModel();
        };

        //image processing
        //$scope.file = null;
        $scope.upload = [];
        $scope.fileUploadObj = { productId: 0,imageLocalName:""};
        
        $scope.onSelectedFile = function ($files) {
            
            if (!checkFileFormats($files[0])) {
                logInfo.error("Not Supported File format...");
                return;
            }
            
            $file = $files[0];
            cropOrRetain($file);
            
            /* Temporarily disabled....
            displayFile($file, $origImage);
            resize($file, $scope.max_width, $scope.max_height, .7, 'image/jpg')
            */

            //displayFile($scope.file);
        };

        var cropOrRetain = function (file) {
            getImageProperties(file).then(function () {

                if (($scope.imageProptery.width > 300) || ($scope.imageProptery.height > 350)) {
                    displayWithCropping(file, $origImage);
                    $scope.iScropped = true;
                } else {
                    $scope.file = file;
                    $scope.iScropped = false;
                    //displayFile(file, $origImage);
                    resize($file, $scope.max_width, $scope.max_height, .7, 'image/jpg')
                }
            });
        };

        var checkFileFormats = function (file) {
            if (file.type) {
                if (file.type.indexOf("image") == 0) {
                //if ($scope.supportedFormats.indexOf(file.type) > 0) {
                    return true;
                }
                return false;
            }
        }

        var getImageProperties = function (file) {
            var deferred = $q.defer();

            var reader = new FileReader();
            reader.onload = function (evt) {
                var image = new Image();
                image.onload = function (evt) {
                    $scope.imageProptery.name = file.name;
                    $scope.imageProptery.width = this.width;
                    $scope.imageProptery.height = this.height;
                    deferred.resolve();
                };
                image.src = evt.target.result;
            };
            reader.readAsDataURL(file);
            return deferred.promise;
        }

        

        var displayWithCropping = function (file, targetId) {
            if (file.type.indexOf("image") == 0) {
                var reader = new FileReader();
                reader.onload = function (e) {
                    targetId.html(
                        '<div class="cropper-wrapper">' +
                        '<img class="cropper" src="' + e.target.result + '" alt="Picture">' +
                        '</div>'
                        );
                    imageCropper = imageCropperFactory.buildCropper();
                }
                reader.readAsDataURL(file);
            }
        }

        var displayFile = function (file, targetId) {
            // display an image
            //$('#imageInfo').html(
            //        "<p>File information: <strong>" + file.name +
            //        "</strong> | Type: <strong>" + file.type +
            //        "</strong> | Size: <strong>" + file.size +
            //        "</strong> bytes</p>"
            //);

            if (file.type.indexOf("image") == 0) {
                var reader = new FileReader();
                reader.onload = function (e) {
                    targetId.html(
                        '<img src="' + e.target.result + '" /></p>');
                    //$productImage.html(
                    //    '<img src="' + e.target.result + '" /></p>');
                }
                reader.readAsDataURL(file);
            }
            //targetId.html('<img src="' + file + '" /></p>');
        };

        //=====================================================
        //Drag and Drop
        //=====================================================

        $scope.imageDropped = function () {
            //Get the file

            var file = $scope.uploadedFile;

            if (!checkFileFormats(file)) {
                logInfo.error("Not Supported File format...");
                return;
            }

            $file = file;
            cropOrRetain($file);

            //$scope.file = file;
            //resize(file, $scope.max_width, $scope.max_height, .7, 'image/jpg')
            //displayFile(file);
        };

        //=====================================================
        //Drag and Drop until here
        //=====================================================


        $scope.uploadImage = function () {
            //get the id return from the Server to be use for assiociating to the image
            console.log($scope.file);

            if ($scope.iScropped) {
                convertCropImageToFile();
            }
            
            if ($scope.file == null) {
                $window.history.back();
                return;
            }

            $scope.fileUploadObj.productId = productService.products[0].id;
            $scope.fileUploadObj.imageLocalName = $scope.file.name;

            $scope.upload = $upload.upload({
                url: "./api/files/upload", // webapi url
                method: "POST",
                data: { fileUploadObj: $scope.fileUploadObj },
                file: $scope.file
            }).progress(function (evt) {
                // get upload percentage
                console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
            }).success(function (data, status, headers, config) {
                // file is uploaded successfully
                console.log(data);
                $window.history.back();
            }).error(function (data, status, headers, config) {
                // file failed to upload
                console.log(data);
            });
        };

        //internal

        var convertCropImageToFile = function () {
            var canvas = document.createElement('canvas'),
                context = null,
                imageObj = new Image(),
                blob = null;

            width = 300;
            height = 350;

            imageObj.src = imageCropper.getImageData();

            canvas.id = "hiddenCanvas22";
            canvas.width = width;
            canvas.height = height;
            canvas.style.visibility = "hidden";
            document.body.appendChild(canvas);

            //get the context to use 
            context = canvas.getContext('2d');

            context.clearRect(0, 0, width, height);
            context.drawImage(imageObj, 0, 0, width, height);

            blob = dataURItoBlob(canvas.toDataURL('image/jpg'));

            var d = new Date();
            var newFile = new File([blob], $file.name, { type: $file.type, lastModified: d });
            $scope.file = newFile;
        };

        function initProductModel() {
            $scope.product = {
                id: 0,
                productName: "",
                description: "",
                dateRegistered: new Date(),
                dateExpired: new Date(),
                unit: "",
                unitPrice: 0.00,
                imageURL: "",
                categoryId: 0
            };
            
            $('#productImage').html('');
            $("#fileselect").val(null);
        }

        function loadCategoryData() {
            categoryService.getCategories()
                .then(function () {
                    angular.copy(categoryService.categories, $scope.categories);
                    $scope.categoryNew = $scope.categories[0];
                    
                },
                function () {
                    logInfo.error("Unable to load Category data.");
                })
        }
        //Image Resizer
        //=============================================================
        
        //dragImageListen(filedrag);

        function resize(file, max_width, max_height, compression_ratio, imageEncoding) {
            var fileLoader = new FileReader(),
            canvas = document.createElement('canvas'),
            context = null,
            imageObj = new Image(),
            blob = null;

            // check for an image then
            //trigger the file loader to get the data from the image        
            if (file.type.indexOf("image") == 0) {
            //if (file.type.match('image.*')) {
                fileLoader.readAsDataURL(file);
            } else {
                logInfo.error('File is not an image');
                
                return file;
            }

            // setup the file loader onload function
            // once the file loader has the data it passes it to the 
            // image object which, once the image has loaded, 
            // triggers the images onload function
            fileLoader.onload = function () {
                var data = this.result;
                imageObj.src = data;
            };

            fileLoader.onabort = function () {
                logInfo.error('The upload was aborted.');
            };

            fileLoader.onerror = function () {
                //alert("An error occured while reading the file.");
            };

            // set up the images onload function which clears the hidden canvas context, 
            // draws the new image then gets the blob data from it
            imageObj.onload = function () {

                // Check for empty images
                if (this.width == 0 || this.height == 0) {
                    //alert('Image is empty');
                    return file;
                } else {

                    var height = this.height;
                    var width = this.width;

                    if (width > height) {
                        if (width > max_width) {
                            height = Math.round(height *= max_width / width);
                            width = max_width;
                        }
                    } else {
                        if (height > max_height) {
                            width = Math.round(width *= max_height / height);
                            height = max_height;
                        }
                    }

                    //create a hidden canvas object we can use to create the new resized image data
                    canvas.id = "hiddenCanvas";
                    canvas.width = width;
                    canvas.height = height;
                    canvas.style.visibility = "hidden";
                    document.body.appendChild(canvas);

                    //get the context to use 
                    context = canvas.getContext('2d');

                    context.clearRect(0, 0, width, height);
                    context.drawImage(imageObj, 0, 0, width, height);
                    //context.drawImage(imageObj, 0, 0, width, height, 0, 0, max_width, max_height);

                    blob = dataURItoBlob(canvas.toDataURL(imageEncoding));

                    var d = new Date();
                    //generatedFile = new File([data.value], hfile.name, { type: hfile.type, lastModified: d });
                    var newFile = new File([blob], file.name, { type: file.type, lastModified: d });
                    $scope.file = newFile;
                    displayFile(newFile, $origImage);
                    return newFile;
                }
            };

            imageObj.onabort = function () {
                //alert("Image load was aborted.");
            };

            imageObj.onerror = function () {
                //alert("An error occured while loading image.");
            };
        }

        function dataURItoBlob(dataURI) {
            // convert base64/URLEncoded data component to raw binary data held in a string
            var byteString;
            if (dataURI.split(',')[0].indexOf('base64') >= 0)
                byteString = atob(dataURI.split(',')[1]);
            else
                byteString = unescape(dataURI.split(',')[1]);

            // separate out the mime component
            var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

            // write the bytes of the string to a typed array
            var ia = new Uint8Array(byteString.length);
            for (var i = 0; i < byteString.length; i++) {
                ia[i] = byteString.charCodeAt(i);
            }
            return new Blob([ia], { type: mimeString });
        }
    }]);