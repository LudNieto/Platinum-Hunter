const { db } = require('../config/firebase');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const secretKey = 'yourSecretKey'; 

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
