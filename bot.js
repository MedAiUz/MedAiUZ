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

Foydalanuvchi bilan tabiiy, bilimli, samimiy va professional
tarzda O'ZBEK TILIDA suhbatlash.

SENING ENG MUHIM VAZIFANG:

Foydalanuvchi bergan savolga javob berayotganda,
shu savolga tegishli MUHIM MA'LUMOTLARNING
BARCHASINI TO'LIQ TUSHUNTIR.

Javobni sun'iy ravishda qisqartirma.

Faqat bitta yoki ikkita gap bilan cheklanma.

Shu bilan birga savolga aloqasi bo'lmagan ma'lumotlar
bilan javobni keraksiz cho'zma.

Asosiy qoida:

"QISQA JAVOB BERISH" emas.

"SAVOLGA TEGISHLI MUHIM MA'LUMOTLARNI TO'LIQ BERISH".

==================================================
1. JAVOBNI TO'LIQ BER
==================================================

Har bir savolni avval mazmunan tushun.

Keyin o'zingga:

"Bu savolga to'liq javob berish uchun foydalanuvchi
bilishi kerak bo'lgan qanday muhim ma'lumotlar bor?"

deb savol ber.

Shu ma'lumotlarning barchasini tushuntir.

Agar savol oddiy bo'lsa ham, javobni haddan tashqari
qisqartirma.

Masalan:

Savol:
"Yurakning vazifasi nima?"

Faqat:

"Yurak qonni haydaydi."

deb javob berish yetarli emas.

Yurakning:

- asosiy vazifasi;
- qonni haydash mexanizmi;
- o'ng va chap qismlarining vazifasi;
- kichik qon aylanishidagi roli;
- katta qon aylanishidagi roli;
- to'qimalarga kislorod yetkazilishidagi roli;
- oziq moddalarni yetkazishdagi roli;
- karbonat angidrid va almashinuv mahsulotlarini
  olib chiqishdagi roli

kabi savolga tegishli muhim jihatlarni tushuntir.

Agar yana muhim ma'lumot bo'lsa, uni ham qo'sh.

==================================================
2. JAVOB HAJMINI SUN'IY CHEKLAMA
==================================================

Javobni:

"5 ta gapdan oshmasin"

yoki

"qisqa qilib ayt"

kabi qoidalar asosida yozma.

Javob uzunligini savolning mazmuni belgilasin.

Agar mavzuni to'liq tushuntirish uchun ko'proq
ma'lumot kerak bo'lsa, ko'proq yoz.

Agar kamroq ma'lumot yetarli bo'lsa, keraksiz
gaplarni qo'shma.

MUHIM:

Javobni faqat uzun qilish uchun cho'zma.

Javobni faqat qisqa qilish uchun muhim
ma'lumotni qoldirma.

==================================================
3. ODDIY TIBBIY SAVOLLAR
==================================================

Oddiy savolga:

1. Asosiy javobni ayt.
2. Keyin shu mavzuga tegishli muhim ma'lumotlarni
   tushuntir.
3. Kerak bo'lsa misol yoki fiziologik izoh ber.
4. Fikrni to'liq yakunla.

Masalan:

"Odamda suyaklar soni nechta?"

Avval:

"Katta yoshli odam skeletida odatda 206 ta suyak bo'ladi."

Keyin mavzuni tushunish uchun muhim bo'lgan
qo'shimcha ma'lumotlarni tushuntir.

Masalan, skeletning tayanch, himoya va harakatdagi
roli hamda bolalikdagi suyaklar sonining farqi
savolga aloqador bo'lsa, ularni tushuntir.

==================================================
4. MURAKKAB SAVOLLAR
==================================================

Murakkab savollarga mavzuni to'liq va tizimli
ravishda tushuntir.

Kerak bo'lsa quyidagilardan foydalan:

- ta'rif;
- sabablar;
- rivojlanish mexanizmi;
- fiziologiya;
- patofiziologiya;
- klinik belgilar;
- diagnostika;
- differensial tashxis;
- davolash prinsiplari;
- asoratlar;
- profilaktika;
- prognoz.

Faqat savolga tegishli bo'lgan bo'limlarni ishlat.

==================================================
5. KLINIK HOLATLAR
==================================================

Klinik holat berilganda batafsil professional
tibbiy tahlil qil.

Kerak bo'lsa quyidagi tartibdan foydalan:

1. Ehtimoliy tashxis.
2. Tashxisni qo'llab-quvvatlovchi belgilar.
3. Patofiziologik asos.
4. Differensial tashxis.
5. Kerakli laborator tekshiruvlar.
6. Kerakli instrumental tekshiruvlar.
7. Kutiladigan natijalar.
8. Davolashning umumiy prinsiplari.
9. Xavfli belgilar.
10. Ehtimoliy asoratlar.
11. Yakuniy xulosa.

Har bir bo'limni har safar majburan yozma.

Klinik holatga mos bo'lganlarini tanla.

Agar ma'lumot yetarli bo'lmasa:

"Berilgan ma'lumotlar asosida aniq tashxis qo'yib
bo'lmaydi."

deb ayt.

Ehtimoliy tashxisni tasdiqlangan tashxis sifatida ko'rsatma.

==================================================
6. TIBBIYOT TALABALARI UCHUN
==================================================

Javoblar:

- ilmiy jihatdan aniq;
- tushunarli;
- mantiqiy;
- amaliy;
- eslab qolish oson

bo'lsin.

Murakkab tibbiy termin ishlatsang, kerak bo'lsa
uning ma'nosini oddiy o'zbek tilida tushuntir.

==================================================
7. TABIIY SUHBAT
==================================================

Foydalanuvchi bilan tabiiy insoniy suhbat qil.

Robotga o'xshab yozma.

Keraksiz rasmiy kirishlarni takrorlama.

Masalan:

"Albatta, men sizga bu haqida batafsil
ma'lumot berishga harakat qilaman."

kabi gaplarni ishlatish shart emas.

To'g'ridan-to'g'ri javob ber.

Foydalanuvchi oldingi savolga bog'liq savol bersa,
oldingi suhbat mazmunini hisobga ol.

==================================================
8. O'ZBEK TILI
==================================================

Faqat tabiiy va adabiy o'zbek tilida yoz.

O'zbek lotin yozuvidan foydalan.

Apostroflarni to'g'ri ishlat:

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
o'qituvchi
o'quvchi

Inglizcha yoki ruscha gap tuzilishini
so'zma-so'z o'zbekchaga tarjima qilma.

==================================================
9. G'ALATI TARJIMALAR TAQIQLANADI
==================================================

Quyidagi noto'g'ri iboralarni ishlatma:

"oxigen"
→ "kislorod"

"qan"
→ "qon"

"dam olish tizimi"
→ "nafas olish tizimi"

"pompa ko'lib"
→ "nasos kabi" yoki "qonni haydaydi"

"xorijmashhur materiallar"
→ bunday ma'nosiz iborani ishlatma.

"jismiga tarqatadi"
→ "organizm bo'ylab tarqatadi"

Tibbiy atamaning o'zbekcha tarjimasiga
ishonching komil bo'lmasa, uni noto'g'ri tarjima qilma.

Xalqaro tibbiy atamani saqla va uning ma'nosini
o'zbek tilida tushuntir.

==================================================
10. JAVOBNI O'RTASIDA TO'XTATMA
==================================================

Javobni hech qachon gapning o'rtasida tugatma.

Har bir fikrni oxirigacha yetkaz.

Noto'g'ri:

"Yurakning asosiy vazifasi — qonni butun organizm..."

To'g'ri:

"Yurakning asosiy vazifasi — qonni butun organizm
bo'ylab haydash."

Agar javob bir nechta bo'limdan iborat bo'lsa,
har bir bo'limni yakunla.

Xulosani boshlagan bo'lsang, xulosani ham tugat.

==================================================
11. IMLO TEKSHIRUVI
==================================================

Javobni yuborishdan oldin ichki ravishda qayta o'qi.

Tekshir:

- imlo;
- grammatika;
- tinish belgilar;
- apostroflar;
- tibbiy terminlar;
- mantiq;
- tabiiylik;
- javobning to'liqligi.

Quyidagilarni noto'g'ri yozma:

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

oxigen ❌
kislorod ✅

qan ❌
qon ✅

==================================================
12. REAL BEMORLAR
==================================================

AI javobi shifokor ko'rigini almashtirmaydi.

Real bemor simptomlari haqida gap ketganda,
ehtimoliy tashxisni aniq tasdiqlangan tashxis
sifatida ko'rsatma.

Xavfli belgilar bo'lsa, tibbiy yordamga
murojaat qilish zarurligini aniq ayt.

==================================================
13. YAKUNIY NAZORAT
==================================================

Javobni yuborishdan oldin quyidagilarni tekshir:

1. Savolni to'g'ri tushundimmi?
2. Savolga bevosita javob berdimmi?
3. Savolga tegishli MUHIM ma'lumotlarni
   qoldirib ketmadimmi?
4. Keraksiz ma'lumot qo'shmadimmi?
5. Har bir fikrni oxirigacha tushuntirdimmi?
6. Javob oxirigacha tugallanganmi?
7. Imlo to'g'rimi?
8. Grammatika to'g'rimi?
9. Tibbiy terminlar to'g'rimi?
10. Javob tabiiy o'zbek tilidami?

Agar muhim ma'lumot yetishmasa, uni qo'sh.

Agar javob tugallanmagan bo'lsa, uni tugat.

==================================================
14. ENG MUHIM QOIDA
==================================================

SAVOLGA TEGISHLI MUHIM MA'LUMOTLARNI QOLDIRMA.

JAVOBNI SUN'IY RAVISHDA QISQARTIRMA.

KERAKSIZ MA'LUMOT BILAN JAVOBNI CHO'ZMA.

JAVOBNI GAPNING O'RTASIDA TUGATMA.

HAR BIR JAVOBNI TO'LIQ YAKUNLA.

TABIIY VA XATOSIZ O'ZBEK TILIDA YOZ.
`;

// ==================================================
// /START
// ==================================================

bot.onText(
    /^\/start$/,
    async (msg) => {

        const chatId = msg.chat.id;

        const firstName =
            msg.from?.first_name || "Do'stim";

        const text =
            "Assalomu alaykum, " +
            firstName +
            "! 👋\n\n" +

            "🩺 MedAiUz platformasiga " +
            "xush kelibsiz!\n\n" +

            "MedAiUz — tibbiyot talabalari " +
            "va tibbiyot sohasi vakillari " +
            "uchun darsliklar, testlar, " +
            "klinik holatlar va AI yordamchi " +
            "platformasi.\n\n" +

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
                                    text:
                                        "🚀 MedAiUz'ni ochish",

                                    web_app: {
                                        url:
                                            MINI_APP_URL
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
    }
);

// ==================================================
// TELEGRAM POLLING ERROR
// ==================================================

bot.on(
    "polling_error",
    (error) => {

        console.error(
            "⚠️ Telegram polling xatosi:",
            error.message
        );

    }
);

// ==================================================
// EXPRESS SERVER
// ==================================================

const app = express();

app.use(
    express.json({
        limit: "2mb"
    })
);

// ==================================================
// CORS
// ==================================================

app.use(
    (req, res, next) => {

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

        if (
            req.method === "OPTIONS"
        ) {

            return res.sendStatus(200);

        }

        next();

    }
);

// ==================================================
// AI CHAT API
// ==================================================

app.post(
    "/api/chat",
    async (req, res) => {

        try {

            const userMessage =
                req.body.message;

            // --------------------------------------
            // XABARNI TEKSHIRISH
            // --------------------------------------

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
                cleanMessage.substring(0, 300)
            );

            console.log(
                "🧠 Gemini so'rovi"
            );

            // --------------------------------------
            // BIR MARTALIK GEMINI SO'ROVI
            // --------------------------------------

            const response =
                await ai.models.generateContent({

                    model:
                        "gemini-3.6-flash",

                    contents:
                        cleanMessage,

                    config: {

                        systemInstruction:
                            SYSTEM_PROMPT,

                        // Uzun javob va klinik
                        // tahlillar uchun katta limit.
                        maxOutputTokens:
                            12000

                    }

                });

            // --------------------------------------
            // FINISH REASON
            // --------------------------------------

            const candidate =
                response.candidates?.[0];

            const finishReason =
                candidate?.finishReason;

            console.log(
                "🏁 Gemini tugash sababi:",
                finishReason || "Noma'lum"
            );

            if (
                candidate?.finishMessage
            ) {

                console.log(
                    "ℹ️ Gemini finish message:",
                    candidate.finishMessage
                );

            }

            // --------------------------------------
            // TOKEN STATISTIKASI
            // --------------------------------------

            if (
                response.usageMetadata
            ) {

                console.log(
                    "📊 Prompt token:",
                    response.usageMetadata.promptTokenCount
                );

                console.log(
                    "📊 Javob token:",
                    response.usageMetadata.candidatesTokenCount
                );

                console.log(
                    "📊 Fikr token:",
                    response.usageMetadata.thoughtsTokenCount
                );

                console.log(
                    "📊 Umumiy token:",
                    response.usageMetadata.totalTokenCount
                );

            }

            // --------------------------------------
            // JAVOBNI OLISH
            // --------------------------------------

            let reply =
                response.text?.trim();

            // --------------------------------------
            // BO'SH JAVOB
            // --------------------------------------

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

            // --------------------------------------
            // JAVOBNI TOZALASH
            // --------------------------------------

            reply =
                reply
                    .replace(
                        /\n{3,}/g,
                        "\n\n"
                    )
                    .trim();

            // --------------------------------------
            // JAVOB UZUNLIGI
            // --------------------------------------

            console.log(
                "📝 Javob uzunligi:",
                reply.length,
                "belgi"
            );

            // --------------------------------------
            // MAX TOKENS ANIQLANDI
            // --------------------------------------

            if (
                finishReason ===
                "MAX_TOKENS"
            ) {

                console.warn(
                    "⚠️ DIQQAT: Gemini javobi maxOutputTokens chegarasiga yetgan!"
                );

                console.warn(
                    "⚠️ Javob kesilgan bo'lishi mumkin."
                );

            }

            // --------------------------------------
            // SAFETY
            // --------------------------------------

            if (
                finishReason ===
                "SAFETY"
            ) {

                console.warn(
                    "⚠️ Gemini javobi xavfsizlik filtri sabab to'xtagan."
                );

            }

            // --------------------------------------
            // RECITATION
            // --------------------------------------

            if (
                finishReason ===
                "RECITATION"
            ) {

                console.warn(
                    "⚠️ Gemini javobi recitation sabab to'xtagan."
                );

            }

            // --------------------------------------
            // JAVOB TAYYOR
            // --------------------------------------

            console.log(
                "✅ Gemini javobi tayyor"
            );

            // --------------------------------------
            // JAVOBNI QAYTARISH
            // --------------------------------------

            return res.json({

                reply:
                    reply,

                finishReason:
                    finishReason || null

            });

        } catch (error) {

            const errorText =
                String(
                    error.message ||
                    error
                );

            console.error(
                "❌ Gemini AI xatosi:",
                errorText
            );

            // --------------------------------------
            // API KEY
            // --------------------------------------

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

            // --------------------------------------
            // MODEL
            // --------------------------------------

            if (
                errorText.includes("404") ||
                errorText.includes("NOT_FOUND")
            ) {

                return res.status(500).json({

                    error:
                        "Gemini modeli hozir mavjud emas."

                });

            }

            // --------------------------------------
            // 503
            // --------------------------------------

            if (
                errorText.includes("503") ||
                errorText.includes("UNAVAILABLE") ||
                errorText.includes("high demand")
            ) {

                return res.status(503).json({

                    error:
                        "AI serveri hozir band. " +
                        "Birozdan so'ng qayta urinib ko'ring."

                });

            }

            // --------------------------------------
            // 429
            // --------------------------------------

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

            // --------------------------------------
            // UMUMIY XATO
            // --------------------------------------

            return res.status(500).json({

                error:
                    "AI javob berishda xatolik yuz berdi. " +
                    "Birozdan so'ng qayta urinib ko'ring."

            });

        }

    }
);

// ==================================================
// SERVER TEST
// ==================================================

app.get(
    "/",
    (req, res) => {

        res.send(
            "MedAiUz Gemini AI server ishlayapti ✅"
        );

    }
);

// ==================================================
// PORT
// ==================================================

const PORT =
    process.env.PORT || 3000;

// ==================================================
// SERVERNI ISHGA TUSHIRISH
// ==================================================

app.listen(
    PORT,
    () => {

        console.log(
            "🌐 MedAiUz AI server ishga tushdi, port: " +
            PORT
        );

        console.log(
            "🤖 MedAiUz Telegram bot ishga tushdi!"
        );

    }
);
