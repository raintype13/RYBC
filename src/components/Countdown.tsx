'use client';
import { useState, useEffect } from 'react';

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: '00', hours: '00', minutes: '00', seconds: '00'
  });

  useEffect(() => {
    // Укажи здесь свою целевую дату
    const target = new Date('2026-01-12T12:00:00Z').getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = target - now;

      if (distance < 0) {
        clearInterval(interval);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)).toString().padStart(2, '0'),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().padStart(2, '0'),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0'),
        seconds: Math.floor((distance % (1000 * 60)) / 1000).toString().padStart(2, '0'),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Стили для цифр (как на 2 и 3 экране)
  const digitStyle = "text-4xl font-black tracking-tighter text-white";
  const colonStyle = "text-2xl font-black text-gray-700 mx-0.5 mb-1"; // mx-0.5 сужает расстояние

  return (
    <div className="flex items-end justify-center">
      <div className="flex flex-col items-center">
        <span className={digitStyle}>{timeLeft.days}</span>
      </div>
      <span className={colonStyle}>:</span>
      <div className="flex flex-col items-center">
        <span className={digitStyle}>{timeLeft.hours}</span>
      </div>
      <span className={colonStyle}>:</span>
      <div className="flex flex-col items-center">
        <span className={digitStyle}>{timeLeft.minutes}</span>
      </div>
      <span className={colonStyle}>:</span>
      <div className="flex flex-col items-center">
        <span className={digitStyle}>{timeLeft.seconds}</span>
      </div>
    </div>
  );
}