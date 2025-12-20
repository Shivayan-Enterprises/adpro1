import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface CinematicLoaderProps {
  onComplete: () => void;
}

export const CinematicLoader = ({ onComplete }: CinematicLoaderProps) => {
  const [phase, setPhase] = useState<'closed' | 'opening' | 'logo' | 'open'>('closed');

  useEffect(() => {
    // Start with doors closed, then open them
    const startTimer = setTimeout(() => setPhase('opening'), 300);
    const logoTimer = setTimeout(() => setPhase('logo'), 800);
    const openTimer = setTimeout(() => setPhase('open'), 2000);
    const completeTimer = setTimeout(onComplete, 2500);

    return () => {
      clearTimeout(startTimer);
      clearTimeout(logoTimer);
      clearTimeout(openTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-background" />

      {/* Center Logo - appears during opening */}
      <div
        className={cn(
          "absolute inset-0 flex items-center justify-center z-10 transition-all duration-700",
          phase === 'closed' && "scale-50",
          phase === 'opening' && "scale-75",
          phase === 'logo' && "scale-100",
          phase === 'open' && "scale-150"
        )}
      >
        <div className="text-center">
          <h1
            className={cn(
              "text-6xl md:text-8xl font-poppins font-bold text-gradient transition-all duration-500",
              phase === 'closed' && "scale-0",
              phase === 'opening' && "scale-90",
              (phase === 'logo' || phase === 'open') && "scale-100"
            )}
          >
            ADPRO
          </h1>
          <p
            className={cn(
              "mt-4 text-lg text-muted-foreground transition-all duration-500 delay-200",
              (phase === 'closed' || phase === 'opening') && "translate-y-4 scale-90",
              phase === 'logo' && "translate-y-0 scale-100",
              phase === 'open' && "-translate-y-4 scale-90"
            )}
          >
            Marketing & Technology
          </p>
        </div>
      </div>

      {/* Left Door */}
      <div
        className={cn(
          "absolute top-0 left-0 w-1/2 h-full bg-card border-r border-border transition-transform duration-1000 ease-[cubic-bezier(0.65,0,0.35,1)] z-20",
          "flex items-center justify-end pr-4",
          phase === 'closed' && "translate-x-0",
          phase === 'opening' && "translate-x-0",
          phase === 'logo' && "translate-x-0",
          phase === 'open' && "-translate-x-full"
        )}
      >
        {/* Door handle */}
        <div className="relative">
          <div className="w-1 h-24 bg-gradient-to-b from-primary/50 to-primary rounded-full" />
          <div className="absolute top-1/2 -translate-y-1/2 right-2 w-3 h-8 bg-primary/30 rounded-full" />
        </div>
        
        {/* Door pattern */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 grid-pattern opacity-10" />
          {/* Vertical lines */}
          <div className="absolute top-0 right-8 w-px h-full bg-gradient-to-b from-transparent via-border to-transparent" />
          <div className="absolute top-0 right-16 w-px h-full bg-gradient-to-b from-transparent via-border/50 to-transparent" />
        </div>
      </div>

      {/* Right Door */}
      <div
        className={cn(
          "absolute top-0 right-0 w-1/2 h-full bg-card border-l border-border transition-transform duration-1000 ease-[cubic-bezier(0.65,0,0.35,1)] z-20",
          "flex items-center justify-start pl-4",
          phase === 'closed' && "translate-x-0",
          phase === 'opening' && "translate-x-0",
          phase === 'logo' && "translate-x-0",
          phase === 'open' && "translate-x-full"
        )}
      >
        {/* Door handle */}
        <div className="relative">
          <div className="w-1 h-24 bg-gradient-to-b from-primary/50 to-primary rounded-full" />
          <div className="absolute top-1/2 -translate-y-1/2 left-2 w-3 h-8 bg-primary/30 rounded-full" />
        </div>
        
        {/* Door pattern */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 grid-pattern opacity-10" />
          {/* Vertical lines */}
          <div className="absolute top-0 left-8 w-px h-full bg-gradient-to-b from-transparent via-border to-transparent" />
          <div className="absolute top-0 left-16 w-px h-full bg-gradient-to-b from-transparent via-border/50 to-transparent" />
        </div>
      </div>

      {/* Door frame edges */}
      <div
        className={cn(
          "absolute top-0 left-1/2 -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary/30 via-primary to-primary/30 z-30 transition-all duration-1000",
          phase === 'open' && "opacity-0 scale-x-0"
        )}
      />

      {/* Top and bottom frame accents */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent z-30" />
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent z-30" />

      {/* Light glow behind doors */}
      <div
        className={cn(
          "absolute inset-0 flex items-center justify-center transition-all duration-1000",
          phase === 'opening' && "opacity-30",
          phase === 'logo' && "opacity-50",
          phase === 'open' && "opacity-0"
        )}
      >
        <div className="w-96 h-96 rounded-full bg-primary/20 blur-3xl" />
      </div>
    </div>
  );
};