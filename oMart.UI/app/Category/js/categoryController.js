oMartApp.controller('categoryController',
    ['$scope', 'categoryService', '$location', 'logInfo','authService',
    function categoryController($scope, categoryService, $location,  logInfo,authService) {
        $scope.data = categoryService;
        $scope.isBusy = false;
        $scope.category = {};

        loadData();

        $scope.newCategory = function () {
            $location.path('/category/newcategory');
            
        };

        $scope.editCategory = function (category) {
            $location.path('/category/' + category.id);
        }

        $scope.delete = function (category) {
            if (!authService.authentication.isAuth) {
                $location.path('/logIn');
                return;
            }
            $("#myModal").modal('show');
            $scope.category = angular.copy(category)
        };

        $scope.deleteFinal = function () {
            //$(".btn").attr("disabled", true);
            $("#cancelBtn").attr("disabled", true);
            $("#deleteFinal").attr("disabled", true);
            
            categoryService.deleteCategory($scope.category.id)
            .then(function (result) {
                logInfo.success("Successfully deleted " + $scope.category.categoryDesc + ".");
                $(".btn").button("reset");
                $('#myModal').modal('hide');
                
            },
            function () {
                $(".btn").button("reset");
                logInfo.error("Error deleting " + $scope.category.categoryDesc + ".");
            });
        };

        //internal

        function loadData() {
            $scope.isBusy = true;
            categoryService.getCategories()
                .then(function () {
                    //success
                    //$scope.isLoaded = true;
                    //logInfo.info("Successfully loaded Category data.");
                },
                function () {
                    logInfo.error("Unable to load Category data.");
                })
                .then(function () {
                    $scope.isBusy = false;
                });
        }
        
    }]);

oMartApp.controller('newCategoryController',
    ['$scope', 'categoryService', '$window', 'logInfo',
    function newCategoryController($scope, categoryService, $window, logInfo) {
        $scope.category = { id: 0, categoryDesc: "" };
        $scope.isEditDelete = false;
        $scope.sLabel = "New Category";
        $scope.panelHeader = "New Product Category";
        //$("#categoryDesc").focus();

        $scope.saveData = function () {

            var isValid = $scope.categoryForm.$invalid;
            $scope.$broadcast('show-errors-event');

            //$scope.$broadcast('show-errors-event');
            //if ($scope.categoryForm.$invalid) return;

            $(".btn").attr("disabled", true);
            $("#submitForm").html("Saving...");

            categoryService.addCategory($scope.category)
            .then(function () {
                //success
                
                logInfo.success("Successfully saved data.");
                //$window.history.back();
                $scope.category = { id: 0, categoryDesc: "" };
                $('#categoryDesc').focus();
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

        $scope.cancelSaveForm = function () {
            $scope.$broadcast('hide-errors-event');
            $window.history.back();
        };

        $scope.resetForm = function () {
            $scope.$broadcast('hide-errors-event');
        };

    }]);

oMartApp.controller('editCategoryController',
    ['$scope', 'categoryService', '$window', '$routeParams', 'logInfo','$state','$stateParams',
    function newCategoryController($scope, categoryService, $window, $routeParams, logInfo, $state, $stateParams) {
        $scope.category = {};
        $scope.isEditDelete = true;
        $scope.sLabel = "Edit Category";
        $scope.panelHeader = "Edit Product Category";

        if($stateParams.id) {

        //if ($routeParams.id) {
            var _category = categoryService.findCategoryById($stateParams.id);
            if (_category) {
                $scope.category = angular.copy(_category);
            }
        }

        $("#categoryDesc").focus();
        
        $scope.saveData = function () {
            var isValid = $scope.categoryForm.$invalid;
            $scope.$broadcast('show-errors-event');

            if (isValid) return;

            $(".btn").attr("disabled", true);
            $("#submitForm").html("Saving...");

            categoryService.updateCategory($scope.category)
            .then(function () {
                //success
                $window.history.back();
                logInfo.success("Successfully updated data.");
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

        $scope.cancelSaveForm = function () {

            $window.history.back();
        };

        $scope.resetForm = function () {
            $scope.$broadcast('hide-errors-event');
        };

    }]);