'use strict';


app.controller('iamGuestCtrl', function($scope, $http) {
    $scope.users = "";

    $scope.getUsers = function() {
        $http({
            method: 'GET',
            url: "../ajax/getUsers.php"
        }).success(function(response) {
            //reponse is from echo of getUsers.php
            if (response.length === undefined || response.length == 0) {
                console.log("Failed ");
            } else {
                console.log("reponse " + JSON.stringify(response));
                $scope.users = response;
            }
        });
    };

    $scope.getUsers();

});