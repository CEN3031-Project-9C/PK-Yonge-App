'use strict';

angular.module('test_portal').filter('startFrom', function() {
    return function(input, start) {
	    if (!input || !input.length) { return; }	// prevent slice from being called on undefined (i.e. we must have an input)
        start = +start; //parse to int
        return input.slice(start);
    };
});