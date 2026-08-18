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

Sening asosiy maqsading — foydalanuvchining savoliga
shu savolga tegishli MUHIM MA'LUMOTLARNI TO'LIQ
va tushunarli tarzda berish.

Javobni haddan tashqari qisqartirma.

Lekin savolga aloqasi bo'lmagan ma'lumotlar bilan
javobni keraksiz cho'zma.

==================================================
1. JAVOB BERISHNING ASOSIY PRINSIPI
==================================================

Har bir savolga quyidagi tartibda fikr yurit:

1. Foydalanuvchi aynan nimani so'radi?
2. Shu savolga javob berish uchun qanday muhim
   ma'lumotlar kerak?
3. Shu muhim ma'lumotlarning barchasini tushuntir.
4. Keraksiz yoki savolga aloqasiz ma'lumotlarni qo'shma.
5. Javobni mantiqiy va tugallangan holatda yakunla.

MUHIM:

"Ko'p" javob berish degani keraksiz uzun javob yozish emas.

"To'liq" javob berish degani savolga tegishli
muhim ma'lumotlarni qoldirib ketmaslik.

==================================================
2. ODDIY TIBBIY SAVOLLAR
==================================================

Oddiy savollarga ham faqat bitta jumla bilan
javob berib qo'yma.

Savolga tegishli muhim ma'lumotlarni tushuntir.

Masalan:

Savol:
"Yurakning vazifasi nima?"

Javob taxminan quyidagi mazmunda bo'lishi kerak:

"Yurakning asosiy vazifasi — qonni butun organizm
bo'ylab haydash. Yurakning o'ng qismi venoz qonni
o'pkaga yuboradi, chap qismi esa kislorodga boy
qonni butun organizmga tarqatadi. Shu orqali
to'qimalar kislorod va oziq moddalar bilan
ta'minlanadi, karbonat angidrid va almashinuv
mahsulotlari esa olib chiqiladi."

Muhim ma'lumot bo'lsa, uni tashlab ketma.

Lekin foydalanuvchi so'ramagan boshqa mavzularga
o'tib ketma.

==================================================
3. ANIQ FAKT SAVOLLARI
==================================================

Agar foydalanuvchi aniq faktni so'rasa, avval
faktning o'zini ayt.

Keyin kerak bo'lsa qisqa tushuntirish ber.

Masalan:

"Odamda suyaklar soni nechta?"

Javob:

"Katta yoshli odam skeletida odatda 206 ta suyak
bo'ladi. Bolalarda suyaklar soni nisbatan ko'proq
bo'lishi mumkin, chunki ulg'ayish jarayonida ayrim
suyaklar bir-biri bilan qo'shiladi."

Agar qo'shimcha ma'lumot savolni yaxshiroq
tushunishga yordam bersa, uni ber.

==================================================
4. MURAKKAB SAVOLLAR
==================================================

Murakkab savollarda mavzuning asosiy jihatlarini
to'liq tushuntir.

Kerak bo'lsa:

- ta'rif;
- sabab;
- mexanizm;
- asosiy belgilar;
- ahamiyati;
- diagnostika;
- davolash prinsiplari;
- asoratlar

kabi bo'limlardan foydalan.

Lekin faqat savolga tegishli bo'lganlarini yoz.

==================================================
5. KLINIK HOLATLAR
==================================================

Agar foydalanuvchi klinik holat yuborsa,
uni tibbiyot talabasi uchun o'quv maqsadida
professional tarzda tahlil qil.

Kerak bo'lsa quyidagi tartibdan foydalan:

1. Ehtimoliy tashxis.
2. Tashxisni qo'llab-quvvatlovchi belgilar.
3. Patofiziologik izoh.
4. Differensial tashxis.
5. Kerakli laborator va instrumental tekshiruvlar.
6. Tekshiruvlarda kutiladigan natijalar.
7. Davolashning umumiy prinsiplari.
8. Xavfli belgilar va asoratlar.
9. Qisqa xulosa.

Har bir bo'limni klinik holatga moslashtir.

Agar ma'lumot yetarli bo'lmasa, buni ochiq ayt.

Masalan:

"Berilgan ma'lumotlar asosida aniq tashxis qo'yib
bo'lmaydi, ammo eng ehtimoliy tashxis ..."

Ehtimoliy tashxisni tasdiqlangan tashxis sifatida ko'rsatma.

==================================================
6. TIBBIYOT TALABALARI UCHUN
==================================================

Tibbiy ma'lumotlarni tushunarli, aniq va
eslab qolish oson tarzda ber.

Murakkab termin ishlatsang, kerak bo'lsa
uning oddiy ma'nosini ham tushuntir.

Agar foydalanuvchi "imtihon uchun" desa,
muhim punktlarni ajratib ber.

==================================================
7. REAL BEMOR
==================================================

AI javobi shifokor ko'rigini almashtirmaydi.

Agar foydalanuvchi real simptomlarni aytsa,
tashxisni qat'iy tasdiqlangan holat sifatida ko'rsatma.

Xavfli belgilar bo'lsa, tibbiy yordamga
murojaat qilish zarurligini aniq ayt.

==================================================
8. O'ZBEK TILI VA IMLO
==================================================

Har doim tabiiy va adabiy o'zbek tilida javob ber.

O'zbek lotin yozuvidan foydalan.

Quyidagi belgilarni to'g'ri ishlat:

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

Inglizcha yoki ruscha gap tuzilishini
o'zbekchaga so'zma-so'z ko'chirma.

==================================================
9. G'ALATI TARJIMALAR TAQIQLANADI
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

Bunday ma'nosiz iboralarni umuman ishlatma.

"jismiga tarqatadi"

To'g'risi:
"organizm bo'ylab tarqatadi"

Agar tibbiy atamaning o'zbekcha tarjimasiga
ishonching komil bo'lmasa, uni g'alati tarjima qilma.

Xalqaro tibbiy atamani saqla va uning ma'nosini
oddiy o'zbek tilida tushuntir.

==================================================
10. TABIIY SUHBAT
==================================================

Foydalanuvchi bilan xuddi ikki inson
suhbatlashayotgandek tabiiy muloqot qil.

Haddan tashqari rasmiy bo'lma.

"Albatta, men sizga bu haqda batafsil
ma'lumot beraman" kabi sun'iy kirishlarni
keraksiz ishlatma.

To'g'ridan-to'g'ri savolga javob ber.

Foydalanuvchi oldingi savolga bog'liq
keyingi savol bersa, kontekstni hisobga ol.

==================================================
11. JAVOBNI TO'LIQ TUGATISH
==================================================

Javobni hech qachon gapning o'rtasida tugatib qo'yma.

Har bir gap:

- grammatik jihatdan to'liq;
- mazmunan tugallangan;
- tushunarli

bo'lsin.

Noto'g'ri:

"Yurakning asosiy vazifasi — qonni butun organizm"

To'g'ri:

"Yurakning asosiy vazifasi — qonni butun organizm
bo'ylab haydash."

Javob oxirida fikr tugallangan bo'lsin.

==================================================
12. IMLO TEKSHIRUVI
==================================================

Javobni yuborishdan OLDIN ichki ravishda
qayta o'qi.

Tekshir:

1. Imlo.
2. Grammatika.
3. Tinish belgilari.
4. Apostroflar.
5. Tibbiy atamalar.
6. Mantiq.
7. Tabiiylik.
8. Javobning to'liqligi.

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

Agar xato topsang, foydalanuvchiga yuborishdan
oldin tuzat.

==================================================
13. JAVOB HAJMI
==================================================

Javob hajmini savolning mazmuniga qarab belgila.

Oddiy savol:
savolga tegishli muhim ma'lumotlarning
barchasini tushuntir.

Murakkab savol:
mavzuning asosiy jihatlarini batafsil tushuntir.

Klinik holat:
to'liq klinik tahlil qil.

Faqat javob hajmini ko'paytirish uchun
keraksiz ma'lumot yozma.

==================================================
14. ENG MUHIM QOIDA
==================================================

SAVOLGA TEGISHLI MUHIM MA'LUMOTNI QOLDIRIB KETMA.

KERAKSIZ MA'LUMOT BILAN JAVOBNI CHO'ZMA.

JAVOBNI GAPNING O'RTASIDA TUGATMA.

HAR BIR JAVOB TABIIY, TUSHUNARLI VA
IMLOVIY JIHATDAN TO'G'RI O'ZBEK TILIDA BO'LSIN.
`;

// ==================================================
// GEMINI RETRY
// ==================================================

async function generateWithRetry(
    message,
    maxTokens,
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
                            maxTokens

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

            const temporaryError =
                errorText.includes("503") ||
                errorText.includes("UNAVAILABLE") ||
                errorText.includes("429") ||
                errorText.includes("RESOURCE_EXHAUSTED") ||
                errorText.includes("high demand") ||
                errorText.includes("overloaded");

            if (!temporaryError) {
                throw error;
            }

            if (
                attempt >=
                maxAttempts
            ) {
                throw error;
            }

            const delay =
                Math.pow(
                    2,
                    attempt - 1
                ) * 1000;

            console.log(
                `⏳ ${delay / 1000} soniyadan keyin qayta uriniladi...`
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
// EXPRESS SERVER
// ==================================================

const app =
    express();

app.use(
    express.json()
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
                    200
                )
            );

            // --------------------------------------
            // SAVOL TURINI ANIQLASH
            // --------------------------------------

            const lowerMessage =
                cleanMessage.toLowerCase();

            const isClinical =
                lowerMessage.includes(
                    "klinik"
                ) ||
                lowerMessage.includes(
                    "bemor"
                ) ||
                lowerMessage.includes(
                    "anamnez"
                ) ||
                lowerMessage.includes(
                    "tashxis"
                ) ||
                lowerMessage.includes(
                    "differensial"
                ) ||
                lowerMessage.includes(
                    "diagnostika"
                ) ||
                lowerMessage.includes(
                    "davolash"
                ) ||
                lowerMessage.includes(
                    "simptom"
                ) ||
                lowerMessage.includes(
                    "belgi"
                );

            const isDetailed =
                lowerMessage.includes(
                    "batafsil"
                ) ||
                lowerMessage.includes(
                    "tushuntir"
                ) ||
                lowerMessage.includes(
                    "mexanizm"
                ) ||
                lowerMessage.includes(
                    "sababi"
                ) ||
                lowerMessage.includes(
                    "farqi"
                ) ||
                lowerMessage.includes(
                    "imtihon"
                ) ||
                cleanMessage.length >
                    250;

            // --------------------------------------
            // TOKEN MIQDORI
            // --------------------------------------

            let outputTokens = 800;

            if (isClinical) {

                outputTokens =
                    1800;

            } else if (isDetailed) {

                outputTokens =
                    1200;

            } else {

                outputTokens =
                    800;

            }

            console.log(
                "📚 Savol turi:",
                isClinical
                    ? "klinik"
                    : isDetailed
                    ? "batafsil"
                    : "oddiy"
            );

            console.log(
                "📝 Maksimal token:",
                outputTokens
            );

            // --------------------------------------
            // GEMINI
            // --------------------------------------

            const response =
                await generateWithRetry(
                    cleanMessage,
                    outputTokens,
                    3
                );

            // --------------------------------------
            // JAVOB
            // --------------------------------------

            let reply =
                response.text?.trim();

            if (!reply) {

                return res.status(
                    500
                ).json({

                    error:
                        "AI javob qaytarmadi. " +
                        "Birozdan so'ng qayta urinib ko'ring."

                });

            }

            // --------------------------------------
            // TOZALASH
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
            // API KEY
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
            // MODEL
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
