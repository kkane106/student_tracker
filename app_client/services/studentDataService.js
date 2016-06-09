angular.module('studentTracker')
  .service('studentData', function($http, $resource, $location, authentication){
    // var students = $resource('/students');

    var getStudents = function(){
      return  $http({
                method : 'GET',
                url : '/api/students',
                headers : {
                  'x-access-token' : authentication.getToken()
                }
              })
                .then(function(data){
                  console.log(data);
                }, function(err){
                  if (err.status == 401) {
                      $location.path('/login').search({
                        error : 'Please login to use the site.'
                      });
                  }
                });
                
    };

    var getStudentSearchDict = function(){
      return $http({
                method : 'GET',
                url : '/search/students',
                headers : {
                  'x-access-token' : authentication.getToken()
                }
              })
                .then(function(data){
                  // console.log(data);
                  return data.data;
                }, function(err){
                  // console.error(err);
                });
    };

    return {
      getStudents : getStudents,
      getStudentSearchDict : getStudentSearchDict
    }
  });