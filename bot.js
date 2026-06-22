const TelegramBot = require("node-telegram-bot-api");

const bot = new TelegramBot(process.env.BOT_TOKEN, {
  polling: true
});

bot.on("channel_post", (msg) => {
  console.log("NEW POST:");

  if (msg.caption) {
    console.log(msg.caption);
  } else if (msg.text) {
    console.log(msg.text);
  } else {
    console.log("Photo without caption");
  }
});

console.log("Bot started");
