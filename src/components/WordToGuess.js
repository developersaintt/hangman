import React from 'react'

function WordToGuess(props) {
  const {word} = props;
  const {correctGuesses} = props;
  const letters = word.split('');
 
  const lettersEl = letters.map((letter, index) => {return <span key={index} className='letter-wrapper'> { correctGuesses[index] && correctGuesses[index] }  </span>});


  return (
    <div className="word-to-guess">  
        {lettersEl}
    </div>
    
  )
}

export default WordToGuess