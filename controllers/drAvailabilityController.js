const drAvailability = require("../models/drAvailabilityModel");

const drAvailabilityController = {
    add: async (req, res) => {
        const result = await drAvailability.add(req.body);

        if (result.error) return res.status(400).json(result);
        res.json(result);
    },
    getAll: async (req, res) => {
        try {
            const drAva = await drAvailability.getAll()
            res.json(drAva)
        } catch (err) {
            res.status(500).json({ error: err.message })
        }
    },
    getByDr: async (req, res) => {
        try {
            const id = req.params.id
            const drAva = await drAvailability.getByDr(id)
            res.json(drAva)
        } catch (err) {
            res.status(500).json({ error: err.message })
        }
    },
    getAvailable: async (req, res) => {
        try {
            const drAva = await drAvailability.getAvailable()
            res.json(drAva)
        } catch (err) {
            res.status(500).json({ error: err.message })
        }
    },
    getByDate: async (req, res) => {
        try {
            const { date } = req.query
            const drAva = await drAvailability.getByDate(date)
            res.json(drAva)
        } catch (err) {
            res.status(500).json({ error: err.message })
        }
    },
    getByStatus: async (req, res) => {
        try {
            const status = req.params.status
            const drAva = await drAvailability.getByStatus(status)
            res.json(drAva)
        } catch (err) {
            res.status(500).json({ error: err.message })
        }
    }
};

module.exports = drAvailabilityController;
