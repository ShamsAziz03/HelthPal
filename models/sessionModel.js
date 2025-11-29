const db = require("../config/db");

class Session {
  static async checkConsultation(consultationId) {
    const [result] = await db.execute(
      `select * from consultation where consultationId = ?`,
      [consultationId]
    );
    return result;
  }
}
module.exports = Session;
