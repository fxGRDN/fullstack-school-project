<?php
require('mysql/connect.php');
if(isset($_GET['id'])) {
    

    try {
        $query = $database -> prepare("SELECT * FROM dane_szczegoly WHERE log_id=?");
        $query -> bind_param('i', $_GET['id']);
        $query -> execute();

        $result = $query -> get_result();
        $data = $result -> fetch_assoc();

        if(!empty($data)) {
            header('Content-Type: application/json');
            echo json_encode((object)[
                'name' => $data['imie'],
                'surname' => $data['nazwisko'],
                'date' => (object)[
                    'year' => substr($data['data_ur'], 0, 4),
                    'month' => intval(substr($data['data_ur'], 5, 2)),
                    'day' => intval(substr($data['data_ur'], 8, 2)),
                ]
            ]);
        } else {
            http_response_code(500);
            echo "No data feched";
        }
    
    } catch (mysqli_sql_exception $exp) {
        http_response_code(500);
        echo json_encode(var_dump($exp));
    }
    

    
}




exit();
