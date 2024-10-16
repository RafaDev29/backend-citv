// src/modules/visits/visits.dto.js
const Joi = require('joi');
const timePattern = /^([01]\d|2[0-3]):([0-5]\d)$/;
const createVisitDTO = Joi.object({
  internmentId: Joi.number().integer().required(),
  doctorId: Joi.number().integer().required(),
  visitDate: Joi.date().iso().required(),
  visitTime:  Joi.string().pattern(timePattern).required(), 
});

module.exports = {
  createVisitDTO
};
