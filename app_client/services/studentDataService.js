angular.module('studentTracker')
  .service('studentData', function($http, $resource, $location, authentication){

    var getStudents = function(){
      return  $http({
                method : 'GET',
                url : '/api/students',
                headers : {
                  'x-access-token' : authentication.getToken()
                }
              })                
    };

    var getStudentSearchDict = function(val){
      console.log("called function with " + val)
      return $http({
                method : 'GET',
                url : '/api/query/students/'+val,
                headers : {
                  'x-access-token' : authentication.getToken()
                }
              })
                .then(function(data){
                  return data.data;
                }, function(err){
                  // TODO: Handle Error
                });
    };

    return {
      getStudents : getStudents,
      getStudentSearchDict : getStudentSearchDict
    }
  });