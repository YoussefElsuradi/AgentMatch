
import './App.css';
import { useState } from 'react';
import { useEffect } from 'react';
import SingleCard from './components/SingleCard';
import breach from './img/breach.png'
import jett from './img/jett.png'
import pheonix from './img/pheonix.png' 
import reyna from './img/reyna.png'
import skye from './img/skye.png'
import viper from './img/viper.png'



const cardsImages = [
  { "src": breach, matched: false},
  { "src": jett, matched: false },
  { "src": pheonix, matched: false },
  { "src": reyna , matched: false},
  { "src": skye , matched: false},
  { "src": viper , matched: false}
]


function App() {

  const [cards, setCards] = useState([])
  const [guesses, setGuesses] = useState(0)

  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)

  const [disabled, setDisabled] = useState(false)

  //shuffle the cards
  const shuffleCards = () => {
    const shuffledCards = [...cardsImages, ...cardsImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({...card, id: Math.random()}))

      setChoiceOne(null)
      setChoiceTwo(null)
      setCards(shuffledCards)
      setGuesses(0)
  }

  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

  useEffect(() => {
    if(choiceOne && choiceTwo) {
      setDisabled(true)

      if(choiceOne.src === choiceTwo.src){
        setCards(prevCards => {
          return prevCards.map(card=> {
            if(card.src === choiceOne.src){
              return {...card, matched: true}
            }else {
              return card
            }
          })
        })
        resetTurn()
      }else {
        setTimeout(() =>  resetTurn(), 700)
      }
    }

  }, [choiceOne, choiceTwo])

  console.log(cards)

  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setGuesses(prevGuesses => prevGuesses + 1 )
    setDisabled(false)
  }

  useEffect(() => {
    shuffleCards()
  },[])

  return (
    <div className="App">
        <h1> Agent Match </h1>
        <button onClick={shuffleCards}>New Match</button>
        <p>Guesses: {guesses}</p>
        

        <div className='grid'>
          {cards.map(card => (
            <SingleCard 
            key={card.id} 
            card={card} 
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched} 
            disabled={disabled}
            />
          ))}
        </div> 

      
    </div>
  );
}

export default App;
