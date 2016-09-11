<html>
<body>
<?php

function searchImage($search){

$url="http://www.bing.com/images/search?pq=".urlencode(strtolower($search))."&count=1&q=".urlencode($search);
$data=file_get_contents($url);
//echo var_dump($data);
$rr=explode("<div class=\"item\">", $data);
//echo var_dump($rr);
$execc="";
for($r=2;$r<3;$r++){
    $nf=explode("\"", $rr[$r]);
    $nextFil=$nf[5];
    //echo var_dump($nf[5]).'<br>';
 } 
return $nextFil;
}

$handle = fopen("sites.txt", "r");
    while (($line = fgets($handle)) !== false) {
        $query_res_var=searchImage($line);
        echo $line.','.$query_res_var.'<br>';
		//echo "<img src=".$query_res_var.">";
    }



//echo var_dump($query_res_var);
echo "<img src=".$query_res_var.">";
//$img = '15 Romolo.png';
//file_put_contents($img, file_get_contents($query_res_var));
?>
</body>
</html>