import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface CinematicLoaderProps {
  onComplete: () => void;
}

export const CinematicLoader = ({ onComplete }: CinematicLoaderProps) => {
  const [phase, setPhase] = useState<'initial' | 'glow' | 'logo' | 'tagline' | 'opening' | 'complete'>('initial');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Slow, luxurious progression
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 0.8; // Slower progress
      });
    }, 50);

    // Phase transitions - slower, more deliberate
    const glowTimer = setTimeout(() => setPhase('glow'), 500);
    const logoTimer = setTimeout(() => setPhase('logo'), 1200);
    const taglineTimer = setTimeout(() => setPhase('tagline'), 2500);
    const openingTimer = setTimeout(() => setPhase('opening'), 4500);
    const completeTimer = setTimeout(() => setPhase('complete'), 6000);
    const finishTimer = setTimeout(onComplete, 6500);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(glowTimer);
      clearTimeout(logoTimer);
      clearTimeout(taglineTimer);
      clearTimeout(openingTimer);
      clearTimeout(completeTimer);
      clearTimeout(finishTimer);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden bg-background">
      {/* Subtle ambient gradient */}
      <div 
        className={cn(
          "absolute inset-0 transition-opacity duration-2000",
          phase === 'initial' ? 'opacity-0' : 'opacity-100'
        )}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-primary/5 blur-[150px]" />
      </div>

      {/* Center Content */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div className="text-center relative">
          {/* Pre-logo glow effect */}
          <div
            className={cn(
              "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full transition-all duration-1500",
              phase === 'initial' && "scale-0 opacity-0",
              phase === 'glow' && "scale-100 opacity-100 bg-primary/20 blur-3xl",
              phase === 'logo' && "scale-150 opacity-50 bg-primary/10 blur-3xl",
              (phase === 'tagline' || phase === 'opening' || phase === 'complete') && "scale-200 opacity-30 bg-primary/5 blur-3xl"
            )}
          />

          {/* Main Logo */}
          <div className="relative">
            {/* Letter by letter reveal */}
            <h1 className="text-7xl md:text-9xl font-poppins font-bold tracking-tight">
              {'ADPRO'.split('').map((letter, index) => (
                <span
                  key={index}
                  className={cn(
                    "inline-block text-gradient transition-all duration-700",
                    phase === 'initial' && "translate-y-16 opacity-0",
                    phase === 'glow' && "translate-y-16 opacity-0",
                    phase === 'logo' && "translate-y-0 opacity-100",
                    phase === 'tagline' && "translate-y-0 opacity-100",
                    phase === 'opening' && "translate-y-0 opacity-100 scale-110",
                    phase === 'complete' && "translate-y-0 opacity-0 scale-150"
                  )}
                  style={{ 
                    transitionDelay: `${index * 100 + 200}ms`,
                  }}
                >
                  {letter}
                </span>
              ))}
            </h1>

            {/* Elegant underline */}
            <div className="relative mt-6 flex justify-center">
              <div
                className={cn(
                  "h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent transition-all duration-1000",
                  phase === 'initial' && "w-0 opacity-0",
                  phase === 'glow' && "w-0 opacity-0",
                  phase === 'logo' && "w-32 opacity-100",
                  phase === 'tagline' && "w-64 opacity-100",
                  phase === 'opening' && "w-96 opacity-50",
                  phase === 'complete' && "w-0 opacity-0"
                )}
              />
            </div>
          </div>

          {/* Tagline */}
          <div className="mt-8 overflow-hidden">
            <p
              className={cn(
                "text-lg md:text-xl tracking-[0.3em] uppercase text-muted-foreground font-light transition-all duration-1000",
                (phase === 'initial' || phase === 'glow' || phase === 'logo') && "translate-y-8 opacity-0",
                phase === 'tagline' && "translate-y-0 opacity-100",
                phase === 'opening' && "translate-y-0 opacity-60",
                phase === 'complete' && "-translate-y-8 opacity-0"
              )}
            >
              Marketing & Technology
            </p>
          </div>

          {/* Premium tagline */}
          <div className="mt-4 overflow-hidden">
            <p
              className={cn(
                "text-sm tracking-[0.2em] uppercase text-muted-foreground/60 transition-all duration-1000 delay-300",
                (phase === 'initial' || phase === 'glow' || phase === 'logo') && "translate-y-8 opacity-0",
                phase === 'tagline' && "translate-y-0 opacity-100",
                phase === 'opening' && "translate-y-0 opacity-40",
                phase === 'complete' && "-translate-y-8 opacity-0"
              )}
            >
              Excellence Delivered
            </p>
          </div>

          {/* Progress bar */}
          <div className="mt-12 flex justify-center">
            <div
              className={cn(
                "relative h-[1px] bg-border/30 transition-all duration-1000",
                (phase === 'initial' || phase === 'glow') && "w-0 opacity-0",
                phase === 'logo' && "w-48 opacity-100",
                phase === 'tagline' && "w-64 opacity-100",
                phase === 'opening' && "w-64 opacity-50",
                phase === 'complete' && "w-0 opacity-0"
              )}
            >
              <div 
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary to-accent transition-all duration-100"
                style={{ width: `${progress}%` }}
              />
              {/* Glowing dot at the end */}
              <div 
                className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_rgba(var(--primary),0.5)] transition-all duration-100"
                style={{ left: `${progress}%`, transform: 'translate(-50%, -50%)' }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Luxury door panels */}
      {/* Left Door */}
      <div
        className={cn(
          "absolute top-0 left-0 w-1/2 h-full z-20 transition-transform duration-[1500ms] ease-[cubic-bezier(0.65,0,0.35,1)]",
          phase === 'complete' && "-translate-x-full"
        )}
      >
        {/* Door surface */}
        <div className="absolute inset-0 bg-card" />
        
        {/* Subtle texture */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%239C92AC" fill-opacity="0.4"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />
        
        {/* Inner panel border */}
        <div className="absolute inset-8 border border-border/20 rounded-sm" />
        <div className="absolute inset-12 border border-border/10 rounded-sm" />
        
        {/* Vertical accent lines */}
        <div className="absolute top-16 bottom-16 right-12 w-px bg-gradient-to-b from-transparent via-border/30 to-transparent" />
        <div className="absolute top-24 bottom-24 right-20 w-px bg-gradient-to-b from-transparent via-border/20 to-transparent" />
        
        {/* Door handle area */}
        <div className="absolute top-1/2 right-6 -translate-y-1/2 flex flex-col items-center gap-2">
          <div className="w-[3px] h-16 rounded-full bg-gradient-to-b from-border/50 via-primary/30 to-border/50" />
          <div className="w-1 h-1 rounded-full bg-primary/50" />
        </div>
        
        {/* Bottom accent */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border/50 to-border" />
      </div>

      {/* Right Door */}
      <div
        className={cn(
          "absolute top-0 right-0 w-1/2 h-full z-20 transition-transform duration-[1500ms] ease-[cubic-bezier(0.65,0,0.35,1)]",
          phase === 'complete' && "translate-x-full"
        )}
      >
        {/* Door surface */}
        <div className="absolute inset-0 bg-card" />
        
        {/* Subtle texture */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%239C92AC" fill-opacity="0.4"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />
        
        {/* Inner panel border */}
        <div className="absolute inset-8 border border-border/20 rounded-sm" />
        <div className="absolute inset-12 border border-border/10 rounded-sm" />
        
        {/* Vertical accent lines */}
        <div className="absolute top-16 bottom-16 left-12 w-px bg-gradient-to-b from-transparent via-border/30 to-transparent" />
        <div className="absolute top-24 bottom-24 left-20 w-px bg-gradient-to-b from-transparent via-border/20 to-transparent" />
        
        {/* Door handle area */}
        <div className="absolute top-1/2 left-6 -translate-y-1/2 flex flex-col items-center gap-2">
          <div className="w-[3px] h-16 rounded-full bg-gradient-to-b from-border/50 via-primary/30 to-border/50" />
          <div className="w-1 h-1 rounded-full bg-primary/50" />
        </div>
        
        {/* Bottom accent */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-border via-border/50 to-transparent" />
      </div>

      {/* Center seam line */}
      <div
        className={cn(
          "absolute top-0 left-1/2 -translate-x-1/2 w-[2px] h-full z-30 transition-all duration-[1500ms]",
          "bg-gradient-to-b from-transparent via-primary/40 to-transparent",
          phase === 'complete' && "opacity-0"
        )}
      />

      {/* Top frame accent */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent z-30" />
      
      {/* Bottom frame accent */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent z-30" />

      {/* Corner accents */}
      <div className="absolute top-4 left-4 w-8 h-8 border-l border-t border-primary/20 z-30" />
      <div className="absolute top-4 right-4 w-8 h-8 border-r border-t border-primary/20 z-30" />
      <div className="absolute bottom-4 left-4 w-8 h-8 border-l border-b border-primary/20 z-30" />
      <div className="absolute bottom-4 right-4 w-8 h-8 border-r border-b border-primary/20 z-30" />
    </div>
  );
};