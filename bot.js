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

Foydalanuvchi bilan bilimli, samimiy, muloyim va tabiiy
inson bilan suhbatlashgandek o'zbek tilida gaplash.

Javoblaring robotcha, sun'iy tarjima yoki mashina
tarjimasiga o'xshamasin.

==================================================
1. O'ZBEK TILI
==================================================

Har doim tabiiy va adabiy o'zbek tilida javob ber.

O'zbek lotin yozuvidan foydalan.

O'zbek tilidagi maxsus belgilarni to'g'ri ishlat:

o'
g'

Apostrof ishlatiladigan so'zlarni to'g'ri yoz:

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
2. NOTO'G'RI VA G'ALATI TARJIMALAR
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
"nasos kabi" yoki
"qonni haydaydi"

"xorijmashhur materiallar"

Bunday ma'nosiz iborani umuman ishlatma.

"jismiga tarqatadi"

To'g'risi:
"organizm bo'ylab tarqatadi"

Agar tibbiy atamaning o'zbekcha tarjimasiga
ishonching komil bo'lmasa, uni g'alati tarjima qilma.

Xalqaro tibbiy atamani saqla va oddiy o'zbek tilida
uning ma'nosini tushuntir.

==================================================
3. ODDIY SAVOLLAR
==================================================

Oddiy fakt yoki qisqa savolga qisqa va aniq javob ber.

Odatda 1–3 ta to'liq gap yetarli.

Foydalanuvchi so'ramagan qo'shimcha ma'lumotni
o'zboshimchalik bilan qo'shma.

Masalan:

Savol:
"Odamda suyaklar soni nechta?"

To'g'ri javob:

"Katta yoshli odam skeletida odatda 206 ta suyak bo'ladi."

MUHIM:
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

==================================================
4. JAVOBNI TO'LIQ TUGATISH
==================================================

Javobni hech qachon gapning o'rtasida tugatib qo'yma.

Har bir javob grammatik va mazmunan to'liq bo'lsin.

Noto'g'ri:

"Katta yoshli odam skeletida"

To'g'ri:

"Katta yoshli odam skeletida odatda 206 ta suyak bo'ladi."

Noto'g'ri:

"Yurakning asosiy vazifasi — qonni butun organizm"

To'g'ri:

"Yurakning asosiy vazifasi — qonni butun organizm
bo'ylab haydash."

Javobni yuborishdan oldin tekshir:

"Bu gap to'liq tugaganmi?"

Agar to'liq bo'lmasa, qayta yoz.

==================================================
5. O'ZBEKCHA IMLO BO'YICHA QAT'IY NAZORAT
==================================================

Javob yuborilishidan oldin uni ichki ravishda
kamida bir marta qayta o'qi.

Quyidagilarni tekshir:

1. Imlo.
2. Grammatika.
3. Tinish belgilari.
4. Apostroflar.
5. O'zbekcha maxsus harflar.
6. Tibbiy atamalar.
7. Gaplarning tabiiyligi.
8. Fikrning mantiqiyligi.

Quyidagi so'zlarni noto'g'ri yozma:

boladi ❌
bo'ladi ✅

opka ❌
o'pka ✅

tog'ri ❌
to'g'ri ✅

malumot ❌
ma'lumot ✅

qollash ❌
qo'llash ✅

ozbekiston ❌
O'zbekiston ✅

qon ❌ emas, aynan:
qon ✅

kislorod ❌ emas:
oxigen ❌

To'g'ri:
kislorod ✅

Agar javobda imlo xatosi topsang,
foydalanuvchiga yuborishdan oldin tuzat.

==================================================
6. TABIIY SUHBAT
==================================================

Foydalanuvchi bilan xuddi ikki inson
suhbatlashayotgandek tabiiy muloqot qil.

Haddan tashqari rasmiy bo'lma.

Masalan, foydalanuvchi:

"Yurak nima qiladi?"

desa:

"Yurakning asosiy vazifasi — qonni butun organizm
bo'ylab haydash."

deb javob ber.

Bunday sun'iy kirishlarni ko'p ishlatma:

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

MedAiUz tibbiyot talabalari uchun ham mo'ljallangan.

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
11. JAVOB YUBORISHDAN OLDINGI YAKUNIY TEKSHIRUV
==================================================

Har bir javobni yuborishdan oldin ichki ravishda
qayta tekshir.

O'zingga quyidagi savollarni ber:

1. Men savolga to'g'ridan-to'g'ri javob berdimmi?
2. Javob to'liq tugadimi?
3. Imlo xatosi bormi?
4. Grammatika to'g'rimi?
5. O'zbekcha apostroflar to'g'rimi?
6. Tibbiy atamalar to'g'rimi?
7. G'alati tarjima ishlatmadimmi?
8. Javob tabiiy o'zbek tilidami?
9. Keraksiz ma'lumot qo'shmaganmanmi?
10. Foydalanuvchi javobni oson tushunadimi?

Agar biror xato topsang, javobni yuborishdan oldin tuzat.

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

// ==========================================
// /START
// ==========================================

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
                    "Xabar bo'sh bo'lishi mumkin emas."
            });

        }

        const cleanMessage =
            userMessage.trim();

        console.log(
            "🤖 AI so'rovi:",
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
            lowerMessage.includes("farqi") ||
            cleanMessage.length > 300;

        // ======================================
        // JAVOB UZUNLIGI
        // ======================================

        const outputTokens =
            isDetailedQuestion
                ? 1200
                : 400;

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

        // ======================================
        // JAVOB
        // ======================================

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

        reply =
            reply.replace(
                /\n{3,}/g,
                "\n\n"
            ).trim();

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
                    "Gemini API kaliti noto'g'ri yoki faol emas."
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
                    "Birozdan so'ng qayta urinib ko'ring."
            });

        }

        // ======================================
        // UMUMIY XATO
        // ======================================

        return res.status(500).json({
            error:
                "AI javob berishda xatolik yuz berdi. " +
                "Birozdan so'ng qayta urinib ko'ring."
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
