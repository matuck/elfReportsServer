'use strict';

// Children controller
angular.module('children').controller('ChildrenController', ['$scope', '$stateParams', '$location', 'Authentication', 'Children', 'Item', 'Notes',
	function($scope, $stateParams, $location, Authentication, Children, Item, Notes) {
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

		// Find existing note
		$scope.findNote = function() {
			$scope.note = Notes.get({
				childId: $stateParams.childId,
				note: $stateParams.noteId
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

		$scope.addnote = function () {
			var child = $scope.child;
			var note = new Notes({
				text: this.note,
				good: this.good,
				child: child._id
			});
			if (note.good === '') { note.good = false; }

			note.$save(function(response) {
				//load child back into scope
				$scope.child = response;
				//clear the form
				$scope.note = '';
				$scope.good = '';
			});
		};

		$scope.removenote = function (note) {
			var note2 = new Notes(note);
			note2.$remove(function(response) {
				$scope.child = response;
			});
		};

		$scope.updatenote = function() {
			var note = $scope.note ;

			note.$update(function() {
				$location.path('children/' + note.child);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};
	}
]);
