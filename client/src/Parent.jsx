import React from 'react';
import App from './App.jsx';

const Parent = () => {
  const userName = prompt('in parent what is your name?')

  return(<div>
    <App userName={userName}/>
  </div>)
}

export default Parent;