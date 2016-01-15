var weather = {
  lang: config.lang,
  params: config.weather.params,
  iconTable: {
    '01d':'wi-day-sunny',
		'02d':'wi-day-cloudy',
		'03d':'wi-cloudy',
		'04d':'wi-cloudy-windy',
		'09d':'wi-showers',
		'10d':'wi-rain',
		'11d':'wi-thunderstorm',
		'13d':'wi-snow',
		'50d':'wi-fog',
		'01n':'wi-night-clear',
		'02n':'wi-night-cloudy',
		'03n':'wi-night-cloudy',
		'04n':'wi-night-cloudy',
		'09n':'wi-night-showers',
		'10n':'wi-night-rain',
		'11n':'wi-night-thunderstorm',
		'13n':'wi-night-snow',
		'50n':'wi-night-alt-cloudy-windy'
  },
  temperatureLocation: '.temp',
  forcastLocation: '.forcast',
  apiBase: 'http://api.openweathermap.org/data/',
  apiVersion: '2.5',
  weatherEndpoint: 'weather',
  forcastEndpoint: 'forcast/daily',
  updateInterval: 6000,
  fadeInterval: 1000,
  intervalID: null
};

weather.roundValue = function(temperature){
  return parseFloat(temperature).toFixed(1);
};

weather.updateCurrentWeather = function() {

  $.ajax({
    type: 'GET',
    url: weather.apiBase + weather.apiVersion + '/' + weather.weatherEndpoint,
    dataType: 'JSON',
    data: weather.params,
    success: function(data){
      var _temperature = this.roundValue(data.main.temp),
        _temperatureMin = this.roundValue(data.main.temp_min),
        _temperatureMax = this.roundValue(data.main.temp_max),
        _iconClass = this.iconTable[data.weather[0].icon];
        console.log(data.weather[0].icon);
      var _icon = '<i class="wi ' + _iconClass + '"></i>' + _temperature + '&deg; F';

      $(this.temperatureLocation).updateWithText(_icon, this.fadeInterval);

    }.bind(this),
      error: function(){
        //do nothing
      }
  });
};

weather.init = function() {
  if(this.params.lang === undefined){
    this.params.lang = this.lang;
  }

  if(this.params.count === undefined){
    this.params.count = 2;
  }

  this.intervalID = setInterval(function(){
    this.updateCurrentWeather();
  }.bind(this), this.updateInterval);
};
