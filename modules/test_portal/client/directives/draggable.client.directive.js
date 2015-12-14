'use strict';
//dragging capabilities for notepad
// SITE LOCATION: http://jsfiddle.net/mrajcok/5Mzda/
// CREATOR: 	  Arun P Johny
// CONTACT:       http://stackoverflow.com/users/114251/arun-p-johny
 
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