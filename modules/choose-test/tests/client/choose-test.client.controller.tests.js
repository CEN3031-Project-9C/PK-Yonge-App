'use strict';

(function () {
  // Articles Controller Spec
  describe('User_Session Controller Tests', function () {
    // Initialize global variables
    var User_SessionsController,
      scope,
      $httpBackend,
      $stateParams,
      $location,
      Authentication,
      User_Sessions,
      mockSession;

    // The $resource service augments the response object with methods for updating and deleting the resource.
    // If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
    // the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
    // When the toEqualData matcher compares two objects, it takes only object properties into
    // account and ignores methods.
    beforeEach(function () {
      jasmine.addMatchers({
        toEqualData: function (util, customEqualityTesters) {
          return {
            compare: function (actual, expected) {
              return {
                pass: angular.equals(actual, expected)
              };
            }
          };
        }
      });
    });

    // Then we can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_, _Authentication_, _User_Sessions_) {
      // Set a new global scope
      scope = $rootScope.$new();

      //Point global variables to injected services
      $stateParams = _$stateParams_;
      $httpBackend = _$httpBackend_;
      $location = _$location_;
      Authentication = _Authentication_;
      User_Sessions = _User_Sessions_;

      // create mock article
      mockSession = new User_Sessions({
        user_id: Authentication.user_id,
        test_id: '561d199f41c840c42134a825',
        time: 0,
        complete: false,
        user_notepad: String[10],
        user_answer: String[10],
        review: Boolean[10],
        correct: Boolean[10]
      });

      // Mock logged in user
      Authentication.user = {
        roles: ['user']
      };

      // Initialize the Articles controller.
      User_SessionsController = $controller('ChooseTestController', {
        $scope: scope
      });
    }));

    describe('$scope.startTest()', function () {
      var sampleSessionPostData;

      //make some mock data
      beforeEach(function () {

        var numberOfQuestions = 10;
        var userStringTemp = [];
        var userBoolTemp = [];

        for(var i = 0; i < numberOfQuestions; i++) {
         userStringTemp.push("");
         userBoolTemp.push(false);
        }

        // Create a sample article object
        sampleSessionPostData = new User_Sessions({
          user_id: Authentication.user_id,
          test_id: '561d199f41c840c42134a825',
          time: 0,
          complete: false,
          user_notepad: userStringTemp,
          user_answer: userStringTemp,
          review: userBoolTemp,
          correct: userBoolTemp
        });

        // Fixture mock form input values
        scope.user_id = Authentication.user_id;
        scope.test_id = '561d199f41c840c42134a825';
        scope.time = 0;
        scope.complete = false;
        scope.user_notepad = userStringTemp;
        scope.user_answer = userStringTemp;
        scope.review = userBoolTemp;
        scope.correct= userBoolTemp;

        spyOn($location, 'path');
      });

      it('should send a POST request and then locate to new object URL', inject(function (User_Sessions) {
          //Set POST response
        $httpBackend.expectPOST('api/user_session', sampleSessionPostData).respond(mockSession);

        // Run controller functionality
        scope.startTest('A2');
        $httpBackend.flush();

        // Test URL redirection after the user_session was created
        expect($location.path.calls.mostRecent().args[0]).toBe('take-test/view-question');
      }));

      it('should set scope.error if save error', function () {
        var errorMessage = 'this is an error message';
        $httpBackend.expectPOST('api/user_session', sampleSessionPostData).respond(400, {
          message: errorMessage
        });

        scope.startTest("A2");
        $httpBackend.flush();

        expect(scope.error).toBe(errorMessage);
      });
    });
  });
}());
