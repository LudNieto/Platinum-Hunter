const express = require('express');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const userRoutes = require('./routes/userRoutes');
const gameRoutes = require('./routes/gameRoutes');

const app = express();

// Configuración de Swagger
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Usuarios y Juegos',
      version: '1.0.0',
      description: 'API para gestionar usuarios y juegos con Firebase',
    },
    servers: [
      {
        url: 'http://localhost:3000/api',
        description: 'Servidor de desarrollo',
      },
    ],
  },
  apis: ['./routes/*.js'], // Ruta a los archivos que contienen las rutas y documentación Swagger
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/games', gameRoutes);

module.exports = { app };
