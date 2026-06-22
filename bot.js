const TelegramBot = require("node-telegram-bot-api");

const bot = new TelegramBot(process.env.BOT_TOKEN, {
  polling: true
});

bot.on("channel_post", (msg) => {
  console.log("NEW POST:");
  console.log(msg.caption || msg.text);
});

console.log("Bot started");
