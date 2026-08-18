const TelegramBot = require("node-telegram-bot-api");
const express = require("express");
const { GoogleGenAI } = require("@google/genai");

// ==========================================
// ENVIRONMENT VARIABLES
// ==========================================

const TOKEN = process.env.BOT_TOKEN;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// ==========================================
// TEKSHIRISH
// ==========================================

if (!TOKEN) {
    console.error("BOT_TOKEN topilmadi!");
    process.exit(1);
}

if (!GEMINI_API_KEY) {
    console.error("GEMINI_API_KEY topilmadi!");
    process.exit(1);
}

// ==========================================
// TELEGRAM BOT
// ==========================================

const bot = new TelegramBot(TOKEN, {
    polling: true
});

// ==========================================
// GEMINI AI
// ==========================================

const ai = new GoogleGenAI({
    apiKey: GEMINI_API_KEY
});

// ==========================================
// MINI APP
// ==========================================

const MINI_APP_URL =
    "https://medaiuz.github.io/MedAiUZ/";

// ==========================================
// AI SYSTEM PROMPT
// ==========================================

const SYSTEM_PROMPT = `
Sen MedAiUz platformasining professional tibbiy AI yordamchisisan.

ASOSIY VAZIFA:
Foydalanuvchi bilan bilimli, muloyim va tushunarli inson
bilan suhbatlashgandek tabiiy o‘zbek tilida muloqot qil.

Javoblaring robotcha, sun’iy tarjima yoki g‘alati mashina
tarjimasiga o‘xshamasin.

================================
O‘ZBEK TILI
================================

Har doim o‘zbek tilida javob ber.

Adabiy va tabiiy o‘zbek tilidan foydalan.

Faqat o‘zbek lotin yozuvidan foydalan.

O‘zbek tilidagi maxsus harflarni to‘g‘ri ishlat:
o‘, g‘.

Masalan:

o‘pka
o‘tkir
o‘zbek
qo‘llash
to‘g‘ri
bo‘ladi
ko‘rsatma
ma’lumot
g‘ayritabiiy

Imlo va grammatik xatolarga yo‘l qo‘yma.

Tinish belgilarini to‘g‘ri ishlat.

Inglizcha yoki ruscha gap tuzilishini o‘zbekchaga
so‘zma-so‘z ko‘chirma.

Jumlalar tabiiy o‘zbek tilida bo‘lsin.

================================
NOTO‘G‘RI IBORALARNI ISHLATMA
================================

Quyidagi kabi g‘alati iboralarni HECH QACHON ishlatma:

"oxigen"

To‘g‘risi:
"kislorod"

"qan"

To‘g‘risi:
"qon"

"dam olish tizimi"

To‘g‘ri mazmunga qarab:
"nafas olish tizimi"

"xorijmashhur materiallar"

Bunday iborani umuman ishlatma.

"jismiga tarqatadi"

To‘g‘ri:
"organizm bo‘ylab tarqatadi"

"pompa ko‘lib"

To‘g‘ri:
"nasos kabi" yoki
"qonni haydaydi"

Agar tibbiy atamaning aniq o‘zbekcha shaklini
bilmasang, uni g‘alati tarjima qilma.

Zarur bo‘lsa xalqaro tibbiy atamani saqla va
uning ma’nosini sodda o‘zbek tilida tushuntir.

================================
JAVOB USLUBI
================================

Foydalanuvchi bilan samimiy, tabiiy va hurmat bilan gaplash.

Lekin ortiqcha rasmiy yoki robotcha bo‘lma.

Oddiy savolga oddiy va qisqa javob ber.

Masalan:

Foydalanuvchi:
"Yurakning vazifasi nima?"

Yaxshi javob:

"Yurakning asosiy vazifasi — qonni butun organizm
bo‘ylab haydash.

U qonni o‘pkaga va boshqa a’zolarga yetkazadi.
Shu orqali to‘qimalar kislorod va oziq moddalar
bilan ta’minlanadi."

Foydalanuvchi:
"Appenditsit nima?"

Yaxshi javob:

"Appenditsit — ko‘richakning chuvalchangsimon
o‘simtasining yallig‘lanishi.

Ko‘pincha o‘ng pastki qorin sohasidagi og‘riq,
ko‘ngil aynishi, qusish va isitma bilan namoyon bo‘ladi."

Keraksiz kirish gaplarini ko‘p ishlatma.

Masalan:

"Albatta, men sizga bu haqda batafsil ma’lumot beraman..."

kabi sun’iy jumlalarni ishlatmaslikka harakat qil.

Savolga to‘g‘ridan-to‘g‘ri javob ber.

================================
IMLO NAZORATI
================================

HAR BIR JAVOBNI YUBORISHDAN OLDIN ICHKI RAVISHDA
QAYTA O‘QIB CHIQ.

Quyidagilarni tekshir:

1. Imlo.
2. Grammatika.
3. Tinish belgilari.
4. O‘zbekcha maxsus harflar.
5. Apostroflar.
6. Tibbiy atamalar.
7. Gaplarning tabiiyligi.
8. Fikrning mantiqiyligi.

Agar jumla g‘alati, buzilgan yoki ma’nosiz bo‘lsa,
uni yuborma. Qayta yoz.

Mashina tarjimasiga o‘xshagan matn yuborma.

================================
TIBBIY SAVOLLAR
================================

Tibbiyotga oid savollarga aniq, tushunarli va
ilmiy jihatdan ehtiyotkor javob ber.

Tibbiy atamani ishlatsang, kerak bo‘lsa uni
oddiy o‘zbek tilida tushuntir.

Masalan:

"Bradikardiya — yurak urish tezligining
odatdagidan sekinlashishi."

Keraksiz murakkab terminlarni ko‘paytirma.

================================
KLINIK HOLATLAR
================================

Agar foydalanuvchi klinik holat yuborsa,
uni professional tarzda tahlil qil.

Kerak bo‘lsa quyidagi tartibdan foydalan:

1. Ehtimoliy tashxis.
2. Tashxisni qo‘llab-quvvatlovchi belgilar.
3. Differensial tashxis.
4. Kerakli tekshiruvlar.
5. Davolashning umumiy prinsiplari.
6. Xavfli belgilar.
7. Qisqa xulosa.

Lekin barcha bo‘limlarni majburan yozma.
Holatga qarab moslashtir.

Yetarli ma’lumot bo‘lmasa:

"Berilgan ma’lumotlar asosida aniq tashxis qo‘yib
bo‘lmaydi."

deb ayt.

Ehtimoliy tashxisni tasdiqlangan tashxis sifatida ko‘rsatma.

================================
TIBBIYOT TALABALARI
================================

MedAiUz tibbiyot talabalari uchun ham mo‘ljallangan.

Shuning uchun javoblar:

- tushunarli;
- aniq;
- eslab qolish oson;
- imtihonga foydali;
- tibbiy jihatdan to‘g‘ri

bo‘lsin.

Agar foydalanuvchi:
"Imtihonga qisqa qilib ayt"

desa, qisqa va mazmunli javob ber.

================================
REAL BEMOR
================================

AI javobi shifokor ko‘rigini almashtirmaydi.

Agar foydalanuvchi o‘zidagi jiddiy simptomlarni
aytsa, kerak bo‘lsa shifokorga murojaat qilishni tavsiya qil.

Agar shoshilinch xavf belgilarini sezsang,
tez tibbiy yordam kerakligini aniq ayt.

================================
SUHBAT USLUBI
================================

Foydalanuvchi bilan xuddi ikkita odam
suhbatlashayotgandek tabiiy muloqot qil.

Foydalanuvchi oldingi savoliga bog‘liq savol bersa,
oldingi mavzuni hisobga ol.

Masalan:

Foydalanuvchi:
"Yurak nima vazifa bajaradi?"

Keyin:
"Unda yurak urishi nega tezlashadi?"

desa, ikkinchi savolga birinchi mavzu bilan
bog‘liq holda javob ber.

Keraksiz ravishda savolni qayta so‘rama.

================================
ENG MUHIM QOIDA
================================

Hech qachon ma’nosiz, buzilgan, g‘alati yoki
mashina tarjimasiga o‘xshagan o‘zbekcha matn yozma.

Hech qachon:
"oxigen"
"qan"
"dam olish tizimi"
"xorijmashhur materiallar"

kabi noto‘g‘ri iboralarni ishlatma.

Har bir javob tabiiy o‘zbek tilida yozilgandek bo‘lsin.

Javobni yuborishdan oldin uni ichki ravishda
tekshir va xatolarni tuzat.
`;

// ==========================================
// /START
// ==========================================

bot.onText(/^\/start$/, async (msg) => {

    const chatId = msg.chat.id;

    const firstName =
        msg.from?.first_name || "Do‘stim";

    const text =
        "Assalomu alaykum, " +
        firstName +
        "! 👋\n\n" +

        "🩺 MedAiUz platformasiga xush kelibsiz!\n\n" +

        "MedAiUz — tibbiyot talabalari va " +
        "tibbiyot sohasi vakillari uchun " +
        "darsliklar, testlar, klinik holatlar " +
        "va AI yordamchi platformasi.\n\n" +

        "Quyidagi tugma orqali platformaga " +
        "kirishingiz mumkin 👇";

    try {

        await bot.sendMessage(
            chatId,
            text,
            {
                reply_markup: {
                    inline_keyboard: [
                        [
                            {
                                text: "🚀 MedAiUz'ni ochish",
                                web_app: {
                                    url: MINI_APP_URL
                                }
                            }
                        ]
                    ]
                }
            }
        );

    } catch (error) {

        console.error(
            "Telegram xatosi:",
            error.message
        );

    }

});

// ==========================================
// TELEGRAM POLLING ERROR
// ==========================================

bot.on("polling_error", (error) => {

    console.error(
        "Telegram polling xatosi:",
        error.message
    );

});

// ==========================================
// EXPRESS SERVER
// ==========================================

const app = express();

app.use(express.json());

// ==========================================
// CORS
// ==========================================

app.use((req, res, next) => {

    res.header(
        "Access-Control-Allow-Origin",
        "*"
    );

    res.header(
        "Access-Control-Allow-Methods",
        "POST, OPTIONS, GET"
    );

    res.header(
        "Access-Control-Allow-Headers",
        "Content-Type"
    );

    if (req.method === "OPTIONS") {
        return res.sendStatus(200);
    }

    next();

});

// ==========================================
// AI CHAT API
// ==========================================

app.post("/api/chat", async (req, res) => {

    try {

        const userMessage =
            req.body.message;

        // ======================================
        // XABARNI TEKSHIRISH
        // ======================================

        if (
            !userMessage ||
            typeof userMessage !== "string" ||
            !userMessage.trim()
        ) {

            return res.status(400).json({
                error:
                    "Xabar bo‘sh bo‘lishi mumkin emas."
            });

        }

        console.log(
            "🤖 AI so‘rovi:",
            userMessage.substring(0, 150)
        );

        // ======================================
        // GEMINI 3.6 FLASH
        // ======================================

        const response =
            await ai.models.generateContent({

                model: "gemini-3.6-flash",

                contents:
                    userMessage.trim(),

                config: {

                    systemInstruction:
                        SYSTEM_PROMPT,

                    temperature: 0.2,

                    maxOutputTokens: 600

                }

            });

        // ======================================
        // AI JAVOBINI OLISH
        // ======================================

        const reply =
            response.text?.trim();

        if (!reply) {

            return res.status(500).json({

                error:
                    "AI javob qaytarmadi."

            });

        }

        console.log(
            "✅ Gemini javobi tayyor"
        );

        // ======================================
        // JAVOBNI QAYTARISH
        // ======================================

        return res.json({
            reply: reply
        });

    } catch (error) {

        console.error(
            "Gemini AI xatosi:",
            error.message
        );

        // ======================================
        // API KEY XATOSI
        // ======================================

        if (
            error.message &&
            (
                error.message.includes("401") ||
                error.message.includes("API key") ||
                error.message.includes("API_KEY") ||
                error.message.includes("UNAUTHENTICATED")
            )
        ) {

            return res.status(500).json({

                error:
                    "Gemini API kaliti noto‘g‘ri yoki faol emas."

            });

        }

        // ======================================
        // MODEL XATOSI
        // ======================================

        if (
            error.message &&
            (
                error.message.includes("404") ||
                error.message.includes("NOT_FOUND")
            )
        ) {

            return res.status(500).json({

                error:
                    "Gemini modeli hozir mavjud emas. " +
                    "Server sozlamalarini tekshirish kerak."

            });

        }

        // ======================================
        // LIMIT XATOSI
        // ======================================

        if (
            error.message &&
            (
                error.message.includes("429") ||
                error.message.includes("quota") ||
                error.message.includes("RESOURCE_EXHAUSTED")
            )
        ) {

            return res.status(429).json({

                error:
                    "AI xizmatining foydalanish limiti tugagan. " +
                    "Birozdan so‘ng qayta urinib ko‘ring."

            });

        }

        // ======================================
        // UMUMIY XATO
        // ======================================

        return res.status(500).json({

            error:
                "AI javob berishda xatolik yuz berdi. " +
                "Birozdan so‘ng qayta urinib ko‘ring."

        });

    }

});

// ==========================================
// SERVER TEST
// ==========================================

app.get("/", (req, res) => {

    res.send(
        "MedAiUz Gemini AI server ishlayapti ✅"
    );

});

// ==========================================
// PORT
// ==========================================

const PORT =
    process.env.PORT || 3000;

// ==========================================
// SERVERNI ISHGA TUSHIRISH
// ==========================================

app.listen(PORT, () => {

    console.log(
        "🌐 MedAiUz AI server ishga tushdi, port: " +
        PORT
    );

    console.log(
        "🤖 MedAiUz Telegram bot ishga tushdi!"
    );

});
