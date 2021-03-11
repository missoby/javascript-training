const searchInput = document.querySelector('.recherche-poke input');
const listPoke = document.querySelector('.liste-poke')
const loader = document.querySelector('.loader')

let allPokemon = []
let endTable = []
let index = 21

const types = {
	grass: '#78c850',
	ground: '#E2BF65',
	dragon: '#6F35FC',
	fire: '#F58271',
	electric: '#F7D02C',
	fairy: '#D685AD',
	poison: '#966DA3',
	bug: '#B3F594',
	water: '#6390F0',
	normal: '#D9D5D8',
	psychic: '#F95587',
	flying: '#A98FF3',
	fighting: '#C25956',
	rock: '#B6A136',
	ghost: '#735797',
	ice: '#96D9D6'
};

function firstfetchPokemon() {
	fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
		.then(response => response.json())
		.then(data =>
			//console.log(data)
			data.results.forEach((pokemon) => {
				fetchPokemonComplet(pokemon)
			})
		)
}

firstfetchPokemon()

function fetchPokemonComplet(pokemon) {
	let objPokemonFull = {}
	let url = pokemon.url.slice(0, -1)

	let namePokemon = pokemon.name

	fetch(url).then(response => response.json())
		.then(pokeData => {
			objPokemonFull.pic = pokeData.sprites.front_default
			objPokemonFull.type = pokeData.types[0].type.name
			objPokemonFull.id = pokeData.id

			fetch(`https://pokeapi.co/api/v2/pokemon-species/${namePokemon}`)
				.then(response => response.json())
				.then(data => {
					objPokemonFull.name = data.names[4].name
					allPokemon.push(objPokemonFull)

					if (allPokemon.length === 151) {
						endTable = allPokemon.sort((a, b) => a.id - b.id).slice(0, 21)
						createCard(endTable)
					}
				})
		})

	loader.style.display = "none"
}

function createCard(arr) {
	for (let i = 0; i < arr.length; i++) {

		const card = document.createElement("li")
		const txtCard = document.createElement("h5")
		const idCard = document.createElement("p")
		const imgCard = document.createElement("img")


		let color = types[arr[i].type]

		card.style.background = color
		txtCard.innerText = arr[i].name
		idCard.innerText = `ID# ${arr[i].id}`
		imgCard.src = arr[i].pic
		card.appendChild(imgCard)
		card.appendChild(txtCard)
		card.appendChild(idCard)

		listPoke.appendChild(card)
	}
}

//scroll infinie
window.addEventListener('scroll', () => {

	// scroll depuis le top, scroll total, hauteur de la fenêtre
	const { scrollTop, scrollHeight, clientHeight } = document.documentElement

	if (clientHeight + scrollTop >= scrollHeight - 20) {
		addPoke(6)

	}
})



function addPoke(nbr) {

	if (index > 151) { return }

	const arrToAdd = allPokemon.slice(index, index + nbr)
	createCard(arrToAdd)

	index += nbr

}

// recherche

searchInput.addEventListener("keyup", (e) => {
	if (index < 151) {
		addPoke(130);
	}
	let filter, allLi, titleValue, allTitles
	filter = searchInput.value.toUpperCase()
	allLi = document.querySelectorAll('li')
	allTitles = document.querySelectorAll('li h5')

	for (let i = 0; i < allLi.length; i++) {
		titleValue = allLi[i].innerText
		if (titleValue.toUpperCase().indexOf(filter) > -1) {
			allLi[i].style.display = 'flex'
		}
		else {
			allLi[i].style.display = 'none'
		}

	}
})


// Animation Input
searchInput.addEventListener('input', (e) => {
	if (e.target.value !== "") {
		e.target.parentNode.classList.add('active-input')
	} else if (e.target.value === "") {
		e.target.parentNode.classList.remove('active-input')
	}

})