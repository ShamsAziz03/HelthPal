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

    static async getAll() {
        const qry = `
            SELECT br.*, da.doctorId, da.startTime, da.endTime, da.status AS availabilityStatus FROM healthpal.bookRequests AS br
            JOIN healthpal.patient as p ON br.patient_id = p.patientId
            JOIN healthpal.doctoravailability da ON br.availability_id = da.availabilityId
        `
        const [res] = await db.query(qry)
        return res
    }

    static async getByPatient(patient_id) {
        const qry = `
            SELECT br.*, da.startTime, da.endTime, da.status AS availabilityStatus
            FROM healthpal.bookRequests br
            JOIN healthpal.doctoravailability da ON br.availability_id = da.availabilityId
            WHERE br.patient_id = ?
        `
        const [res] = await db.query(qry, [patient_id])
        return res
    }

    static async updateStatus(id, newStatus) {
        const allowed = ['Pending', 'Accepted', 'Rejected']
        if (!allowed.includes(newStatus))
            return { error: `invalid status, allowed: ${allowed.join(', ')}` }

        //ensure that booking request is exist
        const qry1 = "SELECT * FROM healthpal.bookRequests WHERE id = ?;"
        const [reqData] = await db.query(qry1, [id])
        if (reqData.length === 0)
            return { error: "booking request not found" }

        //update request status
        const qry2 = "UPDATE healthpal.bookRequests SET status = ? WHERE id = ?;"
        await db.execute(qry2, [newStatus, id])

        //update availability table
        if (newStatus === 'Accepted')
        {
            const qry3 = "UPDATE healthpal.doctoravailability SET status = 'Booked' WHERE availabilityId = ?;"
            await db.execute(qry3, [reqData[0].availability_id])
        }
        else if (newStatus === 'Rejected')
        {
            const qry3 = "UPDATE healthpal.doctoravailability SET status = 'Available' WHERE availabilityId = ?;"
            await db.execute(qry3, [reqData[0].availability_id])
        }

        return { message: "status updated successfully" }
    }

    static async delete(id) {
        const qry1 = "SELECT * FROM healthpal.bookRequests WHERE id = ?;"
        const [reqData] = await db.query(qry1, [id])
        if (reqData.length === 0)
            return { error: "booking request not found" }

        const qry2 = "DELETE FROM healthpal.bookRequests WHERE id = ?;"
        await db.execute(qry2, [id])
        return { message: "booking request deleted successfully" }
    }

    //to add book request by patient 
    static async addBookReqForConsultation(data){
        const {patient_id, availability_id, description}=data;

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
        const query3=`INSERT INTO healthpal.bookRequests (patient_id, availability_id, description,status,type_of_req) VALUES (?, ?, ?,?,?)`;
        const [result]=await db.execute(query3,[patient_id, availability_id, description || "","pending","consultation"]);

         // update slot status to "Requested"
        const qry4 = "UPDATE healthpal.doctoravailability SET status = 'Requested' WHERE availabilityId = ?"
        await db.execute(qry4, [availability_id])

        return result;
    }

    //to get data info of book req 
    static async getBookReqInfo(filter){
        const {bookReqId,bookReqStatus,patientId,typeOfReq}=filter;
        let values=[];
        let query = "SELECT * FROM healthpal.bookrequests WHERE 1=1 ";
        if(bookReqId){
            query+=" AND id = ?";
            values.push(bookReqId);
        }
        if(bookReqStatus){
            query+=" AND status = ?";
            values.push(bookReqStatus);
        }
        if(patientId){
            query+=" AND patient_id = ?";
            values.push(patientId);
        }
        if(typeOfReq){
            query+=" AND type_of_req = ?";
            values.push(typeOfReq);
        }
        const [bookReq] = await db.query(query, values);
        return bookReq;
    }

    //to let doctor see his book requests
    static async getDoctorBooks(doctorId){
        const query=`  SELECT br.*,u.fullName,da.startTime,da.endTime,da.status as availableStatus
  FROM healthpal.bookRequests AS br
  JOIN healthpal.doctoravailability da ON br.availability_id = da.availabilityId
    JOIN healthpal.doctor d ON da.doctorId = d.doctorId
    JOIN healthpal.user u ON d.userId = u.userId
    where da.doctorId= ? `;
        const [doctorBookReqs] = await db.query(query,[doctorId]);
        return doctorBookReqs;
    }
}

module.exports = Booking