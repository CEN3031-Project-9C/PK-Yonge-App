'use strict';

// Configuring the Articles module
angular.module('instructions').run(['Menus',
  function (Menus) {

   // Add the information dropdown item
    Menus.addMenuItem('topbar', {
      title: 'Instructions for the Practice EOC',
      state: 'instructionsDropdown',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list items
    Menus.addSubMenuItem('topbar', 'instructionsDropdown', {
      title: 'Instructions',
      state: 'instructions'
    });
    Menus.addSubMenuItem('topbar', 'instructionsDropdown', {
      title: 'Accessing the Test',
      state: 'access'
    });
    Menus.addSubMenuItem('topbar', 'instructionsDropdown', {
      title: 'Signing In',
      state: 'signIn'
    });
    Menus.addSubMenuItem('topbar', 'instructionsDropdown', {
      title: 'Test Features',
      state: 'features'
    });
    Menus.addSubMenuItem('topbar', 'instructionsDropdown', {
      title: 'Question Types',
      state: 'questions'
    });
   
  }
]);
