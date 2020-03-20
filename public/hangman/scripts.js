
let wordId;
let letterCount;
console.log('wordId: ', wordId);
const guessWordDiv = document.getElementById("guess-word");

function startGame() {
    console.log('hi');
    fetch('http://localhost:8000/hangman/words', {
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
            let guessWordInnerText = [];
            for (let i = 0; i < letterCount; i++) {
                guessWordInnerText.push("_");
            }
            guessWordDiv.innerText = guessWordInnerText.join(", ");
        })

}



function clickLetter(event) {
    event.preventDefault()
    console.log('HI: ', event.target.value)
    console.log('HIwordId: ', wordId)
    let letter = event.target.value;

    fetch(`http://localhost:8000/hangman/guess/${wordId}/${letter}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            "Content-Type": "application/json"
        }
    })
        .then(res => {
            console.log("*******************************")
            return res.json()
        })
        .then(wordInfo => {
            // hide button after being clicked
            document.getElementById(letter).style.visibility = 'hidden';

            // show letter if part of guessed word
            guessWordDiv.innerText = wordInfo.textToDisplay;

            if (wordInfo.playerWon) {
                window.alert('Congratulations, you won!')
                location.reload();
            }
        })
}

startGame()

