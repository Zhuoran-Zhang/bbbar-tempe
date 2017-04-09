'use strict';

app.controller('hostEntreInfoControl', function($scope, $window,$http) {
    $scope.namePlayer = "";
    $scope.rooms = ["1", "2"];
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
            url: "../ajax/getPlayers.php?playerName=" + $scope.players[index].playerName + "&action=checkUser"
        }).success(function(response) {
            if (response.length === undefined || response.length == 0) {
                console.log("failed");
            } else if(parseInt(response[0].countUser) > 0){
                // 确认添加用户
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
            } else if(parseInt(response[0].countUser) == 0){
                alert("用户名不存在，请重新输入");
            } else {
              console.log(JSON.stringify(response));
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

});

app.controller('hostStartGameControl', function($scope, $window,$http) {
    $scope.room = "";
    $scope.scoreSelect = 0;
    $scope.players=[];

    var init = function (){
        var queryString = location.search;
        $scope.room = queryString.substr(1);
        getGameStatut();
        getPlayers();
    }

    var getGameStatut = function(){
        // Get game statut
        $http({
            method: 'GET',
            url: "../ajax/getPlayers.php?roomId=" + $scope.room + "&action=getGame"
        }).success(function(response) {
            //reponse is from echo of getUsers.php
            if (response.length === undefined || response.length == 0) {
                console.log("No results");
            } else {
                $scope.gameOver = response[0].gameOver == 0 ? false : true;

                console.log("gameOver" + $scope.gameOver);
            }
        });
    }

    var getPlayers = function(){
        console.log("room number " + $scope.room);
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
                console.log("getPlayers reponse " + JSON.stringify(response));
                $scope.players = response;
            }
        });
    }

    $scope.addScore = function(index) {
        $scope.players[index].score = parseInt($scope.players[index].score) + parseInt($scope.players[index].scoreSelect);
        // BDD
         $http({
            method: 'POST',
            url: "../ajax/updatePlayer.php?playerName=" + $scope.players[index].playerName 
                + "&score=" + $scope.players[index].score + "&action=addScore"
        }).success(function(response) {
            //reponse is from echo of getUsers.php
            if (response.length === undefined || response.length == 0) {
                console.log("failed");
            } else if(response === "OK"){
                console.log("player addScore ok");
            
            } else{
                console.log("response " + JSON.stringify(response));
            }
        });
            // Add Score for everyone
        $http({
            method: 'POST',
            url: "../ajax/updatePlayer.php?playerName=" + $scope.players[index].playerName
            + "&score=" + parseInt($scope.players[index].scoreSelect) + "&action=updateScoreToUser"
        }).success(function(response) {
            //reponse is from echo of getUsers.php
            if (response.length === undefined || response.length == 0) {
                console.log("add score to user failed"  );
            } else if(response === "OK"){
                console.log("all players addScoreToUser ok");
            } else{
                console.log("response " + JSON.stringify(response));
            }
        });
    }
    $scope.finishGame = function() {
        $scope.gameOver = true;
        $http({
                method: 'POST',
                url: "../ajax/updatePlayer.php?roomId=" + $scope.room + "&gameOver=1&action=gameOver"
            }).success(function(response) {
                //reponse is from echo of getUsers.php
                if (response.length === undefined || response.length == 0) {
                    console.log("failed");
                } else if(response === "OK"){
                    console.log("Game Over");
                } else{
                    console.log("response " + JSON.stringify(response));
                }
            });
    };

    $scope.exitGame = function (){ 
      
         $http({
                method: 'POST',
                url: "../ajax/updatePlayer.php?roomId=" + $scope.room  + "&action=deleteAll"
            }).success(function(response) {
                //reponse is from echo of getUsers.php
                if (response.length === undefined || response.length == 0) {
                    console.log("failed");
                } else if(response === "OK"){
                    console.log("All players delete ok");
                    $window.location.href = "../index.php";
                } else{
                    console.log(response);
                }
            });
      
        //$window.location.href("../index.php");
    }

    init();
});

