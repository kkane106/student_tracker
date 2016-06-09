angular.module('studentTracker')
	.directive('footerGeneric', function(){
		return {
			restrict: 'EA',
			templateUrl: 'ng/directives/footerGeneric/footerGeneric.template.html'
		};
	});