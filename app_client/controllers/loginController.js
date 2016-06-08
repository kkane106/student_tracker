angular.module('studentTracker')
	.controller('loginController', function($scope, authentication){
		$scope.message = 'Hello Login';
		
		$scope.credentials = {};
		
		$scope.doLogin = function(credentials) {
			authentication
				.login(credentials)
				.error(function(err){
					$scope.formError = err;
				})
				.then(function(){
					
				});
		};

	});