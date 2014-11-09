'use strict';

// Children controller
angular.module('children').controller('ChildrenController', ['$scope', '$stateParams', '$location', 'Authentication', 'Children', 'Item',
	function($scope, $stateParams, $location, Authentication, Children, Item) {
		$scope.authentication = Authentication;

		// Create new Child
		$scope.create = function() {
			// Create new Child object
			var child = new Children ({
				name: this.name
			});

			// Redirect after save
			child.$save(function(response) {
				$location.path('children/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Child
		$scope.remove = function( child ) {
			if ( child ) { child.$remove();

				for (var i in $scope.children ) {
					if ($scope.children [i] === child ) {
						$scope.children.splice(i, 1);
					}
				}
			} else {
				$scope.child.$remove(function() {
					$location.path('children');
				});
			}
		};

		// Update existing Child
		$scope.update = function() {
			var child = $scope.child ;

			child.$update(function() {
				$location.path('children/' + child._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Children
		$scope.find = function() {
			$scope.children = Children.query();
		};

		// Find existing Child
		$scope.findOne = function() {
			$scope.child = Children.get({ 
				childId: $stateParams.childId
			});
		};

		$scope.additem = function() {
			var child = $scope.child ;
			// Create new Item object
			var item = new Item ({
				name: this.item,
				child: child._id
			});

			// Redirect after save
			item.$save(function(response) {
				//load the child back into the scope.
				$scope.child = response;
				// Clear form fields
				$scope.item = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.removeitem = function(item) {
			var item2 = new Item(item);

			item2.$remove(function(response) {
				$scope.child = response;
			});
		};
	}
]);
