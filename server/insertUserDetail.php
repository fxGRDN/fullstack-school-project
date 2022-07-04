<?php
if($_SERVER["REQUEST_METHOD"] == "POST"){
    require('mysql/connect.php');
    $database -> begin_transaction();

    try {
        $query = $database -> prepare("SELECT * FROM dane_szczegoly WHERE log_id=?");
        $query -> bind_param('i', $_POST['id']);
        $query -> execute();

        $result = $query -> get_result();
        $data = $result -> fetch_assoc();

        $newData = json_decode($_POST['UserDetailData']);
        $date = $newData -> date -> year ."-". $newData -> date -> month ."-". $newData -> date -> day;
        
        if(empty($data)){
            $query = $database -> prepare("INSERT INTO dane_szczegoly (log_id, imie, nazwisko, data_ur) VALUES (?, ?, ?, ?)");
            $query -> bind_param('isss', $_POST['id'], $newData -> name , $newData -> surname, $date );
        } else {
            $query = $database -> prepare("UPDATE dane_szczegoly SET imie=?, nazwisko=?, data_ur=? WHERE log_id=?");
            $query -> bind_param('sssi', $newData -> name , $newData -> surname, $date, $_POST['id'] );
            

        }
        $query -> execute();
        $query -> close();
        $database -> commit();

    } catch (mysqli_sql_exception $exp){
        $database -> rollback();
        http_response_code(500);
        echo $err;
        
    }
}


?>