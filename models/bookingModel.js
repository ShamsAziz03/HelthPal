const db = require('../config/db')

class Booking {
    static async add(data) {
        const { patient_id, availability_id, description } = data

        //ensure that patient is exist 
        const qry1 = "SELECT * FROM healthpal.patient WHERE patientId = ?;"
        const [patient] = await db.query(qry1, [patient_id])
        if (patient.length === 0)
            return { error: "patient not found" }

        //ensure that selected slot is exist and available 
        const qry2 = "SELECT * FROM healthpal.doctoravailability WHERE availabilityId = ?;"
        const [availability] = await db.query(qry2, [availability_id])
        if (availability.length === 0)
            return { error: "availability slot not found" }

        if (availability[0].status !== 'Available')
            return { error: "slot is not available for booking" }

        // insert book request
        const qry3 = "INSERT INTO healthpal.bookRequests (patient_id, availability_id, description) VALUES (?, ?, ?)"
        const [res] = await db.execute(qry3, [patient_id, availability_id, description || ""])

        // update slot status to "Requested"
        const qry4 = "UPDATE healthpal.doctoravailability SET status = 'Requested' WHERE availabilityId = ?"
        await db.execute(qry4, [availability_id])

        return { requestId: res.insertId, patient_id, availability_id, description, status: 'pending' }
    }

}

module.exports = Booking