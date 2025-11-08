const NGO = require('../models/NGO');

const ngoController = {
    add: async (req, res) => {
        try {
            const data = req.body
            const newNGO = await NGO.add(data)
            res.status(200).json(newNGO)
        } catch (err) {
            res.status(500).json({ error: err.message })
        }
    },
    delete: async (req, res) => {
        try {
            const id = req.params.id
            const result = await NGO.delete(id)
            if (!result) {
                return res.status(404).json({ message: "NGO not found" })
            }
            res.json({ message: "NGO deleted successfully" })
        } catch (err) {
            res.status(500).json({ error: err.message })
        }
    },
    getAll: async (req, res) => {
        try {
            const ngos = await NGO.getAll()
            res.json(ngos)
        } catch (err) {
            res.status(500).json({ error: err.message })
        }
    },
    getById: async (req, res) => {
        try {
            const id = req.params.id
            const ngo = await NGO.getByOrgId(id)
            if (!ngo || ngo.length === 0) {
                return res.status(404).json({ message: "NGO not found" })
            }
            res.json(ngo[0])
        } catch (err) {
            res.status(500).json({ error: err.message })
        }
    },
    search: async (req, res) => {
        try {
            const { name, regNumber, userId } = req.query
            let result = []

            if (name) 
                result = await NGO.getByOrgName(name)
            else if (regNumber) 
                result = await NGO.getByRegNumber(regNumber)
            else if (userId) 
                result = await NGO.getByuserId(userId)
            else 
                result = await NGO.getAll()

            res.json(result)
        } catch (err) {
            res.status(500).json({ error: err.message })
        }
    },
    getVerified: async (req, res) => {
        try {
            const ngos = await NGO.getVerifiedNGOs()
            res.json(ngos)
        } catch (err) {
            res.status(500).json({ error: err.message })
        }
    },
    verify: async (req, res) => {
        try {
            const { ngoId } = req.params
            const { registrationNumber } = req.body
            const result = await NGO.verifyNGO(ngoId, registrationNumber)
            if (!result) {
                return res.status(404).json({ message: "NGO not found" })
            }
            res.json({ message: "NGO verified successfully" })
        } catch (err) {
            res.status(500).json({ error: err.message })
        }
    }
}

module.exports = ngoController