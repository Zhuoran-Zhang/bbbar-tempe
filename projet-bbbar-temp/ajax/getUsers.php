<?php

require_once '../includes/db.php';
    try{
        $selectsql = "SELECT username, pword FROM $TBL_user WHERE role = 'guest'";
        $result = $mysqli->query($selectsql);

        if (!$result) {
            echo '账户或密码输入有误，请重新输入';
            $result->free();
            $mysqli->close();
            exit;
        } else {
            $users = array();
             while ($user = $result->fetch_assoc()) {
                    //a row contained username and role
                    array_push($users, $user);
            }
            $result->free();
            $mysqli->close();
            echo json_encode($users);
            // in php echo is return
        }
    }
    catch(Exception $e){
        echo 'Unable to access.' + $e;
        exit;
    }
    
?>