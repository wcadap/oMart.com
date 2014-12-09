oMartApp.controller('signUp',
    ['$scope', 'authService', '$window', 'logInfo','$location',
    function signUp($scope, authService, $window, logInfo, $location) {
        $scope.user = { userName: "", password: "", confirmPassword:"" };
        
        $scope.passPattern = /(?=.*[\d])(?=.*[A-Z])/;
        
        $scope.saveData = function () {
             $scope.$broadcast('show-errors-event');

            if ($scope.signUpForm.$invalid) return;

            $(".btn").attr("disabled", true);
            $("#submitForm").html("Saving...");

            //return;
            authService.signUp($scope.user)
            .then(function () {
                //success
                
                logInfo.success("Successfully saved data.");
                $location.path('/logIn');
                //$window.history.back();
                //$scope.category = { id: 0, categoryDesc: "" };
                //$('#categoryDesc').focus();
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

oMartApp.controller('logIn',
    ['$scope', 'authService', '$window', 'logInfo',
    function logIn($scope, authService, $window, logInfo) {
        
        $("#loginError").hide();

        $scope.logIn = function () {
            $scope.$broadcast('show-errors-event');

            if ($scope.signUpForm.$invalid) return;

            $(".btn").attr("disabled", true);
            $("#submitForm").html("Saving...");

            authService.logIn($scope.user)
            .then(function () {
                //success
                logInfo.info("Login Succcessful.");
                //$location.path('/home');
                $window.history.back();
            },
            function (error) {
                $("#loginError").show();
                //switch (error) {
                //    case 401:
                //        logInfo.error("Unauthorized Access");
                //        break;

                //    default:
                //        logInfo.error("Login Error.");
                //}
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

    }]);

