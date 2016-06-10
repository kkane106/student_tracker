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
                .then(function(data){
                }, function(err){
                  if (err.status == 401) {
                      $location.path('/login').search({
                        error : 'Please login to use the site.'
                      });
                  }
                });
                
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