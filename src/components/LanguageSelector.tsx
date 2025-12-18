'use client';
import React, { useState } from 'react';
import { languages } from '@/constants/languages';

interface Props {
  onSelect: (lang: string) => void;
}

export default function LanguageSelector({ onSelect }: Props) {
  // По умолчанию ставим английский или русский
  const [selected, setSelected] = useState('ru');

  return (
    <div className="flex flex-col h-dvh bg-black text-white p-6 justify-between font-sans">
      <div className="flex flex-col items-center mt-4 w-full overflow-hidden">
        <h1 className="text-xl font-bold mb-6">Choose your language</h1>
        
        {/* Контейнер со скроллом, если языков станет много */}
        <div className="w-full bg-[#1c1c1e] rounded-2xl overflow-y-auto max-h-[60vh] custom-scrollbar">
          {languages.map((lang) => (
            <button
              key={lang.id}
              onClick={() => setSelected(lang.id)}
              className="w-full flex items-center justify-between px-5 py-4 border-b border-[#2c2c2e] last:border-none active:bg-[#2c2c2e] transition-colors"
            >
              <span className="text-[17px] font-medium">{lang.label}</span>
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                selected === lang.id ? 'border-white' : 'border-gray-600'
              }`}>
                {selected === lang.id && (
                  <div className="w-3 h-3 bg-white rounded-full" />
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Кнопка снизу */}
      <div className="pb-4">
        <button
          onClick={() => onSelect(selected)}
          className="w-full bg-white text-black font-bold py-4 rounded-2xl text-[17px] active:scale-[0.98] transition-transform shadow-lg"
        >
          Продолжить
        </button>
      </div>
    </div>
  );
}