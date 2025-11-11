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
    updateTitle: async (req, res) => {
        try {
            const id = req.params.id
            const { newTitle } = req.body

            if (!newTitle)
                return res.status(400).json({ error: "new title is required" })

            const result = await mission.updateTitle(id, newTitle)

            if (result.error)
                return res.status(404).json(result)

            res.json(result)
        } catch (err) {
            res.status(500).json({ error: err.message })
        }
    },
    updateDescription: async (req, res) => {
        try {
            const id = req.params.id
            const { newDescription } = req.body

            if (!newDescription)
                return res.status(400).json({ error: "new description is required" })

            const result = await mission.updateDescription(id, newDescription)

            if (result.error)
                return res.status(404).json(result)

            res.json(result)
        } catch (err) {
            res.status(500).json({ error: err.message })
        }
    },
    updateLocation: async (req, res) => {
        try {
            const id = req.params.id
            const { newLocation } = req.body

            if (!newLocation)
                return res.status(400).json({ error: "new location is required" })

            const result = await mission.updateLocation(id, newLocation)

            if (result.error)
                return res.status(404).json(result)

            res.json(result)
        } catch (err) {
            res.status(500).json({ error: err.message })
        }
    },
    updateDates: async (req, res) => {
        try {
            const id = req.params.id
            const { start_at, end_at } = req.body

            if (!start_at || !end_at) 
                return res.status(400).json({ error: "start date and end date are required" })

            const result = await mission.updateDates(id, start_at, end_at)

            if (result.error)
                return res.status(400).json(result)

            res.json(result)
        } catch (err) {
            res.status(500).json({ error: err.message })
        }
    }
}

module.exports = missionController