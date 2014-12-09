oMartApp.factory('categoryService',['$http', '$q','authService',
function ($http, $q, authService) {
    var _categories = [];
    var _isLoaded = false;

    var getCategories = function () {
        var deferred = $q.defer();
        var apiQuery = "api/category/GetCategory";

        $http.get(apiQuery)
          .then(function (result) {
              // Successful
              angular.copy(result.data, _categories);
              _isInit = true;
              deferred.resolve();
          },
          function (error) {
              // Error
              deferred.reject();
          });
        return deferred.promise;
    }

    var addCategory = function (_category) {
        var deferred = $q.defer();

        $http.post("/api/category/AddCategory", _category)
         .then(function (result) {
             // success
             var newlyCreatedCategory = result.data;
             //insert it in the Categories
             _categories.splice(0, 0, newlyCreatedCategory);
             deferred.resolve(newlyCreatedCategory);
         },
         function (error) {
             // error
             deferred.reject(error.status);
         });

        return deferred.promise;
    };

    var _updateCategory = function (_category) {
        var deferred = $q.defer();
        //alert("Here!")
        $http.put("/api/category/EditCategory", _category)
         .then(function (result) {
             //Update the list
             for (var i = 0; i < _categories.length; i++) {
                 if (_categories[i].id == _category.id) {
                     angular.extend(_categories[i] = _category);
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

    var _deleteCategory = function (id) {
        var deferred = $q.defer();
        //+id+'?access_token='+token, headers: {'Authorization': 'Bearer '+token}
        var token = authService.authentication.accessToken;
        $http.delete("/api/category/DeleteCategory/" + id , { headers: { 'Authorization': 'Bearer ' + token } })
         .then(function (result) {
             //Must delete the record in the list

             for (var i = 0; i < _categories.length; i++) {
                 if (_categories[i].id == id) {
                     _categories.splice(i, 1);
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

    function _findCategoryById(id) {
        var found = null;
        $.each(_categories, function (i, category) {
            if (category.id == id) {
                found = category;
                return false;
            }
        });
        return found;
    };

    //Expose methods and fields through revealing pattern
    return {
        categories: _categories,
        getCategories: getCategories,
        addCategory: addCategory,
        updateCategory: _updateCategory,
        deleteCategory : _deleteCategory,
        findCategoryById: _findCategoryById,
        isLoaded : _isLoaded
    }

}]);