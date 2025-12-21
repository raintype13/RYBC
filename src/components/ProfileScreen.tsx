'use client';
import { useEffect, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/constants/translations';

interface ProfileProps {
  onLanguageChange: () => void;
}

export default function ProfileScreen({ onLanguageChange }: ProfileProps) {
  const { lang } = useLanguage();
  const t = translations[lang] || translations['en'];
  const [user, setUser] = useState<{first_name: string; username?: string; photo_url?: string} | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).Telegram?.WebApp) {
      const tg = (window as any).Telegram.WebApp;
      setUser(tg.initDataUnsafe?.user || null);
    }
  }, []);

  return (
    <div className="flex flex-col gap-6 w-full animate-in fade-in duration-500">
      {/* Основная карточка профиля */}
      <div className="bg-[#101010] rounded-4xl p-8 flex flex-col items-center text-center relative overflow-hidden">
        {/* Аватарка */}
        <div className="relative mb-6">
          <div className="w-24 h-24 bg-[#1a1a1a] rounded-full flex items-center justify-center border-2 border-gray-800 overflow-hidden shadow-2xl">
            {user?.photo_url ? (
              <img src={user.photo_url} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <span className="text-3xl font-black text-white">{user?.first_name?.charAt(0) || 'U'}</span>
            )}
          </div>
          <div className="absolute bottom-1 right-1 w-6 h-6 bg-green-500 border-4 border-[#101010] rounded-full"></div>
        </div>
        
        {/* Имя и Username */}
        <h2 className="text-2xl font-bold mb-1 tracking-tight">
          {user?.first_name || 'User'}
        </h2>
        <p className="text-gray-500 text-sm mb-8 font-medium">@{user?.username || 'rybc_user'}</p>

        {/* Сетка со статистикой (вернул элементы) */}
        <div className="grid grid-cols-2 gap-4 w-full mb-8">
          <div className="bg-black/40 rounded-2xl p-4 border border-gray-900/50">
            <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Status</p>
            <p className="text-white font-bold">Early Adopter</p>
          </div>
          <div className="bg-black/40 rounded-2xl p-4 border border-gray-900/50">
            <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Rank</p>
            <p className="text-white font-bold">0</p>
          </div>
        </div>

        <div className="w-full h-1px bg-gray-900/50 mb-8" />

        {/* Настройки (Выбор языка) */}
        <div className="w-full flex flex-col gap-3">
          <p className="text-left text-[10px] text-gray-500 uppercase tracking-[0.2em] ml-2 mb-1">Settings</p>
          <button 
            onClick={onLanguageChange}
            className="w-full flex justify-between items-center bg-[#1a1a1a] p-5 rounded-2xl active:scale-[0.98] transition-all hover:bg-[#222]"
          >
            <div className="flex items-center gap-3">
              <span className="text-gray-400 font-medium">{t.lang_label}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-white font-bold">
                {translations[lang]?.lang_name || 'English'}
              </span>
              <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </button>
        </div>

        {/* Футер карточки */}
        <div className="mt-8">
           <img src="/FullVektorWHITE.png" alt="RYBC" className="h-20 opacity-20 mx-auto" />
        </div>
      </div>

      {/* Кнопка выхода или доп. информации */}
      <div className="text-center opacity-30 text-[10px] uppercase tracking-widest">
        App Version 1.0.4 beta
      </div>
    </div>
  );
}