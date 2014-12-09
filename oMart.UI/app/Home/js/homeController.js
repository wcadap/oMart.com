'use strict';
oMartApp.controller('homeController',
    ['$scope', 'appService', 'productService', 'categoryService', '$location', 'logInfo',
    function homeController($scope, appService, productService, categoryService, $location, logInfo) {
        $scope.data = productService;
        $scope.categories = [];
        $scope.trendingProducts = [];
        $scope.categorySelected = null;
        $scope.isFirstRun = appService.checkFirstRun();
        $scope.isBusy = false;

        //$scope.filteredData = [];
        $scope.currentPage = 1;

        $scope.freshPage = true;
        $scope.searchKey = "";
        $scope.searchTxt = "";
        $scope.sortOrder = "";
        
        loadData();
        loadCategories();

        $scope.pageChanged = function (page) {
            $scope.currentPage = page;
            loadData();
        };

        $scope.productDetail = function (product) {
            //product.viewCount++;
            updateViews(product);
            
            $scope.product = angular.copy(product);
            $scope.product.viewCount++;
            $("#productModal").modal('show');
        };

        $scope.goGetbyCategories = function (category) {
            $("#searchTxt").val("");
            $scope.searchKey = "";
            //$scope.searchTxt = "";
            //$scope.searchKey = $("#searchTxt").val();
            $scope.categorySelected = category;
            //Go get it
            loadData();
            $scope.currentPage = 1;
        };

        $scope.CheckEnter = function (keyEvent) {
            if (keyEvent.which === 13) goSearch();
        }

        $scope.searchItem = function () {
            goSearch();
        };

        var goSearch = function () {
            $scope.searchKey = $("#searchTxt").val();
            $scope.sortOrder = "";
            if ($scope.searchKey == "") return;
            $scope.sortOrder = "ProductName";
            loadData();
        };

        $scope.timediff = function(start, end){
            return moment.utc(moment(task.end.diff(moment(task.start))).format("mm"));
        };


        //internal
        //========================================================

        var updateViews = function (product) {
            productService.updateViews(product)
            .then(function () {
                loadDataTrending();
            },
            function () {
                ///Failed
            })
            
        };

        function loadData() {
            $scope.isBusy = true;

            //Get Products
            if ($scope.categorySelected == null) $scope.categorySelected = { id: 0, categoryDesc: "All Categories" };

            //console.log($scope.searchKey);
            productService.getProducts($scope.currentPage - 1, $scope.categorySelected.id, $scope.sortOrder, $scope.searchKey, "homeController")
                .then(function () {
                    //success
                    //$scope.isLoaded = true;
                    $scope.homePageSize = 12;
                    $scope.totalRecords = productService.getTotalRecords();
                    filterData(''); //Trigger initial filter
                    loadDataTrending();
                    //$scope.isBusy = false;
                    //logInfo.info("Successfully loaded Products.");
                },
                function () {
                    logInfo.error("Unable to load Products.");
                })
                .then(function () {
                    $scope.isBusy = false;
                    
                    $scope.isFirstRun = appService.setNoFirstRun();
                });
        }

        function loadCategories() {
            categoryService.getCategories()
                .then(function () {
                    //$scope.categories = categoryService.categories;
                    getCategories();
                    //inject the all categories option
                    
                },
                function () {
                    logInfo.error("Unable to load Categories. Please reload the page.");
                })
                .then(function () {
                    categoryService.isLoaded = true;
                });
        }

        function getCategories() {
            $scope.categories = categoryService.categories;
            bindDefaultSelection();
            //$scope.categorySelected = $scope.categories[0];
            //if ($scope.categorySelected == null) {
            //    $scope.categorySelected = $scope.categories[0];
            //}
        }

        function bindDefaultSelection() {
            if ($scope.freshPage) {
                $scope.categories.splice(0, 0, { id: 0, categoryDesc: "All Categories" })
                $scope.categorySelected = $scope.categories[0];
                $scope.freshPage = false;
            }
        }

        function filterData(filterText) {
            $scope.filteredData = $scope.data.products;
            //$scope.filteredCount = $scope.filteredCustomers.length;
        }

        //===========================================================

        function loadDataTrending() {
            //$scope.isBusy = true;

            productService.getTrendingProducts()
                .then(function () {
                    //success
                    angular.copy($scope.data.trendingProducts, $scope.trendingProducts);
                },
                function () {
                    logInfo.error("Unable to trending...");
                })
                .then(function () {
                    //$scope.isBusy = false;
                });
        }
    }]);
