'use client';
import { useState, useEffect } from 'react';

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState({ dd: '00', hh: '00', mm: '00', ss: '00' });

  useEffect(() => {
    const targetDate = new Date("2025-12-31T23:59:59").getTime(); // Установи свою дату

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      const dd = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hh = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const mm = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const ss = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({
        dd: String(dd).padStart(2, '0'),
        hh: String(hh).padStart(2, '0'),
        mm: String(mm).padStart(2, '0'),
        ss: String(ss).padStart(2, '0'),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="text-[32px] font-bold tracking-widest flex gap-1">
      {timeLeft.dd}:{timeLeft.hh}:{timeLeft.mm}:{timeLeft.ss}
    </div>
  );
}