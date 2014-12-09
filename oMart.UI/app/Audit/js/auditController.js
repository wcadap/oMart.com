
oMartApp.controller('auditController',
    ['$scope', 'auditService', '$location', 'logInfo',
    function auditController($scope, auditService, $location, logInfo) {
        $scope.data = auditService;
        $scope.isBusy = false;

        $scope.audit = {};

        $scope.currentPage = 1;
        $scope.searchTxt = "";
        $scope.searchKey = "";
        $scope.orderByField = "date";
        $scope.moduleId = 0;
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
                case 'date':
                    $scope.reverseSort = true;
                    break;
                case 'module': 
                    $scope.reverseSort = false;
                    break; 
                
                case 'description':
                    $scope.reverseSort = false;
                    break;
                default : 
                    $scope.reverseSort = true;
                    break;
            };
            loadData();
        };


        loadData();

        //internal

        var goSearch = function () {
            $scope.searchKey = $("#searchTxt").val();
            $scope.sortOrder = "";
            //if ($scope.searchKey == "") return;
            $scope.orderByField = "date";
            loadData();
        }

        function filterData(filterText) {
            $scope.filteredData = $scope.data.audits;
        }

        function loadData() {
            $scope.isBusy = true;
            auditService.getAudits($scope.currentPage - 1, $scope.moduleId, $scope.orderByField, $scope.searchKey)
                .then(function () {
                    //success
                    //$scope.isLoaded = true;
                    $scope.pageSize = 15;
                    $scope.totalRecords = auditService.getTotalRecords();

                    filterData('');
                    
                    //logInfo.info("Successfully loaded Audit.");
                },
                function () {
                    logInfo.error("Unable to load Audit.");
                })
                .then(function () {
                    $scope.isBusy = false;
                });
        }
}]);


