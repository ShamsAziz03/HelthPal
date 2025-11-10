const bookRequests = require('../models/bookingModel')

const bookingController = {
    add: async (req, res) => {
        const result = await bookRequests.add(req.body)
        if (result.error) return res.status(400).json(result)
        res.json(result)
    },
    getAll: async (req, res) => {
        try {
            const data = await bookRequests.getAll()
            res.json(data)
        } catch (err) {
            res.status(500).json({ error: err.message })
        }
    },
     getByPatient: async (req, res) => {
        try {
            const patientId = req.params.patientId
            const data = await bookRequests.getByPatient(patientId)
            res.json(data)
        } catch (err) {
            res.status(500).json({ error: err.message })
        }
    },
}

module.exports = bookingController