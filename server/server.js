require("dotenv").config()
const express = require('express');
const { Server } = require('socket.io');
const app = express();
const http = require('http');
const port = process.env.PORT || 5000;
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: 'https://copyapp-front2.onrender.com/' } });
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL);

const msgSchema = new mongoose.Schema({
  message: { type: String, required: true },
});

const Msg = mongoose.model('Message', msgSchema);

// Function to delete all messages from the database
const deleteAllMessages = async () => {
  try {
    await Msg.deleteMany({}); // Delete all documents in the "Message" collection
    console.log('All messages deleted from the database.');
  } catch (error) {
    console.error('Error deleting messages:', error);
  }
};

// Schedule deletion after 10 seconds
setTimeout(deleteAllMessages, 10000); // 10 seconds = 10000 milliseconds

io.on('connection', (socket) => {
  console.log('User logged', socket.id);

  socket.on('add-text', (text) => {
    console.log(`User ${socket.id}:`, text);
    const newmsg = new Msg({
      message: text,
    });
    newmsg.save();
    io.emit('all-text', newmsg);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
