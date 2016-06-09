angular.module('studentTracker')
  .controller('loginController', function($scope, $location, authentication){
    var vm = this;
    
    vm.pageHeader = "Login";
    vm.message = "Hello Login";
    vm.welcome = "Enter your credentials...";
    vm.accessError = $location.search().error;

    vm.credentials = {
      _id : "",
      password : ""
    };

    vm.returnPage = $location.search().page || '/';

    vm.onSubmit = function() {
      vm.formError = "";
      if(!vm.credentials._id || !vm.credentials.password) {
        vm.formError = "All fields required, please try again";
        return false;
      } else {
        vm.doLogin();
      }
    }
    
    vm.doLogin = function() {
      vm.formError = "";
      authentication
        .login(vm.credentials)
        .error(function(err){
          vm.formError = err;
        })
        .then(function(){
          $location.search('page', null);
          $location.path(vm.returnPage);
        });
    };

  });