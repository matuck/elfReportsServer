'use strict';

angular.module('core').controller('HomeController', ['$scope', '$location', '$http', 'Authentication',
	function($scope, $location, $http, Authentication) {
		// This provides Authentication context.
		$scope.authentication = Authentication;

		$scope.home = function() {
			var user = $scope.authentication.user;
			if (user !== '' &&  user !== undefined) {
				$location.path('/children');
			}
		};

		$scope.sendmessage = function() {
			$scope.success = $scope.error = null;

			$http.post('/sendmessage', $scope.data).success(function(response) {
				// Show user success message and clear form
				$scope.message = null;
				$scope.success = response.message;

			}).error(function(response) {
				// Show user error message and clear form
				$scope.message = null;
				$scope.error = response.message;
			});
		};
	}
]);
