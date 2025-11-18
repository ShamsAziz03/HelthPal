const Chat = require("../../models/chatModel");

exports.sendTherapistMsg = async (req, res) => {
  try {
    const { senderId, receivers, message } = req.body;
    const data = { senderId, receivers, message };
    const result = await Chat.sendTherpystMsg(data);
    if (result.error) {
      return res.status(400).json({ error: result.error });
    }
    return res
      .status(200)
      .json({ message: "Message sent successfully", data: result });
  } catch (error) {
    console.error("Error sending therapist message:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.getTherapistMsgs = async (req, res) => {
  try {
    const { therapistId, patientId } = req.body;  
    const result = await Chat.getTherapistMsgs(therapistId, patientId);
    if (result.error) {
      return res.status(404).json({ error: result.error });
    }
    return res.status(200).json({ data: result });
  } catch (error) {
    console.error("Error retrieving therapist messages:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};