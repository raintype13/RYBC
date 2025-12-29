import { NextResponse } from 'next/server';
import { Bot } from 'grammy';

const token = process.env.TELEGRAM_BOT_TOKEN;
if (!token) throw new Error("TELEGRAM_BOT_TOKEN is not defined");

const bot = new Bot(token);

// Список ресурсов для проверки. Замените ID чата на ваш реальный (начинается с -100)
const CHANNELS = [
  { id: '@RYB_Community', key: 'community' },
  { id: '@RYB_Chatik', key: 'chat' }
];

export async function POST(req: Request) {
  try {
    const { userId } = await req.json();

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    const results = await Promise.all(
      CHANNELS.map(async (channel) => {
        try {
          const member = await bot.api.getChatMember(channel.id, userId);
          // Статусы, подтверждающие подписку
          const isSubscribed = ['member', 'administrator', 'creator'].includes(member.status);
          return { key: channel.key, isSubscribed };
        } catch (error) {
          console.error(`Error checking ${channel.id}:`, error);
          return { key: channel.key, isSubscribed: false };
        }
      })
    );

    // Превращаем массив в объект вида { community: true, chat: false }
    const subscriptionStatus = results.reduce((acc, curr) => {
      acc[curr.key] = curr.isSubscribed;
      return acc;
    }, {} as Record<string, boolean>);

    return NextResponse.json(subscriptionStatus);
  } catch (error) {
    console.error('Check-sub API error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}