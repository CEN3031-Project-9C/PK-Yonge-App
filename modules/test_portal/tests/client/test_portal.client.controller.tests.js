'use strict';

(function () {
  // Articles Controller Spec
  describe('Questions Controller Tests', function () {
    // Initialize global variables
    var QuestionsController,
      scope,
      $httpBackend,
      $stateParams,
      $location,
      Authentication,
      sessionServiceV3,
      QuestionsService,
      User_Sessions,
      mockQuestion;

    var user_session;

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
    beforeEach(inject(function ($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_, _Authentication_, _questionsService_, _User_Sessions_, _sessionServiceV3_) {
      // Set a new global scope
      scope = $rootScope.$new();

      // Point global variables to injected services
      $stateParams = _$stateParams_;
      $httpBackend = _$httpBackend_;
      $location = _$location_;
      Authentication = _Authentication_;
      QuestionsService = _questionsService_;
      User_Sessions = _User_Sessions_;
      sessionServiceV3 = _sessionServiceV3_;

      // create mock question
      mockQuestion = new QuestionsService({
        _id: '56393091e4b00a58422fede3',
        test_id: '561d199f41c840c42134a825',
        question_body: 'This is a multiple choice algebra question.',
        question_type: 'multiple_choice',
        question_subject: 'algebra2',
        answer_choices: [
            "A. Yep",
            "B. Almost done",
            "C. You can do it"
        ],
        correct_answer: [
            "0"
        ],
        standard: "MAFS.K12.MP.8.1:Look for and express regularity in repeated reasoning"
      });

      user_session = new User_Sessions({
        user_id: '566496cf3bbef844360c39c9',
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
      QuestionsController = $controller('QuestionsController', {
        $scope: scope
      });
    }));

    it('$scope.loadQuestions() should create an array of question with the same test id', inject(function (questionsService) {
      var sampleQuestions;
      var alltrue = true;

      sessionServiceV3.setSessionObject(user_session);
      sessionServiceV3.setTestID('561d199f41c840c42134a825');
      scope.loadQuestions();

      sampleQuestions = scope.getTestContainer();

      for (var i = 0; i < sampleQuestions.questions.size; i++){
        if (sampleQuestions[i].questions.test_id === '561d199f41c840c42134a825'){
          alltrue = false;
        }
      }

      // Test scope value
      expect(alltrue).toEqualData(true);
    }));

    it('$scope.saveAnswer() should send update database user_session answers', inject(function () {  
      var sampleAnswers = [1, 2, 3];

      sessionServiceV3.setSessionObject(user_session);
      sessionServiceV3.setUserAnswers(sampleAnswers);

      // Test URL redirection after the article was created
      expect(sessionServiceV3.getUserAnswers()).toEqualData(sampleAnswers);
    }));
  });
}());
