<html>
<body>
<?php
	// Get matrix route gets a sorted list of locations based on a cost factor, it can have more than a few locations
	$response = file_get_contents('https://places.demo.api.here.com/places/v1/discover/explore?at=37.7756433%2C-122.3867432&cat=eat-drink&app_id=GE1iiRuLh2VtVIG24xL6&app_code=wP3VKj9zEuunW8iAi8_L3g');
    echo $response;
?>
</body>

</html>