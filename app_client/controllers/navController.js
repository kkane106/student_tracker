angular.module('studentTracker')
  .controller('navController', function($scope,$location,authentication){
    var vm = this;

    vm.currentPath = $location.path();

    vm.isLoggedIn = authentication.isLoggedIn();

    $scope.$watch(authentication.isLoggedIn, function(newVal, oldVal){
    	vm.isLoggedIn = newVal;
    });

    vm.currentUser = authentication.currentUser();

    vm.logout = function(){
      authentication.logout();
      vm.isLoggedIn = false;
      $location.path('/login');
    }
  });