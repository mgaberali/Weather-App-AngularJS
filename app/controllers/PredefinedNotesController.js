var cityModule = angular.module("predefinedNotesModule", []);

cityModule.controller("PredefinedNotesController", [
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

			// get predefined notes
			$http.get($rootScope.weatherWebServicesUrl + "/api/predefinedNotes", {headers: {"Authorization" : "Basic " + localStorageService.get("auth")}}).then(
					function(response) {
						$scope.predefinedNotes = response.data;
					}, function(reason) {
					}, function(value) {
					});

			// set predefined notes
			$scope.setPreNotes = function() {
				
				$http.post($rootScope.weatherWebServicesUrl + "/api/predefinedNotes",
						$scope.predefinedNotes, {headers: {"Authorization" : "Basic " + localStorageService.get("auth")}}).then(function() {
					$route.reload();
				});
			};
			
			// logout
			$scope.logout = function() {

				localStorageService.clearAll();
				$location.path("/login");
			};

		} ]);
