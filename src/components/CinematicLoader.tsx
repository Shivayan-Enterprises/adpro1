import { useEffect, useState } from 'react';

interface CinematicLoaderProps {
  onComplete: () => void;
}

type Phase = 'doors-closed' | 'doors-opening' | 'logo-visible' | 'splitting' | 'revealing' | 'complete';

export const CinematicLoader = ({ onComplete }: CinematicLoaderProps) => {
  const [phase, setPhase] = useState<Phase>('doors-closed');
  const [doorProgress, setDoorProgress] = useState(0); // 0 = closed, 100 = fully open
  const [splitProgress, setSplitProgress] = useState(0); // 0 = together, 100 = fully split
  const [revealProgress, setRevealProgress] = useState(0); // 0 = loader visible, 100 = page visible

  useEffect(() => {
    // Phase 1: Show closed doors for 1.2 seconds
    const startTimer = setTimeout(() => {
      setPhase('doors-opening');
      
      // Animate doors opening over 2 seconds
      let start = Date.now();
      const animateDoors = () => {
        const elapsed = Date.now() - start;
        const progress = Math.min(elapsed / 2000, 1);
        // Ease out cubic for smooth deceleration
        const eased = 1 - Math.pow(1 - progress, 3);
        setDoorProgress(eased * 100);
        
        if (progress < 1) {
          requestAnimationFrame(animateDoors);
        } else {
          // Doors fully open, show logo for 1.5s
          setPhase('logo-visible');
          setTimeout(() => {
            setPhase('splitting');
            start = Date.now();
            animateSplit();
          }, 1500);
        }
      };
      requestAnimationFrame(animateDoors);
    }, 1200);

    const animateSplit = () => {
      let start = Date.now();
      const animate = () => {
        const elapsed = Date.now() - start;
        const progress = Math.min(elapsed / 1000, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setSplitProgress(eased * 100);
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          // Split complete, reveal main page
          setPhase('revealing');
          start = Date.now();
          animateReveal();
        }
      };
      requestAnimationFrame(animate);
    };

    const animateReveal = () => {
      let start = Date.now();
      const animate = () => {
        const elapsed = Date.now() - start;
        const progress = Math.min(elapsed / 800, 1);
        setRevealProgress(progress * 100);
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setPhase('complete');
          setTimeout(onComplete, 200);
        }
      };
      requestAnimationFrame(animate);
    };

    return () => clearTimeout(startTimer);
  }, [onComplete]);

  if (phase === 'complete') return null;

  const isDoorsClosed = phase === 'doors-closed';
  const showContent = !isDoorsClosed;

  return (
    <div 
      className="fixed inset-0 z-[100] overflow-hidden"
      style={{ opacity: phase === 'revealing' ? 1 - revealProgress / 100 : 1 }}
    >
      {/* Background with design - visible when doors open */}
      <div className="absolute inset-0 bg-[#080808] z-0">
        {showContent && (
          <>
            {/* Ambient glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-amber-500/[0.03] blur-[120px]" />
            
            {/* Grid pattern */}
            <div className="absolute inset-0 opacity-[0.03]" style={{
              backgroundImage: `
                linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px'
            }} />

            {/* Horizontal accent lines */}
            <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent -translate-y-32" />
            <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent translate-y-32" />
            
            {/* Corner decorations */}
            <div className="absolute top-10 left-10 w-20 h-20 border-l border-t border-amber-500/20" />
            <div className="absolute top-10 right-10 w-20 h-20 border-r border-t border-amber-500/20" />
            <div className="absolute bottom-10 left-10 w-20 h-20 border-l border-b border-amber-500/20" />
            <div className="absolute bottom-10 right-10 w-20 h-20 border-r border-b border-amber-500/20" />

            {/* Floating particles */}
            <div className="absolute top-[20%] left-[20%] w-1 h-1 bg-amber-400/50 rounded-full animate-pulse" />
            <div className="absolute top-[25%] right-[25%] w-1.5 h-1.5 bg-amber-400/40 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
            <div className="absolute bottom-[30%] left-[30%] w-1 h-1 bg-amber-400/50 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
            <div className="absolute bottom-[25%] right-[20%] w-1 h-1 bg-amber-400/40 rounded-full animate-pulse" style={{ animationDelay: '0.3s' }} />
          </>
        )}
      </div>

      {/* Logo and Tagline - Center (behind doors) */}
      {showContent && (
        <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
          <div className="text-center">
            {/* Logo - splits when in splitting phase */}
            <div className="flex items-center justify-center mb-6">
              <span 
                className="font-playfair text-7xl md:text-8xl lg:text-9xl font-bold text-white tracking-wider"
                style={{ 
                  transform: `translateX(-${splitProgress * 3}px)`,
                  opacity: phase === 'revealing' ? 1 - revealProgress / 100 : 1
                }}
              >
                AD
              </span>
              <span 
                className="font-playfair text-7xl md:text-8xl lg:text-9xl font-bold text-white tracking-wider"
                style={{ 
                  transform: `translateX(${splitProgress * 3}px)`,
                  opacity: phase === 'revealing' ? 1 - revealProgress / 100 : 1
                }}
              >
                PRO
              </span>
            </div>

            {/* Elegant divider */}
            <div 
              className="flex items-center justify-center gap-3 mb-6"
              style={{ 
                opacity: phase === 'splitting' || phase === 'revealing' ? 1 - splitProgress / 100 : 1 
              }}
            >
              <div className="w-12 h-px bg-gradient-to-r from-transparent to-amber-500/60" />
              <div className="w-1.5 h-1.5 rotate-45 border border-amber-500/60" />
              <div className="w-12 h-px bg-gradient-to-l from-transparent to-amber-500/60" />
            </div>

            {/* Tagline */}
            <div style={{ 
              opacity: phase === 'splitting' || phase === 'revealing' ? 1 - splitProgress / 100 : 1 
            }}>
              <p className="font-outfit text-base md:text-lg text-gray-400 tracking-[0.25em] uppercase mb-2">
                Marketing & Technology
              </p>
              <p className="font-outfit text-sm text-gray-500 tracking-[0.2em] uppercase">
                Excellence Delivered
              </p>
            </div>
          </div>
        </div>
      )}

      {/* LEFT DOOR */}
      <div
        className="absolute top-0 left-0 w-1/2 h-full z-30"
        style={{
          transform: `translateX(-${doorProgress}%)`,
        }}
      >
        {/* Door panel */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0c0c0c] via-[#111111] to-[#0a0a0a]">
          {/* Subtle texture */}
          <div className="absolute inset-0 opacity-[0.02]" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: '30px 30px'
          }} />
        </div>
        
        {/* Inner border accent */}
        <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-amber-600/50 to-transparent" />
        
        {/* Door handle */}
        <div className="absolute top-1/2 right-6 -translate-y-1/2">
          <div className="w-2 h-20 rounded-full bg-gradient-to-b from-amber-400/80 via-amber-500/60 to-amber-400/80 shadow-lg shadow-amber-500/20" />
        </div>

        {/* Corner accents */}
        <div className="absolute top-6 left-6 w-12 h-12 border-l border-t border-amber-500/20" />
        <div className="absolute bottom-6 left-6 w-12 h-12 border-l border-b border-amber-500/20" />
        
        {/* Panel decoration */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[70%] border border-white/[0.03] rounded-sm" />
      </div>

      {/* RIGHT DOOR */}
      <div
        className="absolute top-0 right-0 w-1/2 h-full z-30"
        style={{
          transform: `translateX(${doorProgress}%)`,
        }}
      >
        {/* Door panel */}
        <div className="absolute inset-0 bg-gradient-to-l from-[#0c0c0c] via-[#111111] to-[#0a0a0a]">
          {/* Subtle texture */}
          <div className="absolute inset-0 opacity-[0.02]" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: '30px 30px'
          }} />
        </div>
        
        {/* Inner border accent */}
        <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-transparent via-amber-600/50 to-transparent" />
        
        {/* Door handle */}
        <div className="absolute top-1/2 left-6 -translate-y-1/2">
          <div className="w-2 h-20 rounded-full bg-gradient-to-b from-amber-400/80 via-amber-500/60 to-amber-400/80 shadow-lg shadow-amber-500/20" />
        </div>

        {/* Corner accents */}
        <div className="absolute top-6 right-6 w-12 h-12 border-r border-t border-amber-500/20" />
        <div className="absolute bottom-6 right-6 w-12 h-12 border-r border-b border-amber-500/20" />
        
        {/* Panel decoration */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[70%] border border-white/[0.03] rounded-sm" />
      </div>

      {/* Center seam glow when doors are closed */}
      {isDoorsClosed && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full z-40 bg-gradient-to-b from-transparent via-amber-500/40 to-transparent" />
      )}
    </div>
  );
};
