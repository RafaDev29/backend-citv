const userService = require('./user.service');
const { createUserSchema } = require('./dto/user.dto');

const createUser = async (req, res) => {
  const { error } = createUserSchema.validate(req.body);
  
  if (error) {
    return res.error(`Error de validación: ${error.details[0].message}`, 400);
  }

  try {
    const { nombre_usuario, contrasena } = req.body;
    const result = await userService.createUser(nombre_usuario, contrasena);
    res.success(result, 'Usuario creado exitosamente');
  } catch (error) {
    res.error('Error al crear usuario', 500);
  }
};

const loginUser = async (req, res) => {
  try {
    const { nombre_usuario, contrasena } = req.body;
    const result = await userService.loginUser(nombre_usuario, contrasena);

    res.success({
      user: result.user,
      token: result.token
    }, 'Login exitoso');
  } catch (error) {
    res.error('Error en el login: ' + error.message, 401);
  }
};

module.exports = {
  createUser,
  loginUser
};
