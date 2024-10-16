require('dotenv').config();
const express = require('express');
const cors= require('cors')
const app = express();
const userRoutes = require('./src/modules/user/user.routes');
const doctorRoutes = require('./src/modules/doctor/doctor.routes');
const responseMiddleware = require('./src/middleware/responseMiddleware');
const patientRoutes = require('./src/modules/patient/patient.routes')
const internmentsRoutes = require('./src/modules/internment/internments.routes');
const dischargesRoutes = require('./src/modules/discharges/discharges.routes')
const visitsRoutes = require('./src/modules/visits/visits.routes')
// Middleware para procesar JSON y para manejar respuestas
app.use(express.json());
app.use(responseMiddleware);
app.use(cors());

// Rutas
app.use('/api/users', userRoutes);
app.use('/api/doctor', doctorRoutes);
app.use('/api/patient', patientRoutes);
app.use('/api/internment', internmentsRoutes);
app.use('/api/discharges', dischargesRoutes)
app.use('/api/visits', visitsRoutes)

// Puerto de escucha
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
