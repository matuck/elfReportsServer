'use strict';

// Authentication service for user variables
angular.module('users').factory('Authentication', [ '$cookies',

  function($cookies) {
    var _this = this;

    _this._data = {
      user: window.user,
      isElfSignedin: function() {
        //console.log($scope.elfsignintime)
        var expiretime = 10 * 60; //minutes time seconds
        var currtime = new Date().getTime()/1000;
        //console.log($cookies.elfsignintime);
        //console.log(parseInt($cookies.elfsignintime) + expiretime);
        if (currtime <= (parseInt($cookies.elfsignintime) + expiretime)) {
          return true;
        } else {
          return false;
        }
      }
    };

    return _this._data;
  }
]);