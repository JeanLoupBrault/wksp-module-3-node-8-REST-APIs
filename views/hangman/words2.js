

function getWord(getWordId, getWordLtrCount) {


    let rndWord = (Math.floor(Math.random() * 21));
    console.log('rndWord: ', rndWord)
    let getWordId = '';
    let getWordLtrCount = '';
    if (words === rndWord) {
        getWordId.push(words[rndWord])
        console.log('Random word: ', getWordId);


        //getWordId = words;
        getWordLtrCount = words.value.letterCount;

        alert('A random word has been successfully chosen from words array!');
        return { getWordId, getWordLtrCount };

    }

    fetch('/hangman/words', {
        method: 'GET',
        body: JSON.stringify(data),
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json"
        }
    })
        .then(res => {

            console.log('wordsRes: ', res)
            res.json()
        })

        .then(data => {
            const { status, error } = data;
            if (status === 'success') {
                //window.location.href = '/hangman-keyboard';
                window.location.href = '/hangman/words';
            } else if (error) {
                submitButton.disabled = false;
                errorMsg.style.display = 'flex';
                errorMsg.innerText = errorMessages[error];
            }
        });
}

//else {
//    alert('Error! Try again to choose a random word from words array.');
//    return false;
//}

getWord()

module.exports = {
    getWord,
    getStatus,
};