'use client';
import { translations } from '@/constants/translations';

interface InfoProps {
  lang: string;
}

export default function InfoScreen({ lang }: InfoProps) {
  const t = translations[lang] || translations['en'];

  return (
    <div className="flex flex-col items-center p-4 animate-in fade-in duration-500 text-left">
      <img src="/FullVektorWHITE.png" alt="Logo" className="w-32 mb-8 mt-4" />
      
      <div className="w-full">
        <h2 className="text-xl font-bold mb-4">{t.info_header}</h2>
        <p className="text-gray-400 text-sm leading-relaxed mb-6 whitespace-pre-line">
          $RYBC (RYB Coin) — это мем-токен от крипто сообщества RYB Community, 
          который планируется к запуску на платформе pump.fun. 
          $RYBC создается как экспериментальный токен...
        </p>
        
        <h2 className="text-lg font-bold mb-2">Контакты</h2>
        <p className="text-gray-400 text-sm">a78057477@gmail.com</p>
        <p className="text-gray-400 text-sm">@ILAX-XD</p>
      </div>
    </div>
  );
}