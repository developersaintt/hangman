import React, { useEffect, useState } from 'react'
import HangmanCharacter from './HangmanCharacter'
import WrongGuesses from './WrongGuesses'
import WordToGuess from './WordToGuess'
import { getIndexes } from '../utils/GetIndexes'

const axios = require('axios').default;


function Playground() {

  const [isPlaying, setIsPlaying] = useState(1);
  const [word, setWord] = useState('');
  const [guesses, setGuesses] = useState({
    wrongGuessesCount: 0,
    wrongGuesses: [],
    correctGuesses: {},
  });

  
  useEffect(() => { 
    if(isPlaying){
      axios.get('https://random-words-api.vercel.app/word')
      .then((response) => {
        setWord(response.data[0].word.toLowerCase());
        localStorage.setItem('word', response.data[0].word.toLowerCase());
      })
      .catch((error) => console.error(error)) 
    }
     
    // return () => window.removeEventListener('keyup', (e) => keyListener(e));  
  }, [isPlaying]);
  
  useEffect(() => { 
    window.addEventListener('keyup', (e) => keyListener(e))     
    return () => window.removeEventListener('keyup', (e) => keyListener(e));  
  }, []);

  const restartGame = () =>{
    setGuesses({
      wrongGuessesCount: 0,
      wrongGuesses: [],
      correctGuesses: {},
    }); 

    
    setIsPlaying(1);
    console.log(guesses);
  }

  const checkGameStatus = () => { 
    let _word = localStorage.getItem('word');
    if(Object.values(guesses.correctGuesses).join('') == _word){
      setIsPlaying(0); 
    }
  }
  

  const keyListener = (e) => {
    let _word = localStorage.getItem('word')
    let letterGuessed = e.key; 
    if(!(e.keyCode >= 65 && e.keyCode <= 90)) return;
 
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
      if(!(guesses.wrongGuesses.includes(letterGuessed))){
      }
      setGuesses(_guesses => ({
        ..._guesses,
        wrongGuessesCount: _guesses.wrongGuessesCount + 1,
        wrongGuesses: [..._guesses.wrongGuesses, letterGuessed],
      }));
    } 

    checkGameStatus();
  }

  let winPopup;
  if(!(isPlaying)){
    winPopup = <div className='gameover-modal'> <div className='gameover-modal__inner'> Game Over, You Won !  <span className="restart-game-trigger" onClick={() => restartGame()}> Start Again </span></div> </div>
  }

  return (
    <div className="playground">
      <HangmanCharacter wrongGuesses={guesses.wrongGuesses} />
      <WrongGuesses wrongGuesses={guesses.wrongGuesses} />
      <WordToGuess correctGuesses={guesses.correctGuesses} word={word} />
      {winPopup}
      {word}
    </div>
  )
}

export default Playground