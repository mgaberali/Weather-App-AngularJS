var cityModule = angular.module("noteModule", []);

cityModule.controller("notesController", [
		'$scope',
		'$http',
		'$rootScope',
		'$location',
		'localStorageService',
		'$route',
		function($scope, $http, $rootScope, $location, localStorageService, $route) {

			// check if user is logged
			if (!localStorageService.get("logged"))
				$location.path("/login");

			// get user data from local storage
			$scope.userName = localStorageService.get("userName");
			$scope.userRole = localStorageService.get("userRole");

			// form request
			
			getNotesRequest = {
				"userEmail" : localStorageService.get("userEmail")	
			};
			
			// get all notes
			$http.post($rootScope.weatherWebServicesUrl + "/api/notes", getNotesRequest, {headers: {"Authorization" : "Basic " + localStorageService.get("auth")}}).then(
					function(response) {
						$scope.notes = response.data.notesList;
					}, function(reason) {
					}, function(value) {
					});

			$scope.logout = function() {

				localStorageService.clearAll();
				$location.path("/login");
			};

		} ]);
