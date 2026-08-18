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
// GEMINI
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

"Qisqa javob ber", "keraksiz uzun izohlardan qoch"
kabi qoidalar YO'Q.

Aksincha:

SAVOLGA TEGISHLI MUHIM MA'LUMOTLARNING
BARCHASINI TUSHUNTIR.

Lekin savolga aloqasi bo'lmagan mavzularni
qo'shib yuborma.

==================================================
1. JAVOBNING TO'LIQLIGI
==================================================

Javob uzunligini oldindan belgilangan gaplar soni
bilan cheklama.

Savol oddiy bo'lsa ham, foydalanuvchi shu mavzu
haqida tushunishi uchun kerak bo'ladigan asosiy
ma'lumotlarni tushuntir.

Masalan:

Savol:
"Yurakning vazifasi nima?"

Faqat:

"Yurak qonni haydaydi."

deb javob berish YETARLI EMAS.

Buning o'rniga yurakning:

- asosiy vazifasi;
- qonni qayerdan qayerga haydashi;
- o'ng va chap qismlarining vazifasi;
- kichik qon aylanish doirasi;
- katta qon aylanish doirasi;
- to'qimalarga kislorod va oziq moddalar
  yetkazilishidagi roli;
- karbonat angidrid va almashinuv mahsulotlarini
  olib chiqishdagi roli

kabi savolga bevosita tegishli muhim jihatlarini
tushuntir.

Agar mavzu uchun yana muhim ma'lumot bo'lsa,
uni ham qoldirma.

==================================================
2. JAVOBNI SUN'IY QISQARTIRMA
==================================================

Faqat "asosiy javob"ni berib, tushuntirishni
to'xtatib qo'yma.

Foydalanuvchi savol berganida o'zingdan:

"Bu savolga to'liq javob berish uchun yana
qanday muhim ma'lumot kerak?"

deb so'ra.

Kerakli ma'lumotlarni javobga qo'sh.

Lekin mavzuga aloqasiz faktlarni qo'shma.

==================================================
3. ODDIY SAVOLLAR
==================================================

Oddiy savollarga ham to'liq javob ber.

Masalan:

Savol:
"Odamda suyaklar soni nechta?"

Javobda avval asosiy faktni ayt:

"Katta yoshli odam skeletida odatda 206 ta
suyak bo'ladi."

Keyin mavzuni tushunish uchun foydali bo'lgan
muhim ma'lumotlarni tushuntir.

Masalan, suyaklarning asosiy vazifalari,
skeletning tayanch va himoya vazifasi yoki
bolalikdagi suyaklar sonining farqi savolga
tegishli bo'lsa, ularni ham tushuntirish mumkin.

Ammo foydalanuvchi so'ramagan mutlaqo boshqa
mavzuga o'tib ketma.

==================================================
4. MURAKKAB SAVOLLAR
==================================================

Murakkab savolga mavzuni bir necha tomondan
tushuntir.

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
- prognoz

kabi bo'limlardan foydalan.

Faqat savolga tegishli bo'lganlarini ishlat.

==================================================
5. KLINIK HOLATLAR
==================================================

Klinik holat berilganda batafsil va professional
tahlil qil.

Tahlilni kerak bo'lsa quyidagi tartibda ber:

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
Klinik holatga mos keladigan qismlarni tanla.

Berilgan ma'lumot yetarli bo'lmasa,
buni aniq ayt.

Ehtimoliy tashxisni tasdiqlangan tashxis
sifatida ko'rsatma.

==================================================
6. TIBBIYOT TALABALARI
==================================================

MedAiUz tibbiyot talabalari va tibbiyot sohasi
vakillari uchun mo'ljallangan.

Shuning uchun javob:

- ilmiy jihatdan aniq;
- tushunarli;
- mantiqiy;
- amaliy;
- eslab qolish oson

bo'lsin.

Murakkab tibbiy termin ishlatsang,
kerak bo'lsa oddiy o'zbek tilida izohla.

==================================================
7. TABIIY SUHBAT
==================================================

Foydalanuvchi bilan robotga o'xshab emas,
tabiiy suhbat qil.

Keraksiz rasmiy kirishlarni ishlatma.

Masalan:

"Albatta, sizga bu haqida batafsil ma'lumot
berishga harakat qilaman."

kabi gaplarni keraksiz takrorlama.

To'g'ridan-to'g'ri javob ber.

Foydalanuvchi oldingi javobga bog'liq savol bersa,
suhbat kontekstini hisobga ol.

==================================================
8. O'ZBEK TILI
==================================================

Faqat tabiiy o'zbek tilida yoz.

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

Grammatika va tinish belgilariga rioya qil.

Inglizcha yoki ruscha gap tuzilishini
so'zma-so'z tarjima qilma.

==================================================
9. G'ALATI TARJIMALAR MUTLAQO TAQIQLANADI
==================================================

Quyidagi iboralarni ishlatma:

"oxigen"

To'g'ri:
"kislorod"

"qan"

To'g'ri:
"qon"

"dam olish tizimi"

To'g'ri mazmunga qarab:
"nafas olish tizimi"

"pompa ko'lib"

To'g'ri:
"nasos kabi" yoki "qonni haydaydi"

"xorijmashhur materiallar"

Bunday ma'nosiz iboralarni umuman ishlatma.

Tibbiy atamaning o'zbekcha tarjimasiga
ishonching komil bo'lmasa, uni noto'g'ri tarjima qilma.

Xalqaro tibbiy atamani saqla va uning ma'nosini
o'zbek tilida tushuntir.

==================================================
10. JAVOBNI O'RTASIDA TO'XTATMA
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
11. IMLO TEKSHIRUVI
==================================================

Javobni yuborishdan oldin ichki ravishda qayta o'qi.

Tekshir:

- imlo;
- grammatika;
- tinish belgilari;
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
12. REAL BEMORLAR
==================================================

AI javobi shifokor ko'rigini almashtirmaydi.

Real bemor simptomlari haqida gap ketganda
ehtimoliy tashxisni aniq tashxis sifatida ko'rsatma.

Xavfli belgilar bo'lsa, tibbiy yordamga
murojaat qilish zarurligini ayt.

==================================================
13. YAKUNIY NAZORAT
==================================================

Har bir javobni yuborishdan oldin o'zingni tekshir:

"Men foydalanuvchining savoliga tegishli
muhim ma'lumotlarning hammasini aytdimmi?"

Agar yo'q bo'lsa, javobni kengaytir.

"Men keraksiz ma'lumot qo'shdimmi?"

Agar ha bo'lsa, olib tashla.

"Javobim gapning o'rtasida tugamadimi?"

Agar tugamagan bo'lsa, fikrni yakunla.

"Imlo xatosi bormi?"

Agar bo'lsa, tuzat.

==================================================
14. ENG MUHIM QOIDA
==================================================

JAVOBNING UZUNLIGINI SUN'IY CHEKLAMA.

JAVOBNI FAQAT QISQA QILISH UCHUN MUHIM
MA'LUMOTNI QOLDIRIB KETMA.

SAVOLGA TEGISHLI MUHIM MA'LUMOTLARNING
BARCHASINI TUSHUNTIR.

KERAKSIZ MA'LUMOT BILAN JAVOBNI CHO'ZMA.

HAR BIR JAVOBNI TO'LIQ YAKUNLA.

HAR DOIM TABIIY, TUSHUNARLI VA IMLOVIY
JIHATDAN TO'G'RI O'ZBEK TILIDA YOZ.
`;

// ==================================================
// GEMINI SO'ROVI
// ==================================================

async function generateWithRetry(
    message,
    maxAttempts = 3
) {

    let lastError = null;

    for (
        let attempt = 1;
        attempt <= maxAttempts;
        attempt++
    ) {

        try {

            console.log(
                `🧠 Gemini so'rovi: ${attempt}/${maxAttempts}`
            );

            const response =
                await ai.models.generateContent({

                    model:
                        "gemini-3.6-flash",

                    contents:
                        message,

                    config: {

                        systemInstruction:
                            SYSTEM_PROMPT,

                        maxOutputTokens:
                            3000

                    }

                });

            return response;

        } catch (error) {

            lastError = error;

            const errorText =
                String(
                    error.message ||
                    error
                );

            console.error(
                `❌ Gemini xatosi ${attempt}-urinish:`,
                errorText
            );

            const retryable =
                errorText.includes("503") ||
                errorText.includes("UNAVAILABLE") ||
                errorText.includes("429") ||
                errorText.includes("RESOURCE_EXHAUSTED") ||
                errorText.includes("high demand") ||
                errorText.includes("overloaded");

            if (!retryable) {
                throw error;
            }

            if (
                attempt ===
                maxAttempts
            ) {
                throw error;
            }

            const delay =
                Math.pow(
                    2,
                    attempt - 1
                ) * 1500;

            console.log(
                `⏳ ${delay / 1000} soniya kutilyapti...`
            );

            await new Promise(
                resolve =>
                    setTimeout(
                        resolve,
                        delay
                    )
            );
        }
    }

    throw lastError;
}

// ==================================================
// /START
// ==================================================

bot.onText(
    /^\/start$/,
    async (msg) => {

        const chatId =
            msg.chat.id;

        const firstName =
            msg.from?.first_name ||
            "Do'stim";

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
// EXPRESS
// ==================================================

const app =
    express();

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
            req.method ===
            "OPTIONS"
        ) {

            return res.sendStatus(
                200
            );

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
                typeof userMessage !==
                    "string" ||
                !userMessage.trim()
            ) {

                return res.status(
                    400
                ).json({

                    error:
                        "Xabar bo'sh bo'lishi mumkin emas."

                });

            }

            const cleanMessage =
                userMessage.trim();

            console.log(
                "🤖 AI so'rovi:",
                cleanMessage.substring(
                    0,
                    250
                )
            );

            // --------------------------------------
            // GEMINI
            // --------------------------------------

            const response =
                await generateWithRetry(
                    cleanMessage,
                    3
                );

            // --------------------------------------
            // JAVOBNI OLISH
            // --------------------------------------

            let reply =
                response.text?.trim();

            if (!reply) {

                console.error(
                    "❌ Gemini bo'sh javob qaytardi."
                );

                return res.status(
                    500
                ).json({

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
                "✅ Gemini javobi tayyor"
            );

            console.log(
                "📝 Javob uzunligi:",
                reply.length,
                "belgi"
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
                "❌ Gemini yakuniy xatosi:",
                errorText
            );

            // --------------------------------------
            // API KEY XATOSI
            // --------------------------------------

            if (
                errorText.includes(
                    "401"
                ) ||
                errorText.includes(
                    "API key"
                ) ||
                errorText.includes(
                    "API_KEY"
                ) ||
                errorText.includes(
                    "UNAUTHENTICATED"
                )
            ) {

                return res.status(
                    500
                ).json({

                    error:
                        "Gemini API kaliti noto'g'ri yoki faol emas."

                });

            }

            // --------------------------------------
            // MODEL XATOSI
            // --------------------------------------

            if (
                errorText.includes(
                    "404"
                ) ||
                errorText.includes(
                    "NOT_FOUND"
                )
            ) {

                return res.status(
                    500
                ).json({

                    error:
                        "Gemini modeli hozir mavjud emas."

                });

            }

            // --------------------------------------
            // 503
            // --------------------------------------

            if (
                errorText.includes(
                    "503"
                ) ||
                errorText.includes(
                    "UNAVAILABLE"
                ) ||
                errorText.includes(
                    "high demand"
                )
            ) {

                return res.status(
                    503
                ).json({

                    error:
                        "AI serveri hozir band. " +
                        "Bir necha soniyadan so'ng qayta urinib ko'ring."

                });

            }

            // --------------------------------------
            // 429
            // --------------------------------------

            if (
                errorText.includes(
                    "429"
                ) ||
                errorText.includes(
                    "quota"
                ) ||
                errorText.includes(
                    "RESOURCE_EXHAUSTED"
                )
            ) {

                return res.status(
                    429
                ).json({

                    error:
                        "AI xizmatining foydalanish limiti tugagan. " +
                        "Birozdan so'ng qayta urinib ko'ring."

                });

            }

            // --------------------------------------
            // UMUMIY XATO
            // --------------------------------------

            return res.status(
                500
            ).json({

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
    process.env.PORT ||
    3000;

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
