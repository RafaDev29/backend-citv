// src/modules/user/user.dto.js
const Joi = require('joi');

// Esquema de validación para crear un usuario
const createUserSchema = Joi.object({
  nombre_usuario: Joi.string().min(3).max(30).required(),
  contrasena: Joi.string().min(6).required()
});

module.exports = {
  createUserSchema
};
