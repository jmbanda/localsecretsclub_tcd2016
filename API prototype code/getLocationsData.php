<html>
<body>
<?php
	// This script will hit the HERE API 10 x 5 times to mine for close-to places from the initial positionLa and positionLo.
	// The API only allows up to 100 results using the 'next' link, so we re-initialize the search point to the last point found
	// this could be handled better, but as-is it can nicely mine the HERE api to get nice test data
	// NOTE1: the API limits to 100,000 requests per month, so this might max out your account quite quickly.
	// NOTE2: the json for the 'next' results is different and does not contain the 'results'
	$itr=0;
	$positionLa='37.7756433';
	$positionLo='-122.3867432';
	for ($it=0; $it<10; $it++) {
		$url='https://places.demo.api.here.com/places/v1/discover/explore?at='.$positionLa.'%2C'.$positionLo.'&cat=eat-drink&app_id=ctyyJVTr57wPzIjnPujE&app_code=OQeUE3CPY5YXY8AYj5EzAA';
		$response = file_get_contents($url);
		for ($itr0=0; $itr0<5; $itr0++){
			if ($itr0==0) {
		    	$json_a = json_decode($response, true);
		    } else {
			   	if ($itr0>1) {
			   		$response2 = file_get_contents($json_a[next]);
			   	} else {
			   		$response2 = file_get_contents($json_a['results'][next]);
			   	}

		    	$json_a = json_decode($response2, true);
		    }
		    if ($itr0==0) {
				foreach($json_a['results']['items'] as $sd) {
					if (is_null($sd['tags'])) {
							echo $itr .",";
						    echo $sd[title] . ",";
						    echo $sd['category'][title] . ",";
							echo $sd['position'][0] . ",";
						    echo $sd['position'][1] . ",";
						    echo ",";
						    echo "<br>";			
					} else {
						foreach($sd['tags'] as $item) { 
				    		$uses = $item['title']; 
							echo $itr .",";
						    echo $sd[title] . ",";
						    echo $sd['category'][title] . ",";
							echo $sd['position'][0] . ",";
						    echo $sd['position'][1] . ",";
						    echo $uses . ",";
						    echo "<br>";
						    $positionLa=$sd['position'][0];
						    $positionLo=$sd['position'][1];
						}
					}
					$itr++;
				}
			} else {
				foreach($json_a['items'] as $sd) {
					if (is_null($sd['tags'])) {
							echo $itr.",";
						    echo $sd[title] . ",";
						    echo $sd['category'][title] . ",";
							echo $sd['position'][0] . ",";
						    echo $sd['position'][1] . ",";
						    echo ",";
						    echo "<br>";
						    $positionLa=$sd['position'][0];
						    $positionLo=$sd['position'][1];					    	
					} else {
						foreach($sd['tags'] as $item) { 
				    		$uses = $item['title']; 
							echo $itr.",";
						    echo $sd[title] . ",";
						    echo $sd['category'][title] . ",";
							echo $sd['position'][0] . ",";
						    echo $sd['position'][1] . ",";
						    echo $uses . ",";
						    echo "<br>";
						    $positionLa=$sd['position'][0];
						    $positionLo=$sd['position'][1];					    
						}
					}
					$itr++;
				}			
			}
		}
	}

?>
</body>

</html>