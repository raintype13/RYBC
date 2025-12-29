'use client';
import { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/constants/translations';
import MainScreen from '@/components/MainScreen';
import InfoScreen from '@/components/InfoScreen';
import ProfileScreen from '@/components/ProfileScreen';

export default function Home() {
  const { lang, setLang } = useLanguage();
  const [activeTab, setActiveTab] = useState('main');
  const [mounted, setMounted] = useState(false);
  const [userPhoto, setUserPhoto] = useState<string | null>(null);

  // Временное состояние для выбора языка на первом экране
  const [tempLang, setTempLang] = useState('en');

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

  const handleLanguageCycle = () => {
    const languages = Object.keys(translations);
    // Используем tempLang если основной lang еще не установлен
    const current = lang || tempLang;
    const currentIndex = languages.indexOf(current);
    const nextIndex = (currentIndex + 1) % languages.length;
    
    if (!lang) {
      setTempLang(languages[nextIndex]);
    } else {
      setLang(languages[nextIndex]);
    }
  };

  if (!mounted) return <div className="bg-black h-dvh" />;

  // ЭКРАН ПЕРВОГО ВХОДА
  if (!lang) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-black p-6 animate-in fade-in zoom-in duration-700">
        <div className="w-full max-w-xs flex flex-col items-center">
          <img src="/FullVektorWHITE.png" alt="Logo" className="w-32 h-32 object-contain mb-8 opacity-80" />
          
          <div className="text-center mb-10">
            <h1 className="text-2xl font-black uppercase tracking-tighter text-white mb-2">
              Choose your language
            </h1>
            <p className="text-gray-500 text-[10px] tracking-[0.2em] uppercase font-bold">
              Select to continue
            </p>
          </div>

          <button 
            onClick={handleLanguageCycle}
            className="w-full flex justify-between items-center bg-[#101010] p-6 rounded-3xl border border-gray-900 active:scale-[0.98] transition-all shadow-2xl"
          >
            <span className="text-gray-400 font-medium">Language</span>
            <div className="flex items-center gap-3">
              <span className="text-white font-bold text-lg">
                {translations[tempLang]?.lang_name || 'English'}
              </span>
              <div className="bg-white/10 p-1 rounded-full">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </button>

          <button 
            onClick={() => setLang(tempLang)} 
            className="mt-12 w-full bg-white text-black font-black py-4 rounded-2xl uppercase tracking-widest text-sm active:scale-95 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)]"
          >
            Continue
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-dvh bg-black text-white overflow-hidden font-sans">
      <div className="flex-1 overflow-y-auto pb-32 p-4">
        {activeTab === 'main' && <MainScreen />}
        {activeTab === 'info' && <InfoScreen />}
        {activeTab === 'profile' && (
          <ProfileScreen onLanguageChange={handleLanguageCycle} />
        )}
      </div>

      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[85%] bg-black/20 backdrop-blur-2xl border border-white/5 rounded-full flex justify-around items-center py-4 px-4 z-50 shadow-2xl">
        <button onClick={() => setActiveTab('main')} className="transition-all active:scale-90">
          <img 
            src="/main.png" 
            alt="Main" 
            className={`w-7 h-7 object-contain transition-opacity duration-300 ${activeTab === 'main' ? 'opacity-100' : 'opacity-30'}`} 
          />
        </button>
        
        <button onClick={() => setActiveTab('info')} className="transition-all active:scale-90">
          <img 
            src="/info.png" 
            alt="Info" 
            className={`w-7 h-7 object-contain transition-opacity duration-300 ${activeTab === 'info' ? 'opacity-100' : 'opacity-30'}`} 
          />
        </button>

        <button onClick={() => setActiveTab('profile')} className="transition-all active:scale-90">
          <div className={`w-8 h-8 rounded-full overflow-hidden border-2 transition-all duration-300 ${
            activeTab === 'profile' ? 'border-white opacity-100' : 'border-transparent opacity-30'
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