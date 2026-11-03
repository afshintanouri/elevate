import { useEffect, useState, useMemo } from 'react';
import { Clock } from 'lucide-react';

interface TimeRemaining {
  total: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  centiseconds: number;
}

export function CountdownClock() {
  // Target: November 13, 2026 at 11:00 AM
  const targetDate = useMemo(() => {
    return new Date('2026-11-13T11:00:00');
  }, []);

  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining>({
    total: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    centiseconds: 0,
  });

  const [hasReachedZero, setHasReachedZero] = useState(false);

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate.getTime() - now;

      if (difference <= 0) {
        setTimeRemaining({
          total: 0,
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          centiseconds: 0,
        });
        if (!hasReachedZero) {
          setHasReachedZero(true);
        }
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);
        const centiseconds = Math.floor((difference % 1000) / 10);

        setTimeRemaining({
          total: difference,
          days,
          hours,
          minutes,
          seconds,
          centiseconds,
        });
      }
    };

    updateCountdown();
    // High-frequency interval for smooth sci-fi ms tick
    const timer = setInterval(updateCountdown, 43);

    return () => clearInterval(timer);
  }, [targetDate, hasReachedZero]);

  const format2Digits = (num: number) => num.toString().padStart(2, '0');

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col items-center">
      {/* Telemetry Status Strip */}
      <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-mono text-cyan-400 mb-6 tracking-wider">
        <span className="text-cyan-300 font-semibold flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 animate-pulse text-cyan-400" />
          SESSION LAUNCH COUNTDOWN
        </span>
        <span className="text-slate-600" aria-hidden="true">/</span>
        <span>TARGET: 13 NOV 2026 · 11:00 AM</span>
        <span className="text-slate-600" aria-hidden="true">/</span>
        <span className="text-slate-400">STANDBY FREQUENCY LOCKED</span>
      </div>

      {/* Main Digital Chronometer Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 md:gap-6 w-full max-w-3xl">
        {/* Days */}
        <div className="relative group cyber-card rounded-xl p-4 sm:p-6 text-center transition-all duration-300 hover:border-cyan-500/40">
          <div className="text-3xl sm:text-5xl md:text-6xl font-extrabold font-mono text-white tracking-tight tabular-nums drop-shadow-[0_0_15px_rgba(56,189,248,0.35)]">
            {format2Digits(timeRemaining.days)}
          </div>
          <div className="text-[11px] sm:text-xs font-mono text-cyan-400/80 uppercase tracking-widest mt-1">
            Days
          </div>
          <div className="absolute top-1 left-2 text-[9px] font-mono text-slate-500">
            D_01
          </div>
        </div>

        {/* Hours */}
        <div className="relative group cyber-card rounded-xl p-4 sm:p-6 text-center transition-all duration-300 hover:border-cyan-500/40">
          <div className="text-3xl sm:text-5xl md:text-6xl font-extrabold font-mono text-white tracking-tight tabular-nums drop-shadow-[0_0_15px_rgba(56,189,248,0.35)]">
            {format2Digits(timeRemaining.hours)}
          </div>
          <div className="text-[11px] sm:text-xs font-mono text-cyan-400/80 uppercase tracking-widest mt-1">
            Hours
          </div>
          <div className="absolute top-1 left-2 text-[9px] font-mono text-slate-500">
            H_02
          </div>
        </div>

        {/* Minutes */}
        <div className="relative group cyber-card rounded-xl p-4 sm:p-6 text-center transition-all duration-300 hover:border-cyan-500/40">
          <div className="text-3xl sm:text-5xl md:text-6xl font-extrabold font-mono text-white tracking-tight tabular-nums drop-shadow-[0_0_15px_rgba(56,189,248,0.35)]">
            {format2Digits(timeRemaining.minutes)}
          </div>
          <div className="text-[11px] sm:text-xs font-mono text-cyan-400/80 uppercase tracking-widest mt-1">
            Minutes
          </div>
          <div className="absolute top-1 left-2 text-[9px] font-mono text-slate-500">
            M_03
          </div>
        </div>

        {/* Seconds & Milliseconds */}
        <div className="relative group cyber-card-active rounded-xl p-4 sm:p-6 text-center transition-all duration-300 border-cyan-400/50">
          <div className="flex items-baseline justify-center gap-1">
            <span className="text-3xl sm:text-5xl md:text-6xl font-extrabold font-mono text-cyan-300 tracking-tight tabular-nums drop-shadow-[0_0_20px_rgba(6,182,212,0.6)]">
              {format2Digits(timeRemaining.seconds)}
            </span>
            <span className="text-base sm:text-xl font-mono text-cyan-500/80 tabular-nums w-8 text-left">
              .{format2Digits(timeRemaining.centiseconds)}
            </span>
          </div>
          <div className="text-[11px] sm:text-xs font-mono text-cyan-300 uppercase tracking-widest mt-1">
            Seconds
          </div>
          <div className="absolute top-1 left-2 text-[9px] font-mono text-cyan-500">
            LIVE_SEC
          </div>
        </div>
      </div>
    </div>
  );
}
