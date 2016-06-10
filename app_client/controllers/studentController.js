angular.module('studentTracker')
  .controller('studentController', function($scope,studentData, $location){

    var vm = this;

    vm.dataError = ""

    vm.students= [];

    studentData.getStudentsForTable()
      .then(function(data){
        console.log(data);
        vm.students = data.data;
      }, function(err){
        if (err.status == 401) {
            $location.path('/login').search({
              error : 'Please login to use the site.'
            });
        }
        if (err.status == 404) {
          console.error("No students found");
        }
      });

      vm.styleHasPaid = function(bool) {
        if (bool) {
          return "background-color:#a1e0a9;"
        }
      }

      vm.checkDate = function(date) {
        return (date) ? true : false;
      }
  });