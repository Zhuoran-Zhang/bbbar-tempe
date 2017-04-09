'use strict';

/**
 * @ngdoc function
 * @name myApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the myApp
 */
//var app = angular.module('myApp', []);

app.controller('LoginCtrl', function($scope, $http, $window) {
    $scope.username = "";
    $scope.password = "";
    $scope.information = "";

    $scope.login = function(username, password) {
        $http({
            method: 'POST',
            url: "../ajax/login.php?username=" + username + "&pass=" + password
        }).success(function(response) {
            //reponse is from echo of login.php
            var position = response.length - 1;
            if (response.length === undefined) {
                console.log("Failed ");
            } else {
                console.log("reponse " + JSON.stringify(response[position]));
                if (response[position] !== undefined && response[position].role === "boss") {
                    $window.location.href = '../views/iamBoss.html';
                } else if (response[position] !== undefined && response[position].role === "guest") {
                    $window.location.href = '../views/iamGuest.html?' + username; 
                } else if (response[position] !== undefined && response[position].role === "host") {
                    $window.location.href = '../views/hostEnterInfo.html';
                } else {
                    $scope.information = "账户或密码输入有误，请重新输入";
                }
            }


            // $window.location.href = '../index.php';
        });
    };

    $scope.createNewUser = function() {
        $window.location.href = '../views/guestRegistre.html';
    };
});

