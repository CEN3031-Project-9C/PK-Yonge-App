'use strict';

// Articles controller
angular.module('test_portal').controller('QuestionsController', ['$scope', '$http', '$sce', '$stateParams', '$location', 'Authentication', 'Questions',
  function ($scope, $http, $sce, $stateParams, $location, Authentication, Questions) {
    $scope.authentication = Authentication;

    // Create new Article
    // $scope.create = function (isValid) {
    //   $scope.error = null;

    //   if (!isValid) {
    //     $scope.$broadcast('show-errors-check-validity', 'articleForm');

    //     return false;
    //   }

    //   // Create new Article object
    //   var article = new Articles({
    //     title: this.title,
    //     content: this.content
    //   });

    //   // Redirect after save
    //   article.$save(function (response) {
    //     $location.path('articles/' + response._id);

    //     // Clear form fields
    //     $scope.title = '';
    //     $scope.content = '';
    //   }, function (errorResponse) {
    //     $scope.error = errorResponse.data.message;
    //   });
    // };

    // Remove existing Article
    // $scope.remove = function (article) {
    //   if (article) {
    //     article.$remove();

    //     for (var i in $scope.articles) {
    //       if ($scope.articles[i] === article) {
    //         $scope.articles.splice(i, 1);
    //       }
    //     }
    //   } else {
    //     $scope.article.$remove(function () {
    //       $location.path('articles');
    //     });
    //   }
    // };

    // // Update existing Article
    // $scope.update = function (isValid) {
    //   $scope.error = null;

    //   if (!isValid) {
    //     $scope.$broadcast('show-errors-check-validity', 'articleForm');

    //     return false;
    //   }

    //   var article = $scope.article;

    //   article.$update(function () {
    //     $location.path('articles/' + article._id);
    //   }, function (errorResponse) {
    //     $scope.error = errorResponse.data.message;
    //   });
    // };

    $scope.score = 0;
    $scope.activeQuestion = -1;
    $scope.activeQuestionAnswered = 0;
    $scope.percentage = 0; 

    $http.get('test_data.json').then(function(testData){
        $scope.myQuestions = testData.data;
        $scope.totalQuestions = $scope.myQuestions.length;
    });


    $scope.selectAnswer = function(qIndex,aIndex){
        //below throws a pop up message to print out qIndex and aIndex.
        //can be possibly use for when there isn't an aIndex(user never choose a answer before they pressed continue) 
        //alert(qIndex + 'and' + aIndex);


        var questionState = $scope.myQuestions[qIndex].questionState;

        //if a question hasn't been answered yet
        if(questionState != 'answered'){
            $scope.myQuestions[qIndex].selectedAnswer = aIndex; 
            //correctAnswer variable set base on the JSON file, which has a variable nmae call 'correct'
            var correctAnswer = $scope.myQuestions[qIndex].correct;
            //just set up the right variables, so we can use the corrctAnswer variable later
            $scope.myQuestions[qIndex].correctAnswer = correctAnswer;

            //test if user selected the correct answer
            if(aIndex === correctAnswer){
                $scope.myQuestions[qIndex].correctness = 'correct';
                $scope.score += 1; //increments the score
            }else{
                $scope.myQuestions[qIndex].correctness = 'correct';
            }

            scope.myQuestions[qIndex].questionState = 'answered'; 
        }
    }

    $scope.isSelected = function(qIndex,aIndex){
        return  scope.myQuestions[qIndex].selectedAnswer === aIndex; 
    }
    $scope.isCorrect = function(qIndex,aIndex){
        return  scope.myQuestions[qIndex].correctAnswer === aIndex; 
    }
    // Find a list of Articles
    $scope.find = function () {
      $scope.questions = Questions.query(); //Get singular, query is array.
    };

    // Find existing Article
    $scope.findOne = function () {
      $scope.questions = Questions.get({
        questionId: $stateParams.questionId
      });
    };
  }
]);

angular.module('test_portal').controller('DropdownCtrl', function ($scope, $log) {
  $scope.items = [
    'The first choice!',
    'And another choice for you.',
    'but wait! A third!'
  ];

  $scope.status = {
    isopen: false
  };

  $scope.toggled = function(open) {
    $log.log('Dropdown is now: ', open);
  };

  $scope.toggleDropdown = function($event) {
    $event.preventDefault();
    $event.stopPropagation();
    $scope.status.isopen = !$scope.status.isopen;
  };
});