const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const PORT = 3000;

const sessions = require('./sessions');
const users = require('./users');
const words = require('./words');

app.use(cookieParser());
app.use(express.static('./dist'));
app.use(express.json());

app.get('/api/v1/session', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';
    if(!sid || !username) {
      res.status(401).json({ error: 'auth-missing' });
      return;
    }
    res.json({ username });
});

app.post('/api/v1/session', (req, res) => {
    const { username } = req.body;
    
    if(!users.isValidUsername(username)) {
      res.status(400).json({ error: 'required-username' });
      return;
    }
    
    if(username.toLowerCase() === 'dog') {
      res.status(403).json({ error: 'auth-insufficient' });
      return;
    }
    
    const sid = sessions.addSession(username);
    
    res.cookie('sid', sid);
    users.updateUserGameInfo(username);
    
    res.json({ username });
});


app.delete('/api/v1/session', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';
    
    if(sid) {
      res.clearCookie('sid');
    }
    
    if(username) {
      sessions.deleteSession(sid);
    }
  
    res.json({ username });
});


app.get('/api/v1/word', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  
  if(!sid || !username) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }

  if(!users.userInfo[username].currentWord) {
    const wordsList = Object.keys(words);
    const randomWord = wordsList[Math.floor(Math.random() * wordsList.length)];
    users.updateUserGameInfo(username, randomWord, '');
    res.json({ word: randomWord, score: users.userInfo[username].score, guess: users.userInfo[username].lastGuess });
  } else {
    const curWord = users.userInfo[username].currentWord;
    res.json({ word: curWord, score: users.userInfo[username].score, guess: users.userInfo[username].lastGuess });
  }
  
});

app.put('/api/v1/guess', (req, res) => {
  const { guess } = req.body;
  const sid = req.cookies.sid;
  const username = sessions.getSessionUser(sid);
  
  if (!username) {
      res.status(401).json({ error: 'auth-missing' });
      return;
  }
  
  const userInfo = users.getUserGameInfo(username);
  if (!userInfo) {
      res.status(404).json({ error: 'user-info-not-found' });
      return;
  }
  
  const correctAnswer = words[userInfo.currentWord];
  const correct = correctAnswer.toLowerCase() === guess.toLowerCase();

  users.updateUserGameInfo(username, userInfo.currentWord, guess);
  
  if (correct) {
    users.userInfo[username].score += 1;
    
    const wordsList = Object.keys(words);
    const randomWord = wordsList[Math.floor(Math.random() * wordsList.length)];
    users.updateUserGameInfo(username, randomWord, '');
    users.userInfo[username].lastGuess = '';
    res.json({ correct: true, synonym: correctAnswer });
  } else {
    res.json({ correct: false, synonym: correctAnswer });
  }
});


app.listen(
    PORT,
    () => console.log(`http://localhost:${PORT}`)
);