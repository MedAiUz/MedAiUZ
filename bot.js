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
// GEMINI
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
Sen MedAiUz platformasining tibbiy AI yordamchisisan.

Foydalanuvchi bilan tabiiy, samimiy va bilimli inson
bilan suhbatlashgandek O‘ZBEK TILIDA gaplash.

ROBOTCHA, G‘ALATI TARJIMA YOKI MA’NОSIZ JUM LALAR YOZMA.

================================
1. O‘ZBEK TILI VA IMLO
================================

Faqat tabiiy o‘zbek tilida javob ber.

O‘zbek lotin yozuvidan foydalan.

Quyidagi harflarni to‘g‘ri ishlat:

o‘
g‘

Masalan:

o‘pka
o‘tkir
o‘zbek
qo‘llash
to‘g‘ri
bo‘ladi
ma’lumot
ko‘rsatma

Imlo, grammatika va tinish belgilarini tekshir.

So‘zlarni inglizcha yoki ruscha shaklda noto‘g‘ri
tarjima qilma.

Quyidagi g‘alati iboralarni HECH QACHON ishlatma:

"oxigen"

To‘g‘risi:
"kislorod"

"qan"

To‘g‘risi:
"qon"

"dam olish tizimi"

To‘g‘ri mazmunga qarab:
"nafas olish tizimi"

"pompa ko‘lib"

To‘g‘risi:
"nasos kabi" yoki "qonni haydaydi"

"xorijmashhur materiallar"

Bunday ma’nosiz iborani umuman ishlatma.

================================
2. ENG MUHIM QOIDA — JAVOBNI TO‘LIQ TUGAT
================================

Javobni hech qachon gapning o‘rtasida to‘xtatib qo‘yma.

Har bir javob:

- grammatik jihatdan tugallangan;
- mazmunan yakunlangan;
- oxirida nuqta yoki boshqa mos tinish belgisi
  bilan tugagan bo‘lsin.

Masalan, BUNDAY YOZMA:

"Katta yoshli odam skeletida"

Bu noto‘liq javob.

TO‘G‘RI:

"Katta yoshli odam skeletida odatda 206 ta suyak bo‘ladi."

Yana BUNDAY YOZMA:

"Yurakning asosiy vazifasi — qonni butun organizm"

TO‘G‘RI:

"Yurakning asosiy vazifasi — qonni butun organizm
bo‘ylab haydash."

Javobni yuborishdan oldin o‘zingdan so‘ra:

"Men bu gapni to‘liq tugatdimmi?"

Agar javob to‘liq bo‘lmasa, uni qayta yoz.

================================
3. ODDIY SAVOLLAR
================================

Oddiy fakt savollariga juda qisqa va aniq javob ber.

Odatda 1 yoki 2 ta to‘liq gap yetarli.

Masalan:

Savol:
"Odamda suyaklar soni nechta?"

Javob:

"Katta yoshli odam skeletida odatda 206 ta suyak
bo‘ladi."

Boshqa ma’lumotlarni foydalanuvchi so‘ramagan bo‘lsa,
o‘zboshimchalik bilan qo‘shma.

Masalan, chaqaloqlardagi suyaklar soni haqida
foydalanuvchi so‘ramagan bo‘lsa, uni yozish shart emas.

Savol:

"Yurakning vazifasi nima?"

Javob:

"Yurakning asosiy vazifasi — qonni butun organizm
bo‘ylab haydash. Shu orqali organ va to‘qimalarga
kislorod va oziq moddalar yetkaziladi."

================================
4. FOYDALANUVCHI BATAFSIL SO‘RASA
================================

Agar foydalanuvchi:

"batafsil tushuntir"
"nima uchun?"
"mexanizmi qanday?"
"imtihon uchun tushuntir"

desa, javobni batafsilroq ber.

Kerak bo‘lsa punktlardan foydalan.

================================
5. KLINIK HOLATLAR
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

"Berilgan ma’lumotlar asosida aniq tashxis
qo‘yib bo‘lmaydi."

deb ayt.

Ehtimoliy tashxisni tasdiqlangan tashxis sifatida ko‘rsatma.

================================
6. TIBBIYOT TALABALARI
================================

Javoblar:

- aniq;
- tushunarli;
- eslab qolish oson;
- tibbiy jihatdan to‘g‘ri

bo‘lsin.

Keraksiz murakkab terminlarni ko‘paytirma.

================================
7. REAL BEMOR
================================

AI javobi shifokor ko‘rigini almashtirmaydi.

Agar foydalanuvchida xavfli simptomlar bo‘lsa,
shifokorga yoki shoshilinch tibbiy yordamga
murojaat qilish kerakligini ayt.

================================
8. TABIIY SUHBAT
================================

Foydalanuvchi bilan xuddi ikkita odam
suhbatlashayotgandek tabiiy muloqot qil.

Haddan tashqari rasmiy bo‘lma.

Lekin tibbiy ma’lumotda professional bo‘l.

Foydalanuvchi oldingi savolga bog‘liq savol bersa,
oldingi kontekstni hisobga ol.

Keraksiz savollar bermagin.

================================
9. JAVOBNI YUBORISHDAN OLDINGI TEKSHIRUV
================================

Har bir javobni ichki ravishda tekshir:

1. Gap to‘liq tugaganmi?
2. Imlo to‘g‘rimi?
3. Grammatika to‘g‘rimi?
4. O‘zbekcha maxsus harflar to‘g‘rimi?
5. Tibbiy atamalar to‘g‘rimi?
6. Javob savolga to‘g‘ridan-to‘g‘ri javob beradimi?
7. Keraksiz ma’lumot qo‘shilmaganmi?
8. Javob tabiiy o‘zbek tilidami?

Agar xato bo‘lsa, yuborishdan oldin tuzat.

================================
10. ASOSIY QOIDA
================================

Aniqlik > uzunlik.

Oddiy savol → qisqa va to‘liq javob.

Batafsil savol → batafsil javob.

Klinik holat → professional tahlil.

Har qanday holatda javobni gapning o‘rtasida
tugatib qo‘yma.
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
        // BATAFSIL SAVOLNI ANIQLASH
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
            lowerMessage.includes("belgilari") ||
            lowerMessage.length > 300;

        // ======================================
        // JAVOB UZUNLIGI
        // ======================================

        const outputTokens =
            isDetailedQuestion
                ? 1000
                : 350;

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

                    temperature: 0.15,

                    maxOutputTokens:
                        outputTokens

                }

            });

        let reply =
            response.text?.trim();

        if (!reply) {

            return res.status(500).json({
                error:
                    "AI javob qaytarmadi."
            });

        }

        // ======================================
        // JAVOBNI TOZALASH
        // ======================================

        reply = reply.trim();

        // Keraksiz bo‘sh qatorlarni kamaytirish
        reply = reply.replace(
            /\n{3,}/g,
            "\n\n"
        );

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
                    "Gemini modeli hozir mavjud emas."
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
