<?php

$host = "localhost";
$login = "root";
$password = "";
$db = "4gi_albicla3_0";

$database = new mysqli($host, $login, $password, $db);
$database->set_charset('utf8mb4');

if(mysqli_connect_errno()){ 
    http_response_code(500);
    echo "Błąd podłaczenia do bazy !";
    exit();
} 

?>