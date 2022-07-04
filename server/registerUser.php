<?php
if($_SERVER["REQUEST_METHOD"] == "POST"){
    require('mysql/connect.php');
    $database -> begin_transaction();
    try { 
        $data = json_decode($_POST['data']);
        $query = $database -> prepare("SELECT * FROM dane_log WHERE login=? OR mail=?");
        $query -> bind_param("ss", $data -> login, $data -> email);
        $query -> execute();
        $result = $query -> get_result();
        if($result-> fetch_assoc()){
            http_response_code(406);
            echo "Podany login lub email jest już użyty";
            exit();
        }  

        $admin = 0;
        $query = $database -> prepare('INSERT INTO dane_log (login, mail, passwd, admin) VALUES (?,?,?,?)');
        $query -> bind_param("sssi", $data -> login, $data -> email, $data -> pass1, $admin);
        $query -> execute();
        $database -> commit();
        $result = $query -> get_result();
        echo "Zarejestrowano pomyślnie";
        exit();
        
    } catch (mysqli_sql_exception $err) {
        http_response_code(500);
        echo "Błąd serwera";

    }
    $database -> rollback();


}