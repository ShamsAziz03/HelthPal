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
    }
}

module.exports = collaborationController