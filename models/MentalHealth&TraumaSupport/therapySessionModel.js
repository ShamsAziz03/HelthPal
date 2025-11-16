const db = require("../../config/db");
const { v4: uuidv4 } = require("uuid");

class TherapySession {
  // Create a new therapy session record
  static async create(sessionData) {
    const {
      patientId,
      therapistId,
      sessionTime,
      isAnonymous,
      sessionType,
      notes,
    } = sessionData;
    const sessionId = uuidv4();

    const query = `
            INSERT INTO therapysession 
            (sessionId, patientId, therapistId, sessionTime, isAnonymous, sessionType, notes) 
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;

    const values = [
      sessionId,
      patientId,
      therapistId,
      sessionTime,
      isAnonymous,
      sessionType,
      notes,
    ];
    const [result] = await db.execute(query, values);
    return result;
  }
}

module.exports = TherapySession;
