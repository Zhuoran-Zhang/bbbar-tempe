<?php

require_once '../includes/db.php';
    try{
         $connection = mysql_connect($DB_HOST , $DB_USER, $DB_PASS);

        if(!$connection){
            echo "shit happens";
            exit;
        }
        mysql_select_db($DB_NAME, $connection);

        $selectsql = "SELECT username, pword FROM $TBL_user WHERE role = 'guest'";
        $result = mysql_query($selectsql);

        if (!$result) {
            echo '账户或密码输入有误，请重新输入';
            exit;
        } else {
            $users = array();
             while ($user = mysql_fetch_array($result, MYSQL_ASSOC)) {
                    //a row contained username and role
                    array_push($users, $user);
            }
            echo json_encode($users);
            // in php echo is return
        }
    }
    catch(Exception $e){
        echo 'Unable to access.' + $e;
        exit;
    }
    
?>