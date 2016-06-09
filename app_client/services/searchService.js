angular.module('studentTracker')
  .service('search', function(studentData){
    var students = studentData.getStudentSearchDict();
  })