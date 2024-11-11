require('dotenv').config();
const express = require('express');
const cors= require('cors')
const app = express();


const responseMiddleware = require('./src/middleware/responseMiddleware');
const evidenceRoutes = require('./src/modules/evidence/evidense.routes')
const platesRoutes = require('./src/modules/plates/plate.routes')

// Middleware para procesar JSON y para manejar respuestas
app.use(express.json({ limit: '50mb' }));
app.use(responseMiddleware);
app.use(cors());

// Rutas


app.use('/api/evidence', evidenceRoutes)
app.use('/api/plates', platesRoutes)


// Puerto de escucha
const PORT = process.env.PORT || 3080;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
