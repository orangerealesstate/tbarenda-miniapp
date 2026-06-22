const TelegramBot = require("node-telegram-bot-api");
const fs = require("fs");

const bot = new TelegramBot(process.env.BOT_TOKEN, {
  polling: true
});

bot.on("channel_post", (msg) => {
  console.log("NEW POST:");

  const text = msg.caption  msg.text  "Photo without caption";

  console.log(text);

  fs.writeFileSync("posts.json", JSON.stringify({
    text: text
  }));
});

console.log("Bot started");
