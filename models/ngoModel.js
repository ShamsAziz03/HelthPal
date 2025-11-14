const db = require('../config/db')
const { v4: uuidv4 } = require("uuid")
const isVerifiedNGO = require('../services/ngoVerifyService').isVerifiedNGO
class NGO {
    static async add(data) {
        const { userId, organizationName, registrationNumber, contactPerson, serviceAreas } = data;
        const ngoId = uuidv4()

        if (!organizationName)
            return { error: "organization name is required" }
        if(!userId)
            return { error: "userId is required" }
        if(!serviceAreas)
            return { error: "service areas is required" }
        
        let safeRegNum = registrationNumber ?? null
        const safeContact = contactPerson ?? null
        const isVerified = await isVerifiedNGO(organizationName)
        console.log("is verified:", isVerified.verified)
        if (registrationNumber && !isVerified.verified) {
            safeRegNum = null
        }

        const qry = "INSERT INTO healthpal.ngo (ngoId,userId,organizationName,registrationNumber,contactPerson,serviceAreas)VALUES(?,?, ?, ?, ?, ?);"
        const res = await db.execute(qry, [ngoId, userId, organizationName, safeRegNum, safeContact, serviceAreas])

        if (isVerified.verified)
            return { ngoId, userId, organizationName, registrationNumber: safeRegNum, contactPerson: safeContact, serviceAreas, message: "NGO registered and verified successfully" }
        else
            return {warnning: "NGO registered but it is not verified"}
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

    //NGO verification
    static async getVerifiedNGOs() {
        const qry = "SELECT * FROM healthpal.ngo WHERE registrationNumber IS NOT NULL;"
        const [res] = await db.query(qry)

        return res
    }

    static async verifyNGO(ngoId, regNum) {
        const qry = "UPDATE `healthpal`.`ngo` SET `registrationNumber` = ? WHERE `ngoId` = ?;"
        const [res] = await db.execute(qry, [regNum, ngoId])

        return res.affectedRows > 0
    }
}

module.exports = NGO