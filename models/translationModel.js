const db = require("../config/db");

class Translation {
  static async addLogTranslate(
    chatId,
    msg,
    translated_text,
    originalLanguage,
    targetLanguage
  ) {
    await db.execute(
      `insert into translation_log (chat_id, original_text, translated_text, source_lang, target_lang) values (?, ?, ?, ?, ?)`,
      [chatId, msg, translated_text, originalLanguage, targetLanguage]
    );
  }

  static async getChatTranslationHistory(chatId) {
    //to check if chatting exist
    const [isChatExist] = await db.execute(
      `select * from chatting where chatId = ? `,
      [chatId]
    );
    if (isChatExist.length === 0) return { error: "Chat not exist" };

    //to get translation logs
    const [result] = await db.execute(
      `select * from translation_log where chat_id = ? `,
      [chatId]
    );
    if (result.length === 0)
      return { error: "No Transaltion Logs in this chat" };
    return result;
  }
}
module.exports = Translation;
