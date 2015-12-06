'use strict';
//<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js" type ="text/javascript"></script>
/*global $:false */
/* eslint no-eval: 0 */
//angular.module('calculator').directive("bnDocumentKeypress", function($document, $parse) {
//credit to Tom Porter
var Calc;

Calc = angular.module('calculator');

Calc.directive("bnDocumentKeypress", function($document, $parse) {
  var linkFunction;
  linkFunction = function($scope, $element, $attributes) {
    var invoker, scopeExpression;
    scopeExpression = $attributes.bnDocumentKeypress;
    invoker = $parse(scopeExpression);
    $document.on("keyup", function(event) {
      return $scope.$apply(function() {
        return invoker($scope, {
          $event: event
        });
      });
    });
    return linkFunction;
  };
   return linkFunction;
});

Calc.controller("CalcController", function($scope,$location,Authentication) {
  $scope.authentication = Authentication;
    
    // If user is not signed in then redirect back home
    if (!Authentication.user) {
     $location.path('/');
    }
    
  var n;
  $scope.calcInput = '0';
  $scope.memory = 0;
  $scope.stuff = [0];
  $scope.justGotMath = false;
  $scope.acceptInput = function(n) {
    var last;
    if ($scope.justGotMath) {
      $scope.justGotMath = false;
      if (!$scope.isOperator(n)) {
        $scope.stuff = [];
      }
    }
    n = n.toString();
    if (n === '.') {
      last = $scope.stuff.pop();
      if ($scope.isOperator(last) || Math.ceil(last) !== parseInt(last)) {
        $scope.stuff.push(last);
      } else {
        last += '.';
        $scope.stuff.push(last);
        $scope.writeScreen();
      }
      return;
    }
    if ($scope.isOperator(n)) {
      if (!$scope.stuff.length) {
        return;
      }
      last = $scope.stuff.pop();
      if (!$scope.isOperator(last)) {
        $scope.stuff.push(last);
      }
      $scope.stuff.push(n);
    } else if ($scope.stuff.length) {
      last = $scope.stuff.pop();
      if ($scope.isOperator(last)) {
        $scope.stuff.push(last);
        $scope.stuff.push(n);
      } else if (last.toString() === '0') {
        $scope.stuff.push(n);
      } else {
        last += n.toString();
        $scope.stuff.push(last);
      }
    } else {
      $scope.stuff.push(n);
    }
    $scope.writeScreen();
    console.log($scope.stuff);
    return this;
  };
  $scope.isOperator = function(n) {
    if (isNaN(n)) {
      if (n !== '.') {
        return true;
      }
    }
    return false;
  };
  $scope.changeSign = function() {
    var last, second_last;
    last = $scope.stuff.pop();
    if ($scope.isOperator(last)) {
      second_last = $scope.stuff.pop();
      if (second_last.substr(0, 1) === '-') {
        second_last = second_last.substr(1);
      } else {
        second_last = '-' + second_last;
      }
      $scope.stuff.push(second_last);
    } else {
      if (last.substring(0, 1) === '-') {
        last = last.substr(1);
      } else {
        last = '-' + last;
      }
    }
    $scope.stuff.push(last);
    return $scope.writeScreen();
  };
  $scope.writeScreen = function() {
    var write;
    write = '';
    $.each($scope.stuff, function(i, k) {
      if (write === '') {
        write = k;
        return write;
      } else {
        return write += k.toString();
      }
    });
    if (write === '') {
      write = '0';
    }
    $scope.calcInput = write.toString();
    //return $scope.calcInput;

    if ($scope.isOperator(n)) {
      write = n === '/' ? '&divide;' : n === '*' ? '&times;' : n === '+' ? '&plus;' : n === '-' ? '&minus;' : void 0;
    }
    if (!$scope.stuff.length) {
      $scope.calcInput = write;
    } else {
      $scope.calcInput += write.toString();
    }
    //return this;
    return $scope.calcInput;

  };
  $scope.clearCalc = function() {
    $scope.stuff = [];
    return $scope.writeScreen();
  };
  $scope.doMath = function() {
    $scope.justGotMath = true;
    $scope.stuff = [$scope.getMath()];
    return $scope.writeScreen();
  };
  $scope.getMath = function() {
    var job, last, x;
    last = $scope.stuff.pop();
    if (!$scope.isOperator(last)) {
      $scope.stuff.push(last);
    }
    job = $scope.stuff.join('');
    x = 0;
    /* jshint ignore:start */
    eval('x = ' + job + ';');
    /* jshint ignore:end */
    //eval('x = ' + job + ';');
    return x;
  };
  $scope.handleKeypress = function(event) {
    var code;
    code = event.which;
    console.log(code);
    if (code === 81) {
      return $scope.memoryClear();
    } else if (code === 87) {
      return $scope.memoryAdd();
    } else if (code === 69) {
      return $scope.memorySub();
    } else if (code === 82) {
      return $scope.memoryShow();
    } else if (code === 192) {
      return $scope.clearCalc();
    } else if (code === 190) {
      return $scope.acceptInput('.');
    } else if (code === 13) {
      return $scope.doMath();
    } else if ((47 < code && code < 58)) {
      return $scope.acceptInput(String.fromCharCode(code));
    } else if ((95 < code && code < 106)) {
      code -= 48;
      return $scope.acceptInput(String.fromCharCode(code));
    } else if (code === 187 || code === 107) {
      return $scope.acceptInput('+');
    } else if (code === 189 || code === 109) {
      return $scope.acceptInput('-');
    } else if (code === 106) {
      return $scope.acceptInput('*');
    } else if (code === 191 || code === 111) {
      return $scope.acceptInput('/');
    }
  };
  $scope.memoryClear = function() {
    $scope.memory = 0;
    return $scope.memoryIndicator(0);
  };
  $scope.memoryShow = function() {
    $scope.stuff = [$scope.memory.toString()];
    return $scope.writeScreen();
  };
  $scope.memoryAdd = function() {
    $scope.memory += $scope.getMath();
    return $scope.memoryIndicator(1);
  };
  $scope.memorySub = function() {
    $scope.memory -= $scope.getMath();
    if ($scope.memory !== 0) {
      return $scope.memoryIndicator(1);
    } else {
      return $scope.memoryIndicator(0);
    }
  };
   $scope.memoryIndicator = function(show) {
    if (!show) {
      return document.getElementById('#memoryBtn').removeClass('memoryOn');
    } else if (!document.getElementById('#memoryBtn').hasClass('memoryOn')) {
      return document.getElementById('#memoryBtn').addClass('memoryOn');
    }
  };
  return $scope.memoryIndicator;
});
