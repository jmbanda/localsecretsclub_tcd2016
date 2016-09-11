<html>
<body>
<?php
	//Get Site info:
	$location_La="37.7761432";
	$location_Lo="-122.3896517";
	$location_Name="butler chef";
	$response = file_get_contents('https://places.cit.api.here.com/places/v1/discover/search?app_id=ctyyJVTr57wPzIjnPujE&app_code=OQeUE3CPY5YXY8AYj5EzAA&at='.$location_La.','.$location_Lo.'&q='.$location_Name.'');
	echo $response;
?>
</body>
</html>