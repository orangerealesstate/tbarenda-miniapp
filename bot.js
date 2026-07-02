const TelegramBot = require("node-telegram-bot-api");
const fs = require("fs");

if (!process.env.BOT_TOKEN) {
  console.error("BOT_TOKEN is missing!");
  process.exit(1);
}

console.log("TOKEN START:", process.env.BOT_TOKEN.substring(0, 10));

const bot = new TelegramBot(process.env.BOT_TOKEN, {
  polling: {
    autoStart: false,
    interval: 300,
    params: {
      timeout: 10
    }
  }
});

bot.on("polling_error", (error) => {
  console.error("Polling error:", error.message);
});

bot.startPolling({
  restart: true
});

bot.on("channel_post", (msg) => {
  const text = msg.caption || msg.text || "";

  let posts = [];

  try {
    posts = JSON.parse(fs.readFileSync("data.json", "utf8"));
  } catch (e) {
    posts = [];
  }

  const image = "https://picsum.photos/600/400";

  posts.unshift({
    title: text.split("\n")[0],
    price: "",
    description: text,
    image: image,
  });

  posts = posts.slice(0, 50);

  fs.writeFileSync("data.json", JSON.stringify(posts, null, 2));

  console.log("NEW POST SAVED:", text.substring(0, 50));
});

console.log("Bot started");
