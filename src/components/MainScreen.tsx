'use client';
import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import Countdown from './Countdown';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/constants/translations';

export default function MainScreen() {
  const { lang } = useLanguage();
  const t = translations[lang] || translations['en'];

  // Состояния для заданий
  const [completedTasks, setCompletedTasks] = useState<string[]>([]); // Для тех, кто уже подписан
  const [clickedTasks, setClickedTasks] = useState<string[]>([]);   // Для отслеживания первого клика (manual)

  const socials = [
    { id: 'community', name: 'RYB Community', link: 'https://t.me/RYB_Community', type: 'tg' },
    { id: 'chat', name: 'RYB Chat', link: 'https://t.me/RYB_Chatik', type: 'tg' },
    { id: 'x', name: 'X (Twitter)', link: 'https://x.com/RYB_Community', type: 'manual' },
    { id: 'threads', name: 'Threads', link: 'https://www.threads.net/@ryb.community', type: 'manual' },
    { id: 'tiktok', name: 'TikTok', link: 'https://tiktok.com/@ryb_community', type: 'manual' },
    { id: 'instagram', name: 'Instagram', link: 'https://instagram.com/ryb.community/', type: 'manual' },
    { id: 'youtube', name: 'YouTube', link: 'https://youtube.com/@RYBCommunity', type: 'manual' },
  ];

  // 1. Загрузка данных при старте
  useEffect(() => {
    const savedCompleted = localStorage.getItem('completedTasks');
    const savedClicked = localStorage.getItem('clickedTasks');
    if (savedCompleted) setCompletedTasks(JSON.parse(savedCompleted));
    if (savedClicked) setClickedTasks(JSON.parse(savedClicked));

    // Авто-проверка Telegram подписок при входе
    checkTelegramSubs();
  }, []);

  // 2. Функция проверки подписки через API
  const checkTelegramSubs = async () => {
    const tg = (window as any).Telegram?.WebApp;
    const userId = tg?.initDataUnsafe?.user?.id;

    if (!userId) return;

    try {
      const response = await fetch('/api/check-sub', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId }),
      });
      const data = await response.json();

      const newlyCompleted: string[] = [];
      if (data.community) newlyCompleted.push('community');
      if (data.chat) newlyCompleted.push('chat');

      if (newlyCompleted.length > 0) {
        setCompletedTasks(prev => {
          const updated = Array.from(new Set([...prev, ...newlyCompleted]));
          localStorage.setItem('completedTasks', JSON.stringify(updated));
          return updated;
        });
      }
    } catch (e) {
      console.error("Failed to check subs", e);
    }
  };

  // 3. Обработка клика по кнопке
  const handleTaskAction = (social: typeof socials[0]) => {
    const tg = (window as any).Telegram?.WebApp;
    const botUrl = "https://t.me/rybc_bot";

    if (social.type === 'tg') {
      // Для ТГ просто открываем ссылку, проверка идет в фоне или при повторном входе
      handleOpenLink(social.link);
      setTimeout(checkTelegramSubs, 3000); // Проверить через 3 сек после клика
    } else {
      // Для ручных (X, Threads и т.д.)
      if (!clickedTasks.includes(social.id)) {
        handleOpenLink(social.link);
        const updatedClicked = [...clickedTasks, social.id];
        setClickedTasks(updatedClicked);
        localStorage.setItem('clickedTasks', JSON.stringify(updatedClicked));
      } else {
        // Второй клик - в бот за скрином
        if (tg) tg.openTelegramLink(botUrl);
        else window.open(botUrl, '_blank');
      }
    }
  };

  const handleOpenLink = (url: string) => {
    const tg = (window as any).Telegram?.WebApp;
    if (tg) {
      if (url.includes('t.me')) tg.openTelegramLink(url);
      else tg.openLink(url);
    } else {
      window.open(url, '_blank');
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full animate-in fade-in duration-500">
      {/* Слайдер */}
      <div className="w-full h-52 relative">
        <Swiper
          modules={[Pagination]}
          pagination={{ clickable: true }}
          className="h-full rounded-4xl bg-[#101010]"
        >
          <SwiperSlide className="flex flex-col items-center justify-center p-8 text-center relative">
            <div className="absolute top-6 right-8 flex items-center gap-2">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              <span className="text-[10px] text-gray-500 uppercase tracking-widest font-black">Live</span>
            </div>
            <p className="text-[11px] text-gray-500 mb-8 uppercase tracking-[0.4em] font-black opacity-80">{t.main_title}</p>
            <div className="flex items-center justify-center w-full mb-4 scale-110"> 
              <Countdown />
            </div>
            <div className="flex justify-center gap-6 w-full mt-4 opacity-30">
              {['Days', 'Hrs', 'Min', 'Sec'].map(s => <span key={s} className="text-[8px] uppercase tracking-[0.2em] font-black w-10">{s}</span>)}
            </div>
          </SwiperSlide>

          <SwiperSlide className="flex flex-col items-center justify-center p-8 text-center">
            <div className="relative w-full py-6 px-4 rounded-3xl bg-[#151515]/50 border border-white/5 shadow-2xl">
              <p className="text-[9px] text-gray-500 mb-5 uppercase tracking-[0.3em] font-black">{t.launch_date}</p>
              <div className="flex flex-col items-center gap-1 mb-5">
                <span className="text-4xl font-black tracking-tighter text-white">12.01.2026</span>
                <div className="h-0.5 w-10 bg-[#00ff88] rounded-full mt-1 shadow-[0_0_8px_#00ff88]" />
              </div>
              <div className="flex justify-between items-center w-full px-2 mt-4 text-[10px] font-bold">
                <div className="flex flex-col items-start"><span className="text-[8px] text-gray-600 uppercase mb-0.5">{t.platform}</span>pump.fun</div>
                <div className="flex flex-col items-end"><span className="text-[8px] text-gray-600 uppercase mb-0.5">{t.status}</span><span className="text-[#00ff88]">{t.confirmed}</span></div>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide className="flex flex-col items-center justify-center p-6 text-center">
             <div className="flex items-center gap-4 mb-2">
                <img src="/memecoin.png" alt="Logo" className="w-16 h-16 object-contain" />
                <div className="flex flex-col items-start text-left">
                  <span className="text-2xl font-black text-white">$RYBC</span>
                  <span className="text-[11px] text-gray-500 font-bold uppercase">$RYB Coin</span>
                </div>
             </div>
             <span className="text-4xl font-black text-[#00ff88]">$0.00426</span>
          </SwiperSlide>
        </Swiper>
      </div>

      {/* Плашка заданий */}
      <div className="bg-[#101010] rounded-4xl p-6 flex flex-col gap-6">
        <h2 className="text-xl font-bold ml-1 tracking-tight">{t.get_access}</h2>
        
        <div className="flex flex-col">
          {socials.map((social) => {
            const isDone = completedTasks.includes(social.id);
            const isClicked = clickedTasks.includes(social.id);

            return (
              <div key={social.id} className="flex flex-col">
                <div className="flex justify-between items-center py-4 px-1">
                  <span className={`font-semibold text-lg transition-colors ${isDone ? 'text-gray-600' : 'text-gray-200'}`}>
                    {social.name}
                  </span>
                  <button 
                    disabled={isDone}
                    onClick={() => handleTaskAction(social)}
                    className={`px-6 py-1.5 rounded-full font-bold text-sm transition-all active:scale-95 ${
                      isDone 
                        ? 'bg-gray-800 text-gray-500 cursor-not-allowed' 
                        : (isClicked && social.type === 'manual')
                          ? 'bg-[#00ff88] text-black shadow-[0_0_15px_rgba(0,255,136,0.3)]' 
                          : 'bg-white text-black'
                    }`}
                  >
                    {isDone ? 'DONE' : (isClicked && social.type === 'manual' ? 'SCREEN' : 'GO')}
                  </button>
                </div>
                <div className="h-px bg-gray-900/30 w-full" />
              </div>
            );
          })}

          <div className="flex justify-between items-center py-5 px-1">
            <div className="flex flex-col">
              <span className="text-gray-200 font-semibold text-lg">{t.ref_title}</span>
              <span className="text-[11px] text-gray-500 uppercase tracking-widest mt-0.5 font-medium">{t.ref_subtitle}</span>
            </div>
            <span className="text-white font-bold bg-[#1a1a1a] px-4 py-1.5 rounded-xl text-lg">0 / 3</span>
          </div>
        </div>

        <button 
          className={`w-full font-black py-5 rounded-2xl mt-2 uppercase tracking-[0.2em] text-sm transition-colors ${
            completedTasks.length >= socials.length 
              ? 'bg-[#00ff88] text-black' 
              : 'bg-[#1a1a1a] text-gray-600 cursor-not-allowed'
          }`}
        >
          {t.check_btn}
        </button>
      </div>
    </div>
  );
}