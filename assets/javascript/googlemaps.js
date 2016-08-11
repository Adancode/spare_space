var map;
var geocoder;

function getDefaultLocation(){
	if(navigator.geolocation){
		return navigator.geolocation.getCurrentPosition(showPosition);
	}
}

function showPosition(position){
	return position.coords.latitude;
}

function initMap(){
	geocoder = new google.maps.Geocoder();
	map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: 30.2672, lng: -97.7431},
		zoom: 10
	});

	var searchListDiv = document.getElementById('searchList');
	var children = searchListDiv.children;

	{{#if user}}
		{{#each user.space}}
			var address = "{{this.address}}";
			var markerInfo = '<div class="markerInfo" style="width: 200px, height:200px">' +
				'{{this.type}}<br>{{this.address}}<br>{{this.price}} / month';

			var markerTitle = {{this.id}};

			var infoWindow = new google.maps.InfoWindow({
				content: markerInfo
			});

			geocoder.geocode({'address': address}, function(results, status){
				if(status == 'OK'){
					var marker = new google.maps.Marker({
						map: map,
						position: results[0].geometry.location,
						label: "R",
						title: markerTitle
					});
					marker.addListener('click', function(){
						infoWindow.open(map, marker);
					});
				}
			});
		{{/each}}
	{{else}}
		{{#each space}}
			var address = "{{this.address}}";
			var markerInfo = '<div class="markerInfo" style="width: 200px, height:200px">' +
				'{{this.type}}<br>{{this.address}}<br>{{this.price}} / month';

			var markerTitle = {{this.id}};

			var infoWindow = new google.maps.InfoWindow({
				content: markerInfo
			});

			geocoder.geocode({'address': address}, function(results, status){
				if(status == 'OK'){
					var marker = new google.maps.Marker({
						map: map,
						position: results[0].geometry.location,
						label: "R",
						title: markerTitle
					});
					marker.addListener('click', function(){
						infoWindow.open(map, marker);
					});
				}
			});
		{{/each}}
	{{/if}}

	/*for(var i = 0; i < children.length; i++){
		var address = children[i].children[2].children[0].innerHTML;
		address = address.substring(9, address.length);

		var markerInfo = '<div class="markerInfo" style="width: 200px, height: 200px">' +
			children[i].children[1].innerHTML + '<br>' +
			children[i].children[5].innerHTML + '<br>' +
			children[i].children[6].innerHTML;

		var markerTitle = children[i].children[1].innerHTML;

		var infoWindow = new google.maps.InfoWindow({
			content: markerInfo
		});

		geocoder.geocode({'address': address}, function(results, status){
			if(status == 'OK'){
				var marker = new google.maps.Marker({
					map: map,
					position: results[0].geometry.location,
					label: "R",
					title: markerTitle
				});
				marker.addListener('click', function(){
					infoWindow.open(map, marker);
				});
			}
		});
	}*/
}