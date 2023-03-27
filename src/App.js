
import './App.css';
import { useState } from 'react';
import SingleCard from './components/SingleCard';



const cardsImages = [
  { "src": "/img/breach.png" },
  { "src": "/img/jett.png" },
  { "src": "/img/pheonix.png" },
  { "src": "/img/reyna.png" },
  { "src": "/img/skye.png" },
  { "src": "/img/viper.png" }
]


function App() {

  const [cards, setCards] = useState([])
  const [guesses, setGuesses] = useState(0)

  //shuffle the cards
  const shuffleCards = () => {
    const shuffledCards = [...cardsImages, ...cardsImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({...card, id: Math.random()}))

      setCards(shuffledCards)
      setGuesses(0)
  }

  console.log(cards, guesses)
  return (
    <div className="App">
        <h1> Agent Match </h1>
        <button onClick={shuffleCards}>New Match</button>
        <div className='grid'>
          {cards.map(card => (
            <SingleCard key={card.id} card = {card} />
          ))}
        </div> 
    </div>
  );
}

export default App;
