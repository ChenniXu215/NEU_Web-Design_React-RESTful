import './Game.css';

function Game( {onLogout, username, word, score, guess, onGuess, error} ) {
    return <>
        <div className='game'>
            <h2 className="game-title">Hello! {username}</h2>
            <div className="score-container">
                <p className="score-title">Your current score is: </p>
                <p className="score-stored" id="score-stored">{score}</p>
            </div>
            <div className="word-container">
                <p className="word-title">Your last answer is: </p>
                <p className="word-stored" id="word-stored">{guess}</p>
            </div>
            <form id="word-form">
                <div className="word-input">
                    <div className='word-label'>
                        <label htmlFor="word">Please enter synonym of</label>
                        <p className='currentWord'> {word} </p>
                    </div>
                    <input type="text" id="word"/>
                </div>
                <div className='word-error'>{error}</div>
                <button onClick={onGuess} className="update-btn" type="submit">Submit</button>
            </form>
            <div className='logout'>
                <button onClick={onLogout} className="controls__logout">Logout</button>
            </div>
        </div>
    </>
}

export default Game;