const collaboration = require('../models/collaborationModel.js');

const collaborationController = {
    add: async (req, res) => {
        try {
            const data = req.body
            const newCollaboration = await collaboration.add(data)
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
    }
}

module.exports = collaborationController