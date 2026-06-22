const express = require("express");
const path = require("path");
const TelegramBot = require("node-telegram-bot-api");
const fs = require("fs");

const app = express();

app.use(express.static(__dirname));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/posts", (req, res) => {
  try {
    const data = fs.readFileSync("posts.json");
    res.json(JSON.parse(data));
  } catch {
    res.json({ text: "No posts yet" });
  }
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

  const text = msg.caption  msg.text  "Photo without caption";

  console.log(text);

  fs.writeFileSync(
    "posts.json",
    JSON.stringify({ text })
  );
});

console.log("Bot started");
