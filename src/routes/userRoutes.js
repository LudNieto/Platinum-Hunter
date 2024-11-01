const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Rutas de usuario
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.get('/profile', userController.getUserProfile);

module.exports = router;
