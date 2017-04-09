<?php

require_once '../includes/db.php';
    try{

        $roomId = $_REQUEST['roomId'];
        $playerName = filter_var($_REQUEST['playerName'], FILTER_SANITIZE_STRING);
        $action = filter_var($_REQUEST['action'], FILTER_SANITIZE_STRING);
        $score = filter_var($_REQUEST['score'],FILTER_SANITIZE_STRING);
        $gameOver = filter_var($_REQUEST['gameOver'],FILTER_SANITIZE_STRING);
        $pword = filter_var($_REQUEST['pword'],FILTER_SANITIZE_STRING);
       
    
        if($action === "add"){
            $selectsql = "INSERT INTO $TBL_games (roomId, playerName, score, allPlayersOK, caractereOK) VALUES ($roomId, '$playerName',0, 0, 0)";
        } else if($action === "delete"){
            $selectsql = "DELETE FROM $TBL_games WHERE roomId = $roomId AND playerName = '$playerName'";            
        } else if($action === "deleteAll"){
           $selectsql = "DELETE FROM $TBL_games WHERE roomId = $roomId";            
        } else if($action === "finish"){
            $selectsql = "UPDATE $TBL_games SET allPlayersOK = 1 WHERE roomId = $roomId";
        } else if($action === "addScore"){
            $selectsql = "UPDATE $TBL_games SET score = $score WHERE playerName = '$playerName'";
        } else if($action === "updateScoreToUser") {
            $score = intval($score);
            $selectsql = "UPDATE $TBL_user SET score = score + $score WHERE username = '$playerName'";            
        } else if($action === "updateClassment"){
            $selectsql = "UPDATE $TBL_user SET classment =  WHERE username = '$playerName'";            
        } else if($action === "gameOver") {
            $selectsql = "UPDATE $TBL_games SET gameOver = $gameOver WHERE roomId = $roomId";            
        } else if($action === "registre"){
            $selectsql = "INSERT INTO $TBL_user (username, pword, role, score) VALUES ('$playerName','$pword','guest',0 )";                        
        }
        
        if ($mysqli->query($selectsql) === TRUE) {
            echo  "OK";
        } else {
            echo "Error: " . $sql . "<br>" . $mysqli->error;
        }
    
        $mysqli->close();
     }
    catch(Exception $e){
        echo 'Unable to access.' + $e;
        exit;
    }
    
?>