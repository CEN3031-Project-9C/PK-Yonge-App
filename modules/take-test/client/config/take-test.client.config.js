'use strict';

// Configuring the take-test module
angular.module('take-test').run(['Menus',
  // Adds menu item for this page
  function (Menus) {
    // Set top bar menu items
    Menus.addMenuItem('topbar', {
      title: 'Take Test',
      state: 'take-test'
    });
  }
]);
