<html>
<head>
	<script src="http://js.api.here.com/v3/3.0/mapsjs-core.js" type="text/javascript" charset="utf-8"></script>
	<script src="http://js.api.here.com/v3/3.0/mapsjs-service.js" type="text/javascript" charset="utf-8"></script>
	<meta name="viewport" content="initial-scale=1.0, width=device-width" />
</head>
<body>
<h2>API SHOWCASE</h2>

<body>
  <div style="width: 640px; height: 480px" id="mapContainer"></div>
  <script>
		var platform = new H.service.Platform({
  			'app_id': 'GE1iiRuLh2VtVIG24xL6',
  			'app_code': 'wP3VKj9zEuunW8iAi8_L3g'
		});
    // Obtain the default map types from the platform object
    var maptypes = platform.createDefaultLayers();

    // Instantiate (and display) a map object:
    var map = new H.Map(
    document.getElementById('mapContainer'),
    maptypes.normal.map,
    {
      zoom: 10,
      center: { lng: 13.4, lat: 52.51 }
    });

	var router = platform.getRoutingService(),
	  routeRequestParams = {
	    mode: 'fastest;car',
	    representation: 'display',
	    routeattributes: 'waypoints,summary,shape,legs',
	    maneuverattributes: 'direction,action',
	    waypoint0: '52.5160,13.3779', // Brandenburg Gate
	    waypoint1: '52.5206,13.3862'  // Friedrichstraße Railway Station
	  };


	router.calculateRoute(
	  routeRequestParams,
	  onSuccess,
	  onError
	);


    
  </script>



<?php

echo "<img src='https://1.base.maps.cit.api.here.com/maptile/2.1/maptile/newest/normal.day/13/4400/2686/256/png8
?app_id=&app_code='>";

?>
</body>
</html>
