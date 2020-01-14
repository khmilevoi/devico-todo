import io from 'socket.io-client';

export const socket = io('http://localhost:3000');

socket.on('reconnect', () => {
  const token = window.localStorage.getItem('token');

  if (token) {
    socket.emit('auth', token);
  }
});
