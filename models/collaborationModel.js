const db = require('../config/db');

class Collaboration {
    static async add(data) {
        const { ngoId, partnerNgoId, status } = data;

        //check for forign keys
        const [ngo] = await db.query("SELECT * FROM healthpal.ngo WHERE ngoId = ?", [ngoId])
        if (ngo.length === 0)
            return { error: "NGO not found" }

        //check for partner verification
        const ngoInfo = ngo[0]
        if (!ngoInfo.registrationNumber)
            return { error: "NGO is not verified" }

        const [partner] = await db.query("SELECT * FROM healthpal.ngo WHERE ngoId = ?", [partnerNgoId])
        if (partner.length === 0)
            return { error: "Partner NGO not found" }

        //check for partner verification
        const partnerInfo = partner[0]
        if (!partnerInfo.registrationNumber)
            return { error: "Partner NGO is not verified" }

        const qry = "INSERT INTO healthpal.collaboration (ngoId, partnerNgoId, status) VALUES (?, ?, ?);"
        await db.execute(qry, [ngoId, partnerNgoId, status || 'Pending'])

        return { ngoId, partnerNgoId, status: status || 'Pending' }
    }
}

module.exports = Collaboration;
