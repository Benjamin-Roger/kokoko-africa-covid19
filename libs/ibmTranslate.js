const LanguageTranslatorV3 = require("ibm-watson/language-translator/v3");
const { IamAuthenticator } = require("ibm-watson/auth");

const languageTranslator = new LanguageTranslatorV3({
  version: "2018-05-01",
  authenticator: new IamAuthenticator({
    apikey: process.env.IBM_TRANSLATE_API_KEY,
  }),
  serviceUrl: process.env.IBM_TRANSLATE_API_URL,
});

async function translateFromEnIbm(text, language) {
  if (text && language) {
    const translateParams = {
      text,
      modelId: "en-" + language,
    };

    let translations = [];

    try {
      const stringTrans = await languageTranslator
        .translate(translateParams)
        .then((translationResult) => {
          translations = translationResult.result.translations;

          return translations;
        })
        .catch((err) => {
          console.log("error:", err);
        });

      return (await stringTrans.length) === 1
        ? stringTrans[0].translation
        : stringTrans.map((t) => t.translation); // return a single text string if a text string is submitted, array if array
    } catch (error) {
      console.log(error);
      return false;
    }
  } else {
    return false;
  }
}

export { translateFromEnIbm };
