var userModule = angular.module("userModule", []);
userModule.controller("userController", ['$scope', '$http', '$rootScope', '$location', 'localStorageService', '$base64',
		function($scope, $http, $rootScope, $location, localStorageService, $base64) {
			
			$scope.showSuccessMessage = false;

			/**
			 * login
			 */
			$scope.login = function() {

				if (!$scope.formValid)
					return;

				loginRequest = {
					"email" : $scope.email,
					"password" : $scope.password
				};
				
				$http.post($rootScope.weatherWebServicesUrl + "/api/login",
						loginRequest).then(function(response) {

					if (response.data.response == "USER_FOUND") {
												
						// add user data to local storage
						user = response.data.usDto;
						localStorageService.set("userName", user.userName);
						localStorageService.set("userEmail", $scope.email);
						localStorageService.set("userRole", user.role);
						localStorageService.set("userPassword", $scope.password);
						auth = $base64.encode(unescape(encodeURIComponent($scope.email + ":" + $scope.password)));
						localStorageService.set("auth", auth);
						localStorageService.set("logged", true);
						
						// go home
						$location.path("/home");
						
					} else {
						$scope.errorMessage = "Invalid email or password"
					}

				}, function(reason) {

				}, function(value) {

				});

			};

			/**
			 * signup
			 */
			$scope.signup = function() {

				
				if(!$scope.signupFormValid) return;
				 

				signupRequest = {
					"userEmail" : $scope.email,
					"userName" : $scope.name,
					"password" : $scope.password,
					"userMobile" : $scope.mobile
				};

				$http.post($rootScope.weatherWebServicesUrl + "/api/user",
						signupRequest).then(function(response) {

					if (response.data.response == "DONE") {
						$scope.showSuccessMessage = true;
						$scope.successMessage = "User has been created successfully";
						$location.path("/login");
					} else {
						$scope.errorMessage = "Email is already exists";
					}

				}, function(reason) {

				}, function(value) {

				});

			};
			
			$scope.$watch("loginForm.$valid", function(newValue) {
				$scope.formValid = newValue;
			});
			
			$scope.$watch("signupForm.$valid", function(newValue) {
				$scope.signupFormValid = newValue;
			});

		}]);