<?php

require_once '../includes/db.php';
    if (is_array($dbInfo) && array_key_exists(3, $dbInfo)) {
    $charset = "utf8";
    $dsn ="mysql:host=$DB_HOST;dbname=$DB_NAME;charset=$charset";
    $opt = [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false,
    ];
    }
    try{
        $pdo = new PDO($dsn, $DB_USER, $DB_PASS, $opt);

        $username = filter_var($_REQUEST['username'], FILTER_SANITIZE_STRING);
        $password = filter_var($_REQUEST['pass'], FILTER_SANITIZE_STRING);

        $updatesql = "SELECT username as username, role as role FROM :table_prod WHERE username = :username and :password = :password ";
        $updatestatement = $pdo->prepare($updatesql);
        $updatestatement->bindParam(':table_prod', $_TBL_user);
        $updatestatement->bindParam(':username', $username);
        $updatestatement->bindParam(':password', $password);

        $listeOfUsers = $updatestatement->execute();
    }
    catch(Exception $e){
        echo 'Unable to access.' + $e;
        exit;
    }
    if (!$listeOfUsers) {
   
        echo '账户输入有误，请重新输入';
        exit;
    }
    // Yayy!
    
    $user = array();
    $user = $updatestatement->fetch(PDO::FETCH_ASSOC) ;
    // $user['username'] @ $user['role']
    echo json_encode($user);
?>