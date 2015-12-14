'use strict';
// DRAGGING CAPABILITIES FOR THE NOTEPAD AND FOR DRAG AND DROP QUESTION TYPES
// SITE LOCATION: http://jsfiddle.net/mrajcok/5Mzda/
// CREATOR: 	  Arun P Johny
// CONTACT:       http://stackoverflow.com/users/114251/arun-p-johny
// NOTE: COULD NOT GET THIS FEATURE TO WORK
// RECOMMEND SEARCHING FOR angular drag and drop directives githubs

angular.module('test_portal')
	.directive('draggable', function () {
	return {
		restrict: 'A',
		link: function (scope, element, attrs) {
			element.draggable({
				cursor: "move",
				stop: function (event, ui) {
					scope[attrs.xpos] = ui.position.left;
          scope[attrs.ypos] = ui.position.top;
          scope.$apply();
				}
			});
		}
	};
});