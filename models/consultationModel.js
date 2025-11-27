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
}

module.exports = Consultation;
