import tabOrderDays from './Utilitaire/gestionTemps.js'

const KEYAPI = '779cda7cf1a0456a9c756d8b7fa8fa27';
let resultAPI;
const weather = document.querySelector('.temps')
const temperature = document.querySelector('.temperature')
const location = document.querySelector('.localisation')
const hour = document.querySelectorAll('.heure-prevision-nom')
const weatherForHour = document.querySelectorAll('.heure-prevision-valeur')
const day = document.querySelectorAll('.jour-prevision-nom')
const weatherForDay = document.querySelectorAll('.jour-prevision-temp')
const imgIcon = document.querySelector(".logo-meteo")

const loadIcon = document.querySelector(".overlay-icon-chargement")

if (navigator.geolocation) {
	navigator.geolocation.getCurrentPosition(position => {
		let long = position.coords.longitude
		let lat = position.coords.latitude
		callAPI(long, lat);
	}, () => {
		alert(`Vous avez Refusé la géolocalisation, l'application ne peux pas fonctionner, veuillez l'activer.!`);
	})
}

function callAPI(long, lat) {
	fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=minutely&units=metric&lang=fr&appid=${KEYAPI}`)
		.then((response) => (response.json()))
		.then((data) => {
			console.log(data)
			resultAPI = data;
			weather.innerText = resultAPI.current.weather[0].description;
			temperature.innerText = `${Math.trunc(resultAPI.current.temp)}°`;
			location.innerText = resultAPI.timezone;

			// hour
			let currentHour = new Date().getHours();

			for (let i = 0; i < hour.length; i++) {
				let hourIncr = currentHour + i * 3;

				if (hourIncr > 24) {
					hour[i].innerText = `${hourIncr - 24} h`
				} else if (hourIncr === 24) {
					hour[i].innerText = "00 h"
				} else {
					hour[i].innerText = `${hourIncr} h`
				}
			}

			for (let j = 0; j < weatherForHour.length; j++) {
				weatherForHour[j].innerText = `${Math.trunc(resultAPI.hourly[j * 3].temp)}°`
			}

			//days
			for (let i = 0; i < tabOrderDays.length; i++) {
				day[i].innerText = tabOrderDays[i].slice(0, 3);
			}
			for (let i = 0; i < 7; i++) {
				weatherForDay[i].innerText = `${Math.trunc(resultAPI.daily[i + 1].temp.day)}°`

			}

			//icon dynamic
			if (currentHour >= 6 && currentHour < 20) {
				imgIcon.src = `ressources/jour/${resultAPI.current.weather[0].icon}.svg`
			} else {
				imgIcon.src = `ressources/nuit/${resultAPI.current.weather[0].icon}.svg`
			}

			loadIcon.classList.add('disparition')

		})

}