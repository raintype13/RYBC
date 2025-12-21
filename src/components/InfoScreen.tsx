'use client';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/constants/translations';

export default function InfoScreen() {
  const { lang } = useLanguage();
  const t = translations[lang] || translations['en'];

  return (
    <div className="flex flex-col gap-6 w-full animate-in fade-in duration-500">
      <div className="bg-[#101010] rounded-4xl p-8 flex flex-col gap-6">
        {/* Логотип и заголовок */}
        <div className="flex flex-col items-center text-center">
          <img src="/FullVektorWHITE.png" alt="Logo" className="w-24 h-24 mb-4 object-contain" />
          <h2 className="text-2xl font-black tracking-tighter uppercase">{t.info_header}</h2>
        </div>

        {/* Основной текстовый блок */}
        <div className="flex flex-col gap-5 text-gray-400 text-sm leading-relaxed px-1">
          <p>{t.info_p1}</p>
          <p>{t.info_p2}</p>
          <p>{t.info_p3}</p>
          <p>{t.info_p4}</p>
        </div>

        {/* Линия-разделитель */}
        <div className="h-1px bg-gray-900/50 w-full" />

        {/* Контакты */}
        <div className="flex flex-col gap-4 px-1">
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-500 uppercase tracking-widest text-[10px]">Email</span>
            <span className="text-gray-200 font-medium">a78057477@gmail.com</span>
          </div>
        </div>
      </div>

      {/* Подпись */}
      <div className="text-center opacity-20 text-[10px] uppercase tracking-widest">
        App Version 1.0.4 beta
      </div>
    </div>
  );
}