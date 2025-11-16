const supportGroup = require('../models/supportGroupsModel')
const groupMembers = require('../models/groupMembersModel')
const supportGroupController = { 
    //support group
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
    },
    deleteGroup: async (req, res) => {
        try {
            const id = req.params.id
            const result = await supportGroup.deleteById(id)
            if (result.error) 
                return res.status(404).json(result)
            res.json(result)
        } catch (err) {
            res.status(500).json({ error: err.message })
        }
    },

    //members
    joinGroup: async (req, res) => {
        try {
            const result = await groupMembers.addMember(req.body)
            if (result.error) 
                return res.status(404).json(result)
            res.json(result)
        } catch (err) {
            res.status(500).json({ error: err.message })
        }
    }
}
module.exports = supportGroupController