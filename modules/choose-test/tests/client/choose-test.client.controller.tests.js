'use strict';

(function () {
  // Articles Controller Spec
  describe('User_session Controller Tests', function () {
    // Initialize global variables
    var User_SessionsController,
      scope,
      $httpBackend,
      $stateParams,
      $location,
      Authentication,
      User_sessions,
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
    beforeEach(inject(function ($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_, _Authentication_, _User_sessions_) {
      // Set a new global scope
      scope = $rootScope.$new();

      // Point global variables to injected services
      $stateParams = _$stateParams_;
      $httpBackend = _$httpBackend_;
      $location = _$location_;
      Authentication = _Authentication_;
      User_sessions = _User_sessions_;

      // create mock article
      mockSession = new User_sessions({
        test_id: '525a8422f6d0f87f0e407a33',
        time: 300,
        complete: false,
        user_notepad: String[10],
        user_answer: String[10],
        review: Boolean[10]
      });

      // Mock logged in user
      Authentication.user = {
        roles: ['user']
      };

      // Initialize the Articles controller.
      User_SessionsController = $controller('User_SessionsController', {
        $scope: scope
      });
    }));

    it('$scope.find() should create an array with at least one article object fetched from XHR', inject(function (User_sessions) {
      // Create a sample articles array that includes the new article
      var sampleSessions = [mockSession];

      // Set GET response
      $httpBackend.expectGET('api/user_sessions').respond(sampleSessions);

      // Run controller functionality
      scope.find();
      $httpBackend.flush();

      // Test scope value
      expect(scope.user_sessions).toEqualData(sampleSessions);
    }));

    it('$scope.findOne() should create an array with one article object fetched from XHR using a articleId URL parameter', inject(function (Articles) {
      // Set the URL parameter
      $stateParams.user_sessionId = mockSession._id;

      // Set GET response
      $httpBackend.expectGET(/api\/user_sessions\/([0-9a-fA-F]{24})$/).respond(mockSession);

      // Run controller functionality
      scope.findOne();
      $httpBackend.flush();

      // Test scope value
      expect(scope.user_session).toEqualData(mockSession);
    }));

    describe('$scope.create()', function () {
      var sampleSessionPostData;

      beforeEach(function () {
        // Create a sample article object
        sampleSessionPostData = new User_sessions({
          test_id: '525a8422f6d0f87f0e407a33',
          time: 300,
          complete: false,
          user_notepad: String[10],
          user_answer: String[10],
          review: Boolean[10]
        });

        // Fixture mock form input values
        scope.title = 'An Article about MEAN';
        scope.content = 'MEAN rocks!';

        spyOn($location, 'path');
      });

      it('should send a POST request with the form input values and then locate to new object URL', inject(function (Articles) {
        // Set POST response
        $httpBackend.expectPOST('api/articles', sampleSessionPostData).respond(mockSession);

        // Run controller functionality
        scope.create(true);
        $httpBackend.flush();

        // Test form inputs are reset
        expect(scope.title).toEqual('');
        expect(scope.content).toEqual('');

        // Test URL redirection after the article was created
        expect($location.path.calls.mostRecent().args[0]).toBe('user_sessions/' + mockSession._id);
      }));

      it('should set scope.error if save error', function () {
        var errorMessage = 'this is an error message';
        $httpBackend.expectPOST('api/articles', sampleSessionPostData).respond(400, {
          message: errorMessage
        });

        scope.create(true);
        $httpBackend.flush();

        expect(scope.error).toBe(errorMessage);
      });
    });

    describe('$scope.update()', function () {
      beforeEach(function () {
        // Mock article in scope
        scope.user_session = mockSession;
      });

      it('should update a valid article', inject(function (Articles) {
        // Set PUT response
        $httpBackend.expectPUT(/api\/articles\/([0-9a-fA-F]{24})$/).respond();

        // Run controller functionality
        scope.update(true);
        $httpBackend.flush();

        // Test URL location to new object
        expect($location.path()).toBe('/articles/' + mockSession._id);
      }));

      it('should set scope.error to error response message', inject(function (Articles) {
        var errorMessage = 'error';
        $httpBackend.expectPUT(/api\/articles\/([0-9a-fA-F]{24})$/).respond(400, {
          message: errorMessage
        });

        scope.update(true);
        $httpBackend.flush();

        expect(scope.error).toBe(errorMessage);
      }));
    });

    describe('$scope.remove(article)', function () {
      beforeEach(function () {
        // Create new articles array and include the article
        scope.articles = [mockSession, {}];

        // Set expected DELETE response
        $httpBackend.expectDELETE(/api\/articles\/([0-9a-fA-F]{24})$/).respond(204);

        // Run controller functionality
        scope.remove(mockSession);
      });

      it('should send a DELETE request with a valid articleId and remove the article from the scope', inject(function (Articles) {
        expect(scope.user_sessions.length).toBe(1);
      }));
    });

    describe('scope.remove()', function () {
      beforeEach(function () {
        spyOn($location, 'path');
        scope.user_session = mockSession;

        $httpBackend.expectDELETE(/api\/articles\/([0-9a-fA-F]{24})$/).respond(204);

        scope.remove();
        $httpBackend.flush();
      });

      it('should redirect to articles', function () {
        expect($location.path).toHaveBeenCalledWith('articles');
      });
    });
  });
}());
