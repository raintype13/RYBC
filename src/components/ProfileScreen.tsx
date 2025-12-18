'use client';
import { useEffect, useState } from 'react';
import { translations } from '@/constants/translations';

interface ProfileProps {
  lang: string;
  onLanguageChange: () => void;
}

export default function ProfileScreen({ lang, onLanguageChange }: ProfileProps) {
  const [user, setUser] = useState<any>(null);
  
  // Получаем нужные переводы. Если языка нет в списке, берем английский.
  const t = translations[lang] || translations['en'];

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const tg = (window as any).Telegram?.WebApp;
      if (tg) {
        tg.ready();
        setUser(tg.initDataUnsafe?.user || null);
      }
    }
  }, []);

  return (
    <div className="flex flex-col p-4 animate-in fade-in duration-500">
      {/* Секция профиля */}
      <div className="flex items-center gap-4 mb-8">
        <div className="w-16 h-16 rounded-full bg-[#1c1c1e] overflow-hidden border border-gray-800 flex items-center justify-center">
          {user?.photo_url ? (
            <img src={user.photo_url} alt="avatar" className="w-full h-full object-cover" />
          ) : (
            <div className="text-xl font-bold text-gray-400">
              {user?.first_name?.charAt(0) || 'U'}
            </div>
          )}
        </div>
        <div>
          <h2 className="text-xl font-bold uppercase">{user?.first_name || 'User'}</h2>
          <p className="text-gray-500 text-sm">@{user?.username || 'unknown'}</p>
        </div>
      </div>

      {/* Настройка языка */}
      <div className="mb-6">
        <p className="text-gray-400 text-sm mb-2 ml-1">{t.lang_label}</p>
        <button 
          onClick={onLanguageChange}
          className="w-full bg-[#1c1c1e] p-4 rounded-2xl flex justify-between items-center active:scale-[0.98] transition-transform border border-gray-900"
        >
          <span className="text-[17px]">{t.lang_name}</span>
          <span className="text-gray-500 text-xl">›</span>
        </button>
      </div>

      {/* Ранний доступ */}
      <div className="mb-6">
        <p className="text-gray-400 text-sm mb-2 ml-1 font-bold">{t.early_access_title}</p>
        <div className="w-full bg-[#0a0a0a] border border-dashed border-gray-800 p-6 rounded-2xl text-center">
          <p className="text-gray-500 text-sm whitespace-pre-line">
            {t.no_access}
          </p>
        </div>
      </div>

      {/* Сетка кнопок соцсетей */}
      <p className="text-gray-400 text-sm mb-3 ml-1 font-bold">{t.socials_title}</p>
      <div className="grid grid-cols-2 gap-3">
        {['Instagram', 'Telegram', 'X', 'TikTok', 'Threads', 'YouTube', 'Info Bot'].map((item) => (
          <button 
            key={item} 
            className="bg-white text-black font-bold py-3 rounded-xl text-sm active:scale-95 transition-transform"
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}