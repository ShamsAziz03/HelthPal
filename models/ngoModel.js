const db = require('../config/db')
const { v4: uuidv4 } = require("uuid")

class NGO {
    static async add(data) {
        const { userId, organizationName, registrationNumber, contactPerson, serviceAreas } = data;
        const ngoId = uuidv4()

        //here we should check for user id if exist or not 
        const qry = "INSERT INTO healthpal.ngo (userId,organizationName,registrationNumber,contactPerson,serviceAreas)VALUES(?, ?, ?, ?, ?);"
        const res = await db.execute(qry, [userId, organizationName, registrationNumber, contactPerson, serviceAreas])

        return {ngoId, ...data}
    }

    static async delete(id) {
        const qry = "DELETE FROM `healthpal`.`ngo` WHERE ngoId = ?;"
        const [res] = await db.execute(qry, [id])

        return res.affectedRows > 0;
    }

    //retrieving NGOs using different parameters
    static async getAll() {
        const qry = "SELECT * FROM healthpal.ngo;"
        const [res] = await db.query(qry)

        return res
    }

    static async getByOrgId(id) {
        const qry = "SELECT * FROM healthpal.ngo WHERE ngoId = ?;"
        const [res] = await db.query(qry, [id])

        return res
    }

    static async getByOrgName(orgName) {
        const qry = "SELECT * FROM healthpal.ngo WHERE organizationName = ?;"
        const [res] = await db.query(qry, [orgName])

        return res
    }

    static async getByRegNumber(regNum) {
        const qry = "SELECT * FROM healthpal.ngo WHERE registrationNumber = ?;"
        const [res] = await db.query(qry, [regNum])

        return res
    }

    static async getByuserId(id) {
        const qry = "SELECT * FROM healthpal.ngo WHERE userId = ?;"
        const [res] = await db.query(qry, [id])

        return res
    }
}