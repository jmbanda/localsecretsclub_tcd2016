<html>
<body>
<?php
	// Get matrix route gets a sorted list of locations based on a cost factor, it can have more than a few locations
	$response = file_get_contents('https://matrix.route.cit.api.here.com/routing/7.2/calculatematrix.json?app_id=GE1iiRuLh2VtVIG24xL6&app_code=wP3VKj9zEuunW8iAi8_L3g&start0=52.5,13.4&destination0=52.5,13.43&destination1=52.5,13.46&mode=fastest;pedestrian;traffic:disabled');
    echo $response;
?>
</body>

</html>