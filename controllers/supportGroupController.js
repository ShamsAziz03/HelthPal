const supportGroup = require('../models/supportGroupsModel')
const supportGroupController = { 
    addGroup: async (req, res) => {
        try {
            const result = await supportGroup.add(req.body)
            if (result.error) 
                return res.status(404).json(result)
            res.json(result)
        } catch (err) {
            res.status(500).json({ error: err.message })
        }
    }
}
module.exports = supportGroupController