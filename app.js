require('dotenv').config();
const express = require('express');
const cors= require('cors')
const app = express();
const userRoutes = require('./src/modules/user/user.routes');
const platesRoutes = require('./src/modules/plates/plate.routes');
const responseMiddleware = require('./src/middleware/responseMiddleware');
const evidenceRoutes = require('./src/modules/evidence/evidense.routes')

// Middleware para procesar JSON y para manejar respuestas
app.use(express.json());
app.use(responseMiddleware);
app.use(cors());

// Rutas
app.use('/api/users', userRoutes);
app.use('/api/plates', platesRoutes);
app.use('/api/evidence', evidenceRoutes)


// Puerto de escucha
const PORT = process.env.PORT || 3080;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
