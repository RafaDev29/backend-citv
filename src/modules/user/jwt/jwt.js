const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET || 'yourSecretKey';

// Función para generar el token
const generateToken = (user) => {
  return jwt.sign(
    { id_usuario: user.id_usuario }, // Incluir el id_usuario en el payload del token
    secretKey,
    { expiresIn: '24h' } // El token expira en 1 hora
  );
};

// Función para verificar el token
const verifyToken = (token) => {
  try {
    return jwt.verify(token, secretKey);
  } catch (error) {
    throw new Error('Token inválido');
  }
};

module.exports = {
  generateToken,
  verifyToken
};
