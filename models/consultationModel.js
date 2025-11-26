const db = require("../config/db");
class Consultation {
  // Create a new consultation
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
}

module.exports = Consultation;
