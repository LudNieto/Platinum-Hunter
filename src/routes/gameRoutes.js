const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gameController');

// Rutas de juegos
router.get('/', gameController.getAllGames);
router.get('/:gameId', gameController.getGameById);
router.post('/', gameController.createGame); 

module.exports = router;
