'use strict';

app.controller('hostEntreInfoControl', function($scope, $window,$http) {
    $scope.namePlayer = "";
    $scope.rooms = ['1', '2'];
    $scope.room = "";
    $scope.allPlayersOK = false;

    var init = function(){
        $scope.players = [
        {playerName: "", valide : false}
        ];
    }

    $scope.getRoom = function(){
        console.log($scope.room);
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
                $scope.players.forEach(function(element){
                    element.valide = true;
                });
            }
        });

        // get indicateur if all the players are OK
         $http({
            method: 'GET',
            url: "../ajax/getPlayers.php?roomId=" + $scope.room + "&action=getPlayersOK"
        }).success(function(response) {
            //reponse is from echo of getUsers.php
            if (response.length === undefined || response.length == 0) {
                console.log("No results");
            } else {
                console.log("reponse " + JSON.stringify(response));
                if(response[0].allPlayersOK === "1") {
                    $scope.allPlayersOK = true;
                } else {
                    $scope.allPlayersOK = false;
                }
                
            }
        });
    }

    $scope.valide = function (index){
        // 存储此用户信息 核对用户名是否正确
        $http({
            method: 'POST',
            url: "../ajax/updatePlayer.php?roomId=" + $scope.room + "&playerName=" + $scope.players[index].playerName + "&action=add"
        }).success(function(response) {
            //reponse is from echo of getUsers.php
            if (response.length === undefined || response.length == 0) {
                console.log("failed");
            } else if(response === "OK"){
                 console.log("add new player ok");
               $scope.players[index].valide = true;
            } else{
                console.log(response);
            }
        });
    }

    $scope.delete = function (index){
        $http({
            method: 'POST',
            url: "../ajax/updatePlayer.php?roomId=" + $scope.room + "&playerName=" + $scope.players[index].playerName + "&action=delete"
        }).success(function(response) {
            //reponse is from echo of getUsers.php
            if (response.length === undefined || response.length == 0) {
                console.log("failed");
            } else if(response === "OK"){
                 console.log("player delete ok");
               $scope.players.splice(index,1);
            } else{
                console.log(response);
            }
        });
    }

    $scope.addPlayer = function() {
        var player  = {};
        player.playerName = "";
        player.valide = false;
        $scope.players.push(player);
        console.log(JSON.stringify( $scope.tableUsers));
    };
    
    // All the players are ok
    $scope.finish = function(){
        $http({
            method: 'POST',
            url: "../ajax/updatePlayer.php?roomId=" + $scope.room + "&action=finish"
        }).success(function(response) {
            //reponse is from echo of getUsers.php
            if (response.length === undefined || response.length == 0) {
                console.log("failed");
            } else if(response === "OK"){
                 console.log("All the players are OK");
               $scope.allPlayersOK = true;
            } else{
                console.log(response);
            }
        });
    }

    $scope.startGame = function() {
        $window.location.href = '../views/hostStartGame.html?' + $scope.room;
    };
    
    //init();
});

app.controller('hostStartGameControl', function($scope, $window,$http) {
    $scope.room = "";
    $scope.scoreSelect = 0;
    $scope.players=[];
    $scope.gameOver = false;

    var init = function (){
        var queryString = location.search;
        $scope.room = queryString.substr(1);
        getPlayers();
    }

    var getPlayers = function(){
        console.log($scope.room);
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

    $scope.addScore = function(index) {
        $scope.players[index].score = parseInt($scope.players[index].score) + parseInt($scope.players[index].scoreSelect);
    }
    $scope.finishGame = function() {
        $scope.gameOver = true;
         // 存比分 TODO
       // $window.location.href = '../views/resultGame.html';
    };

    init();
});

