const TelegramBot = require("node-telegram-bot-api");
const express = require("express");

const TOKEN = process.env.BOT_TOKEN;
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

if (!TOKEN) {
    console.error("BOT_TOKEN topilmadi!");
    process.exit(1);
}

if (!OPENROUTER_API_KEY) {
    console.error("OPENROUTER_API_KEY topilmadi!");
    process.exit(1);
}

const bot = new TelegramBot(TOKEN, {
    polling: true
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

/* AI SERVER */

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

        if (
            !userMessage ||
            typeof userMessage !== "string" ||
            !userMessage.trim()
        ) {
            return res.status(400).json({
                error: "Xabar bo'sh bo'lishi mumkin emas"
            });
        }

        const response = await fetch(
            "https://openrouter.ai/api/v1/chat/completions",
            {
                method: "POST",
                headers: {
                    "Authorization": "Bearer " + OPENROUTER_API_KEY,
                    "Content-Type": "application/json",
                    "HTTP-Referer": "https://medaiuz.github.io/MedAiUZ/",
                    "X-Title": "MedAiUz"
                },
                body: JSON.stringify({
                    model: "openrouter/free",
                    messages: [
                        {
                            role: "system",
                            content:
                                "Sen MedAiUz platformasining tibbiy AI yordamchisisan. " +
                                "Har doim o'zbek tilida javob ber. Tibbiyot talabalari " +
                                "va tibbiyot sohasi vakillariga tushunarli, aniq va " +
                                "foydali ma'lumot ber. Javoblaringni qisqa va tartibli qil. " +
                                "Tibbiy tashxis yoki davolash bo'yicha javoblarda bu " +
                                "ma'lumot professional shifokor ko'rigini almashtirmasligini eslat."
                        },
                        {
                            role: "user",
                            content: userMessage
                        }
                    ]
                })
            }
        );

        const data = await response.json();

        if (!response.ok) {
            console.error("OpenRouter xatosi:", JSON.stringify(data));
            return res.status(500).json({
                error: "AI xizmatida xatolik yuz berdi."
            });
        }

        const reply =
            data?.choices?.[0]?.message?.content ||
            "AI javob qaytara olmadi.";

        res.json({
            reply: reply
        });

    } catch (error) {
        console.error("AI xatosi:", error.message);

        res.status(500).json({
            error: "AI javob berishda xatolik yuz berdi. Birozdan so'ng qayta urinib ko'ring."
        });
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
