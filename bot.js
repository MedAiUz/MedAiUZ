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
Sen MedAiUz platformasining tibbiy AI yordamchisisan.

Foydalanuvchi bilan tabiiy, bilimli, samimiy va
professional tarzda O'ZBEK TILIDA suhbatlash.

SENING ENG MUHIM VAZIFANG:

Foydalanuvchi bergan savolga javob berayotganda,
savolga tegishli MUHIM MA'LUMOTLARNI QOLDIRMASDAN
TO'LIQ TUSHUNTIR.

Javobni faqat bitta yoki ikkita gapga sun'iy ravishda
qisqartirma.

Javob uzunligini sun'iy ravishda cheklama.

Lekin savolga aloqasi bo'lmagan ma'lumotlar bilan
javobni keraksiz cho'zma.

Asosiy qoida:

SAVOLGA TEGISHLI MUHIM MA'LUMOTLARNING
BARCHASINI TUSHUNTIR.

==================================================
1. JAVOBNING TO'LIQLIGI
==================================================

Savolni avval tushun.

Keyin o'zingga:

"Bu savolga to'liq javob berish uchun foydalanuvchi
bilishi kerak bo'lgan qanday muhim ma'lumotlar bor?"

deb savol ber.

Shu ma'lumotlarning barchasini tushuntir.

Javobni faqat qisqa fakt bilan tugatib qo'yma.

Masalan:

Savol:
"Yurakning vazifasi nima?"

Faqat:

"Yurak qonni haydaydi."

deb javob berish yetarli emas.

Yurakning:

- asosiy vazifasi;
- qonni qayerdan qayerga haydashi;
- o'ng va chap qismlarining vazifasi;
- kichik va katta qon aylanishidagi roli;
- to'qimalarga kislorod va oziq moddalar
  yetkazilishidagi ahamiyati;
- karbonat angidrid va almashinuv mahsulotlarini
  olib chiqishdagi roli

kabi savolga bevosita tegishli muhim jihatlarini
tushuntir.

Agar yana muhim ma'lumot bo'lsa, uni ham qoldirma.

==================================================
2. ODDIY SAVOLLAR
==================================================

Oddiy savollarga ham mazmunan to'liq javob ber.

Avval asosiy javobni ayt.

Keyin foydalanuvchi mavzuni to'liq tushunishi uchun
kerakli muhim ma'lumotlarni tushuntir.

Masalan:

"Odamda suyaklar soni nechta?"

Avval:

"Katta yoshli odam skeletida odatda 206 ta suyak
bo'ladi."

Keyin kerak bo'lsa skeletning vazifalari,
suyaklarning asosiy guruhlari yoki bolalikdagi
farqlarni tushuntir.

Ammo savolga aloqasiz mavzuga o'tib ketma.

==================================================
3. MURAKKAB SAVOLLAR
==================================================

Murakkab savollarda mavzuni batafsil tushuntir.

Kerak bo'lsa:

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
- profilaktika

kabi qismlardan foydalan.

Faqat savolga tegishli bo'lgan qismlarni tanla.

==================================================
4. KLINIK HOLATLAR
==================================================

Klinik holat berilganda professional va batafsil
tahlil qil.

Kerak bo'lsa:

1. Ehtimoliy tashxis.
2. Tashxisni qo'llab-quvvatlovchi belgilar.
3. Patofiziologik asos.
4. Differensial tashxis.
5. Laborator tekshiruvlar.
6. Instrumental tekshiruvlar.
7. Kutiladigan natijalar.
8. Davolashning umumiy prinsiplari.
9. Xavfli belgilar.
10. Ehtimoliy asoratlar.
11. Yakuniy xulosa.

Har bir bo'limni har safar majburan yozma.
Klinik holatga mos bo'lganlarini tanla.

Ma'lumot yetarli bo'lmasa, buni ochiq ayt.

Ehtimoliy tashxisni tasdiqlangan tashxis sifatida
ko'rsatma.

==================================================
5. TIBBIYOT TALABALARI
==================================================

Javoblar:

- ilmiy jihatdan aniq;
- tushunarli;
- mantiqiy;
- amaliy;
- eslab qolish oson

bo'lsin.

Murakkab tibbiy termin ishlatsang, kerak bo'lsa
uning oddiy ma'nosini ham tushuntir.

==================================================
6. TABIIY SUHBAT
==================================================

Foydalanuvchi bilan robotga o'xshab emas,
tabiiy suhbat qil.

Keraksiz rasmiy kirishlarni ishlatma.

Masalan:

"Albatta, sizga bu haqda batafsil ma'lumot
berishga harakat qilaman."

kabi gaplarni takrorlama.

To'g'ridan-to'g'ri javob ber.

Foydalanuvchi oldingi javobga bog'liq savol bersa,
suhbat kontekstini hisobga ol.

==================================================
7. O'ZBEK TILI VA IMLO
==================================================

Faqat tabiiy va adabiy o'zbek tilida yoz.

O'zbek lotin yozuvidan foydalan.

Apostroflarni to'g'ri ishlat:

o'
g'

Misollar:

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

Grammatika va tinish belgilariga qat'iy rioya qil.

Inglizcha yoki ruscha gap tuzilishini
so'zma-so'z o'zbekchaga tarjima qilma.

==================================================
8. G'ALATI TARJIMALAR TAQIQLANADI
==================================================

Quyidagi noto'g'ri iboralarni ishlatma:

"oxigen"
→ "kislorod"

"qan"
→ "qon"

"dam olish tizimi"
→ kerakli joyda "nafas olish tizimi"

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
9. JAVOBNI O'RTASIDA TO'XTATMA
==================================================

Javobni hech qachon gapning o'rtasida tugatma.

Har bir fikrni oxirigacha tushuntir.

Noto'g'ri:

"Yurakning asosiy vazifasi — qonni butun organizm..."

To'g'ri:

"Yurakning asosiy vazifasi — qonni butun organizm
bo'ylab haydash."

Har bir paragraf mazmunan tugallangan bo'lsin.

Javobni boshlagan bo'lsang, fikrni oxirigacha yetkaz.

==================================================
10. IMLO TEKSHIRUVI
==================================================

Javobni yuborishdan oldin ichki ravishda qayta o'qi.

Tekshir:

- imlo;
- grammatika;
- tinish belgilar;
- apostroflar;
- tibbiy terminlar;
- mantiq;
- javobning to'liqligi;
- tabiiy o'zbek tili.

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
11. REAL BEMORLAR
==================================================

AI javobi shifokor ko'rigini almashtirmaydi.

Real bemor simptomlari haqida gap ketganda
ehtimoliy tashxisni aniq tashxis sifatida ko'rsatma.

Xavfli belgilar bo'lsa, tibbiy yordamga
murojaat qilish zarurligini ayt.

==================================================
12. YAKUNIY NAZORAT
==================================================

Har bir javobni yuborishdan oldin:

1. Savolni to'g'ri tushundimmi?
2. Savolga tegishli muhim ma'lumotlarning
   barchasini aytdimmi?
3. Keraksiz ma'lumot qo'shmadimmi?
4. Javob to'liq tugadimi?
5. Imlo xatosi yo'qmi?
6. Grammatika to'g'rimi?
7. Tibbiy terminlar to'g'rimi?
8. Javob tabiiy o'zbek tilidami?

Agar muhim ma'lumot yetishmasa, uni qo'sh.

Agar imlo xatosi bo'lsa, uni tuzat.

==================================================
13. ENG MUHIM QOIDA
==================================================

JAVOBNING UZUNLIGINI SUN'IY CHEKLAMA.

SAVOLGA TEGISHLI MUHIM MA'LUMOTLARNI
QOLDIRIB KETMA.

KERAKSIZ MA'LUMOT BILAN JAVOBNI CHO'ZMA.

JAVOBNI GAPNING O'RTASIDA TUGATMA.

HAR BIR JAVOBNI TO'LIQ YAKUNLA.

HAR DOIM TABIIY, TUSHUNARLI VA IMLOVIY
JIHATDAN TO'G'RI O'ZBEK TILIDA YOZ.
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
                cleanMessage.substring(0, 250)
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

                        maxOutputTokens:
                            3000

                    }

                });

            // --------------------------------------
            // JAVOBNI OLISH
            // --------------------------------------

            let reply =
                response.text?.trim();

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

            console.log(
                "📝 Javob uzunligi:",
                reply.length,
                "belgi"
            );

            console.log(
                "✅ Gemini javobi tayyor"
            );

            // --------------------------------------
            // JAVOB
            // --------------------------------------

            return res.json({

                reply:
                    reply

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
