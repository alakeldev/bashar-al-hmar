import './App.css'
import { BackgroundBeamsWithCollision } from './components/ui/BackgroundBeamsWithCollision';
import { useEffect, useState } from 'react';
import SingleCard from './components/SingleCard';

const cardImages = [
  {"src": "../public/img/hmar1.jpeg", matched: false },
  {"src": "../public/img/hmar2.png", matched: false },
  {"src": "../public/img/hmar3.png", matched: false },
  {"src": "../public/img/hmar4.png", matched: false },
  {"src": "../public/img/hmar5.png", matched: false },
  {"src": "../public/img/hmar6.png", matched: false },
]

function App() {

  const [cards, setCards] = useState([]);
  const [turns , setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(null);

  // Duplicate each card once, Shuffle cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({...card, id: Math.random()}))
      
      setChoiceOne(null);
      setChoiceTwo(null);
      setCards(shuffledCards);
      setTurns(0)
  }

// handle a choice
const handleChoice = (card) => {
  choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
}

// compare 2 selected cards
useEffect(() => {
  if(choiceOne && choiceTwo) {
    setDisabled(true)
    if(choiceOne.src === choiceTwo.src) {
      setCards(prevCards => {
        return prevCards.map(card => {
          if (card.src === choiceOne.src) {
            return {...card, matched: true}
          } else {
            return card;
          }
        })
      })
      setTimeout(() => resetTurn(), 1250);
    } else {
      
      setTimeout(() => resetTurn(), 1250);

    }
  }
}, [choiceOne, choiceTwo])


// reset choices and increase turn
const resetTurn = () => {
  setChoiceOne(null);
  setChoiceTwo(null);
  setTurns(prevTurns => prevTurns + 1);
  setDisabled(false);
}


// start the game automatically
useEffect(() => {
  shuffleCards();
}, [])


  return (
    <>
      <BackgroundBeamsWithCollision className="absolute inset-0 w-full h-full -z-10 object-cover"/>
      <main className=''>
          <h1 className='font-bold text-xl text-center text-green-500 mt-10'>FREE SYRIA - MEMORY GAME</h1>
          <button className='bg-green-500 text-red-800 rounded-md p-2 w-fit my-2' onClick={shuffleCards}>New Game</button>
          <h2 className='font-bold text-xl text-center pt-3  text-green-500'>أهلا بك في لعبة صور بشار الأسد و عائلته القذرة
          </h2>
          
          <div className='grid grid-cols-4 gap-3 mt-5 place-items-center rounded-md'>
            {cards.map((card) => (
              <SingleCard card={card} key={card.id} handleChoice={handleChoice} flipped={card === choiceOne || card === choiceTwo || card.matched } disabled={disabled}/>
            ))}
          </div>
          <p className='mt-2'>Turns: {turns}</p>
      </main>
    </>
  )
}

export default App
