
const db = require("../config/db");

class SupportGroup {
    static async add(data) {
        const { groupName, description, createdBy } = data
        //ensure that user exists
        const qry1 = "SELECT * FROM user WHERE userId = ?;"
        const [userRows] = await db.query(qry1, [createdBy])
        if (userRows.length === 0) 
            return { error: "User does not exist" }
        
        const qry2 = "INSERT INTO supportgroup (groupName, description, createdBy) VALUES (?, ?, ?);"
        const [result] = await db.query(qry2, [groupName, description, createdBy])
        return { groupId: result.insertId, groupName, description, createdBy }
    }

}

module.exports = SupportGroup;
