'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import Countdown from './Countdown';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/constants/translations';

export default function MainScreen() {
  const { lang } = useLanguage();
  const t = translations[lang] || translations['en'];

  const socials = [
    { name: 'RYB Community', link: '#' },
    { name: 'RYB Chat', link: '#' },
    { name: 'X (Twitter)', link: '#' },
    { name: 'TikTok', link: '#' },
    { name: 'Instagram', link: '#' },
    { name: 'YouTube', link: '#' },
  ];

  return (
    <div className="flex flex-col gap-6 w-full animate-in fade-in duration-500">
      {/* Слайдер (Swiper) */}
      <div className="w-full h-52 relative">
        <Swiper
          modules={[Pagination]}
          pagination={{ clickable: true }}
          className="h-full rounded-4xl bg-[#101010]"
        >
          {/* Первый слайд: Таймер */}
          <SwiperSlide className="flex flex-col items-center justify-center p-8 text-center relative">
            <div className="absolute top-6 right-8 flex items-center gap-2">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              <span className="text-[10px] text-gray-500 uppercase tracking-widest font-black">Live</span>
            </div>

            <p className="text-[11px] text-gray-500 mb-8 uppercase tracking-[0.4em] font-black opacity-80">
              {t.main_title}
            </p>
            
            <div className="flex items-center justify-center w-full mb-4 scale-110"> 
              <Countdown />
            </div>

            <div className="flex justify-center gap-6 w-full mt-4 opacity-30">
              <span className="text-[8px] uppercase tracking-[0.2em] font-black w-10">Days</span>
              <span className="text-[8px] uppercase tracking-[0.2em] font-black w-10">Hrs</span>
              <span className="text-[8px] uppercase tracking-[0.2em] font-black w-10">Min</span>
              <span className="text-[8px] uppercase tracking-[0.2em] font-black w-10">Sec</span>
            </div>
          </SwiperSlide>

          {/* Второй слайд: Дата выхода */}
          <SwiperSlide className="flex flex-col items-center justify-center p-8 text-center">
            <div className="relative w-full py-6 px-4 rounded-3xl bg-[#151515]/50 border border-white/5 shadow-2xl overflow-hidden">
              <div className="absolute -top-10 -right-10 w-20 h-20 bg-[#00ff88] opacity-5 blur-[30px]" />
              
              <p className="text-[9px] text-gray-500 mb-5 uppercase tracking-[0.3em] font-black">
                {t.launch_date}
              </p>
              
              <div className="flex flex-col items-center gap-1 mb-5">
                <span className="text-4xl font-black tracking-tighter text-white">
                  12.01.2026
                </span>
                <div className="h-0.5 w-10 bg-[#00ff88] rounded-full mt-1 shadow-[0_0_8px_#00ff88]" />
              </div>

              <div className="flex justify-between items-center w-full px-2 mt-4">
                <div className="flex flex-col items-start">
                  <span className="text-[8px] text-gray-600 uppercase tracking-widest mb-0.5">{t.platform}</span>
                  <span className="text-[10px] font-bold text-gray-300">pump.fun</span>
                </div>
                <div className="h-6 w-px bg-white/5" />
                <div className="flex flex-col items-end">
                  <span className="text-[8px] text-gray-600 uppercase tracking-widest mb-0.5">{t.status}</span>
                  <span className="text-[10px] font-bold text-[#00ff88]">{t.confirmed}</span>
                </div>
              </div>

              <div className="w-full h-0.75 bg-black rounded-full mt-6 overflow-hidden">
                <div className="w-[35%] h-full bg-linear-to-r from-[#00ff88] to-emerald-500" />
              </div>
            </div>
            
            <span className="text-gray-500 font-bold mt-4 tracking-widest text-[10px] uppercase opacity-50">
              $RYBC Ecosystem
            </span>
          </SwiperSlide>

          {/* Третий слайд: Биржа */}
          <SwiperSlide className="flex flex-col items-center justify-center p-6 text-center">
            <div className="flex flex-col items-center gap-2">
              <div className="flex items-center gap-4 mb-2">
                <img src="/info.png" alt="Logo" className="w-16 h-16 object-contain" />
                <div className="flex flex-col items-start text-left">
                  <span className="text-2xl font-black tracking-tighter text-white leading-none">$RYBC</span>
                  <span className="text-[11px] text-gray-500 uppercase tracking-widest font-bold mt-1">RYB Coin</span>
                </div>
              </div>

              <div className="flex flex-col items-center">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-black tracking-tighter text-[#00ff88]">$0.00426</span>
                  <span className="text-[10px] font-bold text-[#00ff88] bg-[#00ff88]/10 px-2 py-0.5 rounded-md">+12.4%</span>
                </div>
                
                <div className="flex gap-4 mt-3">
                  <div className="flex flex-col items-center">
                    <span className="text-[9px] text-gray-500 uppercase tracking-widest">Market Cap</span>
                    <span className="text-sm font-bold text-gray-200 tracking-tight">$426K</span>
                  </div>
                  <div className="w-px h-8 bg-gray-900/50" />
                  <div className="flex flex-col items-center">
                    <span className="text-[9px] text-gray-500 uppercase tracking-widest">Liquidity</span>
                    <span className="text-sm font-bold text-gray-200 tracking-tight">$84.2K</span>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>

      {/* Плашка заданий */}
      <div className="bg-[#101010] rounded-4xl p-6 flex flex-col gap-6">
        <h2 className="text-xl font-bold ml-1 tracking-tight">{t.get_access}</h2>
        
        <div className="flex flex-col">
          {socials.map((social) => (
            <div key={social.name} className="flex flex-col">
              <div className="flex justify-between items-center py-4 px-1">
                <span className="text-gray-200 font-semibold text-lg">{social.name}</span>
                <button className="bg-white text-black px-6 py-1.5 rounded-full font-bold text-sm active:scale-95 transition-transform">GO</button>
              </div>
              <div className="h-px bg-gray-900/30 w-full" />
            </div>
          ))}

          {/* Рефералы */}
          <div className="flex justify-between items-center py-5 px-1">
            <div className="flex flex-col">
              <span className="text-gray-200 font-semibold text-lg">{t.ref_title}</span>
              <span className="text-[11px] text-gray-500 uppercase tracking-widest mt-0.5 font-medium">{t.ref_subtitle}</span>
            </div>
            <span className="text-white font-bold bg-[#1a1a1a] px-4 py-1.5 rounded-xl text-lg">0 / 3</span>
          </div>
        </div>

        <button className="w-full bg-[#1a1a1a] text-gray-600 font-black py-5 rounded-2xl mt-2 uppercase tracking-[0.2em] text-sm cursor-not-allowed">
          {t.check_btn}
        </button>
      </div>
    </div>
  );
}