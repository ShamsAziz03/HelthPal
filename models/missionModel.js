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
}

module.exports = Mission