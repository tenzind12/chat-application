import { useEffect, useState } from 'react';
import './App.css';
import io from 'socket.io-client';

function App() {
  const [msg, setMsg] = useState('');

  useEffect(() => {
    const socket = io.connect('/');
    socket.on('msg', (data) => {
      setMsg(data);
    });
  }, [msg]);

  return (
    <div>
      <h1>This is client side</h1>
      <p>{msg}</p>
    </div>
  );
}

export default App;
