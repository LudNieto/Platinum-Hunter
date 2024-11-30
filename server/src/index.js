import express from 'express';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';
import gameRoutes from './routes/gameRoutes.js';
import { verifyToken } from './middlewares/authmiddleware.js'; 


const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
    },
});

app.use(cors());
app.use(express.json());


app.use('/api/games', gameRoutes);

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

export { io };