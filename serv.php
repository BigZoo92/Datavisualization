<?php
//Variables nécessaire à la connexion à la base donnée
$servername = 'localhost';
$username = 'root';//enzogivernaud_bigzoo
$password = ''; //Rhaptahess95
$dbname = 'satellite'; //enzogivernaud_satellite
$tab = array();

$mysqli = mysqli_connect($servername, $username, $password, $dbname);

$sql = mysqli_query($mysqli, "SELECT H_mag, Object_1, MOID_AU, class FROM pha");
while ($all =  mysqli_fetch_assoc($sql)) {
    $tab[] = array('magnitude'=>$all['H_mag'], 'name'=>$all['Object_1'],'distance'=>$all['MOID_AU'], 'danger'=>$all['class']);
}
mysqli_close($mysqli);
echo (json_encode($tab));





