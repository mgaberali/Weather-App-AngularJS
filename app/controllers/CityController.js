var cityModule = angular.module("cityModule", []);

cityModule.controller("cityController", [
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

			// get all cities
			$http.get($rootScope.weatherWebServicesUrl + "/api/cities", {headers: {"Authorization" : "Basic " + localStorageService.get("auth")}}).then(
					function(response) {
						$scope.cities = response.data.cities;
					}, function(reason) {
					}, function(value) {
					});

			// add city method
			$scope.addCity = function() {
				city = {
					cityId : 0,
					cityName : $scope.cityName
				};

				$http.post($rootScope.weatherWebServicesUrl + "/api/cities",
						city, {headers: {"Authorization" : "Basic " + localStorageService.get("auth")}}).then(function() {
					$route.reload();
				});
			};

			$scope.logout = function() {

				localStorageService.clearAll();
				$location.path("/login");
			};

		} ]);
