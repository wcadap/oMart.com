var auditService = function ($http, $q, $timeout) {
    var _audits = [];
    var _totalRecords = 0;
    
    var _getAudits = function (pageIndex, moduleId, orderBy, searchKey) {
        var deferred = $q.defer();
        var apiQuery = "api/audit/GetAudits/" + pageIndex + "/" + moduleId + "/" +   orderBy  + "/" +  searchKey;

        $http.get(apiQuery)
          .then(function (result) {
              // Successful
              angular.copy(result.data.audits, _audits);
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


    var _getTotalRecords = function () {
        return _totalRecords;
    };
    

    //Expose methods and fields through revealing pattern
    return {
        audits : _audits,
        getAudits: _getAudits,
        getTotalRecords: _getTotalRecords,
    }
};

oMartApp.factory('auditService', auditService);
auditService.$inject = ['$http', '$q', '$timeout'];
