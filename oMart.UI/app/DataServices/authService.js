oMartApp.factory('authService', ['$http', '$q',
function ($http, $q) {
    
    var accessToken = "";
    var _authentication = {
        isAuth: false,
        userName: "",
        useRefreshTokens: false,
        accessToken :""
    }

    var _signUp = function (_newUser) {
        var deferred = $q.defer();

        $http.post("/api/Account/Register", _newUser)
         .then(function (result) {
             // success
             _isAunthenticated = true;
             //_categories.splice(0, 0, newlyCreatedCategory);
             deferred.resolve(_newUser);
         },
         function (error) {
             // error
             deferred.reject(error.status);
         });

        return deferred.promise;
    };

    var _logIn = function (_user) {
        var deferred = $q.defer();
        var data = "grant_type=password&username=" + _user.userName + "&password=" + _user.password;

        $http.post("/token", data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
         .then(function (response) {
             // success
             _authentication.isAuth = true;
             _authentication.userName = _user.userName;
             _authentication.useRefreshTokens = true;
             _authentication.accessToken = response.data.access_token;
             
             deferred.resolve();
         },
         function (error) {
             // error
             deferred.reject(error.status);
         });

        return deferred.promise;
    };

    var _logOut = function () {

        //_authentication.isAuth = false;
        //_authentication.userName = "";
        //_authentication.useRefreshTokens = false;
        //return;

        var deferred = $q.defer();

        var token = _authentication.accessToken;

        $http.post("/api/Account/Logout", { headers: { 'Authorization': 'Bearer ' + token } })
        .then(function (response) {
            // success
            _authentication.isAuth = false;
            _authentication.userName = "";
            _authentication.useRefreshTokens = false;

            deferred.resolve();
        },
         function (error) {
             // error
             deferred.reject(error.status);
         });

        return deferred.promise;
    };

    //Expose methods and fields through revealing pattern
    return {
        signUp: _signUp,
        logIn: _logIn,
        logOut: _logOut,
        authentication: _authentication
    }

}]);