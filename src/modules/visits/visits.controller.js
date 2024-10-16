// src/modules/visits/visits.controller.js
const visitsService = require('./visits.service');
const { createVisitDTO } = require('./dto/visits.dto');

const createVisit = async (req, res) => {
  try {
    const { error } = createVisitDTO.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: "Invalid request data",
        status: false,
        data: error.details
      });
    }

    const { internmentId, doctorId, visitDate, visitTime } = req.body;

    const visit = await visitsService.createVisit(internmentId, doctorId, visitDate, visitTime);
    res.status(201).json({
      message: "Visit created successfully",
      status: true,
      data: visit
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating visit",
      status: false,
      data: error.message
    });
  }
};

const listVisits = async (req, res) => {
  try {
    const visits = await visitsService.listVisits();
    res.status(200).json({
      message: "Visits retrieved successfully",
      status: true,
      data: visits
    });
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving visits",
      status: false,
      data: error.message
    });
  }
};

module.exports = {
  createVisit,
  listVisits
};
