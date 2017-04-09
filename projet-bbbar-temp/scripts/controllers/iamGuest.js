'use strict';


app.controller('iamGuestCtrl', function($scope, $http) {
    $scope.player = [];

    var init = function () {
        var queryString = location.search;
        $scope.playerName = queryString.substr(1);
        getUsers();
    }

    var getUsers = function() {
        $http({
            method: 'GET',
            url: "../ajax/getPlayers.php?playerName=" + $scope.playerName + "&action=getInfoPlayer"
        }).success(function(response) {
            //reponse is from echo of getUsers.php
            if (response.length === undefined || response.length == 0) {
                console.log("Failed ");
            } else {
                console.log("reponse " + JSON.stringify(response));
                $scope.player = response;
            }
        });
    };

   init();

});