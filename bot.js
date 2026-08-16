const TelegramBot = require("node-telegram-bot-api");

const TOKEN = process.env.BOT_TOKEN;

if (!TOKEN) {
    console.error("BOT_TOKEN topilmadi.");
    process.exit(1);
}

const bot = new TelegramBot(TOKEN, {
    polling: true
});

bot.onText(/^\/start$/, async (msg) => {
    const chatId = msg.chat.id;
    const firstName = msg.from?.first_name || "Do‘stim";

    await bot.sendMessage(
        chatId,
        `Assalomu alaykum, ${firstName}! 👋

🩺 MedAiUz platformasiga xush kelibsiz!

📚 Darsliklar
🧠 Testlar
🩻 Klinik holatlar
💊 Dorilar
🔬 Tibbiy terminlar
🤖 AI yordamchi`,
        {
            reply_markup: {
                inline_keyboard: [
                    [
                        {
                            text: "🚀 MedAiUz'ni ochish",
                            web_app: {
                                url: "https://medaiuz.github.io/MedAiUZ/"
                            }
                        }
                    ]
                ]
            }
        }
    );
});

bot.on("polling_error", (error) => {
    console.error("Polling xatosi:", error.message);
});

console.log("🤖 MedAiUz bot ishga tushdi.");
