var homeModule = angular.module("homeModule", []);
homeModule.controller("homeController", [
		'$scope',
		'$http',
		'$rootScope',
		'$location',
		'localStorageService',
		function($scope, $http, $rootScope, $location, localStorageService) {
			
			// check if user is logged
			if(!localStorageService.get("logged"))
				$location.path("/login");
			
			// get user data from local storage
			$scope.userName = localStorageService.get("userName");
			$scope.userRole = localStorageService.get("userRole");
						
			$scope.checkWeather = function() {
				checkWeatherRequest = {
					"cityName" : $scope.selectedCity
				};

				$http.post($rootScope.weatherWebServicesUrl + "/api/weather",
						checkWeatherRequest, {headers: {"Authorization" : "Basic " + localStorageService.get("auth")}}).then(function(response) {

					$scope.city = response.data.city;
					$scope.temp = response.data.temperature;
					$scope.viewTemp = true;
					$scope.isPredefined = response.data.predefinedNote;
					$scope.note = response.data.note;
					
				}, function(reason) {
				}, function(value) {

				});

			};
			
			$scope.addNote = function() {
				
				addNoteRequest = {
					"note" : $scope.note,
					"city" : $scope.city,
					"temp" : $scope.temp,
					"adminUserEmail" : localStorageService.get("userEmail")
				};
				
				$http.post($rootScope.weatherWebServicesUrl + "/api/addNote", addNoteRequest, {headers: {"Authorization" : "Basic " + localStorageService.get("auth")}}).then(function(value) {
					
					$scope.isPredefined = false;
					
				}, function(reason) {
					
				}, function(value) {
					
				})
				
			};
			
			$scope.logout = function() {
				
				localStorageService.clearAll();
				$location.path("/login");
			};

		} ]);