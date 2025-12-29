import { Bot, InlineKeyboard, webhookCallback } from "grammy";

const token = process.env.TELEGRAM_BOT_TOKEN;
if (!token) throw new Error("TELEGRAM_BOT_TOKEN is missing");

const bot = new Bot(token);
const ADMIN_ID = 1949612933; // ЗАМЕНИ НА СВОЙ ID
const IMAGE_URL = "https://rybc.vercel.app/image.jpg";

bot.command("start", async (ctx) => {
  const keyboard = new InlineKeyboard()
    .webApp("Launch App", "https://rybc.vercel.app/").row()
    .url("Follow Community", "https://t.me/RYB_Community")
    .text("Support", "support_click");

  await ctx.replyWithPhoto(IMAGE_URL, {
    caption: "Welcome! Launch the app to start tasks.",
    reply_markup: keyboard,
  });
});

// --- ЛОГИКА ДЛЯ АДМИНА (ТЕБЯ) ---

// Когда пользователь присылает фото
bot.on("message:photo", async (ctx) => {
  await ctx.reply("✅ Screenshot received! Please wait for verification.");

  // Создаем кнопки для админа
  // Мы "зашиваем" ID пользователя в callback_data, чтобы знать кому отвечать
  const adminKeyboard = new InlineKeyboard()
    .text("✅ Одобрить", `approve:${ctx.from.id}`)
    .text("❌ Отклонить", `reject:${ctx.from.id}`);

  // Пересылаем фото админу
  await ctx.api.sendPhoto(ADMIN_ID, ctx.message.photo[0].file_id, {
    caption: `Новый скриншот от @${ctx.from.username || 'id' + ctx.from.id}\nID: ${ctx.from.id}`,
    reply_markup: adminKeyboard,
  });
});

// Обработка кнопки "Одобрить"
bot.callbackQuery(/^approve:/, async (ctx) => {
  const userId = ctx.callbackQuery.data.split(":")[1];

  try {
    await ctx.api.sendMessage(userId, "🎉 Ваш скриншот проверен! Задание выполнено. Теперь вы можете продолжить в приложении.");
    await ctx.editMessageCaption({
      caption: ctx.callbackQuery.message?.caption + "\n\nСтатус: ✅ ОДОБРЕНО"
    });
  } catch (e) {
    await ctx.answerCallbackQuery("Ошибка: не удалось отправить сообщение");
  }
  await ctx.answerCallbackQuery("Одобрено!");
});

// Обработка кнопки "Отклонить"
bot.callbackQuery(/^reject:/, async (ctx) => {
  const userId = ctx.callbackQuery.data.split(":")[1];

  try {
    await ctx.api.sendMessage(userId, "❌ Ваш скриншот не прошел проверку. Пожалуйста, убедитесь, что вы подписались на все соцсети и попробуйте отправить скриншот еще раз.");
    await ctx.editMessageCaption({
      caption: ctx.callbackQuery.message?.caption + "\n\nСтатус: ❌ ОТКЛОНЕНО"
    });
  } catch (e) {
    await ctx.answerCallbackQuery("Ошибка: не удалось отправить сообщение");
  }
  await ctx.answerCallbackQuery("Отклонено");
});

// Поддержка
bot.callbackQuery("support_click", async (ctx) => {
  await ctx.reply("Please send your question here.");
  await ctx.answerCallbackQuery();
});

bot.on("message:text", async (ctx) => {
  if (ctx.message.text.startsWith("/")) return;
  await ctx.reply("Your message is received. We will answer soon.");
  await ctx.api.sendMessage(ADMIN_ID, `Вопрос от @${ctx.from.username}:\n${ctx.message.text}`);
});

export const POST = webhookCallback(bot, "std/http");