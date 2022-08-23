import React from 'react'

function HangmanCharacter(props) {
  const {wrongGuesses} = props;
  
  return (
    <div className='hangman-character'>
      <div className='hgmc__top'> </div>
      <div className='hgmc__stand'> </div>
      <div className='hgmc__base'> </div> 
      <div className='hgmc__rope'> </div>
      {wrongGuesses.length >= 1 && <div className='hgmc__head'> </div> }
      
      {wrongGuesses.length >= 2 && <div className='hgmc__body'> </div>}
      <div className='hgmc__legs'>
        {wrongGuesses.length >= 3 && <div className='hgmc__leg hgmc__leg--left'></div>}
        {wrongGuesses.length >= 4 && <div className='hgmc__leg hgmc__leg--right'></div>}
      </div>
      <div className='hgmc__arms'>
        {wrongGuesses.length >= 5 && <div className='hgmc__arm hgmc__arm--left'></div>}
        {wrongGuesses.length >= 6 && <div className='hgmc__arm hgmc__arm--right'></div>}
      </div>
    </div>
  )
}

export default HangmanCharacter