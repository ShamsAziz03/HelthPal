const db = require("../config/db");
const { v4: uuidv4 } = require("uuid");
const User = require("./userModel");
const MedicalRecord = require("./medicalRecordModel");

class SharedRecord {
  static async create(shareData) {
    const { recordId, senderId, receiverId, message } = shareData;
    const shareId = uuidv4();

    if (!recordId || !senderId || !receiverId) {
      throw new Error("recordId, senderId, and receiverId are required");
    }

    const sender = await User.findById(senderId);
    const receiver = await User.findById(receiverId);
    if (!sender || !receiver) {
      throw new Error("Sender or Receiver not found");
    }

    const medicalRecord = await MedicalRecord.findById(recordId);
    if (!medicalRecord) {
      throw new Error("Medical record not found");
    }

    const allowedUserIds = [
      medicalRecord.patientUserId,
      medicalRecord.doctorUserId,
    ];
    if (
      !allowedUserIds.includes(senderId) &&
      !allowedUserIds.includes(receiverId)
    ) {
      throw new Error(
        "Sender or Receiver must be the patient or doctor of this medical record"
      );
    }

    if (
      sender.role.toLowerCase() === "donor" ||
      receiver.role.toLowerCase() === "donor"
    ) {
      throw new Error(
        "Donors cannot be sender or receiver for medical record sharing"
      );
    }

    const query = `
      INSERT INTO sharedrecords (shareId, recordId, senderId, receiverId, message)
      VALUES (?, ?, ?, ?, ?)
    `;
    const values = [shareId, recordId, senderId, receiverId, message || null];
    const [result] = await db.execute(query, values);

    return result;
  }
}

module.exports = SharedRecord;
