<?php

require_once '../includes/db.php';
    try{

        $roomId = $_REQUEST['roomId'];
        $playerName = filter_var($_REQUEST['playerName'], FILTER_SANITIZE_STRING);
        $action = filter_var($_REQUEST['action'], FILTER_SANITIZE_STRING);
    
        if($action === "add"){
            $selectsql = "INSERT INTO $TBL_games (roomId, playerName, score, allPlayersOK, caractereOK) VALUES ($roomId, '$playerName',0, 0, 0)";
        } else if($action === "delete"){
            $selectsql = "DELETE FROM $TBL_games WHERE roomId = $roomId AND playerName = '$playerName'";            
        } else if($action === "finish"){
            $selectsql = "UPDATE $TBL_games SET allPlayersOK = 1 WHERE roomId = $roomId";
        }
      
        if ($mysqli->query($selectsql) === TRUE) {
            echo "OK";
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