import express from 'express';
import gameRoutes from './routes/gameRoutes.js';
import userRoutes from './routes/authRoutes.js';

const app = express();

app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/games', gameRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export default app;