// alert("hello");
// google.maps.event.addDomListener(window, 'load', initialize);
// $(document).ready(function () {	
// 	// var stickyBoard = new StickyBoard();
// 	// stickyBoard.initStickies();
// 	// stickyBoard.initButtons();
// 	// var mapView = new MapView();
// 	// mapView.initialize();
// 	// initialize()
// 	alert("hello");
// 	google.maps.event.addDomListener(window, 'load', initialize);
// });

// var MapView = function() {

	// this.initialize = function() {
		
var MapView = function(heatmap, map) {	

	var data = []
	var callData = [];
	var homeData = [];
	var peopleData = [];

	var timer = null;
	var	isPaused = false;
	var isRunning = false;
	var currentIndex = 0;

	this.initButtons = function() {
		var label = $('<div>');
		$('#buttons').append(label);
		label.addClass('label');
		
		var changeLabel = function(mode) {
			label.text("Current Mode: " + mode);
		}

		var getData = function() {
			$.get(url, function(data){
				if (data.success) {
					callData = data.calls;
					homeData = data.home;
					peopleData = data.people;
					alert("Data Loaded!");
				}
			});
		}

		var reset = function() {
			clearInterval(timer); timer = null;
			values = [];
			isPaused = false;
			isRunning = false;
			currentIndex = 0;
		}

		var isFinished = function() {
			if (!data) { return true; }

			item = data[0]
			values = item.values;
			if (currentIndex >= values.length) { return true; }

			return false;
		}

		var onTick = function() { 
			var heatmapData = [];
			if (isFinished) { reset(); return; }
			if (currentIndex == data.)
			for (x =0; x < data.length; x++) {
				var item = data[x];
				lat = item.latitude;
				lng = item.longitude;
				values = item.values;
				val = values[currentIndex];
				var point = {location: new google.maps.LatLng(lat,lng), weight: val};
				heatmapData.push(point);
			};
			console.log(heatmapData);
			heatmap.setData(heatmapData);
			currentIndex++;
		}	

		var calls = $('<div>');
		calls.addClass('button2');
		calls.addClass('calls');
		$('#buttons').append(calls);
		calls.click(function() {
			reset();
			data = callData;
			changeLabel("Calls");
		});

		var home = $('<div>');
		home.addClass('button2');
		home.addClass('home');
		$('#butotns').append(home);
		home.click(function() {
			reset();
			data = homeData;
			changeLabel("DivHome");
		});

		var people = $('<div>');
		people.addClass('button2');
		$('#buttons').append(people);
		people.click(function() {
			reset();
			data = peopleData;
			changeLabel("DivPeople");
		});

		var play = $('<div>');
		play.addClass('button2');
		play.addClass('play');
		$('#buttons').append(play);
		play.click(function() {
			if (!isRunning && values.length) {
				timer = setInterval(onTick,1500);
			}
			isRunning = true;
		});

		var pause = $('<div>');
		pause.addClass('button2');
		pause.addClass('pause');
		$('#buttons').append(pause);
		pause.click(function() {
			clearInterval(timer);
			isRunning = false;
		});

		var clear = $('<div>')
		clear.addClass('button2');
		clear.addClass('clear');
		$('#buttons').append(clear);
		clear.click(function() {
			reset();
		});
	}
}

initialize = function() {
	// function changeGradient() {
	  var gradient = [
	    'rgba(0, 255, 255, 0)',
	    'rgba(0, 255, 255, 1)',
	    'rgba(0, 191, 255, 1)',
	    'rgba(0, 127, 255, 1)',
	    'rgba(0, 63, 255, 1)',
	    'rgba(0, 0, 255, 1)',
	    'rgba(0, 0, 223, 1)',
	    'rgba(0, 0, 191, 1)',
	    'rgba(0, 0, 159, 1)',
	    'rgba(0, 0, 127, 1)',
	    'rgba(63, 0, 91, 1)',
	    'rgba(127, 0, 63, 1)',
	    'rgba(191, 0, 31, 1)',
	    'rgba(255, 0, 0, 1)'
	  ]
	  
	// }
	var heatmapData = [
	  new google.maps.LatLng(37.782, -122.447),
	  new google.maps.LatLng(37.782, -122.445),
	  new google.maps.LatLng(37.782, -122.443),
	  new google.maps.LatLng(37.782, -122.441),
	  new google.maps.LatLng(37.782, -122.439),
	  new google.maps.LatLng(37.782, -122.437),
	  new google.maps.LatLng(37.782, -122.435),
	  new google.maps.LatLng(37.785, -122.447),
	  new google.maps.LatLng(37.785, -122.445),
	  new google.maps.LatLng(37.785, -122.443),
	  new google.maps.LatLng(37.785, -122.441),
	  new google.maps.LatLng(37.785, -122.439),
	  new google.maps.LatLng(37.785, -122.437),
	  new google.maps.LatLng(37.785, -122.435)
	];
// // 42.3736° N, 71.1106
	var cambridge = new google.maps.LatLng(42.3736, -71.1106);


  var mapOptions = {
    center: sanFrancisco,
    zoom: 12
  };
  var map = new google.maps.Map(document.getElementById("map-canvas"),
      mapOptions);
  
  var heatmap = new google.maps.visualization.HeatmapLayer({
    data: heatmapData
  });
  heatmap.setMap(map);
  heatmap.set('gradient', gradient);
// }

// function changeRadius() {
  heatmap.set('radius', 20);
  
  var mapView = new MapView(heatmap, map);
  mapView.initButtons();
  
}

google.maps.event.addDomListener(window, 'load', initialize);


// alert("hi");
// }
// google.maps.event.addDomListener(window, 'load', initialize);