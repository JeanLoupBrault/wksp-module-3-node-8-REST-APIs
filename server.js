'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
let words = require('./views/data');
words = words.words;


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
    let wordToSend = { id: foundWord.id, letterCount: foundWord.letterCount }
    console.log('wordToSend: ', wordToSend);
    res.send(wordToSend);
}

const getStatus = (req, res) => {
    console.log('hi hi there', req.params);
    let letterFromFrontEnd = req.params.letter;
    let wordIdFromFrontEnd = req.params.wordId;


    const wordFromBackEnd = words.find(word => {
        console.log('letterFromFrontEnd', letterFromFrontEnd);
        console.log('wordIdFromFrontEnd', wordIdFromFrontEnd);
        console.log('WoRD ', word);
        if (word.id == wordIdFromFrontEnd) {
            return word;
        }
        console.log('WORD: ', word)
        let wordFromBackEnd = { word: wordFromBackEnd.word, id: wordFromBackEnd.id, letterCount: wordFromBackEnd.letterCount }
        console.log('wordFromBackEnd: ', wordFromBackEnd);
        res.send(wordFromBackEnd);
    })
    // letterFound: verify if letter from front-end is present in the word chosen from back-end
    let letterFound = words.forEach(word => {
        if (word.id == wordIdFromFrontEnd) {
            for (i = o; i <= word.letterCount; i++) {
                letterFound = word.includes(letterFromFrontEnd);
            }
            return word;
        }
        console.log('letterFound: ', letterFound)
    })

    // letterPosArray: array of booleans, 'true' when letter typed on front-end is part of the word chosen form back-end
    let letterPosArray = words.forEach(word => {
        if (word.id == wordIdFromFrontEnd.word) {
            for (i = o; i <= word.letterCount; i++) {
                letterPosArray = word.push(letterFromFrontEnd);
            }
            return letterPosArray;
        }
    })
    console.log('letterPosArray: ', letterPosArray);
    res.send([letterPosArray]);
}

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
    .get('/hangman/guess/:wordId/:letter', getStatus)


    .listen(PORT, () => console.log(`Listening on port ${PORT}`));