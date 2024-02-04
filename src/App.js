import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className='max-w-860 mx-auto my-10'>
        <h1 className="text-3xl font-bold underline my-2">    
          Memory Game
        </h1>
        <button className='bg-transparent border-2 border-white py-2 px-4 rounded font-bold text-white cursor-pointer text-lg
         hover:bg-pink-600 hover:text-white'>
          New Game</button>
    </div>
  );
}

export default App;
