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

        // ------------------------------
        // XABARNI TEKSHIRISH
        // ------------------------------

        if (
            !userMessage ||
            typeof userMessage !== "string" ||
            !userMessage.trim()
        ) {

            return res.status(400).json({
                error:
                    "Xabar bo'sh bo'lishi mumkin emas"
            });

        }

        console.log(
            "🤖 AI so'rovi:",
            userMessage.substring(0, 150)
        );

        // ------------------------------
        // ANTHROPIC SO'ROVI
        // ------------------------------

        const response =
            await anthropic.messages.create({

                model: "claude-sonnet-4-6",

                // Javobni qisqartirdik:
                // 1000 -> 500
                max_tokens: 500,

                system:
                    "Sen MedAiUz platformasining " +
                    "tibbiy AI yordamchisisan. " +

                    "Har doim o'zbek tilida javob ber. " +

                    "Tibbiyot talabalari va tibbiyot " +
                    "sohasi vakillariga tushunarli, " +
                    "aniq va foydali ma'lumot ber. " +

                    "Javoblarni qisqa, tartibli va " +
                    "amaliy qil. " +

                    "Keraksiz uzun izohlardan qoch. " +

                    "Klinik holatlarda ehtimoliy " +
                    "tashxislarni aniq fakt sifatida " +
                    "ko'rsatma. " +

                    "Zarur bo'lsa differensial tashxis " +
                    "va kerakli tekshiruvlarni ayt. " +

                    "Xavfli belgilar bo'lsa ularni " +
                    "alohida ko'rsat. " +

                    "Real bemor uchun AI javobi " +
                    "shifokor ko'rigini almashtirmasligini " +
                    "eslat. " +

                    "Agar savol tibbiyotga aloqador " +
                    "bo'lmasa, muloyimlik bilan " +
                    "MedAiUz tibbiy yordamchi ekanini " +
                    "eslat.",

                messages: [
                    {
                        role: "user",
                        content: userMessage.trim()
                    }
                ]

            });

        // ------------------------------
        // AI JAVOBINI OLISH
        // ------------------------------

        const reply =
            response.content
                .filter(function (block) {
                    return block.type === "text";
                })
                .map(function (block) {
                    return block.text;
                })
                .join("\n");

        console.log(
            "✅ AI javobi tayyor"
        );

        // ------------------------------
        // JAVOB
        // ------------------------------

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

        // ------------------------------
        // ANTHROPIC CREDIT ERROR
        // ------------------------------

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

        // ------------------------------
        // UMUMIY XATO
        // ------------------------------

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
