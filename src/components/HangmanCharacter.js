import React from 'react'

function HangmanCharacter() {
  return (
    <div className='hangman-character'>
      <div className='hgmc__top'> </div>
      <div className='hgmc__stand'> </div>
      <div className='hgmc__base'> </div> 
      <div className='hgmc__rope'> </div>

      <div className='hgmc__head'> </div>
      <div className='hgmc__body'> </div>
      <div className='hgmc__legs'>
        <div className='hgmc__leg hgmc__leg--left'></div>
        <div className='hgmc__leg hgmc__leg--right'></div>
      </div>
      <div className='hgmc__arms'>
        <div className='hgmc__arm hgmc__arm--left'></div>
        <div className='hgmc__arm hgmc__arm--right'></div>
      </div>
    </div>
  )
}

export default HangmanCharacter