
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

    static async getAll() {
        const qry = "SELECT * FROM supportgroup;"
        const [rows] = await db.query(qry)
        return rows
    }

    static async getById(id) {
        const qry = "SELECT * FROM supportgroup WHERE groupId = ?;"
        const [rows] = await db.query(qry, [id])
        return rows[0]
    }
    
    static async deleteById(id) {
        const qry1 = "SELECT * FROM supportgroup WHERE groupId = ?;"
        const [rows] = await db.query(qry1, [id])
        if (rows.length === 0)
            return { error: "support group does not exist" }

        const qry = "DELETE FROM supportgroup WHERE groupId = ?;"
        const [result] = await db.query(qry, [id])  
        return { message: "support group deleted successfully" }
    }

    static async updateDescription(id, newDescription) {
        const [group] = await db.query("SELECT * FROM supportgroup WHERE groupId = ?", [id])
        if (group.length === 0)
            return { error: "support group not found" }
        await db.execute("UPDATE supportgroup SET description = ? WHERE groupId = ?", [newDescription, id])
        return { message: "description updated successfully" }
    }

    static async updateName(id, newName) {
        const [group] = await db.query("SELECT * FROM supportgroup WHERE groupId = ?", [id])
        if (group.length === 0)
            return { error: "support group not found" }

        await db.execute("UPDATE supportgroup SET groupName = ? WHERE groupId = ?", [newName, id])
        return { message: "group name updated successfully" }
    }
}

module.exports = SupportGroup;
