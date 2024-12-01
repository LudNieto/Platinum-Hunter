import { io } from 'socket.io-client';

const socket = io('http://localhost:3001');

socket.on('gameAdded', (data) => {
    console.log('Nuevo juego agregado:', data);
});

socket.on('gameUpdated', (data) => {
    console.log('Juego actualizado:', data);
});

socket.on('gameDeleted', (data) => {
    console.log('Juego eliminado:', data);
});

socket.on('achievementAdded', (data) => {
    console.log('Nuevo logro agregado:', data);
});

socket.on('achievementUpdated', (data) => {
    console.log('Logro actualizado:', data);
});

socket.on('achievementDeleted', (data) => {
    console.log('Logro eliminado:', data);
});

export default socket;