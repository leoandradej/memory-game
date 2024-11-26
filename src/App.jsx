import { useEffect, useState } from 'react'
import './App.css'
import Header from './components/Header'
import Modal from './components/Modal'


function App() {
  const [allData, setAllData] = useState([])
  const [cards, setCards] = useState([])
  const [clickedCards, setClickedCards] = useState([])
  const [isFlipped, setIsFlipped] = useState(false)
  const [score, setScore] = useState(0)
  const [bestScore, setBestScore] = useState(0)

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

  const handleCardClick = e => {
    setIsFlipped(true)

    setTimeout(() => {
      shuffle(cards.slice(0))
    }, 800)

    setTimeout(() => {
      setIsFlipped(false)
    }, 1300)
    
    setClickedCards(prev => {
      return [...prev, e.target.id]
    })

    if (clickedCards.includes(e.target.id)) {
      if (score < bestScore) {
        setScore(0)
      } else {
        setBestScore(score)
        setScore(0)
        setClickedCards([])
      }
    } else {
      setScore(prev => prev + 1)
    }
  }
  

  return (
    <>
      <Header onClick={openModal} score={score} bestScore={bestScore}/>
      <main className="cards-grid">
        {cards.map(card => {
          return (
            <div key={card.id} className="wrapper">
              <div className={isFlipped ? 'card flipped' : 'card'}>
                <img id={card.id} className="front" src={`./images/${card.id}.jpg`} alt={card.name} onClick={handleCardClick}/>
                <img className='back' src="./images/back.png" alt="Card Back" />
              </div>
            </div>
          )
        })}
      </main>
      <Modal onClick={closeModal}/>
    </>
  )
}

export default App
