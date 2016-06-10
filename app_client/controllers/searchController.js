angular.module('studentTracker')
  .controller('searchController', function($scope, studentData){
    var vm = this;

    var _selected;

    $scope.selected = undefined;
    
    $scope.students = [];
    // ["Ms. Dan Armstrong", "Randy Ziemann", "Antonina Toy", "Keegan Bernier", "Cole Ledner", "Mr. Kaelyn Runte", "Dario Hodkiewicz PhD", "Toy Kuphal", "Noemie Fadel", "Pietro Eichmann Sr.", "Rebeka Padberg", "Daisha Oberbrunner PhD", "Claudie Emard V", "Trevor Heidenreich", "Mr. Jamey Rath", "Sheila Weimann", "Daphne Bartoletti", "Jackeline Pollich", "Kari Fritsch", "Ronaldo Klocko"]

    $scope.test = function(){
      console.log(students);
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

    console.log(vm.students);

// TEST that find function works : it does
    // dict.then(function(result){
    //   vm.matchSearchInput = find(dict, "Zie");
    //   console.log(vm.matchSearchInput);
    // })
// TODO: Implement the find function below to:
  // take input from the search bar in the navigation
  // return a subset of matching student records (limit ~10)
  // with predictive search (on key press)
  // display predictive search results in a select drop down
  // when drop down item is clicked, show student profile
  // information

    vm.find = function(dictionary, search) {
      var matched = [];
      dictionary = dictionary.$$state.value;
      for (var i=0 ; i < dictionary.length ; i++) {
        if (dictionary[i].name.indexOf(search) > -1) {
          matched.push(dictionary[i]);
        }
      }
      return matched;
    }
  });