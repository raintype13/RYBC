'use client';
import { useState, useEffect } from 'react';
import LanguageSelector from '@/components/LanguageSelector';
import MainScreen from '@/components/MainScreen';
import InfoScreen from '@/components/InfoScreen';
import ProfileScreen from '@/components/ProfileScreen';

export default function Home() {
  const [lang, setLang] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('main');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('userLanguage');
    if (saved) setLang(saved);
    setMounted(true);
  }, []);

  if (!mounted) return <div className="bg-black h-dvh" />;

  if (!lang) {
    return (
      <LanguageSelector 
        onSelect={(l) => { 
          setLang(l); 
          localStorage.setItem('userLanguage', l); 
        }} 
      />
    );
  }

  return (
    <div className="flex flex-col h-dvh bg-black text-white overflow-hidden font-sans">
      <div className="flex-1 overflow-y-auto pb-24 p-4">
        {/* Передаем lang в каждый экран */}
        {activeTab === 'main' && <MainScreen lang={lang} />}
        {activeTab === 'info' && <InfoScreen lang={lang} />}
        {activeTab === 'profile' && (
          <ProfileScreen 
            lang={lang} 
            onLanguageChange={() => {
              setLang(null);
              localStorage.removeItem('userLanguage');
            }} 
          />
        )}
      </div>

      {/* Нижний Таб-бар */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] bg-[#1c1c1e]/80 backdrop-blur-md rounded-3xl border border-gray-800 flex justify-around py-3 px-2 z-50">
        <button onClick={() => setActiveTab('main')} className={`flex flex-col items-center transition-colors ${activeTab === 'main' ? 'text-white' : 'text-gray-500'}`}>
          <span className="text-xs font-bold">$RYBC</span>
        </button>
        <button onClick={() => setActiveTab('info')} className={`flex flex-col items-center transition-colors ${activeTab === 'info' ? 'text-white' : 'text-gray-500'}`}>
           <span className="w-5 h-5 flex items-center justify-center border-2 border-current rounded-md italic font-serif">i</span>
        </button>
        <button onClick={() => setActiveTab('profile')} className={`flex flex-col items-center transition-colors ${activeTab === 'profile' ? 'text-white' : 'text-gray-500'}`}>
          <div className="w-5 h-5 rounded-full border-2 border-current" />
        </button>
      </div>
    </div>
  );
}