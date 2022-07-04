<?php
if ($_SERVER["REQUEST_METHOD"] == "POST"){
   require('mysql/connect.php');
   try {

        $prep_q = $database -> prepare("SELECT * FROM dane_log WHERE login=? OR mail=? ");
        $prep_q -> bind_param('ss', $_POST['l'],  $_POST['l']);
        $prep_q -> execute();

        $result = $prep_q -> get_result();
        $data = $result -> fetch_assoc();

        if( $data['passwd'] ==  $_POST['p']){
            echo json_encode((object)[
                'logged' => true,
                'id' => $data['id'],
                'admin' => $data['admin'],
                'message' => 'Login succesful'
            ]);
        } else {
            http_response_code(400);
            echo json_encode((object)[
                'logged' => false,
                'message' => 'Złe hasło'
            ]);
        }


   } catch (mysqli_sql_exception $exp) {
       http_response_code(500);
       echo json_encode(var_dump($exp));
   }
}









?>