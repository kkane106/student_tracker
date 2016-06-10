angular.module('studentTracker')
  .controller('searchController', function($scope, studentData){
    var vm = this;

    var _selected;

    $scope.selected = undefined;
    
    $scope.students = [];
    // ["Ms. Dan Armstrong", "Randy Ziemann", "Antonina Toy", "Keegan Bernier", "Cole Ledner", "Mr. Kaelyn Runte", "Dario Hodkiewicz PhD", "Toy Kuphal", "Noemie Fadel", "Pietro Eichmann Sr.", "Rebeka Padberg", "Daisha Oberbrunner PhD", "Claudie Emard V", "Trevor Heidenreich", "Mr. Jamey Rath", "Sheila Weimann", "Daphne Bartoletti", "Jackeline Pollich", "Kari Fritsch", "Ronaldo Klocko"]

    $scope.onSelect = function($item, $model, $label){
      // $item : full obj // $model : full obj // $label : just name
      // $http
    }

    $scope.getStudents = function(val) {
      return studentData.getStudentSearchDict(val)
      .then(function(res){
        console.log(res);
        return res;
      });
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