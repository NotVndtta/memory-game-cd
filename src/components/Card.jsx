import React from 'react'

const Card = ({card, handleChoice, flipped}) => {

const handleClick = () => {
  handleChoice(card)
}

  return (
    <div className='relative'>
        <div className=''>
        <img className= {`${flipped ? "rotate-90 absolute" : "rotate-0"} w-full block border-2 border-white`} src={card.src} alt="front" />
        <img className='w-full block border-2 border-white' src= {process.env.PUBLIC_URL + '/img/cover.png'} onClick={handleClick} alt="back" />
        </div>
    </div>
  )
}

export default Card
