import {db} from '../../../server/src/config/firebase.js';

// Obtener todos los juegos
export const getAllGames = async (req, res) => {
  try {
    const gamesSnapshot = await db.collection('games').get();
    console.log(gamesSnapshot);
    const games = gamesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(games);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener un juego por ID
export const getGameById = async (req, res) => {
  try {
    const gameId = req.params.gameId;
    const gameDoc = await db.collection('games').doc(gameId).get();
    if (!gameDoc.exists) {
      return res.status(404).json({ message: 'Juego no encontrado' });
    }
    res.status(200).json({ id: gameDoc.id, ...gameDoc.data() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Crear un juego nuevo
export const createGame = async (req, res) => {
  try {
    const { title, description } = req.body;
    const gameRef = db.collection('games').doc();
    await gameRef.set({ title, description });
    res.status(201).json({ message: 'Juego creado con éxito' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
