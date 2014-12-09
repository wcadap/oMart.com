var productService = function ($http, $q, $timeout) {
    var _products = [];
    var _trendingProducts = [];
    var _totalRecords = 0;
    
    var _getProducts = function (pageIndex, categoryId, orderBy, searchKey, source) {
        var deferred = $q.defer();
        var apiQuery;

        if (source == "homeController") {
            apiQuery = "api/product/GetProductsHome/" + pageIndex + "/" + categoryId + "/" + orderBy + "/" + searchKey;
        } else {
            apiQuery = "api/product/GetProducts/" + pageIndex + "/" + categoryId + "/" + orderBy + "/" + searchKey;
        };

        $http.get(apiQuery)
          .then(function (result) {
              // Successful
              angular.copy(result.data.products, _products);
              _totalRecords = result.data.totalRecords;
              _isInit = true;
              deferred.resolve();

          },
          function (error) {
              // Error
              deferred.reject();
          });
        return deferred.promise;
    }

    var _addProduct = function (_product) {
        var deferred = $q.defer();

        $http.post("/api/product/addProduct", _product)
         .then(function (result) {
             // success
             var newlyCreatedProduct = result.data;
             //insert it in the products
             _products.splice(0, 0, newlyCreatedProduct);
             deferred.resolve(newlyCreatedProduct);
         },
         function (error) {
             // error
             deferred.reject(error.status);
         });

        return deferred.promise;
    };

    var _updateProduct = function (_product) {
        var deferred = $q.defer();
        //alert("Here!")
        $http.put("/api/product", _product)
         .then(function (result) {
             //Update the list
             for (var i = 0; i < _products.length; i++) {
                 if (_products[i].id == _category.id) {
                     angular.extend(_products[i] = _product);
                     break;
                 }
             }
             deferred.resolve(result.data);
         },
         function (error) {
             // error
             deferred.reject();
             //alert("Erroer!")
         });

        return deferred.promise;
    };


    var _deleteProduct = function (id) {
        var deferred = $q.defer();
        $http.delete("/api/product/" + id)
         .then(function (result) {
             //Must delete the record in the list

             for (var i = 0; i < _products.length; i++) {
                 if (_products[i].id == id) {
                     _products.splice(i, 1);
                     break;
                 }
             }

             deferred.resolve(result.data);
         },
         function () {
             // error
             deferred.reject();

         });

        return deferred.promise;
    };

    function _findProductById(id) {
        var found = null;
        $.each(_products, function (i, product) {
            if (product.id == id) {
                found = product;
                return false;
            }
        });
        return found;
    };


    var _getTotalRecords = function () {
        return _totalRecords;
    };


    var _updateViews = function (product) {
        var deferred = $q.defer();
        var apiQuery = "api/HomeProduct/updateViews/" + product.id;

        $http.post(apiQuery)
          .then(function (result) {
              // Successful

              //Must update the client 
              product.viewCount++;
              for (var i = 0; i < _products.length; i++) {
                  if (_products[i].id == product.id) {
                      angular.extend(_products[i] = product);
                      break;
                  }
              }

              deferred.resolve();
          },
          function (error) {
              // Error
              deferred.reject();
          });
        return deferred.promise;
    }


    //Get trending Products
    //====================================================
    var _getTrendingProducts = function () {
        var deferred = $q.defer();
        var apiQuery = "api/product/GetTopTenProducts/" + 0 + "/" + 0 + "/ViewCount" + "/" + "";

        $http.get(apiQuery)
          .then(function (result) {
              // Successful
              angular.copy(result.data, _trendingProducts);
              //_totalRecords = result.data.totalRecords;
              _isInit = true;
              deferred.resolve();

          },
          function (error) {
              // Error
              deferred.reject();
          });
        return deferred.promise;
    }


    //UpdateViews

    //Expose methods and fields through revealing pattern
    return {
        products: _products,
        trendingProducts: _trendingProducts,
        getProducts: _getProducts,
        addProduct: _addProduct,
        updateProduct: _updateProduct,
        deleteProduct: _deleteProduct,
        findProductById: _findProductById,
        //getHomeProducts: _getHomeProducts,
        getTotalRecords: _getTotalRecords,
        updateViews: _updateViews,
        getTrendingProducts: _getTrendingProducts
    }
};

oMartApp.factory('productService', productService);
productService.$inject = ['$http', '$q', '$timeout'];
