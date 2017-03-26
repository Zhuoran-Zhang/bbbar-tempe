<?php

require_once '../includes/db.php';
    try{
        $roomId = $_REQUEST['roomId'];
        $action = filter_var($_REQUEST['action'], FILTER_SANITIZE_STRING);

        if($action === "getPlayers"){
            $selectsql = "SELECT playerName,score FROM $TBL_games WHERE roomId = $roomId ";
        } else if($action === "getPlayersOK"){
            $selectsql = "SELECT allPlayersOK FROM $TBL_games WHERE roomId = $roomId ";
        }
       $result =  $mysqli->query($selectsql);
        if (!$result) {
            echo '';
            $result->free();
            $mysqli->close();
            exit;
        } else {
            $players = array();
             while ($player = $result->fetch_assoc()) {
                    //a row contained username and role
                    array_push($players, $player);
            }
            $result->free();
            $mysqli->close();
            echo json_encode($players);
            // in php echo is return
        }
    }
    catch(Exception $e){
        echo 'Unable to access.' + $e;
        exit;
    }
    
?>