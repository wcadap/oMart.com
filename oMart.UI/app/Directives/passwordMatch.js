angular.module('omart.passwordMatch', [])
	.directive('pwMatch', [function () {
	    return {
	        require: 'ngModel',
	        link: function (scope, elem, attrs, ctrl) {
	            var firstPassword = '#' + attrs.pwMatch;
	            elem.add(firstPassword).on('keyup', function () {
	                scope.$apply(function () {
	                    var v = elem.val() === $(firstPassword).val();
	                    ctrl.$setValidity('pwmatch', v);
	                });
	            });
	        }
	    }
	}]);