angular.module('studentTracker')
  .controller('searchController', function($scope, studentData){
    var vm = this;
    
    vm.dict = studentData.getStudentSearchDict();

    vm.matchSearchInput = [];

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