'use strict';

angular.module('core').controller('HomeController', ['$scope', '$location', 'Authentication',
	function($scope, $location, Authentication) {
		// This provides Authentication context.
		$scope.authentication = Authentication;

		$scope.home = function() {
			var user = $scope.authentication.user;
			if (user !== '' &&  user !== undefined) {
				$location.path('/children');
			}
		};
	}
]);
