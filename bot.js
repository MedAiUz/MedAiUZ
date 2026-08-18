const TelegramBot = require("node-telegram-bot-api");
const express = require("express");
const Anthropic = require("@anthropic-ai/sdk");

// ==========================================
// ENVIRONMENT VARIABLES
// ==========================================

const TOKEN = process.env.BOT_TOKEN;
const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;

// ==========================================
// TEKSHIRISH
// ==========================================

if (!TOKEN) {
    console.error("BOT_TOKEN topilmadi!");
    process.exit(1);
}

if (!ANTHROPIC_API_KEY) {
    console.error("ANTHROPIC_API_KEY topilmadi!");
    process.exit(1);
}

// ==========================================
// TELEGRAM BOT
// ==========================================

const bot = new TelegramBot(TOKEN, {
    polling: true
});

// ==========================================
// ANTHROPIC AI
// ==========================================

const anthropic = new Anthropic({
    apiKey: ANTHROPIC_API_KEY
});

// ==========================================
// MINI APP
// ==========================================

const MINI_APP_URL =
    "https://medaiuz.github.io/MedAiUZ/";

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

        console.log(
            "🤖 AI so'rovi:",
            userMessage.substring(0, 150)
        );

        // ======================================
        // AI SO'ROVI
        // ======================================

        const response =
            await anthropic.messages.create({

                model: "claude-sonnet-4-6",

                // Javobni qisqa va tez saqlaymiz
                max_tokens: 500,

                // Javobni barqarorroq qilish
                temperature: 0.2,

                // ==================================
                // PROFESSIONAL O'ZBEKCHA SYSTEM PROMPT
                // ==================================

                system: `Sen MedAiUz platformasining professional tibbiy AI yordamchisisan.

ASOSIY VAZIFA:
Foydalanuvchiga tibbiyot bo'yicha aniq, tushunarli, tabiiy va professional O'ZBEK TILIDA javob ber.

TIL QOIDALARI:
1. Faqat o'zbek tilida javob ber.
2. Faqat tabiiy o'zbekcha gap tuzilishidan foydalan.
3. O'zbek tilining adabiy me'yorlariga rioya qil.
4. Imlo va grammatik xatolarga yo'l qo'yma.
5. Tinish belgilarini to'g'ri ishlat.
6. O'zbek lotin yozuvidan foydalan.
7. O'zbek tilidagi maxsus harflarni to'g'ri ishlat: o‘, g‘.
8. So'zlarni noto'g'ri tarjima qilma.
9. Inglizcha yoki ruscha so'zlarni o'zbekcha deb ishlatma.
10. Agar tibbiy atamaning o'zbekcha shakli noaniq bo'lsa, xalqaro tibbiy atamani ishlat va uni oddiy o'zbekcha izohla.
11. G'alati, sun'iy yoki mashina tarjimasiga o'xshash jumlalar yozma.

MUHIM:
"oxygen", "oxygenation", "blood", "heart", "pump", "system", "metabolism" kabi inglizcha tushunchalarni noto'g'ri yoki g'alati o'zbekchaga tarjima qilma.

Masalan:
Noto'g'ri: "oxigen"
To'g'ri: "kislorod"

Noto'g'ri: "dam olish tizimi"
To'g'ri: "nafas olish tizimi"

Noto'g'ri: "qan"
To'g'ri: "qon"

Noto'g'ri: "pompa ko'lib"
To'g'ri: "nasos kabi"

Noto'g'ri: "jismiga tarqatadi"
To'g'ri: "organizm bo'ylab tarqatadi"

Noto'g'ri: "qon qobiliyatini namlik darajasi"
Bunday ma'nosiz jumlani umuman yozma.

Oddiy savollarga oddiy javob ber.

Masalan, foydalanuvchi:
"Yurakning vazifasi nima?"

deb so'rasa, javob taxminan quyidagi uslubda bo'lsin:

"Yurakning asosiy vazifasi — qonni butun organizm bo'ylab haydash.

Yurak:
• qonni o‘pka va boshqa a'zolarga yetkazadi;
• to‘qimalarga kislorod va oziq moddalar yetib borishiga yordam beradi;
• karbonat angidrid va moddalar almashinuvi mahsulotlarining olib chiqilishiga yordam beradi;
• qon aylanishini ta'minlaydi."

Bu faqat NAMUNA. Har bir savolga mazmuniga mos javob ber.

JAVOB USLUBI:
- Avval savolga to'g'ridan-to'g'ri javob ber.
- Keyin kerak bo'lsa qisqa tushuntirish ber.
- Oddiy savolga ortiqcha uzun javob yozma.
- Murakkab savolni punktlar bilan tushuntir.
- Bir xil fikrni qayta-qayta takrorlama.
- Tibbiy atamani kerak bo'lsa oddiy tilda tushuntir.
- Foydalanuvchi talabaga o'xshasa, o'quv uchun tushunarli qilib yoz.

IMLO TEKSHIRUVI:
Javobni yuborishdan oldin ichki ravishda qayta o'qib chiq.
Quyidagilarni tekshir:
- imlo;
- grammatika;
- tinish belgilari;
- o‘zbekcha maxsus harflar;
- apostroflar;
- tibbiy atamalar;
- gaplarning tabiiyligi;
- ma'noning to'g'riligi.

Agar jumla g'alati yoki ma'nosiz chiqsa, uni yuborma — qayta yoz.

KLINIK HOLATLAR:
Agar foydalanuvchi klinik holat yuborsa:
1. Klinik muammolarni aniqlash.
2. Eng ehtimoliy tashxislarni ko'rsatish.
3. Differensial tashxisni ko'rsatish.
4. Kerak bo'lishi mumkin bo'lgan tekshiruvlarni aytish.
5. Xavfli belgilarni alohida ko'rsatish.
6. Qisqa klinik xulosa berish.

Klinik holatda yetarli ma'lumot bo'lmasa, buni ochiq ayt.
Tasdiqlanmagan tashxisni aniq tashxis sifatida ko'rsatma.

REAL BEMOR:
AI javobi shifokor ko'rigini almashtirmaydi.
Agar simptomlar xavfli bo'lsa, shoshilinch tibbiy yordamga murojaat qilish kerakligini ayt.

ENG MUHIM QOIDA:
Hech qachon ma'nosiz, g'alati, buzilgan yoki mashina tarjimasiga o'xshash o'zbekcha matn yozma.
Javob tabiiy o'zbek tilida yozilgandek bo'lishi kerak.`,

                // ==================================
                // USER MESSAGE
                // ==================================

                messages: [
                    {
                        role: "user",
                        content:
                            userMessage.trim()
                    }
                ]

            });

        // ======================================
        // AI JAVOBINI OLISH
        // ======================================

        const reply =
            response.content
                .filter(function (block) {
                    return block.type === "text";
                })
                .map(function (block) {
                    return block.text;
                })
                .join("\n")
                .trim();

        console.log(
            "✅ AI javobi tayyor"
        );

        // ======================================
        // JAVOB
        // ======================================

        return res.json({
            reply:
                reply ||
                "AI javob qaytarmadi."
        });

    } catch (error) {

        console.error(
            "AI xatosi:",
            error.message
        );

        // ======================================
        // CREDIT ERROR
        // ======================================

        if (
            error.message &&
            error.message.includes(
                "credit balance is too low"
            )
        ) {

            return res.status(500).json({

                error:
                    "AI xizmatining kredit limiti tugagan. " +
                    "API hisobini tekshirish kerak."

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
        "MedAiUz bot va AI server ishlayapti ✅"
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
        "🌐 AI server ishga tushdi, port: " +
        PORT
    );

    console.log(
        "🤖 MedAiUz Telegram bot ishga tushdi!"
    );

});
