export function fetchLogin(username) {
  return fetch('/api/v1/session', {
    method: 'POST',
    headers: new Headers({
      'content-type': 'application/json'
    }),
    body: JSON.stringify({ username }),
  })
  .catch( () => Promise.reject({ error: 'networkError' }) )
  .then( response => {
    if (response.ok) {
      return response.json();
    }
    return response.json()
    .catch( error => Promise.reject({ error }) )
    .then( err => Promise.reject(err) );
  });
}

export function fetchLogout() {
  return fetch('/api/v1/session/', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .catch(err => Promise.reject({ error: 'networkError' }))
  .then( response => {
    if (response.ok) {
      return response.json();
    }
    return response.json()
    .catch( error => Promise.reject({ error }) )
    .then( err => Promise.reject(err) );
  });
}

export function fetchSessionStatus() {
  return fetch('/api/v1/session', {
    method: 'GET',
  })
  .catch( () => Promise.reject({ error: 'networkError' }) )
  .then( response => {
    if (response.ok) {
      return response.json();
    }
    return response.json()
    .catch( error => Promise.reject({ error }) )
    .then( err => Promise.reject(err) );
  });
}

export function fetchWord() {
  return fetch('/api/v1/word', {
    method: 'GET',
    credentials: 'include',
  })
  .catch(err => Promise.reject({ error: 'networkError' }))
  .then(response => {
    if (!response.ok) {
      return response.json().then(err => Promise.reject(err));
    }
    return response.json();
  });
}

export function fetchSubmitGuess(guess) {
  return fetch('/api/v1/guess', {
    method: 'PUT',
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
    credentials: 'include',
    body: JSON.stringify({ guess }),
  })
  .catch(() => Promise.reject({ error: 'networkError' }))
  .then(response => {
    if (!response.ok) {
      return response.json().then(err => Promise.reject(err));
    }
    return response.json();
  });
}






