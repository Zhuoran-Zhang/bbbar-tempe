'use strict';

/**
 * @ngdoc directive
 * @name myApp.directive:myDirective
 * @description
 * # myDirective
 */
angular.module('myApp')
  .directive('myDirective', function () {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        element.text('this is the myDirective directive');
      }
    };
  });
// That enter key on the Retail number!
angular.module('myApp')
  .directive('ngEnter', function () {
  return function (scope, element, attrs) {
    element.bind("keydown keypress", function (event) {
      if (event.which === 13) {
        scope.$apply(function () {
          scope.$eval(attrs.ngEnter);
        });
        event.preventDefault();
      }
    });
  };
});


// That enter key on the Retail number!
angular.module('myApp')
  .directive('ngNumeric', function () {
  return function (scope, element, attrs) {
    element.bind("keydown", function (event) {
      scope.$apply(function () {
//        var intVal = $(element).val().replace(/\D/, '');
//        console.log(intVal);
//        if (!isNaN(intVal)) {
//          $(element).val(intVal);
//        }

        console.log(event.which);

        if (event.which >= 65 && event.which <= 90) {
          //alert("NO");
          event.preventDefault();
        }
      });
    });
  };
});
