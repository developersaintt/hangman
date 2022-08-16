import React from 'react'

function WrongGuesses( props ) {
  const {wrongGuesses} = props;
  const wrongGuessList = wrongGuesses.join(', ').toString()
  return (
    <div className='text-right'>
      Wrong Guesses
      <div className='wrong-guess-list'> 
        {wrongGuessList}
      </div>
    </div>
  )
}

export default WrongGuesses