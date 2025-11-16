const supportGroup = require('../models/supportGroupsModel')
const groupMembers = require('../models/groupMembersModel')
const { sendGroupMsg } = require('../models/chatModel')
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
    updateName: async (req, res) => {
        try {
            const id = req.params.id
            const { newName } = req.body
            const result = await supportGroup.updateName(id, newName)
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
            const result = await supportGroup.updateDescription(id, newDescription)

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
    },
    getGroupMembers: async (req, res) => {
        try {
            const groupId = req.params.id
            const members = await groupMembers.getGroupMembers(groupId)
            if (members.error)
                return res.status(404).json(members)
            res.json(members)
        } catch (err) {
            res.status(500).json({ error: err.message })
        }
    }   ,
    getAllMembers: async (req, res) => {
        try {
            const members = await groupMembers.getAllMembers()
            res.json(members)
        } catch (err) {
            res.status(500).json({ error: err.message })
        }
    },
    removeMember: async (req, res) => {
        try {
            const { memberId } = req.params;
            const result = await groupMembers.removeMember(memberId);
            if (result.affectedRows === 0 || result.error) {
                return res.status(404).json({ error: "member not found" });
            }
            res.json({ message: "member removed successfully" });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    //chatting
    sendGroupMsg: async (req, res) => {
        try {
            const msgData = req.body
            const result = await sendGroupMsg(msgData)
            if (result.error) 
                return res.status(404).json(result)
            res.json({message:"message sent successfully", result})
        } catch (err) {
            res.status(500).json({ error: err.message })
        }
    }
}
module.exports = supportGroupController