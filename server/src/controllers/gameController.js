import { db } from '../config/firebase.js';
import { io } from '../index.js';

export const getGames = async (req, res) => {
    try {
        const gamesSnapshot = await db.collection('juegos').get();
        const games = gamesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.status(200).json(games);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const addGame = async (req, res) => {
    const { Nombre, Plataforma, Genero } = req.body;
    try {
        const gameRef = await db.collection('juegos').add({ Nombre, Plataforma, Genero, createdAt: admin.firestore.FieldValue.serverTimestamp() });
        io.emit('gameAdded', { id: gameRef.id, Nombre, Plataforma, Genero });
        res.status(201).json({ message: 'Juego agregado correctamente.', gameId: gameRef.id });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const updateGame = async (req, res) => {
    const { id } = req.params;
    const { Nombre, Plataforma, Genero } = req.body;
    try {
        await db.collection('juegos').doc(id).update({ Nombre, Plataforma, Genero, updatedAt: admin.firestore.FieldValue.serverTimestamp() });
        io.emit('gameUpdated', { id, Nombre, Plataforma, Genero });
        res.status(200).json({ message: 'Juego actualizado correctamente.' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const deleteGame = async (req, res) => {
    const { id } = req.params;
    try {
        await db.collection('juegos').doc(id).delete();
        io.emit('gameDeleted', { id });
        res.status(200).json({ message: 'Juego eliminado correctamente.' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const addAchievement = async (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion, dificultad, rareza } = req.body;
    try {
        const achievementRef = await db.collection('juegos').doc(id).collection('Logros').add({ nombre, descripcion, dificultad, rareza, createdAt: admin.firestore.FieldValue.serverTimestamp() });
        io.emit('achievementAdded', { gameId: id, achievementId: achievementRef.id, nombre, descripcion, dificultad, rareza });
        res.status(201).json({ message: 'Logro agregado correctamente.', achievementId: achievementRef.id });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const updateAchievement = async (req, res) => {
    const { id, achievementId } = req.params;
    const { nombre, descripcion, dificultad, rareza } = req.body;
    try {
        await db.collection('juegos').doc(id).collection('Logros').doc(achievementId).update({ nombre, descripcion, dificultad, rareza, updatedAt: admin.firestore.FieldValue.serverTimestamp() });
        io.emit('achievementUpdated', { gameId: id, achievementId, nombre, descripcion, dificultad, rareza });
        res.status(200).json({ message: 'Logro actualizado correctamente.' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const deleteAchievement = async (req, res) => {
    const { id, achievementId } = req.params;
    try {
        await db.collection('juegos').doc(id).collection('Logros').doc(achievementId).delete();
        io.emit('achievementDeleted', { gameId: id, achievementId });
        res.status(200).json({ message: 'Logro eliminado correctamente.' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};