'use strict';
oMartApp.controller('indexController', ['$scope', '$location', 'authService',
  function ($scope, $location, authService) {

    $scope.logOut = function () {
        authService.logOut();
        $location.path('/home');
    }

    var width = $(window).width(), height = $(window).height();

    if (width <= 844) {
        //alert(width);
        $('.nav a').on('click', function () {
            $(".navbar-toggle").click() //bootstrap 3.x
        });
    } 

    $scope.authentication = authService.authentication;
    
}]);