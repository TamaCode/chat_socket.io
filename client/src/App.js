// import './App.css';
import { useState, useEffect } from 'react';
const { io } = require("socket.io-client");


function App() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const socket = io("http://localhost:4000/");

  socket.on("desde server", (arg) => { // RECIBO DESDE EL SERVER
    const socketId = arg.split("/")[1];
    const socketMsj = socketId === socket.id ? "_____________" + arg.split("/")[0] : arg.split("/")[0];

    socketMsj && setMessages([socketMsj, ...messages]) // DISPARA EL RENDERIZADO
  });

  useEffect(() => { // SE EJECUTA LUEGO DE MODIFICAR LA VARIABLE MESSAGE
    socket.emit("desde cliente", message); // ENVIO DESDE EL CLIENTE
  }, [message]);

  const handler = (e) => {
   e.preventDefault();
   const textValue = e.target.firstChild.value;
   textValue && setMessage(textValue) // DISPARA EL RENDERIZADO y EL USE EFFECT
   e.target.firstChild.value = "";
  };

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Hola Cliente
        </p>
      </header>
      <body>
        <form onSubmit={handler}>
          <input type='text' defaultValue={message} placeholder="Write a message"></input>
          <button>SEND</button>
        </form>
        {
          messages.map((message, index) => <p key={index}>{message}</p>)
        }
      </body>
    </div>
  );
}

export default App;
