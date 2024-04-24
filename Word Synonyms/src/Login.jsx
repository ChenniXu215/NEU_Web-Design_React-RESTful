import { useState } from 'react';

import './Login.css';

function Login({ onLogin}) {
  const [username, setUsername] = useState('');

  function onChange(e) {
    setUsername(e.target.value);
  }

  function onSubmit(e) {
    e.preventDefault();
    if(username) { 
      onLogin(username);
    }
  }

  return (
    <div className='login'>
        <h2 className="login-title">Login Page</h2>
        <form className="login-form" action="#/login" onSubmit={onSubmit}>
            <div className="login-input">
                <label htmlFor="username">Username: </label>
                <input
                    id="username" 
                    value={username}
                    onChange={onChange}
                />
            </div>
            <button className="login-btn" type="submit">
                Login
            </button>       
        </form>
    </div>
  );
}

export default Login;


