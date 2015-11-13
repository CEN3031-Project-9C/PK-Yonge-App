'use strict';

// Configuring the choose-test module
angular.module('choose-test').run(['Menus',
  // Adds menu item for this page
  function (Menus) {
    // Set top bar menu items
    Menus.addMenuItem('topbar', {
      title: 'Choose Test',
      state: 'choose-test'
    });
  }
]);
