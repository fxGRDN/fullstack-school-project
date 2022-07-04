<?php
require('mysql/connect.php');

try {
    $query;
    if(isset($_GET['id'])) {
        $query = $database -> prepare('SELECT name, surname FROM '.$_GET['tb'].' WHERE id=?');
        $id = intval($_GET['id']);
        $query -> bind_param('i', $id);
    }
    else $query = $database -> prepare('SELECT * from '.$_GET['tb']);
    $query -> execute();
    $result = $query -> get_result();
    $data = $result -> fetch_all(MYSQLI_ASSOC);

    if(empty($data)){
        http_response_code(503);
        echo "Brak rekordów";
        exit();
    }

    $data_arr = Array();
    foreach( $data as $row){
        array_push($data_arr, $row);
    }
    header('Content-Type: application/json');
    echo json_encode($data_arr);
    
} catch (mysqli_sql_exception $err){
    http_response_code(500);
    echo $err;
}
