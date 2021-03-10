const daysWeek = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche']

let today = new Date();
let options = { weekday: 'long' }

let currentDay = today.toLocaleDateString('fr-FR', options)

currentDay = currentDay.charAt(0).toUpperCase() + currentDay.slice(1)

let tabOrderDays = daysWeek.slice(daysWeek.indexOf(currentDay)).concat(daysWeek.slice(0, daysWeek.indexOf(currentDay)))

export default tabOrderDays