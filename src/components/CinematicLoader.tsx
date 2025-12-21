import { useEffect, useState, useRef } from 'react';

interface CinematicLoaderProps {
  onComplete: () => void;
}

export const CinematicLoader = ({ onComplete }: CinematicLoaderProps) => {
  const [phase, setPhase] = useState<'initial' | 'doorsOpening' | 'revealLogo' | 'splitName' | 'revealMain' | 'complete'>('initial');
  const [doorProgress, setDoorProgress] = useState(0);
  const [logoProgress, setLogoProgress] = useState(0);
  const [splitProgress, setSplitProgress] = useState(0);
  const [fadeProgress, setFadeProgress] = useState(0);
  
  const animationRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  // Smooth easing functions for cinematic feel
  const easeOutExpo = (t: number) => t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
  const easeInOutCubic = (t: number) => 
    t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

  useEffect(() => {
    // Start the cinematic sequence
    setTimeout(() => {
      startPhase('doorsOpening', 3000, (progress) => {
        setDoorProgress(progress);
        if (progress >= 1) {
          // Doors fully open, reveal logo
          setPhase('revealLogo');
          startPhase('revealLogo', 2000, (logoProg) => {
            setLogoProgress(logoProg);
            if (logoProg >= 1) {
              // Logo fully visible, start splitting
              setPhase('splitName');
              setTimeout(() => {
                startPhase('splitName', 2500, (splitProg) => {
                  setSplitProgress(splitProg);
                  if (splitProg >= 1) {
                    // Split complete, reveal main page
                    setPhase('revealMain');
                    startPhase('revealMain', 1800, (fadeProg) => {
                      setFadeProgress(fadeProg);
                      if (fadeProg >= 1) {
                        // Complete
                        setPhase('complete');
                        setTimeout(onComplete, 500);
                      }
                    });
                  }
                });
              }, 800);
            }
          });
        }
      });
    }, 1200);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [onComplete]);

  const startPhase = (phaseName: string, duration: number, onProgress: (progress: number) => void) => {
    const startTime = Date.now();
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      let progress = Math.min(elapsed / duration, 1);
      
      // Apply easing based on phase
      if (phaseName === 'doorsOpening') {
        progress = easeOutExpo(progress);
      } else if (phaseName === 'splitName') {
        progress = easeInOutCubic(progress);
      } else {
        progress = easeOutExpo(progress);
      }
      
      onProgress(progress);
      
      if (elapsed < duration) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };
    
    animationRef.current = requestAnimationFrame(animate);
  };

  // Early return if complete
  if (phase === 'complete') {
    return null;
  }

  // Calculate transforms with easing
  const leftDoorTransform = `translateX(-${doorProgress * 100}%)`;
  const rightDoorTransform = `translateX(${doorProgress * 100}%)`;
  
  const leftLogoTransform = `translateX(-${splitProgress * 300}px) rotateY(-${splitProgress * 45}deg)`;
  const rightLogoTransform = `translateX(${splitProgress * 300}px) rotateY(${splitProgress * 45}deg)`;
  
  const mainPageOpacity = Math.min(1, splitProgress * 3); // Appears during split
  const loaderOpacity = 1 - fadeProgress;

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden bg-black">
      {/* ----- MAIN CONTENT (revealed after doors open) ----- */}
      {phase !== 'initial' && phase !== 'doorsOpening' && (
        <div 
          className="absolute inset-0 z-10 transition-all duration-1000"
          style={{ opacity: loaderOpacity }}
        >
          {/* Designer Background */}
          <div className="absolute inset-0">
            {/* Gradient Mesh */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900">
              {/* Animated gradient orbs */}
              <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-purple-500/5 blur-3xl animate-pulse" />
              <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-amber-500/5 blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
              
              {/* Geometric grid */}
              <div className="absolute inset-0 opacity-10" style={{
                backgroundImage: `
                  linear-gradient(90deg, transparent 95%, rgba(255,215,0,0.1) 100%),
                  linear-gradient(0deg, transparent 95%, rgba(255,215,0,0.1) 100%)
                `,
                backgroundSize: '50px 50px'
              }} />
              
              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-64 h-64 border-t border-l border-amber-500/10" />
              <div className="absolute top-0 right-0 w-64 h-64 border-t border-r border-amber-500/10" />
              <div className="absolute bottom-0 left-0 w-64 h-64 border-b border-l border-amber-500/10" />
              <div className="absolute bottom-0 right-0 w-64 h-64 border-b border-r border-amber-500/10" />
            </div>
          </div>

          {/* Logo and Tagline Container */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              {/* Logo - splits into two parts */}
              <div className="flex items-center gap-4 mb-8">
                {/* AD - Left part */}
                <div 
                  className="relative"
                  style={{
                    transform: leftLogoTransform,
                    opacity: 1 - (splitProgress * 0.5),
                    transition: 'all 2s cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                >
                  <h1 
                    className="text-8xl md:text-9xl font-bold text-white tracking-tighter"
                    style={{
                      opacity: logoProgress,
                      textShadow: '0 0 40px rgba(255,215,0,0.3)',
                      filter: `blur(${(1 - logoProgress) * 5}px)`
                    }}
                  >
                    AD
                  </h1>
                </div>
                
                {/* PRO - Right part */}
                <div 
                  className="relative"
                  style={{
                    transform: rightLogoTransform,
                    opacity: 1 - (splitProgress * 0.5),
                    transition: 'all 2s cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                >
                  <h1 
                    className="text-8xl md:text-9xl font-bold text-white tracking-tighter"
                    style={{
                      opacity: logoProgress,
                      textShadow: '0 0 40px rgba(255,215,0,0.3)',
                      filter: `blur(${(1 - logoProgress) * 5}px)`
                    }}
                  >
                    PRO
                  </h1>
                </div>
              </div>

              {/* Tagline - appears with logo */}
              <div 
                className="text-center space-y-2"
                style={{
                  opacity: logoProgress * (1 - splitProgress * 0.8),
                  transform: `translateY(${(1 - logoProgress) * 50}px)`,
                  transition: 'all 2s ease-out'
                }}
              >
                <p className="text-xl tracking-[0.3em] uppercase text-gray-300 font-light">
                  Marketing & Technology
                </p>
                <p className="text-lg tracking-[0.2em] uppercase text-gray-400/80 font-light">
                  Excellence Delivered
                </p>
                
                {/* Elegant divider line */}
                <div 
                  className="mx-auto mt-6 h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent"
                  style={{
                    width: `${logoProgress * 200}px`,
                    opacity: logoProgress
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ----- MAIN PAGE CONTENT (appears during split) ----- */}
      <div 
        className="absolute inset-0 z-20 flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black"
        style={{ 
          opacity: mainPageOpacity,
          transform: `scale(${1 + (splitProgress * 1)})`,
          transition: 'all 5s ease-in-out'
        }}
      >
      </div>

      {/* ----- DOORS (always on top) ----- */}
      <div 
        className="absolute inset-0 z-30"
        style={{ opacity: phase === 'initial' || phase === 'doorsOpening' ? 1 : 0 }}
      >
        {/* Left Door */}
        <div
          className="absolute top-0 left-0 w-1/2 h-full"
          style={{
            transform: leftDoorTransform,
            transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-black">
            {/* Door texture */}
            <div className="absolute inset-0 opacity-5" style={{
              backgroundImage: `repeating-linear-gradient(
                0deg,
                transparent,
                transparent 2px,
                rgba(255,255,255,0.1) 2px,
                rgba(255,255,255,0.1) 4px
              )`
            }} />
            
            {/* Decorative panels */}
            <div className="absolute inset-y-24 inset-x-12 border border-amber-500/10 rounded-lg" />
            <div className="absolute top-1/3 left-8 right-8 h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />
            <div className="absolute bottom-1/3 left-8 right-8 h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />
            
            {/* Door handle */}
            <div className="absolute top-1/2 right-10 -translate-y-1/2">
              <div className="w-3 h-32 rounded-full bg-gradient-to-b from-amber-400/40 via-amber-300/60 to-amber-400/40 shadow-xl shadow-amber-500/20" />
            </div>
            
            {/* Edge glow */}
            <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-amber-500/30 to-transparent" />
          </div>
        </div>

        {/* Right Door */}
        <div
          className="absolute top-0 right-0 w-1/2 h-full"
          style={{
            transform: rightDoorTransform,
            transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-l from-gray-900 to-black">
            {/* Door texture */}
            <div className="absolute inset-0 opacity-5" style={{
              backgroundImage: `repeating-linear-gradient(
                0deg,
                transparent,
                transparent 2px,
                rgba(255,255,255,0.1) 2px,
                rgba(255,255,255,0.1) 4px
              )`
            }} />
            
            {/* Decorative panels */}
            <div className="absolute inset-y-24 inset-x-12 border border-amber-500/10 rounded-lg" />
            <div className="absolute top-1/3 left-8 right-8 h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />
            <div className="absolute bottom-1/3 left-8 right-8 h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />
            
            {/* Door handle */}
            <div className="absolute top-1/2 left-10 -translate-y-1/2">
              <div className="w-3 h-32 rounded-full bg-gradient-to-b from-amber-400/40 via-amber-300/60 to-amber-400/40 shadow-xl shadow-amber-500/20" />
            </div>
            
            {/* Edge glow */}
            <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-transparent via-amber-500/30 to-transparent" />
          </div>
        </div>

        {/* Center seam light */}
        <div 
          className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-gradient-to-b from-transparent via-amber-500/40 to-transparent"
          style={{
            opacity: 1 - doorProgress,
            boxShadow: `0 0 ${500 * (1 - doorProgress)}px rgba(255,215,0,0.3)`
          }}
        />
      </div>

      {/* Final white fade overlay */}
      <div 
        className="absolute inset-0 z-40"
        style={{
          opacity: fadeProgress,
          transition: 'opacity 2s ease-in-out'
        }}
      />
    </div>
  );
};