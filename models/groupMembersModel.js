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
}
module.exports = GroupMembers