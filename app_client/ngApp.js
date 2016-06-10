angular.module('studentTracker', 
	['ngRoute','ngResource','ui.bootstrap']);

// configure route provider for SPA
function config($routeProvider, $locationProvider) {
	$routeProvider
		.when('/', {
			templateUrl : 'ng/views/home/home.view.html',
			controller : 'homeController',
			controllerAs: 'vm',
			title : "Home"
		})
		.when('/login', {
			templateUrl : 'ng/views/login/login.view.html',
			controller : 'loginController',
			controllerAs : 'vm',
			title : "Login"
		})
		.when('/students', {
			templateUrl : 'ng/views/students/index.view.html',
			controller : 'studentController',
			controllerAs : 'stuvm'
		})
		.otherwise({redirectTo: '/'});

		// configure application to use pretty URLs (i.e. not #)
		$locationProvider.html5Mode({
			enabled : true
		}); 
	}

// add config to module
angular.module('studentTracker')
	.config([
			'$routeProvider', 
			'$locationProvider', 
			'$resourceProvider', 
			config
		]);