<html>
<body>
<?php
	// Get matrix route gets a sorted list of locations based on a cost factor, it can have more than a few locations
	// Example uses userPosition_La, userPosition_Lo as start and the targetSite1 and 2 for comparison
	$userPosition_La='37.7756433';
	$userPosition_Lo='-122.3867432';
	$targetSite1_La='37.78167';
	$targetSite1_Lo='-122.40998';
	$targetSite2_La='37.807468';
	$targetSite2_Lo='-122.417824';	
	$response = file_get_contents('https://matrix.route.cit.api.here.com/routing/7.2/calculatematrix.json?app_id=GE1iiRuLh2VtVIG24xL6&app_code=wP3VKj9zEuunW8iAi8_L3g&start0='.$userPosition_La.','.$userPosition_Lo.'&destination0='.$targetSite1_La.','.$targetSite1_Lo.'&destination1='.$targetSite2_La.','.$targetSite2_Lo.'&mode=fastest;pedestrian;traffic:disabled');
    echo $response;
?>
</body>

</html>