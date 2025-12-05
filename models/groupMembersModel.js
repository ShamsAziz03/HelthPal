const db = require('../config/db')

class GroupMembers {
    static async addMember(data) {
        const { groupId, userId } = data

        //ensure that group and user exist
        const qry1 = "SELECT * FROM supportgroup WHERE groupId = ?;"
        const [groupRows] = await db.query(qry1, [groupId])
        if (groupRows.length === 0)
            return { error: "support group not found" }

        const qry2 = "SELECT * FROM user WHERE userId = ?;"
        const [userRows] = await db.query(qry2, [userId])
        if (userRows.length === 0)
            return { error: "user not found" }
        
        const qry3 = "SELECT * FROM group_members WHERE groupId = ? AND userId = ?;"
        const [existingRows] = await db.query(qry3, [groupId, userId])
        if (existingRows.length > 0)
            return { error: "the user already is a member of this group" }

        const sql = "INSERT INTO group_members (groupId, userId) VALUES (?, ?);"
        const [result] = await db.query(sql, [groupId, userId])
        return { memberId: result.insertId, groupId, userId }
    }

    static async getAllMembers() {
        const sql = `SELECT sg.groupId, sg.groupName, sg.description,
                    JSON_ARRAYAGG(JSON_OBJECT('userId', u.userId, 'fullName', u.fullName)) AS members
                    FROM supportgroup sg
                    JOIN group_members gm ON sg.groupId = gm.groupId
                    JOIN user u ON gm.userId = u.userId
                    GROUP BY sg.groupId;`
        const [rows] = await db.query(sql)
        return rows
    }
    static async getGroupMembers(groupId) {
        const qry1 = "SELECT * FROM supportgroup WHERE groupId = ?;"
        const [groupRows] = await db.query(qry1, [groupId])
        if (groupRows.length === 0)
            return { error: "support group not found" }

        const qry2 = `SELECT u.userId, u.fullName
                    FROM group_members gm
                    INNER JOIN user u ON gm.userId = u.userId
                    WHERE gm.groupId = ?;`
        const [rows] = await db.query(qry2, [groupId])
        return rows
    }
    static async removeMember(memberId) {
        const qry1 = "SELECT * FROM group_members WHERE memberId = ?;"
        const [memberRows] = await db.query(qry1, [memberId])
        if (memberRows.length === 0)
            return { error: "member not found" }
        const sql = "DELETE FROM group_members WHERE memberId = ?;"
        const [result] = await db.query(sql, [memberId])
        return result
    }
}
module.exports = GroupMembers