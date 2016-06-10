angular.module('studentTracker')
  .controller('searchController', function($scope, studentData){
    var vm = this;

    var _selected;

    $scope.selected = undefined;
    
    $scope.students = [];

    $scope.onSelect = function($item, $model, $label){
      // $item : full obj // $model : full obj // $label : just name
      // $http
    }

    $scope.getStudents = function(val) {
      return studentData.getStudentSearchDict(val);
    };

    $scope.ngModelOptionsSelected = function(value) {
      if (arguments.length) {
        _selected = value;
      } else {
        return _selected;
      }
    };

    $scope.modelOptions = {
      debounce: {
        default: 500,
        blur: 250
      },
      getterSetter: true
    };
  });