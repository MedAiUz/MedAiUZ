const TelegramBot = require("node-telegram-bot-api");
const http = require("http");

const token = process.env.BOT_TOKEN;

if (!token) {
  console.error("BOT_TOKEN topilmadi!");
  process.exit(1);
}

const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(
    msg.chat.id,
    "👋 Assalomu alaykum!\n\n🤖 Xush kelibsiz!\n\nQuyidagi tugmani bosing:",
    {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "🚀 Ilovani ochish",
              web_app: {
                url: "https://medaiuz-bot.onrender.com"
              }
            }
          ]
        ]
      }
    }
  );
});

bot.on("polling_error", (error) => {
  console.error("Telegram polling xatosi:", error.message);
});

const PORT = process.env.PORT || 3000;

http.createServer((req, res) => {
  res.writeHead(200);
  res.end("MedAiUz bot ishlayapti!");
}).listen(PORT, "0.0.0.0", () => {
  console.log(`🌐 Server ${PORT}-portda ishlayapti`);
});

console.log("🤖 Bot ishga tushdi!");
