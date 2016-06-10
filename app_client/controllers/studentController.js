angular.module('studentTracker')
  .controller('studentController', function($scope,studentData, $location){

    var vm = this;

    vm.dataError = ""

    vm.students= [];

    studentData.getStudents()
      .then(function(data){
        console.log(data);
        vm.students = data.data;
      }, function(err){
        if (err.status == 401) {
            $location.path('/login').search({
              error : 'Please login to use the site.'
            });
        }
      });
  });