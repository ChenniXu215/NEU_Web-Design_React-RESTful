const userInfo = {};

function updateUserGameInfo(username, word, guess) {
  if (!userInfo[username]) {
    userInfo[username] = {
      score: 0,
      currentWord: '',
      lastGuess: '',
    };
  } else {
    if (word) userInfo[username].currentWord = word;
    if (guess) userInfo[username].lastGuess = guess;
  }
}

function getUserGameInfo(username) {
  return userInfo[username] || null;
}

function isValidUsername(username) {
  let isValid = true;
  isValid = isValid && username.trim();
  isValid = isValid && username.match(/^[A-Za-z0-9_]+$/);
  return isValid;
}

function isValidWord(word) {
  let isValid = true;
  isValid = isValid && word.match(/^[A-Za-z]*$/);
  return isValid;
}


module.exports = {
  isValidUsername,
  isValidWord,
  userInfo,
  updateUserGameInfo,
  getUserGameInfo,
};
