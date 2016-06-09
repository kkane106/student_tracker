angular.module('studentTracker')
	.controller('homeController', function($scope){
		var vm = this;
		
		vm.pageHeader = "Student Tracker";
		vm.message = "Hello Angular";
		vm.welcome = "Welcome Home...";
	});