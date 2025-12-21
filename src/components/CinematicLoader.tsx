import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface CinematicLoaderProps {
  onComplete: () => void;
}

export const CinematicLoader = ({ onComplete }: CinematicLoaderProps) => {
  const [phase, setPhase] = useState<'initial' | 'doorsOpening' | 'revealLogo' | 'splitName' | 'revealContent' | 'complete'>('initial');
  const [doorProgress, setDoorProgress] = useState(0);
  const [logoProgress, setLogoProgress] = useState(0);
  const [splitProgress, setSplitProgress] = useState(0);

  useEffect(() => {
    // Reset state
    setPhase('initial');
    setDoorProgress(0);
    setLogoProgress(0);
    setSplitProgress(0);

    // PHASE 1: Initial pause
    const initialTimer = setTimeout(() => {
      console.log("Starting doors...");
      setPhase('doorsOpening');
      
      // Animate doors opening over 2.5 seconds
      let startTime = Date.now();
      const doorDuration = 2500; // 2.5 seconds
      
      const animateDoors = () => {
        const currentTime = Date.now();
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / doorDuration, 1);
        
        setDoorProgress(progress * 100);
        
        if (progress < 1) {
          requestAnimationFrame(animateDoors);
        } else {
          console.log("Doors complete, showing logo...");
          // Doors fully open
          setPhase('revealLogo');
          startTime = Date.now();
          animateLogo();
        }
      };
      
      requestAnimationFrame(animateDoors);
    }, 800);

    return () => {
      clearTimeout(initialTimer);
    };
  }, [onComplete]);

  const animateLogo = () => {
    console.log("Animating logo...");
    let startTime = Date.now();
    const logoDuration = 1500; // 1.5 seconds
    
    const animate = () => {
      const currentTime = Date.now();
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / logoDuration, 1);
      
      setLogoProgress(progress * 100);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        console.log("Logo complete, splitting...");
        // Logo fully revealed, wait then split
        setTimeout(() => {
          setPhase('splitName');
          startTime = Date.now();
          animateSplit();
        }, 800);
      }
    };
    
    requestAnimationFrame(animate);
  };

  const animateSplit = () => {
    console.log("Animating split...");
    let startTime = Date.now();
    const splitDuration = 2000; // 2 seconds
    
    const animate = () => {
      const currentTime = Date.now();
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / splitDuration, 1);
      
      setSplitProgress(progress * 100);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        console.log("Split complete, revealing content...");
        // Split complete, reveal content
        setPhase('revealContent');
        
        // Wait 1 second then complete
        setTimeout(() => {
          setPhase('complete');
          
          // Wait for final transition then callback
          setTimeout(() => {
            console.log("Loader complete!");
            onComplete();
          }, 1000);
        }, 1000);
      }
    };
    
    requestAnimationFrame(animate);
  };

  // Calculate transforms
  const leftDoorTransform = `translateX(-${doorProgress}%)`;
  const rightDoorTransform = `translateX(${doorProgress}%)`;

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden bg-black">
      {/* DEBUG INFO */}
      <div className="absolute top-4 left-4 z-[1000] text-white text-sm bg-black/70 p-3 rounded-lg font-mono">
        <div className="font-bold mb-1">DEBUG INFO:</div>
        <div>Phase: <span className="text-yellow-400">{phase}</span></div>
        <div>Doors: <span className="text-green-400">{doorProgress.toFixed(1)}%</span></div>
        <div>Logo: <span className="text-blue-400">{logoProgress.toFixed(1)}%</span></div>
        <div>Split: <span className="text-purple-400">{splitProgress.toFixed(1)}%</span></div>
      </div>

      {/* SIMPLE DOORS - Using inline styles for direct control */}
      {/* Left Door */}
      <div
        className="absolute top-0 left-0 w-1/2 h-full z-40 bg-gradient-to-r from-gray-900 to-gray-800"
        style={{
          transform: leftDoorTransform,
        }}
      >
        <div className="absolute top-1/2 right-8 -translate-y-1/2">
          <div className="w-3 h-24 rounded-full bg-gradient-to-b from-yellow-400 to-yellow-300" />
        </div>
      </div>

      {/* Right Door */}
      <div
        className="absolute top-0 right-0 w-1/2 h-full z-40 bg-gradient-to-l from-gray-900 to-gray-800"
        style={{
          transform: rightDoorTransform,
        }}
      >
        <div className="absolute top-1/2 left-8 -translate-y-1/2">
          <div className="w-3 h-24 rounded-full bg-gradient-to-b from-yellow-400 to-yellow-300" />
        </div>
      </div>

      {/* CENTER CONTENT */}
      <div className="absolute inset-0 flex items-center justify-center z-50">
        <div className="text-center">
          {/* Logo - Only show when doors are opening or later */}
          {(phase === 'doorsOpening' || phase === 'revealLogo' || phase === 'splitName') && (
            <>
              <h1 className="text-8xl font-bold text-white mb-4">
                {'ADPRO'.split('').map((letter, index) => (
                  <span
                    key={index}
                    className="inline-block"
                    style={{
                      opacity: Math.max(0, Math.min(1, (logoProgress - index * 20) / 100)),
                      transform: `translateY(${Math.max(0, 50 - (logoProgress - index * 10))}px)`,
                      transition: 'all 0.3s ease-out'
                    }}
                  >
                    {letter}
                  </span>
                ))}
              </h1>
              
              {/* Tagline */}
              <div
                style={{
                  opacity: Math.max(0, (logoProgress - 70) / 30),
                  transition: 'opacity 0.5s ease-out'
                }}
              >
                <p className="text-xl text-gray-300">Marketing & Technology</p>
                <p className="text-lg text-gray-400 mt-2">Excellence Delivered</p>
              </div>
            </>
          )}

          {/* Splitting Name */}
          {phase === 'splitName' && (
            <div className="flex gap-8">
              <div
                style={{
                  transform: `translateX(-${splitProgress}%)`,
                  transition: 'transform 2s ease-out'
                }}
              >
                <h2 className="text-8xl font-bold text-white">AD</h2>
              </div>
              <div
                style={{
                  transform: `translateX(${splitProgress}%)`,
                  transition: 'transform 2s ease-out'
                }}
              >
                <h2 className="text-8xl font-bold text-white">PRO</h2>
              </div>
            </div>
          )}

          {/* Final Content */}
          {phase === 'revealContent' || phase === 'complete' ? (
            <div className="text-center">
              <h2 className="text-6xl font-bold text-white mb-6">Welcome</h2>
              <p className="text-2xl text-gray-300">Your experience begins now</p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};