import { useState, useEffect } from 'react';
import {
  Volume2,
  VolumeX,
  Share2,
  Check,
  Sparkles,
  Compass,
} from 'lucide-react';
import { FuturisticCanvas } from './components/FuturisticCanvas';
import { FuturisticHUD } from './components/FuturisticHUD';
import { CountdownClock } from './components/CountdownClock';
import { sound } from './utils/audio';

// Requirement 3: Import local media via ES module import so Vite bundles into dist/assets/
import symposiumBadge from './assets/images/elevate_symposium_hero_1793695336035.jpg';

export default function App() {
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Sync audio state with utility
  const toggleAudio = () => {
    const newState = sound.toggle();
    setAudioEnabled(newState);
  };

  const handleShare = async () => {
    sound.playBeep(800, 'sine', 0.08, 0.04);
    const url = window.location.href;
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(url);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 3000);
    }
  };

  useEffect(() => {
    const handleFirstClick = () => {
      window.removeEventListener('click', handleFirstClick);
    };
    window.addEventListener('click', handleFirstClick);
    return () => window.removeEventListener('click', handleFirstClick);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#030712] text-slate-100 scanline-effect selection:bg-cyan-500 selection:text-slate-950 flex flex-col justify-between">
      {/* Dynamic 60fps Interactive Particle & Neural Canvas */}
      <FuturisticCanvas />

      {/* Top Bar: Brand, Audio Toggle, and Share */}
      <header className="relative z-50 flex items-center justify-between gap-8 px-4 sm:px-8 py-4 border-b border-cyan-500/15 bg-slate-950/80 backdrop-blur-xl">
        {/* Brand with bundled emblem */}
        <div className="flex items-center gap-2.5">
          <img
            src={symposiumBadge}
            alt="Elevate 2026 Symposium Emblem"
            className="w-7 h-7 rounded-full object-cover border border-cyan-400/50 shadow-[0_0_10px_#22d3ee]"
          />
          <span className="text-base sm:text-lg font-bold font-display tracking-tight text-white whitespace-nowrap">
            Elevate 2026
          </span>
        </div>

        {/* Top Controls: Audio & Share */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={toggleAudio}
            title={audioEnabled ? 'Mute futuristic audio' : 'Enable futuristic sound effects'}
            className={`p-2 rounded-lg border text-xs transition-all cursor-pointer flex items-center gap-1.5 ${
              audioEnabled
                ? 'border-cyan-400 bg-cyan-950/70 text-cyan-300 shadow-[0_0_12px_rgba(6,182,212,0.3)]'
                : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:text-slate-200'
            }`}
          >
            {audioEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            <span className="hidden sm:inline font-mono text-[11px]">
              {audioEnabled ? 'AUDIO ON' : 'AUDIO OFF'}
            </span>
          </button>

          <button
            onClick={handleShare}
            className="p-2 rounded-lg border border-slate-800 bg-slate-900/60 hover:bg-slate-800 text-slate-300 transition-all cursor-pointer flex items-center gap-1.5 text-xs"
            title="Share waiting portal link"
          >
            {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
            <span className="hidden sm:inline font-mono text-[11px]">
              {copiedLink ? 'COPIED' : 'SHARE'}
            </span>
          </button>
        </div>
      </header>

      {/* Main Waiting Page Hero Container */}
      <main className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 my-auto text-center w-full">
        {/* Symposium Overline */}
        <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-cyan-400/90 mb-4 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/20">
          <Compass className="w-3.5 h-3.5 animate-spin-medium text-cyan-400" />
          <span>2026 elevate educator symposium</span>
        </div>

        {/* Primary Workshop Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold font-display text-white tracking-tight leading-[1.15] max-w-4xl mx-auto mb-4 text-balance drop-shadow-[0_2px_15px_rgba(0,0,0,0.8)]">
          AI, workforce capability and implications for education and skill development
        </h1>

        {/* Keynote Presenter */}
        <div className="text-lg sm:text-xl font-medium text-slate-300 mb-6 flex items-center justify-center gap-2">
          <span>Presented by</span>
          <span className="font-semibold text-cyan-300 border-b border-cyan-400/40 pb-0.5">
            Dr Afshin Tanouri
          </span>
        </div>

        {/* Prominent Activity Notice Banner */}
        <div className="max-w-2xl mx-auto mb-10 p-4 rounded-xl cyber-card-active border-cyan-400/40 flex items-center justify-center gap-3 shadow-[0_0_25px_rgba(6,182,212,0.18)]">
          <Sparkles className="w-5 h-5 text-cyan-400 shrink-0 animate-pulse" />
          <p className="text-sm sm:text-base font-semibold text-cyan-100 tracking-wide">
            An activity will be launched on this page during the workshop.
          </p>
        </div>

        {/* Futuristic Moving HUD with Concentric Rotating Calibration Rings & Countdown Clock */}
        <FuturisticHUD>
          <CountdownClock />
        </FuturisticHUD>
      </main>

      {/* Bottom spacer ensuring clean, balanced full-screen presentation */}
      <div className="h-8 relative z-10" />
    </div>
  );
}
