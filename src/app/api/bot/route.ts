import { Bot, InlineKeyboard, webhookCallback } from "grammy";
const token = process.env.TELEGRAM_BOT_TOKEN;

// Если токена нет, мы выдаем понятную ошибку, а не просто ломаем приложение
if (!token) {
  throw new Error("TELEGRAM_BOT_TOKEN is not defined in environment variables");
}

const bot = new Bot(token);
// Ссылка на картинку (замени на прямую ссылку, если image.jpg лежит в public)
const IMAGE_URL = "https://rybc.vercel.app/image.jpg"; 

bot.command("start", async (ctx) => {
  const keyboard = new InlineKeyboard()
    .webApp("Launch App", "https://rybc.vercel.app/").row() // Большая кнопка
    .url("Follow Community", "https://t.me/RYB_Community")
    .text("Support", "support_click"); // Кнопка поддержки

  await ctx.replyWithPhoto(IMAGE_URL, {
    caption: "Welcome! This application contains all the necessary information about the $RYBC token. Stay tuned for updates and explore the ecosystem.",
    reply_markup: keyboard,
  });
});

// Обработка кнопки Support
bot.callbackQuery("support_click", async (ctx) => {
  await ctx.reply("You can ask your question right here. Please type it in the chat.");
  await ctx.answerCallbackQuery();
});

// Обработка любого текстового сообщения (вопроса в поддержку)
bot.on("message:text", async (ctx) => {
  if (ctx.message.text.startsWith("/")) return; // Игнорируем команды

  await ctx.reply("Your question has been received. Our moderators will help you shortly. Thank you for your patience!");
  
  // Здесь можно добавить логику пересылки вопроса тебе в личку или в админ-чат
  // await ctx.forwardMessage(ID_ТВОЕГО_ЧАТА);
});

export const POST = webhookCallback(bot, "std/http");