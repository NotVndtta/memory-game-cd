import { useCallback, useEffect, useState } from 'react';
import Card from './components/Card';
import Modal from 'react-modal';

Modal.setAppElement('#root')

const cardImages = [
  {"src":  process.env.PUBLIC_URL + '/img/discord.png', matched: false},
  {"src": process.env.PUBLIC_URL + '/img/spotify.png', matched: false},
  {"src": process.env.PUBLIC_URL + '/img/vk.png', matched: false},
  {"src": process.env.PUBLIC_URL + '/img/youtube.png', matched: false},
  {"src": process.env.PUBLIC_URL + '/img/figma.png', matched: false},
  {"src": process.env.PUBLIC_URL + '/img/telegram.png', matched: false},
  {"src": process.env.PUBLIC_URL + '/img/twitter.png', matched: false},
  {"src": process.env.PUBLIC_URL + '/img/google.png', matched: false},
  
]

function App() {
  const [cards, setCards] = useState([]) // Объявляем состояние для карточек и финкции для его обновления
  const [turns, setTurns] = useState(0) // Объявляем состояние для количества ходов и финкции для его обновления
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)
  const [gameOver, setGameOver] = useState(false);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const [cardSize, setCardSize] = useState({width: '160px', height: '160px'});
  const [gridSize, setGridSize] = useState({rows: 3, cols: 3});

  const [maxTurns, setMaxTurns] = useState(8);
  
  const setGridSize2x4 = () => {
    setGridSize({rows: 2, cols: 4});
    setCardSize({width: '160px', height: '160px'});
    setMaxTurns(8);
    shuffleCards();

  }

  const setGridSize3x4 = () => {
    setGridSize({rows: 3, cols: 4});
    setCardSize({width: '160px', height: '160px'});
    setMaxTurns(14);
    shuffleCards();
  }
  
  const setGridSize4x4 = () => {
    setGridSize({rows: 4, cols: 4});
    setCardSize({width: '140px', height: '140px'});
    setMaxTurns(16);
    shuffleCards();
  }

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: '#1b1523',
      padding: '20px',
      borderRadius: '10px',
      width: '300px',
      textAlign: 'center',
    },
  };

  const shuffleCards = useCallback(() => {
    const shuffledCards = [...cardImages.slice(0, (gridSize.rows * gridSize.cols) / 2), ...cardImages.slice(0, (gridSize.rows * gridSize.cols) / 2)]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({...card, id: Math.random() }))
  
    setChoiceOne(null)
    setChoiceTwo(null)
    setCards(shuffledCards)
    setTurns(0)
    setGameOver(false)
  }, [gridSize]);

  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }
  const resetTurn = useCallback(() => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns + 1)
    setDisabled(false)

    if (turns >= maxTurns) {  
      setGameOver(true);  
    }
  }, [turns,maxTurns]);

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true)

      if(choiceOne.src === choiceTwo.src) {
        setCards(prevCards => { 
          return prevCards.map(card => {
            if (card.src === choiceOne.src){
              return {...card, matched: true} // обновление состояния карт
            } else {
              return card
            }
          })
        })
        resetTurn()
      } else {
        setTimeout(() => resetTurn(), 1000)
      }
    }
  }, [choiceOne, choiceTwo, resetTurn])

  
  useEffect(() => { 
    shuffleCards() 
  }, [shuffleCards, gridSize]) 

  
  useEffect(() => {
    const gameStarted = turns > 0;
    const allCardsMatched = cards.every(card => card.matched);
    if (gameStarted && allCardsMatched) {
      setModalMessage("Grats! You win!");
      setModalIsOpen(true);
    }
  }, [cards, turns]);
  

  useEffect(() => {
    if (gameOver) {
      setModalMessage(turns <= maxTurns ? "Grats! You win!" : "Oh no! You lose :(");
      setModalIsOpen(true);
    }
  }, [gameOver, turns, maxTurns]);

  const closeModal = () => {
    setModalIsOpen(false);
    shuffleCards();
  }



  return (
    <div className='max-w-[680px] mx-auto my-10'>
        <h1 className="text-3xl font-bold  my-2">    
          Memory Game
        </h1>
        <button onClick={shuffleCards} 
          className='bg-transparent border-2 border-white py-1 px-3 rounded font-bold 
        text-white cursor-pointer text-lg
         hover:bg-pink-600 hover:text-white'>
          New Game</button>
        <button onClick={setGridSize2x4} 
          className='bg-transparent border-2 border-white py-1 px-3 rounded font-bold 
          text-white cursor-pointer text-lg
          hover:bg-pink-600 hover:text-white ml-4'>
          Set Grid 2x4
        </button>
        <button onClick={setGridSize3x4} 
          className='bg-transparent border-2 border-white py-1 px-3 rounded font-bold 
          text-white cursor-pointer text-lg
          hover:bg-pink-600 hover:text-white ml-4'>
          Set Grid 3x4</button>
        <button onClick={setGridSize4x4} 
          className='bg-transparent border-2 border-white py-1 px-3 rounded font-bold 
          text-white cursor-pointer text-lg
          hover:bg-pink-600 hover:text-white ml-4'>
          Set Grid 4x4
        </button>
            <p>Turns: {turns}</p>
          
          <div className='mt-10 grid grid-cols-4 gap-5'>
          {cards.map(card => (
            <Card key={`${card.id}-${cardSize.width}-${cardSize.height}`} 
            card={card} handleChoice = {handleChoice} 
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled= {disabled} 
            gameOver={gameOver}
            cardSize={cardSize}
            
            /> 
            ))}
          <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Game Over Modal"
        >
          <h2>{modalMessage}</h2>
          <button onClick={closeModal}>Close</button>
        </Modal>
          </div>
    </div>
  );
}

export default App;
