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
                url : '/search/students/'+val,
                headers : {
                  'x-access-token' : authentication.getToken()
                }
              })
                .then(function(data){
                  // console.log(data.data);
                  // return data.data;
                  // var students = data.data.map(function(x){
                    // return x.name;
                  // })
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