const input = document.getElementById("input");
const submit = document.getElementById("submit");
const temp = document.getElementById("temp");
const Humidity = document.getElementById("Humidity");
const emoji = document.getElementById("emoji");
const error = document.getElementById("error");
const wind=document.getElementById("wind");
const cityname=document.getElementById("name");
const contain=document.getElementById("contain");
const container=document.getElementById("container");
const errordisplay = document.getElementById("errordisplay");

submit.addEventListener('click', () => {
    let weatherinput = input.value.toLowerCase();
    const apikey = 'abf56952a8920f7e78dd661a2d335a20'; //api needs to be changed
    const weather_data = `http://api.openweathermap.org/data/2.5/weather?q=${weatherinput}&appid=${apikey}`;

    fetch(weather_data)
        .then(response => {
            if (!response.ok) {
                
                 errordisplay.style.display="block";
                 container.style.display="none";
                throw new Error('Network response was not ok: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            if (data.main && data.main.temp && data.weather && data.weather.length > 0) {
                console.log(data);
                errordisplay.style.display = "none";
                const tempInCelsius = data.main.temp - 273.15;
                container.style.display="block";
                temp.textContent=`Temperature: ${tempInCelsius.toFixed(2)}°C`;
                Humidity.textContent=`Humidity: ${data.main.humidity}%`;
                wind.textContent=`Wind Speed: ${data.wind.speed}`;
                cityname.textContent=`Name: ${data.name}`;

                const tempIcon = document.createElement('i');
                const humidityicon=document.createElement('i');
                const windicon = document.createElement('i');
                
            tempIcon.className = "fa-solid fa-temperature-three-quarters";
            humidityicon.className="fa-solid fa-droplet";
            windicon.className="fa-solid fa-wind";
            tempIcon.style.marginLeft = "10px";
            humidityicon.style.marginLeft = "10px";
            windicon.style.marginLeft = "10px"; 
            
            temp.appendChild(tempIcon);
            Humidity.appendChild(humidityicon);
            wind.appendChild(windicon);

                const weatherCondition = data.weather[0].main;
                switch (weatherCondition) {
                    case "Rain":
                        emoji.textContent = "🌧️";
                        break;
                    case "Clear":
                        emoji.textContent = "☀️";
                        break;
                    case "Clouds":
                        emoji.textContent = "☁️";
                        break;
                    case "Snow":
                        emoji.textContent = "❄️";
                        break;
                    case "Thunderstorm":
                        emoji.textContent = "⛈️";
                        break;
                    default:
                        emoji.textContent = "🌦️"; 
                }
                

            }
            
        })
        .catch(error => console.error('Error:', error));
       

});