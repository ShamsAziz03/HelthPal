const mission = require('../models/missionModel')

const missionController = {
    add: async (req, res) => {
        const result = await mission.add(req.body);

        if (result.error) return res.status(400).json(result);
        res.json(result);
    },
}

module.exports = missionController