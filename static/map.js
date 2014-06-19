initialize = function() {
	// alert("starting");
	var mapOptions = {
	    zoom: 3,
	    center: new google.maps.LatLng(0, -180),
	    mapTypeId: google.maps.MapTypeId.TERRAIN
	  };
	  // alert("still going");
	  var map = new google.maps.Map(document.getElementById('map-canvas'),
	      mapOptions);

	  var flightPlanCoordinates = [
	    new google.maps.LatLng(37.772323, -122.214897),
	    new google.maps.LatLng(21.291982, -157.821856),
	    new google.maps.LatLng(-18.142599, 178.431),
	    new google.maps.LatLng(-27.46758, 153.027892)
	  ];

	  // alert("we are crazy");
	  var flightPath = new google.maps.Polyline({
	    path: flightPlanCoordinates,
	    geodesic: true,
	    strokeColor: '#FF0000',
	    strokeOpacity: 1.0,
	    strokeWeight: 2
	  });

	  alert("i don't even know")

	  flightPath.setMap(map);
	  console.log(map);
	  alert(map);
}

google.maps.event.addDomListener(window, 'load', initialize);
