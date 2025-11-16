const db = require('../config/db')
const { v4: uuidv4 } = require('uuid');
const { deleteGroup } = require('../controllers/supportGroupController');

class Chat {
    static async sendGroupMsg(data) {
        const { senderId, groupId, message } = data;
        const chatId = uuidv4();

        //ensure that group and user exist
        const qry1 = "SELECT * FROM supportgroup WHERE groupId = ?;"
        const [groupRows] = await db.query(qry1, [groupId])
        if (groupRows.length === 0)
            return { error: "support group not found" }

        const qry2 = "SELECT * FROM user WHERE userId = ?;"
        const [userRows] = await db.query(qry2, [senderId])
        if (userRows.length === 0)
            return { error: "user not found" }

        //check if sender is a member of the group
        const qry3 = "SELECT * FROM group_members WHERE groupId = ? AND userId = ?;"
        const [memberRows] = await db.query(qry3, [groupId, senderId])  
        if (memberRows.length === 0)
            return { error: "sender is not a member of the group" }

        const sql = "INSERT INTO chatting (chatId, senderId, groupId, message) VALUES (?, ?, ?, ?);"
        const [result] = await db.query(sql, [ chatId, senderId, groupId ,message])

        return { chatId, senderId, groupId, message };
    }

    static async getGroupMsgs(groupId) {
        const qry1 = "SELECT * FROM supportgroup WHERE groupId = ?;"
        const [groupRows] = await db.query(qry1, [groupId])
        if (groupRows.length === 0)
            return { error: "support group not found" }

        const qry2 = `SELECT c.chatId, c.senderId, u.fullName AS senderName, c.message, c.messageTime, c.groupId
                    FROM chatting c
                    INNER JOIN user u ON c.senderId = u.userId
                    WHERE c.groupId = ?
                    ORDER BY c.messageTime ASC;`
        const [rows] = await db.query(qry2, [groupId])
        if (rows.length === 0)
            return { error: "no messages found for this group" }
        return rows
    }   

    static async deleteGroupMsgs(groupId) {
        const qry1 = "SELECT * FROM supportgroup WHERE groupId = ?;"
        const [groupRows] = await db.query(qry1, [groupId])
        if (groupRows.length === 0)
            return { error: "support group not found" }

        const qry2 = "SELECT * FROM chatting WHERE groupId = ?;"
        const [chatRows] = await db.query(qry2, [groupId])
        if (chatRows.length === 0)
            return { error: "no messages found for this group" }

        const sql = "DELETE FROM chatting WHERE groupId = ?;"
        const [result] = await db.query(sql, [groupId])
        return result
    }
}

module.exports = Chat;
