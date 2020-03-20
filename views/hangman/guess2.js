const guessedLtrInWord = [];

function allLetter(inputtxt) {
    let letters = /^[A-Za-z]+$/;

    let alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
        'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
        't', 'u', 'v', 'w', 'x', 'y', 'z'];

    // create alphabet ul
    let buttons = function () {
        myButtons = document.getElementById('buttons');
        letters = document.createElement('ul');

        for (let i = 0; i < alphabet.length; i++) {
            letters.id = 'alphabet';
            list = document.createElement('li');
            list.id = 'letter';
            list.innerHTML = alphabet[i];
            check();
            myButtons.appendChild(letters);
            letters.appendChild(list);
        }
    }

    fetch('/hangman/guess', {
        method: 'GET',
        body: JSON.stringify(data),
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json"
        }
    })
        .then(res => {
            console.log('guessRes: ', res)
            res.json()
        })

        .then(data => {
            const { status, error } = data;
            if (status === 'success') {
                window.location.href = '/hangman/guess/:wordId/:letter';
            } else if (error) {
                submitButton.disabled = false;
                errorMsg.style.display = 'flex';
                errorMsg.innerText = errorMessages[error];
            }
        });
}

if (inputtxt.value.match(letters)) {
    alert('Letter(s) accepted : you can try another');
    return true;
}
else {
    alert('Please input alphabet characters only');
    return false;
}


function guessedLtrInWord(wordId, wordLtr) {
    return request(`/hangman/guess/${wordId},${wordLtr}`)
        .then(data => {
            let data = JSON.parse(data);
            //console.log('Data ', data);
            return data;
        })
        .catch(error => console.log('error', error));
}
guessedLtrInWord()

module.exports = {
    getWord,
    getStatus,
};