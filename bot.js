const TelegramBot = require("node-telegram-bot-api");
const express = require("express");
const { GoogleGenAI } = require("@google/genai");

// ==================================================
// ENVIRONMENT VARIABLES
// ==================================================

const TOKEN = process.env.BOT_TOKEN;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// ==================================================
// TEKSHIRISH
// ==================================================

if (!TOKEN) {
    console.error("❌ BOT_TOKEN topilmadi!");
    process.exit(1);
}

if (!GEMINI_API_KEY) {
    console.error("❌ GEMINI_API_KEY topilmadi!");
    process.exit(1);
}

// ==================================================
// TELEGRAM BOT
// ==================================================

const bot = new TelegramBot(TOKEN, {
    polling: true
});

// ==================================================
// GEMINI AI
// ==================================================

const ai = new GoogleGenAI({
    apiKey: GEMINI_API_KEY
});

// ==================================================
// MINI APP
// ==================================================

const MINI_APP_URL =
    "https://medaiuz.github.io/MedAiUZ/";

// ==================================================
// SYSTEM PROMPT
// ==================================================

const SYSTEM_PROMPT = `
Sen MedAiUz platformasining professional tibbiy AI yordamchisisan.

Foydalanuvchi bilan bilimli, samimiy, muloyim va tabiiy
inson bilan suhbatlashgandek O'ZBEK TILIDA gaplash.

Javoblaring robotcha, sun'iy tarjima yoki mashina
tarjimasiga o'xshamasin.

==================================================
1. O'ZBEK TILI
==================================================

Har doim tabiiy va adabiy o'zbek tilida javob ber.

O'zbek lotin yozuvidan foydalan.

O'zbek tilidagi apostroflarni to'g'ri ishlat:

o'
g'

Masalan:

o'pka
o'tkir
o'zbek
qo'llash
to'g'ri
bo'ladi
ma'lumot
ko'rsatma
g'ayritabiiy
o'quvchi
o'qituvchi

Imlo, grammatika va tinish belgilariga qat'iy rioya qil.

Inglizcha yoki ruscha gap tuzilishini o'zbekchaga
so'zma-so'z ko'chirma.

Gaplar tabiiy o'zbek tilida bo'lsin.

==================================================
2. G'ALATI TARJIMALAR TAQIQLANADI
==================================================

Quyidagi noto'g'ri iboralarni HECH QACHON ishlatma:

"oxigen"

To'g'risi:
"kislorod"

"qan"

To'g'risi:
"qon"

"dam olish tizimi"

To'g'ri mazmunga qarab:
"nafas olish tizimi"

"pompa ko'lib"

To'g'risi:
"nasos kabi" yoki "qonni haydaydi"

"xorijmashhur materiallar"

Bunday ma'nosiz iborani umuman ishlatma.

"jismiga tarqatadi"

To'g'risi:
"organizm bo'ylab tarqatadi"

Agar tibbiy atamaning o'zbekcha tarjimasiga
ishonching komil bo'lmasa, uni g'alati tarjima qilma.

Xalqaro tibbiy atamani saqla va uning ma'nosini
oddiy o'zbek tilida tushuntir.

==================================================
3. ODDIY SAVOLLAR
==================================================

Oddiy fakt yoki qisqa savolga qisqa va aniq javob ber.

Odatda 1-3 ta TO'LIQ gap yetarli.

Foydalanuvchi so'ramagan qo'shimcha ma'lumotni
o'zboshimchalik bilan qo'shma.

Masalan:

Savol:
"Odamda suyaklar soni nechta?"

To'g'ri javob:

"Katta yoshli odam skeletida odatda 206 ta suyak bo'ladi."

Bu savolga chaqaloqlardagi suyaklar soni,
suyaklarning birikishi yoki boshqa qo'shimcha
ma'lumotlarni foydalanuvchi so'ramagan bo'lsa yozish shart emas.

Yana bir misol:

Savol:
"Yurakning vazifasi nima?"

To'g'ri javob:

"Yurakning asosiy vazifasi — qonni butun organizm
bo'ylab haydash. Shu orqali organ va to'qimalarga
kislorod hamda oziq moddalar yetkaziladi."

Oddiy savolga maqola yozma.

==================================================
4. JAVOBNI TO'LIQ TUGATISH
==================================================

Javobni hech qachon gapning o'rtasida tugatib qo'yma.

Har bir javob grammatik va mazmunan to'liq bo'lsin.

NOTO'G'RI:

"Katta yoshli odam skeletida"

TO'G'RI:

"Katta yoshli odam skeletida odatda 206 ta suyak bo'ladi."

NOTO'G'RI:

"Yurakning asosiy vazifasi — qonni butun organizm"

TO'G'RI:

"Yurakning asosiy vazifasi — qonni butun organizm
bo'ylab haydash."

Javobni yuborishdan oldin tekshir:

"Bu gap to'liq tugaganmi?"

Agar to'liq bo'lmasa, qayta yoz.

==================================================
5. IMLO NAZORATI
==================================================

Har bir javobni yuborishdan OLDIN ichki ravishda
kamida bir marta qayta o'qi.

Quyidagilarni tekshir:

1. Imlo.
2. Grammatika.
3. Tinish belgilari.
4. Apostroflar.
5. O'zbekcha maxsus yozuv.
6. Tibbiy atamalar.
7. Gaplarning tabiiyligi.
8. Fikrning mantiqiyligi.

Quyidagi xatolarga yo'l qo'yma:

boladi
→ bo'ladi

opka
→ o'pka

tog'ri
→ to'g'ri

malumot
→ ma'lumot

qollash
→ qo'llash

ozbek
→ o'zbek

oxigen
→ kislorod

qan
→ qon

Agar javobda imlo xatosi topsang,
foydalanuvchiga yuborishdan oldin tuzat.

==================================================
6. TABIIY SUHBAT
==================================================

Foydalanuvchi bilan xuddi ikki inson
suhbatlashayotgandek tabiiy muloqot qil.

Haddan tashqari rasmiy bo'lma.

Masalan:

Foydalanuvchi:
"Yurak nima qiladi?"

Javob:
"Yurakning asosiy vazifasi — qonni butun organizm
bo'ylab haydash."

Bunday sun'iy kirish gaplarini ko'p ishlatma:

"Albatta, men sizga bu haqda batafsil ma'lumot
berishga harakat qilaman."

Buning o'rniga to'g'ridan-to'g'ri javob ber.

Foydalanuvchi oldingi savolga bog'liq savol bersa,
oldingi suhbat mazmunini hisobga ol.

Keraksiz ravishda savolni qayta so'rama.

==================================================
7. BATAFSIL SAVOLLAR
==================================================

Agar foydalanuvchi:

"batafsil tushuntir"
"nima uchun?"
"mexanizmi qanday?"
"imtihon uchun tushuntir"
"farqi nimada?"

desa, batafsilroq javob ber.

Kerak bo'lsa punktlardan foydalan.

Lekin keraksiz uzunlikdan qoch.

==================================================
8. KLINIK HOLATLAR
==================================================

Agar foydalanuvchi klinik holat yuborsa,
uni professional tarzda tahlil qil.

Kerak bo'lsa:

1. Ehtimoliy tashxis.
2. Asosiy klinik belgilar.
3. Tashxisni qo'llab-quvvatlovchi belgilar.
4. Differensial tashxis.
5. Kerakli tekshiruvlar.
6. Davolashning umumiy prinsiplari.
7. Xavfli belgilar.
8. Qisqa xulosa.

Barcha bo'limlarni har safar majburan yozma.
Holatga qarab moslashtir.

Yetarli ma'lumot bo'lmasa:

"Berilgan ma'lumotlar asosida aniq tashxis
qo'yib bo'lmaydi."

deb ayt.

Ehtimoliy tashxisni tasdiqlangan tashxis
sifatida ko'rsatma.

==================================================
9. TIBBIYOT TALABALARI
==================================================

Javoblar:

- aniq;
- tushunarli;
- eslab qolish oson;
- tibbiy jihatdan to'g'ri;
- amaliy

bo'lsin.

Agar foydalanuvchi:

"Imtihonga qisqa qilib ayt"

desa, juda qisqa va mazmunli javob ber.

==================================================
10. REAL BEMORLAR
==================================================

AI javobi shifokor ko'rigini almashtirmaydi.

Agar foydalanuvchi o'zidagi jiddiy simptomlarni
aytsa, kerak bo'lsa shifokorga murojaat qilishni tavsiya qil.

Agar shoshilinch xavf belgilarini sezsang,
tez tibbiy yordam kerakligini aniq ayt.

==================================================
11. YAKUNIY TEKSHIRUV
==================================================

Javobni yuborishdan oldin ichki ravishda tekshir:

1. Savolga to'g'ridan-to'g'ri javob berdimmi?
2. Javob to'liq tugadimi?
3. Imlo xatosi bormi?
4. Grammatika to'g'rimi?
5. Apostroflar to'g'rimi?
6. Tibbiy atamalar to'g'rimi?
7. G'alati tarjima ishlatmadimmi?
8. Javob tabiiy o'zbek tilidami?
9. Keraksiz ma'lumot qo'shmaganmanmi?
10. Foydalanuvchi javobni oson tushunadimi?

Agar xato topsang, javobni yuborishdan oldin tuzat.

==================================================
12. ENG MUHIM QOIDA
==================================================

ANIQLIK > UZUNLIK.

Oddiy savol:
qisqa + aniq + to'liq javob.

Batafsil savol:
batafsil + tushunarli javob.

Klinik holat:
professional + ehtiyotkor tahlil.

Har qanday holatda:
JAVOBNI GAPNING O'RTASIDA TUGATMA.

Har bir javob tabiiy, tushunarli va
imloviy jihatdan to'g'ri o'zbek tilida bo'lsin.
`;

// ==================================================
// RETRY FUNKSIYASI
// ==================================================

async function generateWithRetry(
    message,
    maxTokens,
    maxAttempts = 3
) {

    let lastError = null;

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {

        try {

            console.log(
                `🧠 Gemini so'rovi, urinish ${attempt}/${maxAttempts}`
            );

            const response =
                await ai.models.generateContent({

                    model: "gemini-3.6-flash",

                    contents: message,

                    config: {

                        systemInstruction:
                            SYSTEM_PROMPT,

                        maxOutputTokens:
                            maxTokens

                    }

                });

            return response;

        } catch (error) {

            lastError = error;

            const errorText =
                String(error.message || error);

            const isTemporaryError =
                errorText.includes("503") ||
                errorText.includes("UNAVAILABLE") ||
                errorText.includes("429") ||
                errorText.includes("RESOURCE_EXHAUSTED") ||
                errorText.includes("overloaded") ||
                errorText.includes("high demand");

            console.error(
                `❌ Gemini xatosi, urinish ${attempt}:`,
                errorText
            );

            // Vaqtinchalik xato bo'lmasa,
            // darhol to'xtaymiz.
            if (!isTemporaryError) {
                throw error;
            }

            // Oxirgi urinish bo'lsa,
            // boshqa qayta urinmaymiz.
            if (attempt === maxAttempts) {
                throw error;
            }

            // 1s -> 2s -> 4s
            const delay =
                Math.pow(2, attempt - 1) * 1000;

            console.log(
                `⏳ ${delay / 1000} soniya kutib, qayta uriniladi...`
            );

            await new Promise(
                resolve => setTimeout(resolve, delay)
            );
        }
    }

    throw lastError;
}

// ==================================================
// /START
// ==================================================

bot.onText(/^\/start$/, async (msg) => {

    const chatId = msg.chat.id;

    const firstName =
        msg.from?.first_name || "Do'stim";

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
            "❌ Telegram xatosi:",
            error.message
        );

    }

});

// ==================================================
// TELEGRAM POLLING ERROR
// ==================================================

bot.on("polling_error", (error) => {

    console.error(
        "⚠️ Telegram polling xatosi:",
        error.message
    );

});

// ==================================================
// EXPRESS SERVER
// ==================================================

const app = express();

app.use(express.json());

// ==================================================
// CORS
// ==================================================

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

// ==================================================
// AI CHAT API
// ==================================================

app.post("/api/chat", async (req, res) => {

    try {

        const userMessage =
            req.body.message;

        // ------------------------------------------
        // XABARNI TEKSHIRISH
        // ------------------------------------------

        if (
            !userMessage ||
            typeof userMessage !== "string" ||
            !userMessage.trim()
        ) {

            return res.status(400).json({

                error:
                    "Xabar bo'sh bo'lishi mumkin emas."

            });

        }

        const cleanMessage =
            userMessage.trim();

        console.log(
            "🤖 AI so'rovi:",
            cleanMessage.substring(0, 200)
        );

        // ------------------------------------------
        // BATAFSIL SAVOLNI ANIQLASH
        // ------------------------------------------

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
            lowerMessage.includes("farqi") ||
            lowerMessage.includes("diagnostika") ||
            lowerMessage.includes("anamnez") ||
            lowerMessage.length > 300;

        // ------------------------------------------
        // TOKEN MIQDORI
        // ------------------------------------------

        const outputTokens =
            isDetailedQuestion
                ? 1200
                : 400;

        // ------------------------------------------
        // GEMINI SO'ROVI
        // ------------------------------------------

        const response =
            await generateWithRetry(
                cleanMessage,
                outputTokens,
                3
            );

        // ------------------------------------------
        // JAVOBNI OLISH
        // ------------------------------------------

        let reply =
            response.text?.trim();

        // ------------------------------------------
        // BO'SH JAVOB
        // ------------------------------------------

        if (!reply) {

            console.error(
                "❌ Gemini bo'sh javob qaytardi."
            );

            return res.status(500).json({

                error:
                    "AI javob qaytarmadi. " +
                    "Birozdan so'ng qayta urinib ko'ring."

            });

        }

        // ------------------------------------------
        // ORTIQCHA BO'SH QATORLARNI TOZALASH
        // ------------------------------------------

        reply =
            reply
                .replace(/\n{3,}/g, "\n\n")
                .trim();

        console.log(
            "✅ Gemini javobi tayyor"
        );

        // ------------------------------------------
        // JAVOB
        // ------------------------------------------

        return res.json({

            reply: reply

        });

    } catch (error) {

        const errorText =
            String(error.message || error);

        console.error(
            "❌ Gemini yakuniy xatosi:",
            errorText
        );

        // ==========================================
        // API KEY
        // ==========================================

        if (
            errorText.includes("401") ||
            errorText.includes("API key") ||
            errorText.includes("API_KEY") ||
            errorText.includes("UNAUTHENTICATED")
        ) {

            return res.status(500).json({

                error:
                    "Gemini API kaliti noto'g'ri yoki faol emas."

            });

        }

        // ==========================================
        // MODEL
        // ==========================================

        if (
            errorText.includes("404") ||
            errorText.includes("NOT_FOUND")
        ) {

            return res.status(500).json({

                error:
                    "Gemini modeli hozir mavjud emas."

            });

        }

        // ==========================================
        // VAQTINCHALIK GEMINI XATOSI
        // ==========================================

        if (
            errorText.includes("503") ||
            errorText.includes("UNAVAILABLE") ||
            errorText.includes("high demand")
        ) {

            return res.status(503).json({

                error:
                    "AI serveri hozir band. " +
                    "Bir necha soniyadan so'ng qayta urinib ko'ring."

            });

        }

        // ==========================================
        // LIMIT
        // ==========================================

        if (
            errorText.includes("429") ||
            errorText.includes("quota") ||
            errorText.includes("RESOURCE_EXHAUSTED")
        ) {

            return res.status(429).json({

                error:
                    "AI xizmatining foydalanish limiti tugagan. " +
                    "Birozdan so'ng qayta urinib ko'ring."

            });

        }

        // ==========================================
        // UMUMIY XATO
        // ==========================================

        return res.status(500).json({

            error:
                "AI javob berishda xatolik yuz berdi. " +
                "Birozdan so'ng qayta urinib ko'ring."

        });

    }

});

// ==================================================
// SERVER TEST
// ==================================================

app.get("/", (req, res) => {

    res.send(
        "MedAiUz Gemini AI server ishlayapti ✅"
    );

});

// ==================================================
// PORT
// ==================================================

const PORT =
    process.env.PORT || 3000;

// ==================================================
// SERVERNI ISHGA TUSHIRISH
// ==================================================

app.listen(PORT, () => {

    console.log(
        "🌐 MedAiUz AI server ishga tushdi, port: " +
        PORT
    );

    console.log(
        "🤖 MedAiUz Telegram bot ishga tushdi!"
    );

});
