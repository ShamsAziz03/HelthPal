const db = require('../config/db')

class Mission {
    static async add(data) {
        const {title, description, location, start_at, end_at} = data 

        //ensure that dates are correct
        const start = new Date(start_at)
        const end = new Date(end_at)
        if(start > end)
            return ({ error: "start date must be before end date"})

        const qry = "INSERT INTO `healthpal`.`missions` (`title`,`description`,`location`,`start_at`,`end_at`) VALUES(?, ?, ?, ?, ?);"
        const res = await db.execute(qry, [title, description, location, start_at, end_at])

        return ({title, description, location, start_at, end_at})
    }
    static async getAll() {
        const qry = "SELECT * FROM healthpal.missions;"
        const [res] = await db.query(qry)

        return res
    }
    static async getById(id) {
        const qry = "SELECT * FROM healthpal.missions WHERE id = ?;"
        const [res] = await db.query(qry, [id])
        
        if (res.length === 0)
            return { error: "Mission not found" }
        return res[0]
    }

    //update using different metrics
    static async updateTitle(id, newTitle) {
        const [mission] = await db.query("SELECT * FROM healthpal.missions WHERE id = ?", [id])
        if (mission.length === 0)
            return { error: "mission not found" }

        await db.execute("UPDATE healthpal.missions SET title = ? WHERE id = ?", [newTitle, id])
        return { message: "title updated successfully" }
    }
    static async updateDescription(id, newDescription) {
        const [mission] = await db.query("SELECT * FROM healthpal.missions WHERE id = ?", [id])
        if (mission.length === 0)
            return { error: "mission not found" }

        await db.execute("UPDATE healthpal.missions SET description = ? WHERE id = ?", [newDescription, id])
        return { message: "description updated successfully" }
    }
    static async updateLocation(id, newLocation) {
        const [mission] = await db.query("SELECT * FROM healthpal.missions WHERE id = ?", [id])
        if (mission.length === 0)
            return { error: "mission not found" }

        await db.execute("UPDATE healthpal.missions SET location = ? WHERE id = ?", [newLocation, id])
        return { message: "location updated successfully" }
    }
    static async updateDates(id, start_at, end_at) {
        const [mission] = await db.query("SELECT * FROM healthpal.missions WHERE id = ?", [id])
        if (mission.length === 0)
            return { error: "mission not found" }

        const start = new Date(start_at)
        const end = new Date(end_at)
        if (start >= end)
            return { error: "start date must be before end date" }

        await db.execute("UPDATE healthpal.missions SET start_at = ?, end_at = ? WHERE id = ?", [start_at, end_at, id])
        return { message: "mssion dates updated successfully" }
    }
    static async delete(id) {
        const [mission] = await db.query("SELECT * FROM healthpal.missions WHERE id = ?", [id])
        if (mission.length === 0)
            return { error: "mission not found" }

        await db.execute("DELETE FROM healthpal.missions WHERE id = ?", [id])
        return { message: "mission deleted successfully" }
    }
}

module.exports = Mission