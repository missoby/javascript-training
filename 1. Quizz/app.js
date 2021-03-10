const form = document.querySelector('.form-quizz');
const titleResult = document.querySelector('.results h2');
const helpResult = document.querySelector('.help');
const noteResult = document.querySelector('.note');
const allQuestionsBlock = document.querySelectorAll('.question-block')

const response = ['c', 'a', 'b', 'a', 'c'];

let verifTable = []
let tableResults = []

form.addEventListener('submit', (e) => {
	e.preventDefault();

	// GET Checked INPUT
	for (let i = 1; i < 6; i++) {
		tableResults.push(document.querySelector(`input[name="q${i}"]:checked`).value)
	}

	// COMPARE Results with Response
	compareResultWithResponse(tableResults);

	// RESET Array
	tableResults = []

})

function compareResultWithResponse(tabResult) {
	for (let a = 0; a < 5; a++) {
		if (tabResult[a] === response[a]) {
			verifTable.push(true)
		} else {
			verifTable.push(false)
		}
	}

	// DISPLAY Results of Quizz
	displayResults(verifTable);

	// CHANGE Colors of Blocks (Green / Red)
	colorsResults(verifTable);

	verifTable = []
}

function displayResults(tabCheck) {
	const nbrFault = tabCheck.filter(el => el !== true).length;
	switch (nbrFault) {
		case 0:
			titleResult.innerHTML = "✔️ Bravo, c'est un sans faute ! ✔️"
			helpResult.innerHTML = ""
			noteResult.innerHTML = "5/5"
			break;
		case 1:
			titleResult.innerText = `✨ Vous y êtes presque ! ✨`
			helpResult.innerText = 'Retentez une autre réponse dans la case rouge, puis re-validez !'
			noteResult.innerText = '4/5'
			break;
		case 2:
			titleResult.innerText = `✨ Encore un effort ... 👀`
			helpResult.innerText = 'Retentez une autre réponse dans les cases rouges, puis re-validez !'
			noteResult.innerText = '3/5'
			break;
		case 3:
			titleResult.innerText = `👀 Il reste quelques erreurs. 😭`
			helpResult.innerText = 'Retentez une autre réponse dans les cases rouges, puis re-validez !'
			noteResult.innerText = '2/5'
			break;
		case 4:
			titleResult.innerText = `😭 Peux mieux faire ! 😭`
			helpResult.innerText = 'Retentez une autre réponse dans les cases rouges, puis re-validez !'
			noteResult.innerText = '1/5'
			break;
		case 5:
			titleResult.innerText = `👎 Peux mieux faire ! 👎`
			helpResult.innerText = 'Retentez une autre réponse dans les cases rouges, puis re-validez !'
			noteResult.innerText = '0/5'
			break;
	}

}

function colorsResults(tabValBool) {

	for (let j = 0; j < tableResults.length; j++) {
		if (tabValBool[j] === true) {
			allQuestionsBlock[j].style.background = 'lightgreen'

		}
		else {
			allQuestionsBlock[j].style.background = '#ffb8b8'
			allQuestionsBlock[j].classList.add("echec")

			setTimeout(() => {
				allQuestionsBlock[j].classList.remove("echec")
			}, 500)
		}

	}
}

// CHANGE Color Of Block after result (white)

allQuestionsBlock.forEach(item => {
	item.addEventListener('click', () => {
		item.style.background = "white"
	})
})