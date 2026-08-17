```javascript
const TelegramBot = require("node-telegram-bot-api");

const TOKEN = process.env.BOT_TOKEN;

if (!TOKEN) {
    console.error("BOT_TOKEN topilmadi!");
    process.exit(1);
}

const bot = new TelegramBot(TOKEN, {
    polling: true
});

const MINI_APP_URL = "https://medaiuz.github.io/MedAiUZ/";

// /start
bot.onText(/^\/start$/, async (msg) => {
    const chatId = msg.chat.id;
    const firstName = msg.from?.first_name || "Do‘stim";

    const text =
        `Assalomu alaykum, ${firstName}! 👋\n\n` +
        `🩺 MedAiUz platformasiga xush kelibsiz!\n\n` +
        `MedAiUz — tibbiyot talabalari va tibbiyot sohasi vakillari uchun ` +
        `darsliklar, testlar, klinik holatlar va AI yordamchi platformasi.\n\n` +
        `Quyidagi tugma orqali platformaga kirishingiz mumkin 👇`;

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

// Oddiy xabarlar
bot.on("message", async (msg) => {
    if (msg.text && msg.text.startsWith("/start")) {
        return;
    }

    if (msg.text) {
        await bot.sendMessage(
            msg.chat.id,
            "👋 Assalomu alaykum!\n\n" +
            "MedAiUz platformasidan foydalanish uchun " +
            "quyidagi tugmani bosing 👇",
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
    }
});

// Xatolar
bot.on("polling_error", (error) => {
    console.error("Telegram polling xatosi:", error.message);
});

console.log("🤖 MedAiUz bot ishga tushdi!");
```
