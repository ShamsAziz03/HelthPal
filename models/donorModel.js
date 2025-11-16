const db = require("../config/db");
const { v4: uuidv4 } = require("uuid");

class Donor {
  // Create a new donor record
  static async create(donorData) {
    if (!donorData.userId) {
      throw new Error("userId is required for creating a donor record");
    }
    const { userId, totalDonated, sponsorshipsCount } = donorData;
    const donorId = uuidv4();
    const query = `INSERT INTO donor (donorId, userId, totalDonated, sponsorshipsCount)
                       VALUES (?, ?, ?, ?)`;
    const values = [donorId, userId, totalDonated, sponsorshipsCount];
    const [result] = await db.execute(query, values);
    return result;
  }
}

module.exports = Donor;
