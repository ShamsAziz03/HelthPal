const drAvailability = require("../models/drAvailabilityModel");

const drAvailabilityController = {
  add: async (req, res) => {
    const result = await drAvailability.add(req.body);

    if (result.error) return res.status(400).json(result);
    res.json(result);
  },
};

module.exports = drAvailabilityController;
