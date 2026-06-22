const TelegramBot = require("node-telegram-bot-api");

const token = process.env.BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });

bot.on("channel_post", (msg) => {
    console.log("New post:", msg.caption || msg.text);
});
