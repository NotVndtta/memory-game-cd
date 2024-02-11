import React from 'react'
const Card = ({card, handleChoice, flipped, disabled}) => {

const handleClick = () => {
  if (!disabled) {
    handleChoice(card)
  }
}

return (
    <div className = "relative">
    <div className= {flipped? "transition-all ease-in duration-200 delay-200": ""}>
       <img className="w-full block border-2 border-white rounded-md" src={card.src} alt= "card front" />
    </div>
    <div className= {flipped? "absolute top-0 transition-all ease-in duration-200 delay-200 transform scale-x-0": "absolute top-0"}>
       <img className="w-full block border-2 border-white rounded-md" src={process.env.PUBLIC_URL + "/img/cover.png"} 
       onClick={handleClick}
       alt = "card back" />
   </div>
</div> 
  )
}

export default Card
