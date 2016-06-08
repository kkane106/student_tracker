angular.module('studentTracker')
	.service('authentication', function($window, $http){
		var saveToken = function(token){
			$window.localStorage['student-token'] = token;
		};

		var getToken = function() {
			return $window.localStorage['student-token'];
		};

		var login = function(user) {
			return $http.post('/login', user)
							.success(function(data){
								saveToken(data.token);
							});
		};

		var logout = function() {
			$window.localStorage.removeItem('student-token');
		};

		var isLoggedIn = function() {
			var token = getToken();

			if (token) {
				var payload = JSON.parse($window.atob(token.split('.')[1]));

				return payload.exp > Date.now() / 1000;

			} else {
				return false;
			}
		};

		var currentUser = function() {
			if (isLoggedIn()) {
				var token = getToken();
				var payload = JSON.parse($window.atob(token.split('.')[1]));

				return {
					email : payload.email,
					name : payload.name
				};
			}
		};

		return {
			login : login,
			logout : logout,
			isLoggedIn : isLoggedIn
		}
	});