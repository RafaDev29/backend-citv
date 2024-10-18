// src/modules/visits/visits.controller.js
const platesService = require('./plate.service');




const listPlates = async (req, res) => {
  try {
    const plates = await platesService.listPlates();
    res.status(200).json({
      message: "Placas listadas correctamente",
      status: true,
      data: plates
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al listar las placas",
      status: false,
      data: error.message
    });
  }
};

module.exports = {

    listPlates
};
