'use strict';

// Configuring the Chat module
angular.module('choose-test').run(['Menus',
  /**
  **  Do we need this function?
  **/
  function (Menus) {
    // Set top bar menu items
    Menus.addMenuItem('topbar', {
      title: 'Choose-Test',
      state: 'choose-test'
    });
  }
]);
