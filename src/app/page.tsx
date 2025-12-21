'use client';
import { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import LanguageSelector from '@/components/LanguageSelector';
import MainScreen from '@/components/MainScreen';
import InfoScreen from '@/components/InfoScreen';
import ProfileScreen from '@/components/ProfileScreen';

export default function Home() {
  const { lang, setLang } = useLanguage();
  const [activeTab, setActiveTab] = useState('main');
  const [mounted, setMounted] = useState(false);
  const [userPhoto, setUserPhoto] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);

    if (typeof window !== 'undefined' && (window as any).Telegram?.WebApp) {
      const tg = (window as any).Telegram.WebApp;
      tg.ready();
      const user = tg.initDataUnsafe?.user;
      if (user?.photo_url) {
        setUserPhoto(user.photo_url);
      }
    }
  }, []);

  // Ждем монтирования, чтобы избежать ошибок гидратации
  if (!mounted) return <div className="bg-black h-dvh" />;

  // Если язык еще не выбран, показываем селектор
  if (!lang) {
    return (
      <LanguageSelector 
        onSelect={(l) => { 
          setLang(l); 
        }} 
      />
    );
  }

  return (
    <div className="flex flex-col h-dvh bg-black text-white overflow-hidden font-sans">
      {/* Контентная часть */}
      <div className="flex-1 overflow-y-auto pb-32 p-4">
        {activeTab === 'main' && <MainScreen />}
        {activeTab === 'info' && <InfoScreen />}
        {activeTab === 'profile' && (
          <ProfileScreen 
            onLanguageChange={() => {
              // Просто переключаем язык по кругу без перезагрузки страницы
              const nextLang = lang === 'en' ? 'ru' : 'en';
              setLang(nextLang);
            }} 
          />
        )}
      </div>

      {/* Нижний Таб-бар */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[85%] bg-transparent backdrop-blur-xl rounded-full flex justify-around items-center py-4 px-4 z-50">
        
        {/* Кнопка Main */}
        <button 
          onClick={() => setActiveTab('main')} 
          className="transition-all active:scale-90"
        >
          <img 
            src="/main.png" 
            alt="Main" 
            className={`w-7 h-7 object-contain transition-opacity duration-300 ${activeTab === 'main' ? 'opacity-100' : 'opacity-40'}`} 
          />
        </button>
        
        {/* Кнопка Info */}
        <button 
          onClick={() => setActiveTab('info')} 
          className="transition-all active:scale-90"
        >
          <img 
            src="/info.png" 
            alt="Info" 
            className={`w-7 h-7 object-contain transition-opacity duration-300 ${activeTab === 'info' ? 'opacity-100' : 'opacity-40'}`} 
          />
        </button>

        {/* Кнопка Profile */}
        <button 
          onClick={() => setActiveTab('profile')} 
          className="transition-all active:scale-90"
        >
          <div className={`w-8 h-8 rounded-full overflow-hidden border-2 transition-all duration-300 ${
            activeTab === 'profile' ? 'border-white opacity-100' : 'border-transparent opacity-40'
          }`}>
            {userPhoto ? (
              <img src={userPhoto} alt="User" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                <span className="text-[10px]">U</span>
              </div>
            )}
          </div>
        </button>
      </div>
    </div>
  );
}