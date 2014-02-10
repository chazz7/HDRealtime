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
			url = "data"
			$.get(url, function(data){
				if (data.success) {
					callData = data.calls;
					homeData = data.homes;
					peopleData = data.people;
					// alert("Data Loaded!");
				}
			});
		}
		getData();

		var reset = function() {
			clearInterval(timer); timer = null;
			heatmap.setData([]);
			values = [];
			isPaused = false;
			isRunning = false;
			currentIndex = 0;
		}

		var isFinished = function() {
			if (!data.length) { return true; }
			item = data[0]
			// console.log(item);
			values = item.values;
			// console.log(values);
			// console.log(currentIndex);
			if (currentIndex >= values.length) { return true; }

			return false;
		}

		var onTick = function() { 
			console.log("ticked");
			var heatmapData = [];
			if (isFinished()) { reset(); return; }
			for (x =0; x < data.length; x++) {
				var item = data[x];
				lat = item.latitude;
				lng = item.longitude;
				values = item.values;
				val = values[currentIndex]/5.0;
				// console.log(val);
				var point = {location: new google.maps.LatLng(lat,lng), weight: val};
				if (point == undefined || lat == undefined || lng == undefined) {
					console.log("we got one");
					console.log(point);
					continue;
				}
				heatmapData.push(point);
			};
			// console.log(heatmapData);
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
			console.log(data);
			changeLabel("Calls");
		});

		var home = $('<div>');
		home.addClass('button2');
		home.addClass('home');
		$('#buttons').append(home);
		home.click(function() {
			reset();
			data = homeData;
			console.log(data);
			changeLabel("DivHome");
		});

		var people = $('<div>');
		people.addClass('button2');
		people.addClass('people');
		$('#buttons').append(people);
		people.click(function() {
			reset();
			data = peopleData;
			console.log(data)
			changeLabel("DivPeople");
		});

		var play = $('<div>');
		play.addClass('button2');
		play.addClass('play');
		$('#buttons').append(play);
		play.click(function() {
			if (!isRunning && data.length) {
				console.log("yeauhp");
				timer = window.setInterval(onTick,1500);
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
	var mexico = new google.maps.LatLng(19.427512, -99.19574399999999);

  var mapOptions = {
    center: mexico,
    zoom: 11
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
  heatmap.set('radius', 5);
  
  var mapView = new MapView(heatmap, map);
  mapView.initButtons();
  
}

google.maps.event.addDomListener(window, 'load', initialize);


// alert("hi");
// }
// google.maps.event.addDomListener(window, 'load', initialize);