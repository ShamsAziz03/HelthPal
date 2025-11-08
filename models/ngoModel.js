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

}