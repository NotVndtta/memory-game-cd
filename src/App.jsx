import { useEffect, useState } from 'react';
import Card from './components/Card';

const cardImages = [
  {"src":  process.env.PUBLIC_URL + '/img/helmet.png', matched: false},
  {"src": process.env.PUBLIC_URL + '/img/potion.png', matched: false},
  {"src": process.env.PUBLIC_URL + '/img/ring.png', matched: false},
  {"src": process.env.PUBLIC_URL + '/img/scroll.png', matched: false},
  {"src": process.env.PUBLIC_URL + '/img/shield.png', matched: false},
  {"src": process.env.PUBLIC_URL + '/img/sword.png', matched: false}
]

function App() {
  const [cards, setCards] = useState([]) // Объявляем состояние для карточек и финкции для его обновления
  const [turns, setTurns] = useState(0) // Объявляем состояние для количества ходов и финкции для его обновления
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)

  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages] // создание массива, который сожержит увдоенный массив картинок
    .sort(() => Math.random() - 0.5) // перемешивание элементов
    .map((card) => ({...card, id: Math.random() })) // присваивание каждому элементу массива случйного идентификатора
  
    setCards(shuffledCards) // обновление состояния новым перемешанным массивом карточек
    setTurns(0)
  }

  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

  useEffect(() => {
    if (choiceOne && choiceTwo) {

      if(choiceOne.src === choiceTwo.src) {
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === choiceOne.src){
              return {...card, matched: true}
            } else {
              return card
            }
          })
        })
        resetTurn()
      } else {
        resetTurn()
      }
    }
  }, [choiceOne, choiceTwo])

  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns + 1)
  }

  return (
    <div className='max-w-[860px] mx-auto my-10'>
        <h1 className="text-3xl font-bold  my-2">    
          Memory Game
        </h1>
        <button onClick={shuffleCards} className='bg-transparent border-2 border-white py-1 px-3 rounded font-bold text-white cursor-pointer text-lg
         hover:bg-pink-600 hover:text-white'>
          New Game</button>
          <div className='mt-10 grid grid-cols-4 gap-5'>
          {cards.map(card => (
            <Card  key={card.id} card={card} handleChoice = {handleChoice} flipped={card === choiceOne || card === choiceTwo || card.matched}/>  
            ))}

          </div>
    </div>
  );
}

export default App;
