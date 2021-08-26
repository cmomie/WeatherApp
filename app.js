catch(err) {
        console.log(err);
    }

window.addEventListener('load', ()=> {
    let long; 
    let lat; 
    let temperatureDescription = document.querySelector('.temperature-description')
    let temperatureDegree = document.querySelector('.temperature-degree')
    let locationTimezone = document.querySelector('.location-timezone')
    let locationCountry = document.querySelector('.location-country')
    
    
    if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
        console.log(position);
        long = position.coords.longitude
        lat = position.coords.latitude; 
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
  
  
        loc = urlParams.get('ship-address')
  
        if (loc != null) {
    
        const api = `http://api.weatherapi.com/v1/current.json?key=b9064051088d4f3ba6785409210407&q=${loc}&aqi=no`
        //const api = `http://api.weatherapi.com/v1/current.json?key=b9064051088d4f3ba6785409210407&q=${lat},${long}&aqi=no`
  
        fetch(api)
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log(data);
            console.log(data.current.feelslike_c);
            console.log(data.current.condition.text);
            console.log(data.location.name);
            console.log(data.location.region);
            console.log(data.location.country);
            var epoch =data.current.last_updated_epoch;
            var d = new Date(0);
            d.setUTCSeconds(epoch);
            var hour_now = d.getHours();
    
    
            temperatureDegree.textContent = data.current.feelslike_c;
            temperatureDescription.textContent = data.current.condition.text;
            locationTimezone.textContent = "The weather in " + data.location.name + ", "+ data.location.country + " is:";
            var hours = parseInt((new Date()).getHours());
    
            icon_text = data.current.condition.text
    
            clouds = /Cloudy|Overcast/
            light_clouds = /Partly cloudy/
    
            rains = /Heavy rain at times|Heavy rain|Torrential rain shower|Moderate or heavy rain with thunder/
            light_rains = /Patchy rain possible|Thundery outbreaks possible|Patchy light drizzle|Light drizzle|Patchy light rain|Light rain|Moderate rain at times|Moderate rain|Light rain shower|Patchy light rain with thunder|sleet|Sleet/
            wind = /Blizzard/
            fog = /Mist|Fog|Freezing fog/
            snow = /snow|Snow|ice|Ice|freezing|Freezing/
    
            var icons = new Skycons({"color": "white"});
            if (icon_text == 'Sunny') {
              currentIcon = 'CLEAR_DAY'
              icons.set(document.querySelector(".icons"), currentIcon);
              console.log('1');
    
            } else if (icon_text == 'Clear') {
              const currentIcon = 'CLEAR_NIGHT'
              icons.set(document.querySelector(".icons"), currentIcon);
              console.log('2');
    
    
            }else if (clouds.test(icon_text))  {
              const currentIcon = 'CLOUDY'
              icons.set(document.querySelector(".icons"), currentIcon);
              console.log('3');
    
    
            } else if (rains.test(icon_text)) {
              const currentIcon = 'RAIN'
              icons.set(document.querySelector(".icons"), currentIcon);
              console.log('4');
    
    
            } else if (light_clouds.test(icon_text) && hour_now>18){
              const currentIcon = 'PARTLY_CLOUDY_NIGHT'
              icons.set(document.querySelector(".icons"), currentIcon);
              console.log('5');
    
    
            } else if (light_clouds.test(icon_text)){
              const currentIcon = 'PARTLY_CLOUDY_DAY'
              icons.set(document.querySelector(".icons"), currentIcon);
              console.log('6');
    
    
            } else if (light_rains.test(icon_text)) {
              const currentIcon = 'SLEET'
              icons.set(document.querySelector(".icons"), currentIcon);
              console.log('7');
    
            } else if (fog.test(icon_text)) {
              const currentIcon = 'FOG'
              icons.set(document.querySelector(".icons"), currentIcon);
              console.log('8');
    
    
            } else if (snow.test(icon_text)) {
              const currentIcon = 'SNOW'
              icons.set(document.querySelector(".icons"), currentIcon);
              console.log('pouet');
    
    
          } 
    
          icons.play();
    
    
    
    
    
    
    
    
        });
      }; 
    
    });
    
    
    } else{
        h1.textContent = "hey please unable your location, maybe your browser does not support it"
    }
    
      
    });
    