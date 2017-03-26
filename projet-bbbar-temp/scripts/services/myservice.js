'use strict';

/**
 * @ngdoc service
 * @name myApp.myService
 * @description
 * # myService
 * Service in the myApp.
 */
angular.module('myApp')
  .service('myService', function () {
    // AngularJS will instantiate a singleton by calling "new" on this function

    var getRoom = function(){
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
                $scope.players.forEach(function(element){
                    element.valide = true;
                });
            }
        });
    }
  });
