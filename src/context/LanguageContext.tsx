'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';

type LanguageContextType = {
  lang: string;
  setLang: (lang: string) => void;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<string>('en');

  useEffect(() => {
    const saved = localStorage.getItem('userLanguage');
    if (saved) setLangState(saved);
  }, []);

  const setLang = (newLang: string) => {
    setLangState(newLang);
    localStorage.setItem('userLanguage', newLang);
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
};