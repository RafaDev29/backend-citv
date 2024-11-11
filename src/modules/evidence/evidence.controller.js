const evidenceService = require('./evidence.service');

exports.createEvidence = async (req, res) => {
    try {
        const data = await evidenceService.createEvidence(req.body, req.files);
        res.json({
            message: "Evidence added successfully",
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
