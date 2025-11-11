const mission = require('../models/missionModel')

const missionController = {
    add: async (req, res) => {
        const result = await mission.add(req.body);

        if (result.error) return res.status(400).json(result);
        res.json(result);
    },
    getAll: async (req, res) => {
        try {
            const m = await mission.getAll()
            res.json(m)
        } catch (err) {
            res.status(500).json({ error: err.message })
        }
    },
    getById: async (req, res) => {
        try {
            const id = req.params.id
            const m = await mission.getById(id)
            res.json(m)
        } catch (err) {
            res.status(500).json({ error: err.message })
        }
    },
}

module.exports = missionController