const { db } = require('../config/firebase');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const secretKey = 'yourSecretKey';

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           description: Correo electrónico del usuario
 *         password:
 *           type: string
 *           description: Contraseña del usuario
 *       example:
 *         email: usuario@ejemplo.com
 *         password: contraseña123
 */

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API para gestión de usuarios
 */

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Registrar un nuevo usuario
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: Usuario registrado con éxito
 *       500:
 *         description: Error en el servidor
 */
// Registro de usuario
exports.registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const userRef = db.collection('users').doc();
    await userRef.set({ email, password: hashedPassword });
    res.status(201).json({ message: 'Usuario registrado con éxito' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Inicio de sesión de usuario
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 description: Correo electrónico del usuario
 *               password:
 *                 type: string
 *                 description: Contraseña del usuario
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Token de autenticación
 *       401:
 *         description: Contraseña incorrecta
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error en el servidor
 */
// Inicio de sesión de usuario
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userRef = await db.collection('users').where('email', '==', email).get();
    if (userRef.empty) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    const userData = userRef.docs[0].data();
    const isPasswordValid = await bcrypt.compare(password, userData.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }
    const token = jwt.sign({ email }, secretKey, { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * @swagger
 * /profile:
 *   get:
 *     summary: Obtener perfil del usuario
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Perfil del usuario obtenido exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 profile:
 *                   type: object
 *                   description: Datos del perfil del usuario
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error en el servidor
 */
// Obtener perfil del usuario
exports.getUserProfile = async (req, res) => {
  try {
    const { email } = req.user; // Decodifica el token y obtiene el email
    const userRef = await db.collection('users').where('email', '==', email).get();
    if (userRef.empty) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    const userData = userRef.docs[0].data();
    res.status(200).json({ profile: userData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
