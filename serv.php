<?php
//Variables nécessaire à la connexion à la base donnée
$servername = 'localhost';
$username = 'enzogivernaud_bigzoo';
$password = 'Rhaptahess95';
$dbname = 'enzogivernaud_satellite';
//On établit la connexion
$db = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);

//On sélectionne la table utilisateur dans notre base de données, on prépare la requête puis on l'éxécute
$sql = "SELECT * FROM UCS_Satellite_Database_7_1_16";
$result = $db->prepare($sql);
$result->execute();