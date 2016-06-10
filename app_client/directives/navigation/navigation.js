angular.module('studentTracker')
	.directive('navigation', function(){
		return {
			restrict : 'EA',
			scope : {},
			templateUrl : '/ng/directives/navigation/navigation.template.html'
		};
	});