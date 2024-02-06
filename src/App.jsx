import { useState } from 'react';

const cardImages = [
  {"src":  process.env.PUBLIC_URL + '/img/helmet.png'},
  {"src": process.env.PUBLIC_URL + '/img/potion.png'},
  {"src": process.env.PUBLIC_URL + '/img/ring.png'},
  {"src": process.env.PUBLIC_URL + '/img/scroll.png'},
  {"src": process.env.PUBLIC_URL + '/img/shield.png'},
  {"src": process.env.PUBLIC_URL + '/img/sword.png'}
]

function App() {
  const [cards, setCards] = useState([]) // Объявляем состояние для карточек и финкции для его обновления
  const [turns, setTurns] = useState(0) // Объявляем состояние для количества ходов и финкции для его обновления

  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages] // создание массива, который сожержит увдоенный массив картинок
    .sort(() => Math.random() - 0.5) // перемешивание элементов
    .map((card) => ({...card, id: Math.random() })) // присваивание каждому элементу массива случйного идентификатора
  
    setCards(shuffledCards) // обновление состояния новым перемешанным массивом карточек
    setTurns(0)
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
            <div key={card.id}>
              <div className=''>
                <img className='' src={card.src} alt="front" />
                <img className='' src= {process.env.PUBLIC_URL + '/img/cover.png'} alt="back" />
              </div>
            </div>
            ))}

          </div>
    </div>
  );
}

export default App;
