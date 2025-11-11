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

}

module.exports = Mission