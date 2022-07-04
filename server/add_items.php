<?php
require('mysql/connect.php');
$database -> begin_transaction();


try {
    $d = json_decode($_POST['data']);
    $table = json_decode($_POST['table']);


    if($table == 'cars') {
        $query = $database -> prepare("SELECT * FROM cars WHERE plate_num=?");
        $query -> bind_param('s', $d -> plate_num);
        $query -> execute();
        $data = $query -> get_result() -> fetch_assoc();
        if(!empty($data)) {
            http_response_code(405);
            echo "Samochód z tą tablicą już istnieje";
            exit();
        }

        $owner_id = null;
        if($d -> owner_id != "") $owner_id = intval($d ->owner_id);
        $year = intval($d -> year);
        
        $query = $database -> prepare('INSERT INTO cars(owner_id, brand, model, plate_num, year) VALUES(?,?,?,?,?)');
        $query -> bind_param("isssi", $owner_id, $d -> brand, $d -> model, $d -> plate_num, $year);
        
    } else {
        $query = $database -> prepare("SELECT * FROM owners WHERE PESEL=?");
        $query -> bind_param('i', $d -> PESEL);
        $query -> execute();
        $data = $query -> get_result() -> fetch_assoc();
        if(!empty($data)) {
            http_response_code(405);
            echo "Osoba z takim PESELem juz istnieje";
            exit();
        }
        $pesel = intval( $d -> PESEL);
        $query = $database -> prepare('INSERT INTO owners(name, surname, PESEL, city, street, home_num) VALUES(?,?,?,?,?,?)');
        $query -> bind_param("ssisss", $d -> name, $d -> surname, $pesel, $d -> city, $d -> street, $d -> home_num);
    }
    $query -> execute();

    if($query === false){
        http_response_code(405);
        echo "Wystąpił błąd z dodaniem rekordu";
        $database -> rollback();
        exit();
    }

    $database -> commit();
    http_response_code(200);
    echo "Rekord dodany pomyślnie";

    

} catch(mysqli_sql_exception $err) {
    $database -> rollback();
    http_response_code(500);
    echo $err;

}

exit();