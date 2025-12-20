import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface CinematicLoaderProps {
  onComplete: () => void;
}

export const CinematicLoader = ({ onComplete }: CinematicLoaderProps) => {
  const [phase, setPhase] = useState<'closed' | 'reveal' | 'tagline' | 'opening' | 'complete'>('closed');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Luxurious slow progress
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 0.5;
      });
    }, 40);

    // Phase transitions - ultra smooth and deliberate
    const revealTimer = setTimeout(() => setPhase('reveal'), 600);
    const taglineTimer = setTimeout(() => setPhase('tagline'), 2800);
    const openingTimer = setTimeout(() => setPhase('opening'), 5000);
    const completeTimer = setTimeout(() => setPhase('complete'), 7000);
    const finishTimer = setTimeout(onComplete, 8200);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(revealTimer);
      clearTimeout(taglineTimer);
      clearTimeout(openingTimer);
      clearTimeout(completeTimer);
      clearTimeout(finishTimer);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden bg-background">
      {/* Ambient glow behind everything */}
      <div 
        className={cn(
          "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full transition-all duration-[2500ms]",
          phase === 'closed' && "scale-0 opacity-0",
          phase === 'reveal' && "scale-75 opacity-100 bg-primary/20 blur-[100px]",
          phase === 'tagline' && "scale-100 opacity-100 bg-primary/15 blur-[120px]",
          phase === 'opening' && "scale-125 opacity-80 bg-accent/10 blur-[150px]",
          phase === 'complete' && "scale-150 opacity-60 bg-accent/5 blur-[180px]"
        )}
      />

      {/* Center content - this shows through the gap between doors */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div className="text-center px-4">
          {/* Main Logo with letter reveal */}
          <div className="relative overflow-hidden">
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-playfair font-bold tracking-tight leading-none">
              {'ADPRO'.split('').map((letter, index) => (
                <span
                  key={index}
                  className={cn(
                    "inline-block text-gradient transition-all duration-[900ms] ease-out",
                    phase === 'closed' && "translate-y-[120%] scale-75 opacity-0",
                    phase === 'reveal' && "translate-y-0 scale-100 opacity-100",
                    phase === 'tagline' && "translate-y-0 scale-100 opacity-100",
                    phase === 'opening' && "translate-y-0 scale-[1.02] opacity-100",
                    phase === 'complete' && "-translate-y-[120%] scale-75 opacity-0"
                  )}
                  style={{ 
                    transitionDelay: phase === 'reveal' 
                      ? `${index * 100 + 100}ms` 
                      : phase === 'complete' 
                        ? `${(4 - index) * 60}ms` 
                        : '0ms',
                  }}
                >
                  {letter}
                </span>
              ))}
            </h1>
          </div>

          {/* Elegant expanding line */}
          <div className="relative mt-6 sm:mt-8 flex justify-center overflow-hidden">
            <div
              className={cn(
                "h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent transition-all duration-[1200ms] ease-out",
                phase === 'closed' && "w-0 opacity-0",
                phase === 'reveal' && "w-16 sm:w-24 opacity-100",
                phase === 'tagline' && "w-32 sm:w-48 opacity-100",
                phase === 'opening' && "w-24 sm:w-32 opacity-70",
                phase === 'complete' && "w-0 opacity-0"
              )}
            />
          </div>

          {/* Tagline - Marketing & Technology */}
          <div className="mt-6 sm:mt-8 overflow-hidden h-7 sm:h-8">
            <p
              className={cn(
                "text-xs sm:text-sm md:text-base tracking-[0.3em] sm:tracking-[0.35em] uppercase text-muted-foreground font-outfit font-light transition-all duration-[1000ms] ease-out",
                (phase === 'closed' || phase === 'reveal') && "translate-y-full opacity-0",
                phase === 'tagline' && "translate-y-0 opacity-100",
                phase === 'opening' && "translate-y-0 opacity-80",
                phase === 'complete' && "-translate-y-full opacity-0"
              )}
            >
              Marketing & Technology
            </p>
          </div>

          {/* Subtitle */}
          <div className="mt-2 sm:mt-3 overflow-hidden h-5 sm:h-6">
            <p
              className={cn(
                "text-[10px] sm:text-xs tracking-[0.2em] sm:tracking-[0.25em] uppercase text-muted-foreground/60 font-outfit transition-all duration-[1000ms] ease-out",
                (phase === 'closed' || phase === 'reveal') && "translate-y-full opacity-0",
                phase === 'tagline' && "translate-y-0 opacity-100",
                phase === 'opening' && "translate-y-0 opacity-60",
                phase === 'complete' && "-translate-y-full opacity-0"
              )}
              style={{ transitionDelay: '150ms' }}
            >
              Excellence Delivered
            </p>
          </div>

          {/* Progress bar */}
          <div className="mt-10 sm:mt-12 flex justify-center">
            <div
              className={cn(
                "relative h-[2px] bg-border/30 rounded-full transition-all duration-[800ms] overflow-hidden",
                phase === 'closed' && "w-0 opacity-0",
                phase === 'reveal' && "w-32 sm:w-40 opacity-100",
                phase === 'tagline' && "w-44 sm:w-56 opacity-100",
                phase === 'opening' && "w-32 sm:w-40 opacity-70",
                phase === 'complete' && "w-0 opacity-0"
              )}
            >
              <div 
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary via-accent to-primary rounded-full transition-all duration-75"
                style={{ width: `${progress}%` }}
              />
              <div 
                className={cn(
                  "absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary transition-opacity duration-300",
                  phase !== 'complete' ? "opacity-100 shadow-[0_0_15px_hsl(var(--primary)),0_0_30px_hsl(var(--primary)/0.5)]" : "opacity-0"
                )}
                style={{ left: `calc(${Math.min(progress, 100)}% - 4px)` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Left Door */}
      <div
        className={cn(
          "absolute top-0 left-0 w-1/2 h-full z-20",
          "transition-transform duration-[1800ms] ease-[cubic-bezier(0.76,0,0.24,1)]",
          phase === 'complete' && "-translate-x-full"
        )}
      >
        {/* Door surface with subtle gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-card via-card to-card/95" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.02] to-transparent" />
        
        {/* Luxury panel frames */}
        <div className="absolute inset-4 sm:inset-8 md:inset-12 lg:inset-16 border border-border/20 rounded-sm" />
        <div className="absolute inset-8 sm:inset-12 md:inset-16 lg:inset-20 border border-border/10 rounded-sm" />
        
        {/* Decorative vertical lines */}
        <div className="absolute top-16 sm:top-24 md:top-32 bottom-16 sm:bottom-24 md:bottom-32 right-6 sm:right-12 md:right-16 w-px bg-gradient-to-b from-transparent via-primary/25 to-transparent" />
        
        {/* Door handle */}
        <div className="absolute top-1/2 right-3 sm:right-6 md:right-8 -translate-y-1/2">
          <div className="w-[3px] h-10 sm:h-16 md:h-20 rounded-full bg-gradient-to-b from-primary/20 via-primary/40 to-primary/20 shadow-[0_0_10px_hsl(var(--primary)/0.2)]" />
        </div>
        
        {/* Edge shadow for depth */}
        <div className="absolute top-0 right-0 w-[2px] h-full bg-gradient-to-r from-border/40 to-transparent shadow-[2px_0_8px_rgba(0,0,0,0.1)]" />
      </div>

      {/* Right Door */}
      <div
        className={cn(
          "absolute top-0 right-0 w-1/2 h-full z-20",
          "transition-transform duration-[1800ms] ease-[cubic-bezier(0.76,0,0.24,1)]",
          phase === 'complete' && "translate-x-full"
        )}
      >
        {/* Door surface with subtle gradient */}
        <div className="absolute inset-0 bg-gradient-to-l from-card via-card to-card/95" />
        <div className="absolute inset-0 bg-gradient-to-bl from-accent/[0.02] to-transparent" />
        
        {/* Luxury panel frames */}
        <div className="absolute inset-4 sm:inset-8 md:inset-12 lg:inset-16 border border-border/20 rounded-sm" />
        <div className="absolute inset-8 sm:inset-12 md:inset-16 lg:inset-20 border border-border/10 rounded-sm" />
        
        {/* Decorative vertical lines */}
        <div className="absolute top-16 sm:top-24 md:top-32 bottom-16 sm:bottom-24 md:bottom-32 left-6 sm:left-12 md:left-16 w-px bg-gradient-to-b from-transparent via-primary/25 to-transparent" />
        
        {/* Door handle */}
        <div className="absolute top-1/2 left-3 sm:left-6 md:left-8 -translate-y-1/2">
          <div className="w-[3px] h-10 sm:h-16 md:h-20 rounded-full bg-gradient-to-b from-primary/20 via-primary/40 to-primary/20 shadow-[0_0_10px_hsl(var(--primary)/0.2)]" />
        </div>
        
        {/* Edge shadow for depth */}
        <div className="absolute top-0 left-0 w-[2px] h-full bg-gradient-to-l from-border/40 to-transparent shadow-[-2px_0_8px_rgba(0,0,0,0.1)]" />
      </div>

      {/* Center seam with glow */}
      <div
        className={cn(
          "absolute top-0 left-1/2 -translate-x-1/2 w-[2px] h-full z-30",
          "bg-gradient-to-b from-primary/10 via-primary/40 to-primary/10",
          "transition-all duration-[1800ms]",
          phase === 'complete' && "opacity-0 scale-x-0"
        )}
        style={{
          boxShadow: '0 0 20px hsl(var(--primary) / 0.4), 0 0 40px hsl(var(--primary) / 0.2)'
        }}
      />

      {/* Corner accents */}
      <div className={cn(
        "absolute top-4 sm:top-6 left-4 sm:left-6 w-4 sm:w-6 h-4 sm:h-6 border-l-2 border-t-2 border-primary/30 z-30 transition-all duration-500",
        phase === 'complete' && "scale-0 opacity-0"
      )} />
      <div className={cn(
        "absolute top-4 sm:top-6 right-4 sm:right-6 w-4 sm:w-6 h-4 sm:h-6 border-r-2 border-t-2 border-primary/30 z-30 transition-all duration-500",
        phase === 'complete' && "scale-0 opacity-0"
      )} />
      <div className={cn(
        "absolute bottom-4 sm:bottom-6 left-4 sm:left-6 w-4 sm:w-6 h-4 sm:h-6 border-l-2 border-b-2 border-primary/30 z-30 transition-all duration-500",
        phase === 'complete' && "scale-0 opacity-0"
      )} />
      <div className={cn(
        "absolute bottom-4 sm:bottom-6 right-4 sm:right-6 w-4 sm:w-6 h-4 sm:h-6 border-r-2 border-b-2 border-primary/30 z-30 transition-all duration-500",
        phase === 'complete' && "scale-0 opacity-0"
      )} />
    </div>
  );
};
