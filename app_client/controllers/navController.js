angular.module('studentTracker')
	.controller('navController', function($scope, authentication){
		$scope.query = "";
		
		$scope.search = function(query) {
			console.log(query);
		};

		$scope.loginStatus = authentication.isLoggedIn();

		$scope.doLogout = function(){
			authentication.logout();
			$scope.loginStatus = false;
		}
	});