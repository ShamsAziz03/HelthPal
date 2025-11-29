const TranslationModel = require("../../models/translationModel");

exports.translateMsg = async (req, res) => {
  try {
    const { originalLanguage, targetLanguage, msg, chatId } = req.body;
    let translated_text = "";
    const encodedParams = new URLSearchParams();
    encodedParams.set("source_language", originalLanguage);
    encodedParams.set("target_language", targetLanguage);
    encodedParams.set("text", msg);

    const options = {
      method: "POST",
      headers: {
        "x-rapidapi-key": "528a575d2amshbcec3def52024c4p152b13jsn2c85e141af8e",
        "x-rapidapi-host": "text-translator2.p.rapidapi.com",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: encodedParams,
    };
    try {
      const url = "https://text-translator2.p.rapidapi.com/translate";
      const response = await fetch(url, options);
      const result = await response.json();
      translated_text = result.data.translatedText;
      res.status(200).json({
        translatedText: translated_text,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }

    await TranslationModel.addLogTranslate(
      chatId,
      msg,
      translated_text,
      originalLanguage,
      targetLanguage
    );
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};
