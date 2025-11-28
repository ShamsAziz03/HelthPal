const ChatModel = require("../../models/chatModel");

exports.sendConsultationChatMsg = async (req, res) => {
  try {
    const { senderId, receiverId, message, consultationId } = req.body;
    const result = await ChatModel.sendConsultationChatMsg(
      senderId,
      receiverId,
      message,
      consultationId
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

exports.getConsultationChatMsgs = async (req, res) => {
  try {
    const consultationId = req.params.consultationId;
    const result = await ChatModel.getConsultationChatMsgs(consultationId);
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
