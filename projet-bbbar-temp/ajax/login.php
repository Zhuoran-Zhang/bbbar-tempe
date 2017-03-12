<?php

require_once '../includes/db.php';
    try{
        $connection = mysql_connect("localhost", "root", "");

        if(!$connection){
            echo "shit happens";
            exit;
        }
        mysql_select_db('bbbar_tempe', $connection);

        $username = filter_var($_REQUEST['username'], FILTER_SANITIZE_STRING);
        $password = filter_var($_REQUEST['pass'], FILTER_SANITIZE_STRING);

        $selectsql = "SELECT username, role FROM $TBL_user 
            WHERE username = '$username' and pword = '$password'";
        $result = mysql_query($selectsql);

        if (!$result) {
            //echo '账户或密码输入有误，请重新输入';
            exit;
        } else {
            $rows = array();
             while ($row = mysql_fetch_array($result, MYSQL_ASSOC)) {
                    //a row contained username and role
                    console.log("UserName : %s  Role : %s", $row["username"], $row["role"]);
                    array_push($rows, $row);
            }
            echo json_encode($rows);
            // in php echo is return
        }
    }
    catch(Exception $e){
        echo 'Unable to access.' + $e;
        exit;
    }
    
?>