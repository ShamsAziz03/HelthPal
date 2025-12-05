const collaboration = require('../models/collaborationModel.js');

const collaborationController = {
    add: async (req, res) => {
        try {
            const data = req.body
            const newCollaboration = await collaboration.add(data)
            if (newCollaboration.error)
                return res.status(400).json({ error: newCollaboration.error })
            res.status(200).json(newCollaboration)
        } catch (err) {
            res.status(500).json({ error: err.message })
        }
    },
    updateStatus: async (req, res) => {
        try {
            const {collaborationId, status} = req.body
            const result = await collaboration.updateStatus(collaborationId, status)
            if (!result) {
                return res.status(404).json({ message: "failed to update status" })
            }
            res.json({ message: "status updated successfully" })
        } catch (err) {
            res.status(500).json({ error: err.message })
        }
    },
    getAll: async (req, res) => {
        try {
            const data = await collaboration.getAll()
            res.json(data)
        } catch (err) {
            res.status(500).json({ error: err.message })
        }
    },
    getById: async (req, res) => {
        try {
            const { id } = req.params
            const result = await collaboration.getById(id)
            res.json(result)
        } catch (err) {
            res.status(500).json({ error: err.message })
        }
    },
    delete: async (req, res) => {
        try {
            const { id } = req.params
            const result = await collaboration.delete(id)
            res.json(result)
        } catch (err) {
            res.status(500).json({ error: err.message })
        }
    }
}

module.exports = collaborationController