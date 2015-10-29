'use strict';

// Configuring the Articles module
angular.module('instructions').run(['Menus',
  function (Menus) {

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
