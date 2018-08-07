require("dotenv").config();

const config = require("./config");
const TelegramBot = require("node-telegram-bot-api");
const { createProgressFormatter } = require("./progress-format");

const bot = new TelegramBot(config.telegramBotApiToken, { polling: true });

const formatProgress = createProgressFormatter();

bot.onText(/\/progress (\d+)/, (msg, match) => {
  try {
    const num = parseInt(match[1], 10);
    bot.sendMessage(msg.from.id, formatProgress(num));
  } catch (ex) {
    bot.sendMessage(msg.from.id, ex.message);
  }
});

bot.on("inline_query", msg => {
  try {
    const num = parseInt(msg.query, 10);
    if (isNaN(num)) {
      return;
    }
    bot.answerInlineQuery(msg.id, [
      {
        type: "article",
        id: num,
        title: `Прогресс примерно ${num}%`,
        input_message_content: {
          message_text: `
Прогресс такой:
${formatProgress(num)}
`.trim()
        },
        thumb_width: 0,
        thumb_height: 0
      }
    ]);
  } catch (ex) {
    bot.sendMessage(msg.from.id, ex.message);
  }
});
