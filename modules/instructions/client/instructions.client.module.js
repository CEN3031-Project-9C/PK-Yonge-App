'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('instructions');
ApplicationConfiguration.registerModule('instructions.admin', ['instructions']);
ApplicationConfiguration.registerModule('instructions.admin.routes', ['ui.router']);
