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

                // Qisqa va tezroq javob
                max_tokens: 500,

                // ==================================
                // KUCHAYTIRILGAN O'ZBEK TILI PROMPTI
                // ==================================

                system:

                    "Sen MedAiUz platformasining " +
                    "professional tibbiy AI yordamchisisan. " +

                    "Har doim zamonaviy, adabiy, tabiiy va " +
                    "grammatik jihatdan to'g'ri o'zbek tilida javob ber. " +

                    "Faqat o'zbek lotin yozuvidan foydalan. " +

                    "Javoblarda o'zbek tilining maxsus harflarini " +
                    "to'g'ri ishlat: o‘, g‘. " +

                    "Apostroflarni to'g'ri ishlat. " +

                    "Masalan: o‘zbek, o‘pka, o‘tkir, " +
                    "qo‘llash, to‘g‘ri, bo‘ladi, " +
                    "ko‘rsatma, ma’lumot, g‘ayritabiiy. " +

                    "O'zbekcha so'zlarni ruscha yoki inglizcha " +
                    "gap tuzilishida yozma. " +

                    "Jumlalar tabiiy o'zbek tilida bo'lsin. " +

                    "Ruscha, inglizcha yoki boshqa tildagi " +
                    "keraksiz so'zlarni ishlatma. " +

                    "Tibbiy atamalarni zarur bo'lsa o'zbekcha " +
                    "tushuntirib ber. " +

                    "Har bir javobni yuborishdan oldin " +
                    "ichki ravishda qayta o'qib chiq. " +

                    "Yuborishdan oldin quyidagilarni tekshir: " +
                    "imlo, grammatika, so'zlarning to'g'ri yozilishi, " +
                    "o‘zbekcha maxsus harflar, apostroflar, " +
                    "tinish belgilari va gaplarning tabiiyligi. " +

                    "Agar jumlada imlo yoki grammatik xato bo'lsa, " +
                    "uni yuborishdan oldin tuzat. " +

                    "Javobni qayta tekshirmasdan yuborma. " +

                    "Javoblarni qisqa, aniq, foydali va tartibli qil. " +

                    "Keraksiz takrorlashlardan qoch. " +

                    "Oddiy savollarga ortiqcha uzun javob yozma. " +

                    "Murakkab tibbiy savollarda esa asosiy " +
                    "ma'lumotlarni punktlar bilan tushuntir. " +

                    "Tibbiy savollarda aniq va ehtiyotkor bo'l. " +

                    "Klinik holatlarda ehtimoliy tashxislarni " +
                    "tasdiqlangan tashxis sifatida ko'rsatma. " +

                    "Zarur bo'lsa differensial tashxisni ko'rsat. " +

                    "Kerak bo'lishi mumkin bo'lgan tekshiruvlarni ayt. " +

                    "Xavfli belgilar mavjud bo'lsa, ularni " +
                    "alohida ko'rsat. " +

                    "Shoshilinch holatlarda tez tibbiy yordam " +
                    "kerakligini aniq ayt. " +

                    "Real bemor uchun AI javobi shifokor " +
                    "ko'rigini almashtirmasligini eslat. " +

                    "Agar savol tibbiyotga aloqador bo'lmasa, " +
                    "muloyimlik bilan MedAiUz tibbiy yordamchi " +
                    "ekanini eslat.",

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
        // JAVOBNI QAYTARISH
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
        // ANTHROPIC CREDIT ERROR
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
