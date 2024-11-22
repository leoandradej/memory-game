import { useEffect, useState } from 'react'
import './App.css'


function App() {
  const [allData, setAllData] = useState([])
  const [score, setScore] = useState(0)
  const [bestScore, setBestScore] = useState(0)
  const [temp, setTemp] = useState([])
  const [cards, setCards] = useState([])
  const [isFlipped, setIsFlipped] = useState(false)

  useEffect(() => {
    fetch('https://db.ygoprodeck.com/api/v7/cardinfo.php')
      .then(response => response.json())
      .then(data => setAllData(data.data));
  }, []);

  useEffect(() => {
    const cardsId = [89631139, 28279543, 46986414, 12206212, 10000000, 10000020, 10000010, 71625222, 70781052, 74677422]

    const filteredCards = allData.filter(card => cardsId.map(item => item).includes(card.id))

    setCards(filteredCards)
    
  }, [allData])

  const openModal = () => {
    const modal = document.querySelector('#modal')
    modal.showModal()
  }

  const closeModal = () => {
    const modal = document.querySelector('#modal')
    modal.close()
  }

  const shuffle = (array) => {
    let currentIndex = array.length, temporaryValue, randomIndex

    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex)
      currentIndex -= 1

      temporaryValue = array[currentIndex]
      array[currentIndex] = array[randomIndex]
      array[randomIndex] = temporaryValue
    }
  
    setCards(array)
  }

  const handleGame = e => {
    setIsFlipped(true)

    setTimeout(() => {
      shuffle(cards.slice(0))
    }, 800)

    setTimeout(() => {
      setIsFlipped(false)
    }, 1300)
    
    setTemp(prev => {
      return [...prev, e.target.id]
    })

    if (temp.includes(e.target.id)) {
      if (score < bestScore) {
        setScore(0)
      } else {
        setBestScore(score)
        setScore(0)
        setTemp([])
      }
    } else {
      setScore(prev => prev + 1)
    }
  }
  

  return (
    <>
      <header className="header">
        <div className="header-container">
          <div className="title">
            <img src="../public/images/logo.png" alt="logo" />
            <button className='btn info-btn' onClick={() => openModal()}>i</button>
          </div>
          <div className="score-container">
            <span>Score: {score}</span>
            <span>Best Score: {bestScore}</span>
          </div>
        </div>
      </header>
      <main className="cards-grid">
        {cards.map(card => {
          return (
            <div key={card.id} className="wrapper">
              <div className={isFlipped ? 'card flipped' : 'card'}>
                <img id={card.id} className="front" src={`../public/images/${card.id}.jpg`} alt={card.name} onClick={handleGame}/>
                <img className='back' src="../public/images/back.png" alt="" />
              </div>
            </div>
          )
        })}
      </main>
      <dialog id="modal" className="modal">
        <h2>Hey duelist,</h2>
        <p>The goal of the game is to click each card just once. Good luck and choose wisely!</p>
        <button className='btn close-btn' onClick={() => closeModal()}>OK</button>
      </dialog>
    </>
  )
}

export default App
