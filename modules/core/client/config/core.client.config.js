'use strict';

// Configuring the Articles module
angular.module('core').run(['Menus',
  function (Menus) {

    // Add the information dropdown item
    Menus.addMenuItem('topbar', {
      title: 'Information',
      state: 'information',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the information dropdown item
    Menus.addMenuItem('topbar', {
      title: 'Testing',
      state: 'testing',
      type: 'button',
      roles: ['*']
    });

    // Add the dropdown list items
    Menus.addSubMenuItem('topbar', 'information', {
      title: 'About',
      state: 'about'
    });
    Menus.addSubMenuItem('topbar', 'information', {
      title: 'Resources',
      state: 'resources'
    });
    Menus.addSubMenuItem('topbar', 'information', {
      title: 'Available Tests',
      state: 'tests'
    });
    Menus.addSubMenuItem('topbar', 'information', {
      title: 'Contact Us',
      state: 'contact'
    });

    

    // Add the dropdown create item
    Menus.addSubMenuItem('topbar', 'articles', {
      title: 'Create Articles',
      state: 'articles.create',
      roles: ['user']
    });

    // Add the dropdown list item
    /*Menus.addSubMenuItem('topbar', 'articles', {
      title: 'List Articles',
      state: 'articles.list'
    });

    // Add the dropdown create item
    Menus.addSubMenuItem('topbar', 'articles', {
      title: 'Create Articles',
      state: 'articles.create',
      roles: ['user']
    });*/
  }
]);
