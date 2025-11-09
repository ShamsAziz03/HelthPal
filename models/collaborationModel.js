const db = require('../config/db');

class Collaboration {
    static validateStatus(status) {
        const allowedStatuses = ['Active', 'Pending', 'Rejected'];
        if (status && !allowedStatuses.includes(status)) {
            return { error: `Status must be one of: ${allowedStatuses.join(', ')}` };
        }
        return null;
    }

    static async add(data) {
        const { ngoId, partnerNgoId, status } = data;

        // Validate status if provided
        if (status) {
            const statusError = this.validateStatus(status);
            if (statusError) {
                return statusError;
            }
        }

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

    static async updateStatus (id, newStatus) {
        //ensure that this collaboration exist
        const qry = "SELECT * FROM healthpal.collaboration WHERE `collaborationId` = ?;"
        const [data] = await db.query(qry, [id])
        if (data.length === 0)
            return { error: "collaboration not found" }

        const qry2 = "UPDATE `healthpal`.`collaboration` SET `status` = ? WHERE `collaborationId` = ?;"
        const [res] = await db.execute(qry2, [newStatus, id])

        if (res.affectedRows === 0) {
            return { error: "Failed to update status" }
        }
        return { message: "Status updated successfully"}
    }

    static async getAll() {
        const qry = 'SELECT * FROM healthpal.collaboration'
        const [data] = await db.query(qry)
        return data
    }

    static async getById(id) {
        const qry = 'SELECT * FROM healthpal.collaboration WHERE collaborationId = ?'
        const [data] = await db.query(qry, [id])
        if (data.length === 0) return { error: 'collaboration not found' }
        return data[0]
    }
}

module.exports = Collaboration;
