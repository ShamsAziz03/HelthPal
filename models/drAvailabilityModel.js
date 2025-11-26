const db = require('../config/db')

class drAvailability {
    static async add (data) {
        const {doctorId, startTime, endTime, status, createdAt} = data

        //ensure that DR id is correct
        const [doctor] = await db.query("SELECT * FROM healthpal.doctor WHERE doctorId = ?", [doctorId])
        if (doctor.length === 0)
            return { error: "doctor not found" }

        //validate times
        const start = new Date(startTime)
        const end = new Date(endTime)
        if (isNaN(start.getTime()) || isNaN(end.getTime()))
            return { error: "invalid start time or end time" }
        if (start >= end)
            return { error: "start time must be before end time" }

        //check for overlapping
        const [existing] = await db.query(
            `SELECT * FROM doctorAvailability WHERE doctorId = ? AND
            ((startTime < ? AND endTime > ?) OR (startTime < ? AND endTime > ?) OR (startTime >= ? AND endTime <= ?)OR (startTime <= ? AND endTime >= ?))`,
            [doctorId, end, end, start, start, start, end, start, end]
        )
        if (existing.length > 0)
            return { error: "Time slot overlaps with existing availability" }

        // insert
        const qry = 'INSERT INTO doctorAvailability (doctorId, startTime, endTime, status) VALUES (?, ?, ?, ?)'
        const [res] = await db.execute(qry, [doctorId, startTime, endTime, status || 'Available'])
        return { availabilityId: res.insertId, doctorId, startTime, endTime, status: status || 'Available' }
    }
    static async getAll() {
        const qry = "SELECT * FROM healthpal.doctoravailability;"
        const [res] = await db.query(qry)

        return res
    }
    static async getByDr(id) {
        const qry = "SELECT * FROM healthpal.doctoravailability WHERE doctorId = ?;"
        const [res] = await db.query(qry, [id])

        return res
    }
    static async getAvailable(id) {
        const qry = "SELECT * FROM healthpal.doctoravailability WHERE status = 'Available';"
        const [res] = await db.query(qry, [id])

        return res
    }
    static async getByDate(date) {
        const qry = "SELECT * FROM healthpal.doctoravailability WHERE DATE(startTime) = ? ORDER BY startTime ASC"
        const [res] = await db.query(qry, [date])

        return res
    }
    static async getByStatus(status) {
        const qry = "SELECT * FROM healthpal.doctoravailability WHERE status = ? ORDER BY startTime ASC"
        const [res] = await db.query(qry, [status])

        return res
    }
    static async updateStatus(availabilityId, newStatus) {
        const allowed = ['Available', 'Requested', 'Booked', 'Blocked']
        if (!allowed.includes(newStatus))
            return { error: `Invalid status, allowed: ${allowed.join(', ')}` }

        const [slot] = await db.query("SELECT * FROM doctorAvailability WHERE availabilityId = ?", [availabilityId])
        if (slot.length === 0) 
            return { error: "Availability slot not found" }

        await db.execute("UPDATE doctorAvailability SET status = ? WHERE availabilityId = ?", [newStatus, availabilityId])

        return { message: "status updated successfully" }
    }
    static async delete(availabilityId) {
        const [slot] = await db.query("SELECT * FROM healthpal.doctoravailability WHERE availabilityId = ?", [availabilityId])
        if (slot.length === 0)
            return { error: "availability slot not found" }

        const [res] = await db.execute("DELETE FROM healthpal.doctoravailability WHERE availabilityId = ?;", [availabilityId])
        if (res.affectedRows === 0)
            return { error: "failed to delete availability" }

           //to do auto increment after deletion
           const [data]=await db.execute(`SELECT MAX(availabilityId)+1 AS next_id FROM doctoravailability ;`);
          await db.execute(`ALTER TABLE doctoravailability AUTO_INCREMENT = ${data[0].next_id}`);
        return { message: "availability deleted successfully" }
    }
    static async getAvailableDoctors(){
        const query=`Select dr.doctorId, user.fullName, dr.specialty, dr.rating, 
        doctoravailability.startTime, doctoravailability.endTime, doctoravailability.status from doctoravailability 
join doctor dr on doctoravailability.doctorId=dr.doctorId
join user on dr.userId=user.userId
where doctoravailability.status="Available"
`;
const [result]=await db.execute(query);
return result;
    }

}

module.exports = drAvailability