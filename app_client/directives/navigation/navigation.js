angular.module('studentTracker')
	.directive('navigation', function(){
		return {
			restrict : 'EA',
			scope : { // define dynamic content here
				// content : '=content'
			},
			templateUrl : '/ng/directives/navigation/navigation.template.html'
		};
	});