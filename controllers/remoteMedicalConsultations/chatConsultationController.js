const ChatModel = require("../../models/chatModel");

exports.sendConsultationChatMsg = async (req, res) => {
  try {
    const { senderId, receiverId, message } = req.body;
    const result = await ChatModel.sendConsultationChatMsg(
      senderId,
      receiverId,
      message
    );
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};
