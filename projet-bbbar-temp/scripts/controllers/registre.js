'use strict';


app.controller('guestRegistreControl', function($scope, $http, $window) {
    
    $scope.username ="";
    $scope.pword1 = "";
    $scope.pword2 = "";

    $scope.goRegistre = function() {

       $http({
            method: 'POST',
            url: "../ajax/getPlayers.php?playerName=" + $scope.username + "&action=checkUser"
        }).success(function(response) {
            if (response.length === undefined || response.length == 0) {
                console.log("failed");
            } else if(parseInt(response[0].countUser) == 0){
                 $http({
                    method: 'POST',
                    url: "../ajax/updatePlayer.php?playerName=" + $scope.username + "&pword=" + $scope.pword1 + "&action=registre"
                }).success(function(response) {
                    //reponse is from echo of getUsers.php
                    if (response.length === undefined || response.length == 0) {
                        console.log("failed");
                    } else if(response === "OK"){
                        console.log("add player ok");
                        $window.location.href = '../views/iamGuest.html?' + $scope.username; 
                    } else{
                        console.log(response);
                    }
                });
            } else if(parseInt(response[0].countUser) > 0){
                alert("用户已存在请重新输入用户名");
            } else {
              console.log(JSON.stringify(response));
            }
        });
       
    }
});
