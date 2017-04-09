<?php

require_once '../includes/db.php';
    try{
        $roomId = $_REQUEST['roomId'];
        $username = $_REQUEST['playerName'];
        $action = filter_var($_REQUEST['action'], FILTER_SANITIZE_STRING);

        if($action === "getPlayers"){
            $selectsql = "SELECT playerName,score FROM $TBL_games WHERE roomId = $roomId ";
        } else if($action === "getPlayersOK"){
            $selectsql = "SELECT allPlayersOK FROM $TBL_games WHERE roomId = $roomId ";
        } else if ($action === "checkUser"){
            $selectsql = "SELECT COUNT(username) as countUser FROM $TBL_user WHERE username = '$username'";            
        } else if ($action === "getGame"){
            $selectsql = "SELECT gameOver FROM $TBL_games WHERE roomId = $roomId ";
        } else if  ($action === "getAllPlayers"){
            $selectsql = "SELECT username,score FROM $TBL_user WHERE role in ('guest') LIMIT 10 ";            
        } else if($action === "getInfoPlayer"){
            $selectsql = "select username, score, rank from 
            ( SELECT username, score, @curRank := @curRank + 1 AS rank 
            FROM tbl_user u, (SELECT @curRank := 0) r where role = 'guest' order by score desc) as tab 
            where username = '$username'";           
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