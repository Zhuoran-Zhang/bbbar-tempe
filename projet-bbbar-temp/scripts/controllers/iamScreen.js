'use strict';

app.controller('iamScreenCtrl', function($scope, $http) {
    $scope.namePlayer = "";
    $scope.rooms = ['1', '2'];
    $scope.room = "";

    $scope.getRoom = function(){
       // console.log($scope.room);
        // Get all the players
        $http({
            method: 'GET',
            url: "../ajax/getPlayers.php?roomId=" + $scope.room + "&action=getPlayers"
        }).success(function(response) {
            //reponse is from echo of getUsers.php
            if (response.length === undefined || response.length == 0) {
                init();
                console.log("No results");
            } else {
                console.log("reponse " + JSON.stringify(response));
                $scope.players = response;
            }
        });

    }
});
