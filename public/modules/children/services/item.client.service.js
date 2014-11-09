'use strict';

//Children service used to communicate Children REST endpoints
angular.module('children').factory('Item', ['$resource',
	function($resource) {
		return $resource('children/:childId/list/:item', { childId: '@child', item: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
