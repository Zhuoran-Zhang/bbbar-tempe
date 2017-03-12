'use strict';

/**
 * @ngdoc function
 * @name myApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the myApp
 */
angular.module('myApp')
  .controller('LoginCtrl', function ($scope, $http) {
    $scope.username = "";
    $scope.password = "";

    $scope.login = function (username,password) {
      $http({
        method: 'POST',
        url: "../ajax/login.php?username=" + username + "&pass=" + password
      }).success(function (response) {
        if (response.length === undefined) {
          return;
        }
        console.log("reponse " + response);
        response.forEach(function (user) {
          $scope.role=user.role;
          console.log($scope.role);
        });
      });
    };

  });
