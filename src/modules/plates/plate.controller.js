const platesService = require('./plates.service');

exports.createPlate = async (req, res) => {
    try {
        const data = await platesService.createPlate(req.body);
        res.json({
            message: "Plate record created successfully",
            status: true,
            data: data
        });
    } catch (error) {
        res.json({
            message: error.message,
            status: false,
            data: null
        });
    }
};


exports.listActivePlates = async (req, res) => {
  try {
      const data = await platesService.listActivePlates();
      res.json({
          message: "Plates with status 0 retrieved successfully",
          status: true,
          data: data
      });
  } catch (error) {
      res.json({
          message: error.message,
          status: false,
          data: null
      });
  }
};