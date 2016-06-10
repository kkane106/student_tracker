angular.module('studentTracker')
  .service('studentData', function($http, $resource, $location, authentication){

    var getStudentsForTable = function(){
      return  $http({
                method : 'GET',
                url : '/api/students/active',
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
      getStudentsForTable : getStudentsForTable,
      getStudentSearchDict : getStudentSearchDict
    }
  });