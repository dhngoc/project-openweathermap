function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, errorPosition);
    }else {
    	var position = {};
    	position.coords = {};
    	position.coords.latitude = 10.75;
    	position.coords.longitude = 106.6666667;
    	showPosition(position);
    } 
}

function errorPosition(err) {
	var position = {};
    position.coords = {};
	position.coords.latitude = 10.75;
	position.coords.longitude = 106.6666667;
	showPosition(position);
}

function showPosition(position) {
    var lat =  position.coords.latitude;
    var lng = position.coords.longitude;
   //$.getJSON( "https://api.forecast.io/forecast/1ea780f630a7de9c1121d5a36d396ced/"+lat+"," + lng+"?callback=?", function( data ) {
   $.getJSON( "http://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lng, function( data ) {
   		var today = new Date();
   		var day_today = today.getDay();
   		
    	var list = data.list;
    	var forecast_hour = '';
    	
    	hidePreloader();
    	PieDraw();
    	var icons = [];
    	for(var k in list) {
    		var dt = list[k].dt;
    		var d = new Date(dt * 1000);
    		var day = d.getDay();
    		if (day_today != day) break;
    		var temp = tempKelvinToC(list[k].main.temp);
    		var summary = list[k].weather[0].description;
    		var checked = '';
    		if (k==0) {
    			checked = 'checked';
    		}
    		var hour_str = getHours(d.getHours()) +':' + getMinutes(d.getMinutes());
    		forecast_hour += '<li class="event">';
			forecast_hour +=		'<input type="radio" name="tl-group" ' + checked + '>';
			forecast_hour +=		'<label></label>';
			forecast_hour +=		'<div class="thumb"><div class="hourly">' + hour_str + '</div></div>';
			forecast_hour +=		'<div class="content-perspective">'
			forecast_hour +=			'<div class="content">';
			forecast_hour +=				'<div class="content-inner">';
			forecast_hour +=					'<div class="content-hourly">' + hour_str + '</div>';
			forecast_hour +=					'<div class="sky-icon"><img src="http://openweathermap.org/img/w/' + list[k].weather[0]['icon'] + '.png" /></div>';
			forecast_hour +=					'<div class="weather-info">';
			forecast_hour +=					'<h3>' + temp + '<sup>o</sup>C - ' + summary + '</h3>';
			forecast_hour +=					'<h4>Humidity: ' + (list[k].main.humidity) + ' %</h4>';
			forecast_hour +=					'<h4>Wind Speed: ' + list[k].wind.speed + ' mph</h4>';
			forecast_hour +=					'<p>Pressure: ' + list[k].main.pressure + ' mb</p>';
			forecast_hour +=					'</div>';
			forecast_hour +=				'</div>';
			forecast_hour +=			'</div>';
			forecast_hour +=		'</div>';
			forecast_hour +=	'</li>';
    		

    	}
    	$('.main').append('<ul class="timeline">' + forecast_hour + '</ul>');
    	
    	PieReset();
	});	
  
}

function FtoC(F) {
	var F = parseFloat(F);
	return Math.round((F - 32)  * 5/9);
}

function tempKelvinToC(temp) {
    var F = parseFloat(F);
    return Math.round((temp - 273.15));
}

function getDay(number) {
	var day = '';
	switch(number) {
		case 0:
			day = 'Chủ Nhật';
			break;
		case 1:
			day = 'Thứ Hai';
			break;
		case 2:
			day = 'Thứ Ba';
			break;
		case 3:	
			day = 'Thứ Tư';
			break;
		case 4:
			day = 'Thứ Năm';
			break;
		case 5:
			day = 'Thứ Sáu';
			break;
		case 6:
			day = 'Thứ Bảy';
			break;
	}
	return day;
}

function getHours(number) {
	if (number < 10) return '0' + number;
	else return number;
}

function getMinutes(number) {
	if (number < 10) return '0' + number;
	else return number;
}

function getDate(number) {
	if (number < 10) return '0' + number;
	else return number;	
}

function getMonth(number) {
	number = number + 1;
	if (number < 10) return '0' + number;
	else return number;		
}

function hidePreloader() {
	// Page Preloader
	jQuery('#status').fadeOut();
	jQuery('#preloader').delay(350).fadeOut(function(){
	  jQuery('body').delay(350).css({'overflow':'visible'});
	});
}

function hideHeader() {
	jQuery('header').delay(2000).slideToggle(2000);
}

function skyStatus(sky) {
	var json = {
		'clear-day': 'Clear day',
		'clear-night': 'Clea night',
		'rain': 'Rain',
		'snow': 'Snow',
		'sleet': 'Sleet',
		'wind': 'Wind',
		'fog': 'Fog',
		'cloudy': 'Cloudy',
		'partly-cloudy-day': 'Partly cloudy',
		'partly-cloudy-night': 'Partly cloudy',
		'hail': 'Hail',
		'thunderstorm': 'Thunder storm',
		'tornado': 'Tornado'
	};
	return json[sky];
}