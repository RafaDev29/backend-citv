// src/modules/visits/visits.routes.js
const express = require('express');
const router = express.Router();
const visitsController = require('./visits.controller');

router.post('/create', visitsController.createVisit);
router.get('/list', visitsController.listVisits);

module.exports = router;
