import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [allData, setAllData] = useState([])

  useEffect(() => {
    const apiRequest = async () => {
      const response = await fetch("https://db.ygoprodeck.com/api/v7/cardinfo.php")

      const data = await response.json()
      setAllData(data.data)
    }

    apiRequest()
  }, [])

  console.log(allData)

  return (
    <>
      <header className="header">
        <div className="header-container">
          <div className="title">
            <h1>Yu-Gi-Oh! Memory Game</h1>
          </div>
          <div className="score-container">
            <span>Score: 0</span>
            <span>Best Score: 0</span>
          </div>
        </div>
      </header>
      <main className="cards-grid">
        <div className="card">
          <img src="./images/blue-eyes-white-dragon-89631139.jpg" alt="" />
          <span>Blue-Eyes White Dragon</span>
        </div>
        <div className="card">
          <img src="./images/curse-of-dragon-28279543.jpg" alt="" />
          <span>Curse of Dragon</span>
        </div>
        <div className="card">
          <img src="./images/dark-magician-46986414.jpg" alt="" />
          <span>Dark Magician</span>
        </div>
        <div className="card">
          <img src="./images/harpie-lady-sisters-12206212.jpg" alt="" />
          <span>Harpie Lady Sisters</span>
        </div>
        <div className="card">
          <img src="./images/obelisk-the-tormentor-10000000.jpg" alt="" />
          <span>Obelisk the Tormentor</span>
        </div>
        <div className="card">
          <img src="./images/slifer-the-sky-dragon-10000020.jpg" alt="" />
          <span>Slifer the Sky Dragon</span>
        </div>
        <div className="card">
          <img src="./images/the-winged-dragon-of-ra-10000010.jpg" alt="" />
          <span>The Winged Dragon of Ra</span>
        </div>
        <div className="card">
          <img src="./images/time-wizard-71625222.jpg" alt="" />
          <span>Time Wizard</span>
        </div>
        <div className="card">
          <img src="./images/summoned-skull-70781052.jpg" alt="" />
          <span>Summoned Skull</span>
        </div>
        <div className="card">
          <img src="./images/red-eyes-black-dragon-74677422.jpg" alt="" />
          <span>Red-Eyes Black Dragon</span>
        </div>
      </main>
    </>
  )
}

export default App
