const Header = ({ onClick, score, bestScore}) => {
    return (
        <header className="header">
            <div className="header-container">
                <div className="title">
                    <img src="./images/logo.png" alt="logo" />
                    <button className='btn info-btn' onClick={onClick}>i</button>
                </div>
                <div className="score-container">
                    <span>Score: {score}</span>
                    <span>Best Score: {bestScore}</span>
                </div>
            </div>
         </header>
    )
}

export default Header