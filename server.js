'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
let words = require('./views/data');
words = words.words;
let letterPosArray = [];
let currentWord = "";

const getWord = (req, res) => {
    console.log('hi there');
    let rndWord = (Math.floor(Math.random() * 21));
    console.log('rndWord: ', rndWord)
    console.log('words', words);
    const foundWord = words.find(word => {
        console.log('word.id: ', word.id);
        if (word.id == rndWord) {
            return word;
        }
    })
    currentWord = foundWord.word;
    letterPosArray = [];

    // Fill array with false for each letter in word
    for (let i = 0; i < foundWord.letterCount; i++) {
        letterPosArray.push(false);
    }
    console.log("starting letterPosArray:", letterPosArray)

    let wordToSend = { id: foundWord.id, letterCount: foundWord.letterCount }
    console.log('wordToSend: ', wordToSend);
    res.send(wordToSend);
}

const handleGuess = (req, res) => {
    console.log('hi hi there', req.params);
    let letterFromFrontEnd = req.params.letter;
    let wordIdFromFrontEnd = req.params.wordId;

    const wordObj = words.find(word => word.id === wordIdFromFrontEnd);
    const word = wordObj.word;
    const wordLetterArray = word.split("");
    const letterCount = word.length;


    wordLetterArray.forEach((letter, index) => {

        if (letter === letterFromFrontEnd) {
            letterPosArray[index] = true;

        }
    });
    console.log('letterPosArray: ', letterPosArray);

    let playerWon = !letterPosArray.includes(false);
    let textToDisplay = setTextToDisplay(letterPosArray);

    console.log("*************TEXT: ", textToDisplay)
    res.status(200).json({ textToDisplay, letterCount, playerWon });
}
const setTextToDisplay = letterPosArray => {
    let currentWordArray = currentWord.split("");
    let textToDisplay = letterPosArray.map((letterPositionBoolean, index) => {
        if (letterPositionBoolean) {
            return currentWordArray[index];

        } else {
            return "_";
        }
    });
    return textToDisplay.join(", ");
};



const PORT = process.env.PORT || 8000;

express()
    .use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    })
    .use(morgan('tiny'))
    .use(express.static('public'))
    .use(bodyParser.json())
    .use(express.urlencoded({ extended: false }))

    // endpoints
    .get('/hangman/words', getWord)
    .get('/hangman/guess/:wordId/:letter', handleGuess)


    .listen(PORT, () => console.log(`Listening on port ${PORT}`));