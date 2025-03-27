import { createSignal } from "solid-js";

const COUNTRIES = {
  "am-ET": "Amharic",
  "ar-SA": "Arabic",
  "be-BY": "Bielarus",
  "bem-ZM": "Bemba",
  "bi-VU": "Bislama",
  "bjs-BB": "Bajan",
  "bn-IN": "Bengali",
  "bo-CN": "Tibetan",
  "br-FR": "Breton",
  "bs-BA": "Bosnian",
  "ca-ES": "Catalan",
  "cs-CZ": "Czech",
  "cy-GB": "Welsh",
  "da-DK": "Danish",
  "dz-BT": "Dzongkha",
  "de-DE": "German",
  "dv-MV": "Maldivian",
  "el-GR": "Greek",
  "en-GB": "English",
  "es-ES": "Spanish",
  "et-EE": "Estonian",
  "eu-ES": "Basque",
  "fa-IR": "Persian",
  "fi-FI": "Finnish",
  "fn-FNG": "Fanagalo",
  "fo-FO": "Faroese",
  "fr-FR": "French",
  "gl-ES": "Galician",
  "gu-IN": "Gujarati",
  "ha-NE": "Hausa",
  "he-IL": "Hebrew",
  "hi-IN": "Hindi",
  "hr-HR": "Croatian",
  "hu-HU": "Hungarian",
  "id-ID": "Indonesian",
  "is-IS": "Icelandic",
  "it-IT": "Italian",
  "ja-JP": "Japanese",
  "kk-KZ": "Kazakh",
  "km-KM": "Khmer",
  "kn-IN": "Kannada",
  "ko-KR": "Korean",
  "ku-TR": "Kurdish",
  "ky-KG": "Kyrgyz",
  "la-VA": "Latin",
  "lo-LA": "Lao",
  "lv-LV": "Latvian",
  "men-SL": "Mende",
  "mg-MG": "Malagasy",
  "mi-NZ": "Maori",
  "ms-MY": "Malay",
  "mt-MT": "Maltese",
  "my-MM": "Burmese",
  "ne-NP": "Nepali",
  "niu-NU": "Niuean",
  "nl-NL": "Dutch",
  "no-NO": "Norwegian",
  "ny-MW": "Nyanja",
  "ur-PK": "Pakistani",
  "pau-PW": "Palauan",
  "pa-IN": "Panjabi",
  "ps-PK": "Pashto",
  "pis-SB": "Pijin",
  "pl-PL": "Polish",
  "pt-PT": "Portuguese",
  "rn-BI": "Kirundi",
  "ro-RO": "Romanian",
  "ru-RU": "Russian",
  "sg-CF": "Sango",
  "si-LK": "Sinhala",
  "sk-SK": "Slovak",
  "sm-WS": "Samoan",
  "sn-ZW": "Shona",
  "so-SO": "Somali",
  "sq-AL": "Albanian",
  "sr-RS": "Serbian",
  "sv-SE": "Swedish",
  "sw-SZ": "Swahili",
  "ta-LK": "Tamil",
  "te-IN": "Telugu",
  "tet-TL": "Tetum",
  "tg-TJ": "Tajik",
  "th-TH": "Thai",
  "ti-TI": "Tigrinya",
  "tk-TM": "Turkmen",
  "tl-PH": "Tagalog",
  "tn-BW": "Tswana",
  "to-TO": "Tongan",
  "tr-TR": "Turkish",
  "uk-UA": "Ukrainian",
  "uz-UZ": "Uzbek",
  "vi-VN": "Vietnamese",
  "wo-SN": "Wolof",
  "xh-ZA": "Xhosa",
  "yi-YD": "Yiddish",
  "zu-ZA": "Zulu",
};

function App() {
  const [count, setCount] = createSignal(0);
  const [text, setText] = createSignal("");
  const [translatedText, setTranslatedText] = createSignal("");
  const [translateFrom, setTranslateFrom] = createSignal("en-GB");
  const [translateTo, setTranslateTo] = createSignal("es-ES");
  const [isLoading, setIsLoading] = createSignal(false);

  function translate() {
    let apiUrl = `https://api.mymemory.translated.net/get?q=${text()}&langpair=${translateFrom()}|${translateTo()}`;
    setIsLoading(true);
    setTranslatedText("");
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => {
        setTranslatedText(data.responseData.translatedText);
        setIsLoading(false);
      });
  }

  function speak(text: string, language: string) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language;
    window.speechSynthesis.speak(utterance);
  }

  function swap() {
    const tempLang = translateFrom();
    setTranslateFrom(translateTo());
    setTranslateTo(tempLang);

    const tempText = text();
    setText(translatedText());
    setTranslatedText(tempText);
  }

  return (
    <>
      <div class="translate-container">
        <div>
          <div
            style={{
              "padding-bottom": "1rem",
              color: "black",
              "text-align": "center",
            }}
          >
            <h1 style={{ "font-weight": "200" }}>Baboola Translate</h1>
          </div>
          <div class="io-container">
            <div class="io-container-item">
              <select
                name=""
                id=""
                value={translateFrom()}
                onChange={(e) => setTranslateFrom(e.target.value)}
              >
                {Object.keys(COUNTRIES).map((country) => (
                  <option value={country}>
                    {COUNTRIES[country as keyof typeof COUNTRIES]}
                  </option>
                ))}
              </select>
              <textarea
                disabled={isLoading()}
                value={text()}
                onChange={(e) => setText(e.target.value)}
              ></textarea>
              <button
                class="speak"
                onClick={() => speak(text(), translateFrom())}
              >
                🕪
              </button>
            </div>
            <button class="swap" onClick={swap}>
              ⇄
            </button>

            <div class="io-container-item">
              <select
                name=""
                id=""
                value={translateTo()}
                onChange={(e) => setTranslateTo(e.target.value)}
              >
                {Object.keys(COUNTRIES).map((country) => (
                  <option value={country}>
                    {COUNTRIES[country as keyof typeof COUNTRIES]}
                  </option>
                ))}
              </select>
              <textarea
                placeholder={isLoading() ? "Translating..." : ""}
                readOnly
                value={translatedText()}
              ></textarea>
              <button
                class="speak"
                onClick={() => speak(translatedText(), translateTo())}
              >
                🕪
              </button>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              "justify-content": "center",
              "margin-top": "1.5rem",
            }}
          >
            <button
              class="btn"
              style={{
                width: "100%",
              }}
              onClick={translate}
            >
              Translate
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
