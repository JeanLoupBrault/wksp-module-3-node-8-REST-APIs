let wordId;
let letterCount;
console.log('wordId', wordId);

function startGame() {
    console.log('hi');
    fetch('/hangman/words', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json"
        }
    })
        .then(res => {

            console.log('wordsRes: ', res)
            return res.json()
        })

        .then(res => {
            console.log('Res: ', res)
            wordId = res.id
            letterCount = res.letterCount
        })

}

startGame()

function clickLetter(event) {
    event.preventDefault()
    console.log('HI: ', event.target.value)
    console.log('HI: ', wordId)
    let letter = event.target.value;

    fetch(`/hangman/guess/${wordId}/${letter}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json"
        }
    })
}

function guessedLtrInWord() {
    console.log('hi hi');
    fetch('/hangman/guess/:wordId/:letter', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json"
        }
    })
        .then(res => {
            console.log('guessRes: ', res)
            res.json()
        })

        .then(res => {
            console.log('Res: ', res)
        });
}

guessedLtrInWord()
