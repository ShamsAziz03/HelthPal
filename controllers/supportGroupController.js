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
    },
    getGroups: async (req, res) => {
        try {
            const groups = await supportGroup.getAll()
            res.json(groups)
        } catch (err) {
            res.status(500).json({ error: err.message })
        }
    },
    getGroupById: async (req, res) => {
        try {
            const group = await supportGroup.getById(req.params.id);
            res.json(group);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}
module.exports = supportGroupController