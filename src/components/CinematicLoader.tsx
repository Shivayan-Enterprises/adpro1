import { useEffect, useState } from 'react';

interface CinematicLoaderProps {
  onComplete: () => void;
}

type Phase = 'background' | 'logo' | 'split' | 'reveal' | 'complete';

export const CinematicLoader = ({ onComplete }: CinematicLoaderProps) => {
  const [phase, setPhase] = useState<Phase>('background');
  const [logoOpacity, setLogoOpacity] = useState(0);
  const [splitAmount, setSplitAmount] = useState(0);
  const [pageOpacity, setPageOpacity] = useState(0);

  useEffect(() => {
    // Phase 1: Show background design for 1.5s
    const bgTimer = setTimeout(() => {
      setPhase('logo');
      
      // Fade in logo over 1.5s
      let start = Date.now();
      const fadeIn = () => {
        const progress = Math.min((Date.now() - start) / 1500, 1);
        setLogoOpacity(progress);
        if (progress < 1) {
          requestAnimationFrame(fadeIn);
        } else {
          // Hold logo for 1s then split
          setTimeout(() => {
            setPhase('split');
            start = Date.now();
            animateSplit(start);
          }, 1000);
        }
      };
      requestAnimationFrame(fadeIn);
    }, 1500);

    return () => clearTimeout(bgTimer);
  }, []);

  const animateSplit = (start: number) => {
    const animate = () => {
      const progress = Math.min((Date.now() - start) / 1200, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setSplitAmount(eased * 100);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        // Start revealing page
        setPhase('reveal');
        start = Date.now();
        revealPage(start);
      }
    };
    requestAnimationFrame(animate);
  };

  const revealPage = (start: number) => {
    const animate = () => {
      const progress = Math.min((Date.now() - start) / 800, 1);
      setPageOpacity(progress);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setPhase('complete');
        setTimeout(onComplete, 300);
      }
    };
    requestAnimationFrame(animate);
  };

  if (phase === 'complete' && pageOpacity >= 1) return null;

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden">
      {/* Main page fading in behind */}
      <div 
        className="absolute inset-0 bg-background"
        style={{ opacity: pageOpacity }}
      />

      {/* Left Split Panel */}
      <div
        className="absolute top-0 left-0 w-1/2 h-full bg-[#0a0a0a] z-20"
        style={{
          transform: `translateX(-${splitAmount}%)`,
        }}
      >
        {/* Elegant border line */}
        <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-amber-500/40 to-transparent" />
        
        {/* Subtle pattern */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }} />
        </div>

        {/* Corner accent */}
        <div className="absolute top-8 left-8 w-16 h-16 border-l border-t border-amber-500/30" />
        <div className="absolute bottom-8 left-8 w-16 h-16 border-l border-b border-amber-500/30" />
      </div>

      {/* Right Split Panel */}
      <div
        className="absolute top-0 right-0 w-1/2 h-full bg-[#0a0a0a] z-20"
        style={{
          transform: `translateX(${splitAmount}%)`,
        }}
      >
        {/* Elegant border line */}
        <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-transparent via-amber-500/40 to-transparent" />
        
        {/* Subtle pattern */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }} />
        </div>

        {/* Corner accent */}
        <div className="absolute top-8 right-8 w-16 h-16 border-r border-t border-amber-500/30" />
        <div className="absolute bottom-8 right-8 w-16 h-16 border-r border-b border-amber-500/30" />
      </div>

      {/* Background Design Elements (visible in background phase) */}
      {(phase === 'background' || phase === 'logo') && (
        <div className="absolute inset-0 z-10 bg-[#0a0a0a]">
          {/* Ambient glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-amber-500/5 blur-[100px]" />
          
          {/* Subtle grid pattern */}
          <div className="absolute inset-0 opacity-[0.04]">
            <div className="absolute inset-0" style={{
              backgroundImage: `
                linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
              `,
              backgroundSize: '80px 80px'
            }} />
          </div>

          {/* Decorative lines */}
          <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent -translate-y-20" />
          <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent translate-y-20" />
          
          {/* Corner frames */}
          <div className="absolute top-12 left-12 w-24 h-24 border-l-2 border-t-2 border-amber-500/20" />
          <div className="absolute top-12 right-12 w-24 h-24 border-r-2 border-t-2 border-amber-500/20" />
          <div className="absolute bottom-12 left-12 w-24 h-24 border-l-2 border-b-2 border-amber-500/20" />
          <div className="absolute bottom-12 right-12 w-24 h-24 border-r-2 border-b-2 border-amber-500/20" />

          {/* Floating particles */}
          <div className="absolute top-[20%] left-[15%] w-1 h-1 bg-amber-400/40 rounded-full animate-pulse" />
          <div className="absolute top-[30%] right-[20%] w-1.5 h-1.5 bg-amber-400/30 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
          <div className="absolute bottom-[25%] left-[25%] w-1 h-1 bg-amber-400/40 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute bottom-[35%] right-[15%] w-1.5 h-1.5 bg-amber-400/30 rounded-full animate-pulse" style={{ animationDelay: '0.3s' }} />
        </div>
      )}

      {/* Logo and Tagline - Center Content */}
      {(phase === 'logo' || phase === 'split') && (
        <div 
          className="absolute inset-0 z-30 flex items-center justify-center"
          style={{ opacity: phase === 'split' ? Math.max(0, 1 - splitAmount / 50) : logoOpacity }}
        >
          <div className="text-center">
            {/* Main Logo */}
            <h1 className="font-playfair text-7xl md:text-8xl lg:text-9xl font-bold text-white tracking-wider mb-6">
              <span className="inline-block" style={{ 
                transform: phase === 'split' ? `translateX(-${splitAmount * 2}px)` : 'none',
                transition: 'transform 0.1s ease-out'
              }}>AD</span>
              <span className="inline-block" style={{ 
                transform: phase === 'split' ? `translateX(${splitAmount * 2}px)` : 'none',
                transition: 'transform 0.1s ease-out'
              }}>PRO</span>
            </h1>

            {/* Elegant underline */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="w-16 h-px bg-gradient-to-r from-transparent to-amber-500/60" />
              <div className="w-2 h-2 rotate-45 border border-amber-500/60" />
              <div className="w-16 h-px bg-gradient-to-l from-transparent to-amber-500/60" />
            </div>

            {/* Tagline */}
            <p className="font-outfit text-lg md:text-xl text-gray-400 tracking-[0.3em] uppercase mb-3">
              Marketing & Technology
            </p>
            <p className="font-outfit text-sm md:text-base text-gray-500 tracking-[0.2em] uppercase">
              Excellence Delivered
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
