import React, { useEffect, useState } from 'react'
import HangmanCharacter from './HangmanCharacter'
import WrongGuesses from './WrongGuesses'
import WordToGuess from './WordToGuess'
const axios = require('axios').default;


function Playground() {

  
  const [gameStatus, setGameStatus] = useState('Playing');
  const [word, setWord] = useState('');
  const [guesses, setGuesses] = useState({
    wrongGuessesCount: 0,
    wrongGuesses: [],
    correctGuesses: {},
  });

  
  useEffect(() => { 
    axios.get('https://random-words-api.vercel.app/word')
    .then((response) => {
      setWord(response.data[0].word.toLowerCase());
      localStorage.setItem('word', response.data[0].word.toLowerCase());
      window.addEventListener('keyup', (e) => keyListener(e))
    })
    .catch((error) => console.error(error)) 
     
    return () => window.removeEventListener('keyup', (e) => keyListener(e));  
  }, [gameStatus]);


  const getIndexes = (string, char) =>{
    let indices = [];
    for(let i=0; i<string.length;i++) {
      if (string[i] === char) indices.push(i);
    } 
    return indices;
  }

  const restartGame = () =>{
    setGameStatus('Playing');

    setGuesses(_guesses => ({
      wrongGuessesCount: 0,
      wrongGuesses: [],
      correctGuesses: {},
    })); 
  }

  const checkGameStatus = () => { 
    let _word = localStorage.getItem('word');
    if(Object.values(guesses.correctGuesses).join('') == _word){
      setGameStatus('Won'); 
    }
  }
  

  const keyListener = (e) => {
    let _word = localStorage.getItem('word')
    let letterGuessed = e.key; 
    if(!(e.keyCode >= 65 && e.keyCode <= 90)) return; 
    console.log(_word);
 
    if(_word.includes(letterGuessed)){ 
      
      let letterIndexes = getIndexes(_word, letterGuessed); 
      letterIndexes.forEach(index => {
  
        let correctGuesses = guesses.correctGuesses;
        correctGuesses[index] = letterGuessed

        setGuesses(_guesses => ({
          ..._guesses,
          correctGuesses,
        })); 
      })
    }
    else{
      setGuesses(_guesses => ({
        ..._guesses,
        wrongGuessesCount: _guesses.wrongGuessesCount + 1,
        wrongGuesses: [..._guesses.wrongGuesses, letterGuessed],
      }));
    } 

    checkGameStatus();
  }

  let winPopup;
  if(gameStatus == "Won"){
    winPopup = <div className='gameover-modal'> <div className='gameover-modal__inner'> Game Over, You Won !  <span className="restart-game-trigger" onClick={() => restartGame()}> Start Again </span></div> </div>
  }

  return (
    <div className="playground">
      <HangmanCharacter />
      <WrongGuesses wrongGuesses={guesses.wrongGuesses} />
      <WordToGuess correctGuesses={guesses.correctGuesses} word={word} />
      {winPopup}
      {word}
    </div>
  )
}

export default Playground