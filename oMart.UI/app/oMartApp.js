var oMartApp = angular.module('oMartApp', ['ngRoute', 'ngAnimate', 'ui.bootstrap',
                              'angularFileUpload', 'ui.imagedrop', 'imageResize', 'TimeAgoModule',
                              'ui.router.state', 'ncy-angular-breadcrumb', "omart.passwordMatch"
                              ]);


oMartApp.config(['$breadcrumbProvider', function ($breadcrumbProvider) {
      $breadcrumbProvider.setOptions({
          prefixStateName: 'home'
          //template: 'bootstrap2'
      });
}])

oMartApp.config(['$stateProvider','$urlRouterProvider',function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
          url: '/home',
          templateUrl: "app/Home/html/home.html",
          controller: 'homeController',
          ncyBreadcrumb: {
              label: 'Home'
          }
      })
      .state('about', {
          url: '/about',
          templateUrl: "app/Home/html/about.html",
          ncyBreadcrumb: {
              label: 'About'
          }
      })

        //.state('about', {
        //    url: '/about',
        //    templateUrl: "app/test/cropimg.html",
        //    controller: 'ctrl',
        //    ncyBreadcrumb: {
        //        label: 'image Crop'
        //    }
        //})

    .state('myOmart', {
        url: '/myomart',
        templateUrl: "app/Products/Html/MyoMart.html",
        controller: "myOmartController",
        ncyBreadcrumb: {
            label: 'My oMart'
        }
    })

    .state('audit', {
        url: '/audit',
        templateUrl: "app/Audit/Html/Audit.html",
        controller: "auditController",
        ncyBreadcrumb: {
            label: 'Audit'
        }
    })

    .state('myOmart.newProduct', {
        url: '/newProduct',
        views: {
            "@": {
                templateUrl: "app/Products/Html/ProductReg.html",
                controller: "newProduct"
            }
        },
        ncyBreadcrumb: {
            label: 'New Product'
        }
    })
    .state('category', {
        url: '/category',
        templateUrl: "app/Category/html/Category.html",
        controller: "categoryController",
        ncyBreadcrumb: {
            label: 'Category'
        }
    })
    .state('category.newCategory', {
        url: '/newcategory',
        views: {
            "@": {
                templateUrl: "/app/Category/html/NewCategory.html",
                controller: "newCategoryController",
            }
        },
        ncyBreadcrumb: {
            label: 'New Category'
        }
    })

    .state('category.edit', {
        url: '/{id}?from',
        views: {
            "@": {
                templateUrl: "app/Category/html/NewCategory.html",
                controller: "editCategoryController"
            }
        },
        ncyBreadcrumb: {
            label: 'Category | {{category.categoryDesc}}',
            parent: function ($scope) {
                return $scope.from || 'category';
            }
        }
    })

    .state('signUp', {
        url: '/signUp',
        templateUrl: "app/Users/html/SignUp.html",
        controller: "signUp",
        ncyBreadcrumb: {
            label: 'Sign Up'
        }
    })

    .state('logIn', {
        url: '/logIn',
        templateUrl: "app/Users/html/LogIn.html",
        controller: "logIn",
        ncyBreadcrumb: {
            label: 'Log In'
        }
    })

    .state('omartArch', {
        url: '/omartArchitecture',
        templateUrl: "app/Home/html/omartArchitecture.html",
        ncyBreadcrumb: {
            label: 'oMart Architecture'
        }
    })
    
    $urlRouterProvider.otherwise('/home');

}]);
  
oMartApp.run(['$rootScope','$state','$breadcrumb', function ($rootScope, $state, $breadcrumb) {
      $rootScope.isActive = function (stateName) {
          return $state.includes(stateName);
      }

      $rootScope.getLastStepLabel = function () {
          return 'Angular-Breadcrumb';
      }
}]);

oMartApp.run(["pageSwitch", function (pageSwitch) {
    pageSwitch.registerListener();
}]);


oMartApp.factory('pageSwitch', ["$rootScope", "$window",
function ($rootScope, $window) {
    var registerListener = _.once(function () {
        $rootScope.$on("$locationChangeSuccess", scrollToTop);
    });

    return {
        registerListener: registerListener
    };

    function scrollToTop() {
       // $anchorScroll();
        $window.scrollTo(0, 0);
    }

}]);




//========================================================
//Original

//oMartApp.config(
//    ['$routeProvider', '$locationProvider',
//    function ($routeProvider, $locationProvider) {
    
//    $routeProvider.when('/', {
//        templateUrl: "/app/Home/html/home.html",
//        controller: 'homeController'
//    }),

//    $routeProvider.when('/home', {
//        templateUrl: "/app/Home/html/home.html",
//        controller: 'homeController'
//    }),

//    $routeProvider.when('/home/contact', {
//        templateUrl: '/Home/contact'
//    }),

//    $routeProvider.when('/profile/:id', {
//        templateUrl: "app/Registration/partial/_regForm.html",
//        controller: "regContoller"
//    }),

//    $routeProvider.when('/about', {
//        templateUrl: "app/Home/html/about.html"
        
//    }),



//    $routeProvider.otherwise({
//        redirectTo: '/'
//    });

//    //Categories

//    $routeProvider.when('/category', {
//        templateUrl: "app/Category/html/Category.html",
//        controller: "categoryController"
//    });

//    $routeProvider.when('/newCategory', {
//        templateUrl: "app/Category/html/NewCategory.html",
//        controller: "newCategoryController"
//    });

//    $routeProvider.when('/category/:id', {
//        templateUrl: "app/Category/html/NewCategory.html",
//        controller: "editCategoryController"
//    });

//    //myOmart
    
//    $routeProvider.when('/myomart', {
//        templateUrl: "app/Products/Html/MyoMart.html",
//        controller: "myOmartController"
//    })

//    $routeProvider.when('/myomart/newProduct', {
//        templateUrl: "app/Products/Html/ProductReg.html",
//        controller: "newProduct"
//    })

    
    
//}]);

var aboutController = function ($scope) {
    $scope.pageClass = 'page-about';
}

oMartApp.controller('aboutController', aboutController);
aboutController.$inject = ['$scope'];

//oMartApp.controller('aboutController', function ($scope) {
//    $scope.pageClass = 'page-about';
//});



