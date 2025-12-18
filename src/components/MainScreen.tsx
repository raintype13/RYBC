'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import Countdown from './Countdown';
import { translations } from '@/constants/translations';

// Добавляем описание свойств
interface MainProps {
  lang: string;
}

export default function MainScreen({ lang }: MainProps) {
  const t = translations[lang] || translations['en'];

  return (
    <div className="flex flex-col gap-6 w-full animate-in fade-in duration-500">
      <div className="w-full h-48 relative">
        <Swiper
          modules={[Pagination]}
          pagination={{ clickable: true }}
          className="h-full rounded-2xl bg-[#1c1c1e] border border-gray-800"
        >
          {[1, 2, 3].map((i) => (
            <SwiperSlide key={i} className="flex flex-col items-center justify-center p-6 text-center">
              <p className="text-sm text-gray-400 mb-2">{t.main_title}</p>
              <Countdown />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="flex flex-col gap-3">
        <h2 className="text-lg font-semibold ml-1">{t.get_access}</h2>
        <div className="flex flex-col gap-2">
           {['Instagram', 'X (Twitter)', 'Telegram'].map((social) => (
             <div key={social} className="bg-[#1c1c1e] p-4 rounded-xl flex justify-between items-center border border-gray-900">
                <span>{social}</span>
                <button className="bg-white text-black px-6 py-1 rounded-full font-bold text-sm active:scale-95 transition-transform">GO</button>
             </div>
           ))}
        </div>
      </div>

      <button className="w-full bg-[#1c1c1e] text-gray-500 font-bold py-4 rounded-2xl mt-4 cursor-not-allowed border border-gray-900">
        {t.check_btn}
      </button>
    </div>
  );
}