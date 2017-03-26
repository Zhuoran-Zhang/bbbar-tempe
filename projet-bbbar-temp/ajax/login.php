<?php

require_once '../includes/db.php';
    try{
    
        $username = filter_var($_REQUEST['username'], FILTER_SANITIZE_STRING);
        $password = filter_var($_REQUEST['pass'], FILTER_SANITIZE_STRING);

        $selectsql = "SELECT username, role FROM $TBL_user 
            WHERE username = '$username' and pword = '$password'";
        $result = $mysqli->query($selectsql);

        if (!$result) {
            echo '账户或密码输入有误，请重新输入';
            $result->free();
           $mysqli->close();
            exit;
        } else {
            $rows = array();
             while ($row = $result->fetch_assoc()) {
                    //a row contained username and role
                    console.log("UserName : %s  Role : %s", $row["username"], $row["role"]);
                    array_push($rows, $row);
            }
            $result->free();
            $mysqli->close();
            echo json_encode($rows);
            // in php echo is return
        }
    }
    catch(Exception $e){
        echo 'Unable to access.' + $e;
        exit;
    }
    
?>