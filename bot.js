const TelegramBot = require("node-telegram-bot-api");

const token = process.env.BOT_TOKEN;

if (!token) {
  console.error("BOT_TOKEN topilmadi!");
  process.exit(1);
}

const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(
    msg.chat.id,
    "👋 Assalomu alaykum!\n\n🤖 MedAiUz botiga xush kelibsiz!\n\nQuyidagi menyudan foydalaning:"
  );
});

bot.on("polling_error", (error) => {
  console.error("Telegram polling xatosi:", error.message);
});

console.log("🤖 MedAiUz bot ishga tushdi!");
