import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { FaMoon, FaSun, FaCopy } from 'react-icons/fa';

function App() {
  const [socket, setSocket] = useState(null);
  const [text, setText] = useState('');
  const [messages, setMessages] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const newSocket = io('https://copyapp-mazy.onrender.com');
    setSocket(newSocket);

    newSocket.on('all-text', (msg) => {
      setMessages((prev) => [...prev, msg]);
      console.log('Message received:', msg);
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const addText = () => {
    if (socket && text.trim() !== '') {
      socket.emit('add-text', text);
      setText('');
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const copyText = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
    });
  };

  const styles = {
    container: {
      backgroundColor: darkMode ? '#1a1a1a' : '#ffffff',
      color: darkMode ? '#ffffff' : '#000000',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      transition: 'background-color 0.3s, color 0.3s',
    },
    inputContainer: {
      width: '90%',
      maxWidth: '300px',
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
    },
    input: {
      padding: '10px',
      backgroundColor: darkMode ? '#333333' : '#f0f0f0',
      color: darkMode ? '#ffffff' : '#000000',
      border: 'none',
      borderRadius: '5px',
      width: '93%',
    },
    button: {
      padding: '10px',
      backgroundColor: darkMode ? '#555555' : '#007bff',
      color: '#ffffff',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      width: '100%',
    },
    messageContainer: {
      marginTop: '20px',
      width: '100%',
      maxWidth: '600px',
      textAlign: 'center',
    },
    message: {
      marginTop: '10px',
      padding: '10px',
      backgroundColor: darkMode ? '#333333' : '#f0f0f0',
      borderRadius: '5px',
      color: darkMode ? '#ffffff' : '#000000',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    copyButton: {
      backgroundColor: 'transparent',
      border: 'none',
      color: darkMode ? '#ffffff' : '#000000',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
    },
    toggleButton: {
      position: 'fixed',
      top: '20px',
      right: '20px',
      backgroundColor: darkMode ? '#555555' : '#007bff',
      color: '#ffffff',
      border: 'none',
      borderRadius: '50%',
      padding: '10px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    copyright: {
      position: 'fixed',
      bottom: '10px',
      left: '50%',
      transform: 'translateX(-50%)',
      color: darkMode ? '#ffffff' : '#000000',
      fontSize: '14px',
    },
    copiedMessage: {
      position: 'fixed',
      top: '60px',
      right: '20px',
      backgroundColor: '#28a745',
      color: '#ffffff',
      padding: '10px',
      borderRadius: '5px',
      fontSize: '14px',
    },
  };

  return (
    <div style={styles.container}>
      <button style={styles.toggleButton} onClick={toggleDarkMode}>
        {darkMode ? <FaSun /> : <FaMoon />}
      </button>
      {copied && <div style={styles.copiedMessage}>Text copied successfully!</div>}
      <div style={styles.inputContainer}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={styles.input}
          placeholder="Enter your message"
        />
        <button onClick={addText} style={styles.button}>
          Add
        </button>
      </div>
      <div style={styles.messageContainer}>
        {messages.map((message, index) => (
          <div key={index} style={styles.message}>
            <h3>{message.message}</h3>
            <button style={styles.copyButton} onClick={() => copyText(message.message)}>
              <FaCopy />
            </button>
          </div>
        ))}
      </div>
      <div style={styles.copyright}>
        &copy; {new Date().getFullYear()} Youssef Habbachi
      </div>
    </div>
  );
}

export default App;
