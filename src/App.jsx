import { useEffect, useState } from 'react'
import './App.css'


function App() {
  const [allData, setAllData] = useState([])
  const [score, setScore] = useState(0)
  const [bestScore, setBestScore] = useState(0)
  const [temp, setTemp] = useState([])
  const [cards, setCards] = useState([])

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

  const handleGame = e => {
    cards.sort(() => Math.random() - .5)
    
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
            <img src="../public/images/logo.png" alt="" />
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
            <div key={card.id} className="card">
              <img id={card.id} src={`../public/images/${card.id}.jpg`} alt={card.name} onClick={handleGame}/>
            </div>
          )
        })}
      </main>
    </>
  )
}

export default App
