'use strict';

angular.module('users').controller('AuthenticationController', ['$scope', '$cookies', '$http', '$location', 'Authentication',
	function($scope, $cookies, $http, $location, Authentication) {
		$scope.authentication = Authentication;
    if($location.$$path === '/elfsignin'  && ($scope.authentication.user === '' || $scope.authentication.user === undefined ) ) {
      $location.path('/');
    }
		$scope.signup = function() {
			$http.post('/auth/signup', $scope.credentials).success(function(response) {
				// If successful we assign the response to the global user model
				$scope.authentication.user = response;

				// And redirect to the index page
				$location.path('/');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};

		$scope.signin = function() {
			$http.post('/auth/signin', $scope.credentials).success(function(response) {
				// If successful we assign the response to the global user model
				$scope.authentication.user = response;

				// And redirect to the index page
				$location.path('/');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};

    $scope.elfsignin = function() {
      $http.post('/auth/elfsignin', $scope.credentials).success(function(response) {
        // If successful we assign the response to the global user model
        //$scope.authentication.user = response;

        // And redirect to the index page
        $cookies.elfsignintime = response.elfsignintime;
        $location.path('/');
      }).error(function(response) {
        $scope.error = response.message;
      });
    };

    $scope.elfsignout = function() {
      $http.get('/auth/elfsignout').success(function(response) {
        delete $cookies.elfsignintime;
        $location.path('/');
      }).error(function(response) {
        console.log('failure');
      });

    };
	}
]);