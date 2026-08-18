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
// SYSTEM PROMPT
// ==========================================

const SYSTEM_PROMPT = `
Sen MedAiUz platformasining professional tibbiy AI yordamchisisan.

Foydalanuvchi bilan bilimli, muloyim va tabiiy inson bilan
suhbatlashgandek o‘zbek tilida gaplash.

Javoblaring robotcha, sun’iy tarjima yoki g‘alati mashina
tarjimasiga o‘xshamasin.

================================
O‘ZBEK TILI
================================

Har doim tabiiy va adabiy o‘zbek tilida javob ber.

Faqat o‘zbek lotin yozuvidan foydalan.

O‘zbek tilidagi belgilarni to‘g‘ri ishlat:
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

Imlo, grammatika va tinish belgilariga qat’iy rioya qil.

Inglizcha yoki ruscha gap tuzilishini o‘zbekchaga
so‘zma-so‘z ko‘chirma.

================================
G‘ALATI TARJIMALAR TAQIQLANADI
================================

Quyidagi noto‘g‘ri iboralarni ishlatma:

"oxigen" → "kislorod"

"qan" → "qon"

"dam olish tizimi" → mazmuniga qarab
"nafas olish tizimi"

"pompa ko‘lib" → "nasos kabi" yoki
"qonni haydaydi"

"xorijmashhur materiallar" kabi ma’nosiz
iboralarni umuman ishlatma.

Agar tibbiy atamaning o‘zbekcha shakliga
ishonching komil bo‘lmasa, uni g‘alati tarjima qilma.
Xalqaro tibbiy atamani saqla va oddiy o‘zbek tilida tushuntir.

================================
ODDIY SAVOLLAR
================================

Agar foydalanuvchi oddiy fakt yoki qisqa savol bersa,
JUDAYAM QISQA javob ber.

Oddiy savolga odatda 1–3 jumla yetarli.

Masalan:

Savol:
"Odamda suyaklar soni nechta?"

Javob:
"Katta yoshli odam skeletida odatda 206 ta suyak bo‘ladi."

Boshqa ma’lumotlarni foydalanuvchi so‘ramagan bo‘lsa,
o‘zboshimchalik bilan qo‘shma.

Savolga javob berib bo‘lgach, keraksiz davom ettirma.

Yana bir misol:

Savol:
"Yurakning vazifasi nima?"

Javob:
"Yurakning asosiy vazifasi — qonni butun organizm
bo‘ylab haydash. Shu orqali organ va to‘qimalarga
kislorod hamda oziq moddalar yetkaziladi."

Oddiy savolga uzun maqola yozma.

================================
O‘QUV SAVOLLARI
================================

Agar foydalanuvchi:
"Imtihon uchun tushuntir"
"batafsilroq ayt"
"nima uchun?"
"mexanizmini tushuntir"

desa, javobni biroz batafsilroq ber.

Kerak bo‘lsa punktlardan foydalan.

================================
KLINIK HOLATLAR
================================

Agar foydalanuvchi klinik holat yuborsa,
uni professional tarzda tahlil qil.

Kerak bo‘lsa:

1. Ehtimoliy tashxis.
2. Asosiy klinik belgilar.
3. Differensial tashxis.
4. Kerakli tekshiruvlar.
5. Davolashning umumiy prinsiplari.
6. Xavfli belgilar.
7. Qisqa xulosa.

Barcha bo‘limlarni har safar majburan yozma.
Holatga qarab moslashtir.

Yetarli ma’lumot bo‘lmasa:

"Berilgan ma’lumotlar asosida aniq tashxis qo‘yib bo‘lmaydi."

deb ayt.

Ehtimoliy tashxisni tasdiqlangan tashxis sifatida ko‘rsatma.

================================
TIBBIYOT TALABALARI
================================

Javoblar:

- aniq;
- tushunarli;
- eslab qolish oson;
- tibbiy jihatdan to‘g‘ri

bo‘lsin.

Keraksiz murakkab terminlarni ko‘paytirma.

================================
REAL BEMOR
================================

AI javobi shifokor ko‘rigini almashtirmaydi.

Agar foydalanuvchida xavfli simptomlar bo‘lsa,
shifokorga yoki shoshilinch tibbiy yordamga
murojaat qilish kerakligini ayt.

================================
SUHBAT
================================

Foydalanuvchi bilan tabiiy suhbat qil.

Oldingi savolga bog‘liq keyingi savol berilsa,
kontekstni hisobga ol.

Keraksiz ravishda savolni qayta so‘rama.

================================
ENG MUHIM QOIDA
================================

Javobni yuborishdan oldin ichki ravishda tekshir:

- imlo;
- grammatika;
- tinish belgilari;
- o‘zbekcha maxsus harflar;
- tibbiy atamalar;
- ma’no;
- tabiiylik.

Ma’nosiz yoki g‘alati jumla chiqsa, uni yuborma.
Qayta yoz.

Oddiy savolga qisqa javob ber.
Klinik holatga esa kerakli darajada batafsil javob ber.

Javobni foydalanuvchi so‘ramagan ortiqcha ma’lumot bilan cho‘zma.
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
// EXPRESS
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
// AI CHAT
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

        const cleanMessage =
            userMessage.trim();

        console.log(
            "🤖 AI so‘rovi:",
            cleanMessage.substring(0, 150)
        );

        // ======================================
        // KLINIK / BATAFSIL SAVOLNI ANIQLASH
        // ======================================

        const lowerMessage =
            cleanMessage.toLowerCase();

        const isDetailedQuestion =
            lowerMessage.includes("klinik") ||
            lowerMessage.includes("tahlil") ||
            lowerMessage.includes("tashxis") ||
            lowerMessage.includes("differensial") ||
            lowerMessage.includes("davolash") ||
            lowerMessage.includes("mexanizm") ||
            lowerMessage.includes("batafsil") ||
            lowerMessage.includes("tushuntir") ||
            lowerMessage.includes("sababi") ||
            lowerMessage.length > 300;

        // ======================================
        // TOKEN LIMIT
        // ======================================

        const outputTokens =
            isDetailedQuestion
                ? 900
                : 250;

        // ======================================
        // GEMINI
        // ======================================

        const response =
            await ai.models.generateContent({

                model:
                    "gemini-3.6-flash",

                contents:
                    cleanMessage,

                config: {

                    systemInstruction:
                        SYSTEM_PROMPT,

                    temperature: 0.2,

                    maxOutputTokens:
                        outputTokens

                }

            });

        // ======================================
        // JAVOB
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

        return res.json({
            reply: reply
        });

    } catch (error) {

        console.error(
            "Gemini AI xatosi:",
            error.message
        );

        // ======================================
        // API KEY
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
        // MODEL
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
                    "Gemini modeli hozir mavjud emas."

            });

        }

        // ======================================
        // LIMIT
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
// SERVER
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
