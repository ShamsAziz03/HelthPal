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

  static async deleteSession(sessionId) {
    const [data] = await db.execute(
      `select * from sessions where session_id= ?`,
      [sessionId]
    );
    if (data.length === 0) {
      return { error: "no such session with this id to delete" };
    }

    const [result] = await db.execute(
      `delete from sessions where session_id= ?`,
      [sessionId]
    );
    if (result.affectedRows === 0) {
      return { error: "Can't delete session from Database" };
    }
    //to do auto increment after deletion
    const [rows] = await db.execute(
      `SELECT MAX(session_id) AS max_id FROM sessions`
    );

    let next_id = rows[0].max_id ? rows[0].max_id + 1 : 1;

    await db.execute(`ALTER TABLE sessions AUTO_INCREMENT = ${next_id}`);

    return { result: "Delete session from Database success" };
  }
}
module.exports = Session;
