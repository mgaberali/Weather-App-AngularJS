var app = angular.module(
		"app",
		[ 'ngRoute', 'cityModule', 'homeModule', 'userModule', 'noteModule', 'predefinedNotesModule',
				'LocalStorageModule', 'base64' ]).run(function($rootScope) {
	$rootScope.weatherWebServicesUrl = "http://localhost:8090";
});

app.config([ '$routeProvider' , 'localStorageServiceProvider',
		function($routeProvider, localStorageServiceProvider) {
	
			// config routes
			$routeProvider.when('/login', {
				templateUrl : 'views/login.html',
				controller : 'userController'
			}).when('/register', {
				templateUrl : 'views/signup.html',
				controller : 'userController'
			}).when('/home', {
				templateUrl : 'views/home.html',
				controller : 'homeController'
			}).when('/cities', {
				templateUrl : 'views/cities.html',
				controller : 'cityController',
			}).when('/notes', {
				templateUrl : 'views/notes.html',
				controller : 'notesController',
			}).when('/predefinedNotes', {
				templateUrl : 'views/predefined.html',
				controller : 'PredefinedNotesController',
			}).otherwise({

			});

			// config local storage
			localStorageServiceProvider.setPrefix('weatherapp');
			localStorageServiceProvider.setStorageType('sessionStorage');
			

		} ]);

