angular.module('studentTracker')
	.controller('homeController', function($scope, authentication){
		var vm = this;
		
		vm.pageHeader = "Student Tracker";
		vm.message = "Hello Angular";
		vm.welcome = "Welcome Home...";
	});