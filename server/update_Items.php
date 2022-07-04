<?php

require('mysql/connect.php');
try {
    $table = $_GET['tb'];
    $newid = null;
    if($_GET['id'] != "") $newid = intval($_GET['id']);
    $plates = $_GET['plates'];
    $database -> begin_transaction();
    $query = $database -> prepare("UPDATE ".$table." SET owner_id=? WHERE plate_num=?");
    $query -> bind_param('is', $newid, $plates);
    $query -> execute();
    $database -> commit();
    exit();


}catch (mysqli_sql_exception $err) {
    $database -> rollback();
    http_response_code(500);

}