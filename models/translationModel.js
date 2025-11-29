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
}
module.exports = Translation;
