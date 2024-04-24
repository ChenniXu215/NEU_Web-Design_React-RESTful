import { useState, useEffect, useCallback, useRef } from 'react';
import { fetchLogin, fetchLogout, fetchSessionStatus, fetchWord, fetchSubmitGuess} from "./services";
import Login from './Login';
import Loading from './Loading';
import Status from './Status';
import Game from './Game';
import Header from './Header';
import Footer from './Footer';
import {
  LOGIN_STATUS,
  CLIENT,
  SERVER,
  POLLING_DELAY,
} from './constants';

import './App.css';

function App() {
  const [ error, setError ] = useState('');
  const [ guessError, setGuessError ] = useState('');
  const [ username, setUsername ] = useState('');
  const [ loginStatus, setLoginStatus ] = useState(LOGIN_STATUS.PENDING);
  const [ currentWord, setCurretnWord ] = useState('');
  const [ currentScore, setCurrentScore ] = useState(0);
  const [ guess, setGuess ] = useState('');

  const pollingRef = useRef();

  function onLogin( username ) {
    setGuessError('');

    fetchLogin(username)
    .then( () => {
      fetchWord().then(wordInfo => {
        setError('');
        setUsername(username);
        setLoginStatus(LOGIN_STATUS.IS_LOGGED_IN);
        setCurretnWord(wordInfo.word);
        setCurrentScore(wordInfo.score);
        setGuess(wordInfo.guess);
      }).catch(err => {
      });      
    })
    .catch( err => {
      setError(err?.error || 'ERROR');
    });
  }

  function checkForSession() {
    setGuessError('');

    fetchSessionStatus()
    .then( session => {
      if(session.username) {
        fetchWord().then(wordInfo => {
          setUsername(session.username);
          setLoginStatus(LOGIN_STATUS.IS_LOGGED_IN);
          setCurretnWord(wordInfo.word);
          setCurrentScore(wordInfo.score);
          setGuess(wordInfo.guess);
        }).catch(err => {
        });
      }
    })
    .catch( err => {
      if( err?.error === SERVER.AUTH_MISSING ) {
        return Promise.reject({ error: CLIENT.NO_SESSION })
      }
      return Promise.reject(err); 
    })
    .then( () => {
    })
    .catch( err => {
      if( err?.error === CLIENT.NO_SESSION ) {
        setLoginStatus(LOGIN_STATUS.NOT_LOGGED_IN);
        return;
      }
      setError(err?.error || 'ERROR');
    });
  }


  function onLogout() {
    setGuessError('');

    setError('');
    setUsername('');
    setLoginStatus(LOGIN_STATUS.NOT_LOGGED_IN);
    fetchLogout()
    .catch( err => {
      setError(err?.error || 'ERROR');
    });
  }

  function handleSubmitGuess(event) {
    event.preventDefault();
    const guess = document.getElementById('word').value;

    if (!guess.trim() || /[^a-zA-Z]/.test(guess)) {
      setGuessError('Please enter a valid answer (non-empty and letters only).');
      return;
    }

    fetchSubmitGuess(guess)
      .then(response => {
        if (response.correct) {   
          setGuessError('Congrats! You get 1 point!');     
          fetchWord().then(wordInfo => {
            setCurretnWord(wordInfo.word);
            setCurrentScore(wordInfo.score);
            setGuess(wordInfo.guess);
          });
        } else {
          setGuess(guess);
          setGuessError('What a pity... Wrong answer! Please try again.');
        }
        document.getElementById('word').value = '';
        
      })
      .catch(err => {
        setError(err?.error || 'ERROR');
        checkForSession();
      });
  };

  useEffect(
    () => {
      checkForSession();
    },
    []
  );

  const pollGames = useCallback( () => {
    fetchWord()
    .then(wordInfo => {
      setLoginStatus(LOGIN_STATUS.IS_LOGGED_IN);
      setCurretnWord(wordInfo.word);
      setCurrentScore(wordInfo.score);
      setGuess(wordInfo.guess);
    })
    .then( () => {
      pollingRef.current = setTimeout(pollGames, POLLING_DELAY);
    })
    .catch( err => {
      setError(err?.error || 'ERROR');
      pollingRef.current = setTimeout(pollGames, POLLING_DELAY);
      checkForSession();
    });
  }, []);

  useEffect(
    () => {
      if(loginStatus == LOGIN_STATUS.IS_LOGGED_IN) {
        pollingRef.current = setTimeout( pollGames, POLLING_DELAY );
      }
      return () => {
        clearTimeout(pollingRef.current);
      };
    },
    [loginStatus, pollGames]
  );


  return (
    <>
      <div className="app">
        <Header/>
        <div className='main'>       
          { loginStatus === LOGIN_STATUS.PENDING && <Loading className="login__waiting">Loading user...</Loading> }
          { loginStatus === LOGIN_STATUS.NOT_LOGGED_IN && <Login onLogin={onLogin}/> }
          { loginStatus === LOGIN_STATUS.IS_LOGGED_IN && 
          <Game 
          onLogout={onLogout} 
          username={username} 
          word={currentWord}
          score={currentScore}
          guess={guess}
          onGuess={handleSubmitGuess}
          error={guessError}
          />}
          { error && <Status error={error}/> }
        </div>
        <Footer/>
      </div>
    </>
  )
}

export default App;
