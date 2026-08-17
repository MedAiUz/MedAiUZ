const TelegramBot = require("node-telegram-bot-api");
const express = require("express");
const Anthropic = require("@anthropic-ai/sdk");


const TOKEN = process.env.BOT_TOKEN;
const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;


if (!TOKEN) {
    console.error("BOT_TOKEN topilmadi!");
    process.exit(1);
}

if (!ANTHROPIC_API_KEY) {
    console.error("ANTHROPIC_API_KEY topilmadi!");
    process.exit(1);
}


const bot = new TelegramBot(TOKEN, {
    polling: true
});

const anthropic = new Anthropic({
    apiKey: ANTHROPIC_API_KEY
});


const MINI_APP_URL = "https://medaiuz.github.io/MedAiUZ/";


bot.onText(/^\/start$/, async (msg) => {
    const chatId = msg.chat.id;
    const firstName = msg.from?.first_name || "Do'stim";


    const text =
        "Assalomu alaykum, " + firstName + "! 👋\n\n" +
        "🩺 MedAiUz platformasiga xush kelibsiz!\n\n" +
        "MedAiUz — tibbiyot talabalari va tibbiyot sohasi vakillari uchun " +
        "darsliklar, testlar, klinik holatlar va AI yordamchi platformasi.\n\n" +
        "Quyidagi tugma orqali platformaga kirishingiz mumkin 👇";


    await bot.sendMessage(chatId, text, {
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
    });
});


bot.on("polling_error", (error) => {
    console.error("Telegram polling xatosi:", error.message);
});


/* ===================================== */
/* ===== AI YORDAMCHI UCHUN SERVER ===== */
/* ===================================== */

const app = express();
app.use(express.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    if (req.method === "OPTIONS") {
        return res.sendStatus(200);
    }
    next();
});

app.post("/api/chat", async (req, res) => {
    try {
        const userMessage = req.body.message;

        if (!userMessage || typeof userMessage !== "string" || !userMessage.trim()) {
            return res.status(400).json({ error: "Xabar bo'sh bo'lishi mumkin emas" });
        }

        const response = await anthropic.messages.create({
            model: "claude-sonnet-4-6",
            max_tokens: 1000,
            system:
                "Sen MedAiUz platformasining tibbiy AI yordamchisisan. " +
                "Har doim o'zbek tilida javob ber. Tibbiyot talabalari va " +
                "tibbiyot sohasi vakillariga tushunarli, aniq va foydali " +
                "ma'lumot ber. Javoblaringni qisqa va tartibli qil. Agar " +
                "savol tibbiyotga aloqador bo'lmasa, muloyimlik bilan buni " +
                "tibbiyot uchun yordamchi ekaningni eslatib o't.",
            messages: [
                { role: "user", content: userMessage }
            ]
        });

        const reply = response.content
            .filter(function (block) { return block.type === "text"; })
            .map(function (block) { return block.text; })
            .join("\n");

        res.json({ reply: reply });

    } catch (error) {
        console.error("AI xatosi:", error.message);
        res.status(500).json({ error: "AI javob berishda xatolik yuz berdi. Birozdan so'ng qayta urinib ko'ring." });
    }
});

app.get("/", (req, res) => {
    res.send("MedAiUz bot va AI server ishlayapti ✅");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("🌐 AI server ishga tushdi, port: " + PORT);
});


console.log("🤖 MedAiUz bot ishga tushdi!");
