'use client';
import { useState } from 'react';
import { languages } from '@/constants/languages';

interface Props {
  onSelect: (id: string) => void;
}

export default function LanguageSelector({ onSelect }: Props) {
  // Устанавливаем английский по умолчанию, чтобы кнопка сразу была "Continue"
  const [selected, setSelected] = useState('en');

  // Словарь переводов для кнопки "Продолжить"
  const buttonTranslations: Record<string, string> = {
    en: "Continue",
    ru: "Продолжить",
    hi: "जारी रखें",
    pt: "Continuar",
    id: "Lanjutkan",
    uz: "Davom etish",
    kz: "Жалғастыру",
    es: "Continuar",
    tr: "Devam Et",
    ar: "متابعة"
  };

  return (
    <div className="flex flex-col h-dvh bg-black text-white p-6 justify-between font-sans">
      <div className="flex flex-col items-center mt-4 w-full">
        <h1 className="text-xl font-bold mb-6">Choose your language</h1>

        <div className="w-full bg-[#1c1c1e] rounded-2xl overflow-y-auto max-h-[60vh] custom-scrollbar border border-gray-900">
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

      <div className="flex flex-col gap-4 items-center w-full mb-4">
        {/* Кнопка теперь динамически меняет текст в зависимости от выбранного языка */}
        <button
          onClick={() => onSelect(selected)}
          className="w-full bg-white text-black font-bold py-4 rounded-2xl text-lg active:scale-95 transition-transform"
        >
          {buttonTranslations[selected] || "Continue"}
        </button>
        <span className="text-gray-600 text-xs">@rybc_bot</span>
      </div>
    </div>
  );
}