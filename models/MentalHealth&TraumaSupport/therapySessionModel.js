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

  // Get all therapy sessions
  static async findAll() {
    const query = `SELECT * FROM therapysession`;
    const [sessions] = await db.execute(query);
    return sessions;
  }

  // Get therapy session by ID
  static async findById(sessionId) {
    const query = `SELECT * FROM therapysession WHERE sessionId = ?`;
    const [sessions] = await db.execute(query, [sessionId]);
    return sessions[0] || null;
  }

  // Update therapy session notes
  static async updateNotes(sessionId, notes) {
    const query = `
            UPDATE therapysession 
            SET notes = ? 
            WHERE sessionId = ?
        `;
    const [result] = await db.execute(query, [notes, sessionId]);
    return result;
  }
}

module.exports = TherapySession;
