angular.module('studentTracker')
  .controller('studentController', function(studentData, $location){

    var vm = this;

    vm.dataError = ""

    vm.students = studentData.getStudents();

    if (vm.students.status < 400) {

    } else {
      if (vm.students.status == 401 && 
          vm.students.message == "No token provided") {
        $location.path('/login');
      }
    }
  });