import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import io from 'socket.io-client';

const socket = io();

const App = (props) => {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [lastPong, setLastPong] = useState(null);
  const [message, setMessage] = useState('');
  const [listOfMessages, setListOfMessages] = useState([]);

  useEffect(() => {
    socket.on('connect', () => {
      setIsConnected(true);
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
    });

    socket.on('pong', () => {
      setLastPong(new Date().toISOString());
    });

    socket.on('chat message', (msg) => {
      // let list = listOfMessages;
      // listOfMessages.push(msg);
      setListOfMessages([...listOfMessages, msg]);
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('pong');
    }
  },[listOfMessages]);

  const sendPing = () => {
    socket.emit('ping');
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (message === '') {
      return
    }
    socket.emit('chat message', message);
    setMessage('')
  }

  return (
    <div>
      <h1>
        Whaddup Boss
      </h1>
      <Messages id="messages">
        {listOfMessages.map((msg, index) => {
          return (<li key={index}>{msg}</li>);
        })}
      </Messages>
      <MessageForm id="form" >
        <MessageInput id="input" type="text" value={message}autocomplete="off" onChange={(event) => {setMessage(event.target.value)}}/>
        <SendButton onClick={(event) => {handleSubmit(event)}}>Send</SendButton>
      </MessageForm>
    </div>
  );
}

const Messages = styled.ul`
  list-style-type: none; margin: 0; padding: 0;
`;
const MessageForm = styled.form`
  background: rgba(0, 0, 0, 0.15); padding: 0.25rem; position: fixed; bottom: 0; left: 0; right: 0; display: flex; height: 3rem; box-sizing: border-box; backdrop-filter: blur(10px);
`;
const MessageInput = styled.input`
  border: none; padding: 0 1rem; flex-grow: 1; border-radius: 2rem; margin: 0.25rem;
`;
const SendButton = styled.button`
  background: #333; border: none; padding: 0 1rem; margin: 0.25rem; border-radius: 3px; outline: none; color: #fff;
`;

export default App;