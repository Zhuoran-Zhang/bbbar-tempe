'use strict';

app.controller('iamScreenCtrl', function($scope, $http) {
    var updateClassment = function () {
        
    }
    var getAllPlayers = function(){
    // Get all the players
    $http({
        method: 'GET',
        url: "../ajax/getPlayers.php?action=getAllPlayers"
    }).success(function(response) {
        //reponse is from echo of getUsers.php
        if (response.length === undefined || response.length == 0) {
            console.log("No results");
        } else {
            console.log("reponse " + JSON.stringify(response));
            $scope.players = response;
        }
    });

}

    getAllPlayers();
});
