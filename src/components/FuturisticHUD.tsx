interface FuturisticHUDProps {
  children?: React.ReactNode;
}

export function FuturisticHUD({ children }: FuturisticHUDProps) {
  return (
    <div className="relative w-full flex items-center justify-center py-6">
      {/* Background Rotating Ring Matrix */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden opacity-60">
        {/* Outermost slow rotating segmented ring */}
        <div className="w-[360px] h-[360px] sm:w-[500px] sm:h-[500px] md:w-[620px] md:h-[620px] rounded-full border border-cyan-500/15 border-dashed animate-spin-slow" />

        {/* Reverse rotating concentric ring with tick marks */}
        <div className="absolute w-[310px] h-[310px] sm:w-[440px] sm:h-[440px] md:w-[540px] md:h-[540px] rounded-full border border-sky-400/20 animate-spin-reverse">
          <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-cyan-400/80 rounded-full shadow-[0_0_12px_#38bdf8]" />
          <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-sky-400/80 rounded-full shadow-[0_0_12px_#38bdf8]" />
          <div className="absolute top-1/2 -left-1.5 -translate-y-1/2 w-3 h-3 bg-cyan-400/80 rounded-full shadow-[0_0_12px_#38bdf8]" />
          <div className="absolute top-1/2 -right-1.5 -translate-y-1/2 w-3 h-3 bg-sky-400/80 rounded-full shadow-[0_0_12px_#38bdf8]" />
        </div>

        {/* Radar Sweep Plane */}
        <div className="absolute w-[260px] h-[260px] sm:w-[380px] sm:h-[380px] md:w-[480px] md:h-[480px] rounded-full overflow-hidden pointer-events-none">
          <div
            className="w-full h-full animate-radar origin-center"
            style={{
              background:
                'conic-gradient(from 0deg, transparent 0deg, transparent 290deg, rgba(6, 182, 212, 0.15) 360deg)',
            }}
          />
        </div>

        {/* Ambient radial glow core */}
        <div className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-cyan-500/10 blur-3xl animate-pulse-glow" />
      </div>

      {/* Foreground Content */}
      <div className="relative z-10 w-full">{children}</div>
    </div>
  );
}
