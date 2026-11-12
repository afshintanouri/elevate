import { useEffect, useState, useMemo } from 'react';
import { Clock, ArrowRight, Sparkles } from 'lucide-react';
import { sound } from '../utils/audio';

interface TimeRemaining {
  total: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  centiseconds: number;
}

const WORKSHOP_URL = 'https://afshintanouri.github.io/elevate-workshop/';

export function CountdownClock() {
  // Secret Test Mode: Add ?test=true to the URL to test a 5-second countdown!
  // Otherwise, locks to November 13, 2026 at 11:00 AM (Adelaide Time / ACDT +10:30)
  const targetDate = useMemo(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('test') === 'true') {
      return new Date(Date.now() + 5000); // 5 seconds from page load
    }
    return new Date('2026-11-13T11:00:00+10:30');
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
          sound.playBeep(880, 'sine', 0.15, 0.08);
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
          {hasReachedZero ? 'WORKSHOP PORTAL ACTIVE' : 'SESSION LAUNCH COUNTDOWN'}
        </span>
        <span className="text-slate-600" aria-hidden="true">/</span>
        <span>TARGET: 13 NOV 2026 · 11:00 AM</span>
        <span className="text-slate-600" aria-hidden="true">/</span>
        <span className={hasReachedZero ? 'text-emerald-400 font-semibold' : 'text-slate-400'}>
          {hasReachedZero ? 'STATUS: UNLOCKED' : 'STANDBY FREQUENCY LOCKED'}
        </span>
      </div>

      {/* Conditional View: Show Button when countdown hits zero, otherwise show Clock Grid */}
      {hasReachedZero ? (
        <div className="cyber-card-active rounded-2xl p-6 sm:p-10 w-full max-w-xl text-center border border-cyan-400/50 shadow-[0_0_35px_rgba(6,182,212,0.25)] flex flex-col items-center">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-emerald-400 mb-3 px-3 py-1 rounded-full bg-emerald-950/50 border border-emerald-500/30">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span>Live Interactive Activity Unlocked</span>
          </div>

          <p className="text-slate-300 text-sm sm:text-base mb-6 max-w-md">
            The countdown has concluded. Click below to enter the interactive workshop portal.
          </p>

          <a
            href={WORKSHOP_URL}
            onClick={() => sound.playBeep(1000, 'sine', 0.1, 0.05)}
            className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-display font-bold text-lg sm:text-xl text-slate-950 bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 shadow-[0_0_25px_rgba(6,182,212,0.5)] hover:shadow-[0_0_40px_rgba(6,182,212,0.8)] transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer"
          >
            <span>Enter Elevate Workshop</span>
            <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>
      ) : (
        /* Main Digital Chronometer Grid */
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
      )}
    </div>
  );
}
