const express = require("express");
const path = require("path");
const TelegramBot = require("node-telegram-bot-api");

const app = express();

app.use(express.static(__dirname));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Telegram Bot
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
