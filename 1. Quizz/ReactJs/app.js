
const ResultQuizz = ({ result }) => {
	const { titleResult, noteResult, helpResult } = result
	return (
		<div className="results">
			<h2>{titleResult ? titleResult : "Cliquez sur valider pour voir les résultats."}</h2>
			<p className="help">{noteResult}</p>
			<p className="note">{helpResult}</p>
		</div>
	)
}

const InputQuizz = (props) => {
	return (
		<div>
			<input type="radio" name={props.name} value={props.value} defaultChecked={props.checked} />
			<label>{props.label}</label>
		</div>
	)
}
const FormQuizz = (props) => {
	// CHANGE Color Of Block after result (white)

	const allQuestionsBlock = document.querySelectorAll('.question-block')
	allQuestionsBlock.forEach(item => {

		item.addEventListener('click', () => {
			console.log(item)
			item.style.background = "white"
		})
	})
	return (
		<form className="form-quizz" onSubmit={props.handleSubmit} >
			<div className="question-block">
				<h4>Qui est l'empereur de France le 2 décembre 1804 ? </h4>
				<InputQuizz name="q1" value="a" checked={true} label="Clovis" />
				<InputQuizz name="q1" value="b" checked={false} label="Abraham Lincoln" />
				<InputQuizz name="q1" value="c" checked={false} for="Napoleon Bonaparte" />
			</div>

			<div className="question-block">
				<h4>Quelle est la date d'indépendance des États-Unis ?</h4>
				<InputQuizz name="q2" value="a" checked={true} label="4 juillet 1776" />
				<InputQuizz name="q2" value="b" checked={false} label="18 avril 1856" />
				<InputQuizz name="q2" value="c" checked={false} label="30 juin 1925" />
			</div>

			<div className="question-block">
				<h4>La chute de l'empire Romain se situe en ?</h4>
				<InputQuizz name="q3" value="a" checked={true} label="15 ap. J.-C." />
				<InputQuizz name="q3" value="b" checked={false} label="395 ap. J.-C." />
				<InputQuizz name="q3" value="c" checked={false} label="-740 av. J.-C." />
			</div>


			<div className="question-block">
				<h4>Quelle est la capitale de la Slovénie ?</h4>
				<InputQuizz name="q4" value="a" checked={true} label="Ljubljana" />
				<InputQuizz name="q4" value="b" checked={false} label="Belgrade" />
				<InputQuizz name="q4" value="c" checked={false} label="Bratislava" />
			</div>
			<div className="question-block">
				<h4>Combien d'habitants compte l'Irlande en 2020 ?.</h4>
				<InputQuizz name="q5" value="a" checked={true} label="1,365 Million" />
				<InputQuizz name="q5" value="b" checked={false} label="21 Millions" />
				<InputQuizz name="q5" value="c" checked={false} label="4,9 Millions" />
			</div>

			<button type="submit">Validez vos choix !</button>
		</form>
	)
}

const Quizz = () => {
	const response = ['c', 'a', 'b', 'a', 'c'];

	let tableResults = []
	let verifTable = []

	const [result, setResult] = React.useState({})


	const handleSubmit = (e) => {
		e.preventDefault();
		for (let i = 1; i < 6; i++) {
			tableResults.push(document.querySelector(`input[name="q${i}"]:checked`).value)
		}
		// COMPARE Results with Response
		compareResultWithResponse(tableResults);

		// RESET Array
		tableResults = []
	}

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
				result.titleResult = "✔️ Bravo, c'est un sans faute ! ✔️"
				result.helpResult = ""
				result.noteResult = "5/5"
				break;
			case 1:
				result.titleResult = `✨ Vous y êtes presque ! ✨`
				result.helpResult = 'Retentez une autre réponse dans la case rouge, puis re-validez !'
				result.noteResult = '4/5'
				break;
			case 2:
				result.titleResult = `✨ Encore un effort ... 👀`
				result.helpResult = 'Retentez une autre réponse dans les cases rouges, puis re-validez !'
				result.noteResult = '3/5'
				break;
			case 3:
				result.titleResult = `👀 Il reste quelques erreurs. 😭`
				result.helpResult = 'Retentez une autre réponse dans les cases rouges, puis re-validez !'
				result.noteResult = '2/5'
				break;
			case 4:
				result.titleResult = `😭 Peux mieux faire ! 😭`
				result.helpResult = 'Retentez une autre réponse dans les cases rouges, puis re-validez !'
				result.noteResult = '1/5'
				break;
			case 5:
				result.titleResult = `👎 Peux mieux faire ! 👎`
				result.helpResult = 'Retentez une autre réponse dans les cases rouges, puis re-validez !'
				result.noteResult = '0/5'
				break;
		}

		setResult({ ...result })
	}

	const colorsResults = (tabValBool) => {
		const allQuestionsBlock = document.querySelectorAll('.question-block')
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

	return (
		<div>
			<h1>Quizz culture Générale !</h1>
			<div className="container">
				<FormQuizz handleSubmit={handleSubmit} />
				<ResultQuizz result={result} />
			</div>
		</div>
	)

}


ReactDOM.render(
	<Quizz />,
	document.getElementById('app')
);
