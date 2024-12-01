const { db } = require('../config/firebase');

/**
 * @swagger
 * components:
 *   schemas:
 *     Game:
 *       type: object
 *       required:
 *         - title
 *         - description
 *       properties:
 *         title:
 *           type: string
 *           description: Título del juego
 *         description:
 *           type: string
 *           description: Descripción del juego
 *       example:
 *         title: "Aventuras Fantásticas"
 *         description: "Un juego de aventuras y fantasía."
 */

/**
 * @swagger
 * tags:
 *   name: Games
 *   description: API para la gestión de juegos
 */

/**
 * @swagger
 * /games:
 *   get:
 *     summary: Obtener todos los juegos
 *     tags: [Games]
 *     responses:
 *       200:
 *         description: Lista de juegos obtenida con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Game'
 *       500:
 *         description: Error en el servidor
 */
// Obtener todos los juegos
exports.getAllGames = async (req, res) => {
  try {
    const gamesSnapshot = await db.collection('games').get();
    const games = gamesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(games);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * @swagger
 * /games/{gameId}:
 *   get:
 *     summary: Obtener un juego por ID
 *     tags: [Games]
 *     parameters:
 *       - in: path
 *         name: gameId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del juego
 *     responses:
 *       200:
 *         description: Juego obtenido con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: ID del juego
 *                 title:
 *                   type: string
 *                   description: Título del juego
 *                 description:
 *                   type: string
 *                   description: Descripción del juego
 *       404:
 *         description: Juego no encontrado
 *       500:
 *         description: Error en el servidor
 */
// Obtener un juego por ID
exports.getGameById = async (req, res) => {
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

/**
 * @swagger
 * /games:
 *   post:
 *     summary: Crear un juego nuevo
 *     tags: [Games]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Game'
 *     responses:
 *       201:
 *         description: Juego creado con éxito
 *       500:
 *         description: Error en el servidor
 */
// Crear un juego nuevo
exports.createGame = async (req, res) => {
  try {
    const { title, description } = req.body;
    const gameRef = db.collection('games').doc();
    await gameRef.set({ title, description });
    res.status(201).json({ message: 'Juego creado con éxito' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
