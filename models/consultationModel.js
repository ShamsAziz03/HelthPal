const db = require("../config/db");
class Consultation {
  // Create a new consultation, it used inside book request controller, when accept book req
  static async addConsultation(consultationData) {
    const { consultationType, notes, prescription, bookRequestId } =
      consultationData;

    //to check if valid request book id
    const qry3 = `select * from bookrequests where id = ? `;
    const [dataResult] = await db.execute(qry3, [bookRequestId]);
    if (dataResult.length === 0) return { error: "book request not found" };
    if (dataResult[0].type_of_req != "consultation") return {};
    //to add the PK
    const [data] = await db.execute(
      `SELECT MAX(consultationId)+1 AS next_id FROM consultation ;`
    );
    const nextId = data[0].next_id;

    const query2 = `INSERT INTO consultation (consultationId, status, consultationType, notes, prescription, bookRequestId)
                    VALUES (?, ?, ?, ?, ?, ?)`;

    const [result] = await db.execute(query2, [
      nextId,
      "Scheduled",
      consultationType || "Chat",
      notes || "",
      prescription || "",
      bookRequestId,
    ]);
    return result;
  }

  //to update the status of dr available slot, we use it if we cancle or delete consultation
  static async updateDoctorAvailableSlot(availabilityId) {
    const [data] = await db.execute(
      "select * from doctoravailability where availabilityId = ?",
      [availabilityId]
    );
    if (data.length === 0) {
      return { error: "Can't found this doctor availability slot to change" };
    }

    const [result] = await db.execute(
      "UPDATE doctoravailability SET status = 'Available' WHERE availabilityId = ?",
      [availabilityId]
    );
    if (result.affectedRows === 0) {
      return { error: "updated available slot Not Successful!" };
    }
    return { messege: "update available slot Success" };
  }

  //to delete an consultation
  static async deleteConsultation(consultationId) {
    const [data] = await db.execute(
      "select * from consultation where consultationId = ?",
      [consultationId]
    );
    if (data.length === 0) {
      return { error: "Can't found this Consultation to delete!" };
    }

    //to find available id to update it
    const [result2] = await db.execute(
      `
  SELECT b.availability_id as availability_id
  FROM consultation c
  JOIN bookrequests b
    ON c.bookRequestId = b.id
  WHERE c.consultationId = ? 
`,
      [consultationId]
    );
    if (result2.length === 0) {
      return { error: "No availability found for this consultation" };
    }

    //to delete consultation
    const [result] = await db.execute(
      "DELETE FROM consultation WHERE consultationId = ? ",
      [consultationId]
    );
    if (result.affectedRows === 0) {
      return { error: "Deleted Not Successful!" };
    }

    //to update status of available slot
    const result3 = await Consultation.updateDoctorAvailableSlot(
      result2[0].availability_id
    );
    return {
      messege: "Deleted Consultation Successfully",
      feedbackFromUpdate: result3,
    };
  }

  //to update status of a consultation
  static async updateConsultationStatus(consultationId, status) {
    //to check if status is valid
    if (
      status != "Scheduled" &&
      status != "Completed" &&
      status != "Cancelled"
    ) {
      return { error: "Not valid status" };
    }

    //to check if consultation is exist
    const [data] = await db.execute(
      "select * from consultation where consultationId = ?",
      [consultationId]
    );
    if (data.length === 0) {
      return { error: "Can't found this Consultation to update!" };
    }

    //update consultation status
    const [result] = await db.execute(
      "UPDATE consultation SET status = ? WHERE consultationId = ?",
      [status, consultationId]
    );
    if (result.affectedRows === 0) {
      return { error: "updated consultation status Not Successful!" };
    }

    //if stats cancelled then update availble slot to be available
    if (status === "Cancelled") {
      //to find available id to update it
      const [result2] = await db.execute(
        `
  SELECT b.availability_id as availability_id
  FROM consultation c
  JOIN bookrequests b
    ON c.bookRequestId = b.id
  WHERE c.consultationId = ? 
`,
        [consultationId]
      );
      if (result2.length === 0) {
        return { error: "No availability found for this consultation" };
      }
      //to update status of available slot
      await Consultation.updateDoctorAvailableSlot(result2[0].availability_id);
    }

    return { messege: "update consultation status Success" };
  }

  static async addNotes(consultationId, notes) {
    //to check if consultation exist
    const [data] = await db.execute(
      "select * from consultation where consultationId = ?",
      [consultationId]
    );
    if (data.length === 0) {
      return { error: "Can't found this Consultation to update!" };
    }

    //to update notes
    const [result] = await db.execute(
      "update consultation set notes = ? where consultationId = ? ",
      [notes, consultationId]
    );
    if (result.length === 0)
      return { error: "Can't update note of this consultation" };

    return { messege: "update note of this consultation success" };
  }

  static async addPrescription(consultationId, prescription) {
    //to check if consultation exist
    const [data] = await db.execute(
      "select * from consultation where consultationId = ?",
      [consultationId]
    );
    if (data.length === 0) {
      return { error: "Can't found this Consultation to update!" };
    }

    //to update prescription
    const [result] = await db.execute(
      "update consultation set prescription = ? where consultationId = ? ",
      [prescription, consultationId]
    );
    if (result.length === 0)
      return { error: "Can't update prescription of this consultation" };

    return { messege: "update prescription of this consultation success" };
  }

  static async getConsultationDetails(consultationId) {
    //to check if consultation exist
    const [data] = await db.execute(
      "select * from consultation where consultationId = ?",
      [consultationId]
    );
    if (data.length === 0) {
      return { error: "Can't found this Consultation" };
    }
    return data;
  }

  static async getPatientConsultations(patientId) {
    //to check if patient exist
    const [patientExist] = await db.execute(
      "select * from patient where patientId = ?",
      [patientId]
    );
    if (patientExist.length === 0) {
      return { error: "Can't found this patient" };
    }

    const [data]=await db.execute(`SELECT p.medicalHistory, b.type_of_req,da.startTime, da.endTime,u.fullName as DrName,
 c.consultationId,c.consultationType,c.notes,c.prescription,c.status
  FROM patient p
  JOIN bookrequests b ON p.patientId = b.patient_id
  Join doctoravailability da on b.availability_id=da.availabilityId
  join doctor d on da.doctorId=d.doctorId
  JOIN user u ON d.userId =u.userId
  join consultation c on b.id=c.bookRequestId
  
  WHERE p.patientId = ? `,[patientId]);
    return data;
  }
}

module.exports = Consultation;
