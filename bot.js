const TelegramBot = require("node-telegram-bot-api");
const fs = require("fs");

const bot = new TelegramBot(process.env.BOT_TOKEN, {
  polling: {
    autoStart: false
  }
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

  console.log("NEW POST SAVED");
});

console.log("Bot started");
