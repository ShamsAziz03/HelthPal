const ChatModel = require("../../models/chatModel");

exports.sendChatMsg = async (req, res) => {
  try {
    const result = await ChatModel.sendGroupMsg();
    res.status(200).json({
      success: true,
      message: "Chat Send Successfully",
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};
