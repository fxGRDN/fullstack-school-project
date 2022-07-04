<?php
require('mysql/connect.php');
$database -> begin_transaction();
try {
    $id = intval($_GET['id']);
    $query = $database -> prepare("DELETE FROM ".$_GET['tb']." WHERE id=?");
    $query -> bind_param('i', $id);
    $query -> execute();
    if($query === false){
        $database -> rollback();
        exit();
    }
    $database -> commit();


} catch (mysqli_sql_exception $err) {
    http_response_code(500);
    echo $err;
}

