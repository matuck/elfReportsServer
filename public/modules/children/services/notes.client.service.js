'use strict';

//Notes service used to communicate Notes REST endpoints
angular.module('children').factory('Notes', ['$resource',
	function($resource) {
		return $resource('children/:childId/notes/:note', { childId: '@child', note: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
