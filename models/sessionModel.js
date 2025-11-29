const db = require("../config/db");

class Session {
  static async checkConsultation(consultationId) {
    const [result] = await db.execute(
      `select * from consultation where consultationId = ?`,
      [consultationId]
    );
    return result;
  }

  static async logSessionInfo(consultationId, meetingUrl) {
    const [result] = await db.execute(
      `insert into sessions (consultation_id, meeting_url, provider) values (?, ?, ?)`,
      [consultationId, meetingUrl, "Daily.co"]
    );

    return result;
  }

  static async getSessionInfo(sessionId) {
    const [result] = await db.execute(
      `select * from sessions where session_id= ?`,
      [sessionId]
    );

    return result;
  }
}
module.exports = Session;
