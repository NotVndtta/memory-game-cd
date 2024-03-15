import React from 'react'
const Card = ({card, handleChoice, flipped, disabled, gameOver}) => {

const handleClick = () => {
  if (!disabled && !gameOver) {
    handleChoice(card)
  }
}

return (
    <div className = "relative m-0">
    <div className= {flipped? "transition-all ease-in duration-200 delay-200": ""}>
       <img className="block border-2 border-white rounded-md max-w-[160px] max-h-[160px]" src={card.src} alt= "card front" />
    </div>
    <div className= {flipped? "absolute top-0 transition-all ease-in duration-200 delay-200 transform scale-x-0": "absolute top-0"}>
       <img className=" block border-2 border-white rounded-md max-w-[160px] max-h-[160px]" src={process.env.PUBLIC_URL + "/img/cover.png"} 
       onClick={handleClick}
       alt = "card back" />
   </div>
</div> 
  )
}

export default Card
