angular.module('studentTracker')
	.directive('userNav', function(){
		return {
			restrict : 'EA',
			templateUrl : '/ng/directives/userNav/userNav.template.html',
			controller : 'navController as navvm'
		}
	})