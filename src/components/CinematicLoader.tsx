import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface CinematicLoaderProps {
  onComplete: () => void;
}

export const CinematicLoader = ({ onComplete }: CinematicLoaderProps) => {
  const [phase, setPhase] = useState<'logo' | 'reveal' | 'exit'>('logo');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Progress animation
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 40);

    // Phase transitions
    const revealTimer = setTimeout(() => setPhase('reveal'), 2000);
    const exitTimer = setTimeout(() => setPhase('exit'), 2800);
    const completeTimer = setTimeout(onComplete, 3500);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(revealTimer);
      clearTimeout(exitTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div
      className={cn(
        "fixed inset-0 z-[100] flex items-center justify-center bg-background",
        phase === 'exit' && "pointer-events-none"
      )}
    >
      {/* Animated background grid */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 grid-pattern animate-grid-move" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
      </div>

      {/* Main content */}
      <div
        className={cn(
          "relative z-10 flex flex-col items-center transition-transform duration-700",
          phase === 'exit' && "scale-150"
        )}
      >
        {/* Logo */}
        <div
          className={cn(
            "relative transition-transform duration-700",
            phase === 'logo' && "scale-100",
            phase === 'reveal' && "scale-110",
            phase === 'exit' && "scale-0"
          )}
        >
          <h1 className="text-6xl md:text-8xl font-poppins font-bold text-gradient">
            ADPRO
          </h1>
          
          {/* Glowing underline */}
          <div
            className="absolute -bottom-4 left-0 h-1 bg-gradient-to-r from-primary to-accent rounded-full glow-strong transition-all duration-1000"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Tagline */}
        <p
          className={cn(
            "mt-12 text-lg text-muted-foreground transition-all duration-500",
            phase === 'logo' && "translate-y-10 scale-90",
            phase === 'reveal' && "translate-y-0 scale-100",
            phase === 'exit' && "-translate-y-10 scale-90"
          )}
        >
          Engineering Excellence
        </p>

        {/* Loading indicator */}
        <div
          className={cn(
            "mt-8 flex items-center gap-2 transition-all duration-500",
            phase === 'exit' && "scale-0"
          )}
        >
          <div className="w-2 h-2 rounded-full bg-primary animate-bounce-gentle" style={{ animationDelay: '0ms' }} />
          <div className="w-2 h-2 rounded-full bg-primary animate-bounce-gentle" style={{ animationDelay: '150ms' }} />
          <div className="w-2 h-2 rounded-full bg-primary animate-bounce-gentle" style={{ animationDelay: '300ms' }} />
        </div>
      </div>

      {/* Corner decorations */}
      <div
        className={cn(
          "absolute top-0 left-0 w-32 h-32 border-l-2 border-t-2 border-primary/30 transition-all duration-700",
          phase === 'exit' && "-translate-x-full -translate-y-full"
        )}
      />
      <div
        className={cn(
          "absolute top-0 right-0 w-32 h-32 border-r-2 border-t-2 border-accent/30 transition-all duration-700",
          phase === 'exit' && "translate-x-full -translate-y-full"
        )}
      />
      <div
        className={cn(
          "absolute bottom-0 left-0 w-32 h-32 border-l-2 border-b-2 border-accent/30 transition-all duration-700",
          phase === 'exit' && "-translate-x-full translate-y-full"
        )}
      />
      <div
        className={cn(
          "absolute bottom-0 right-0 w-32 h-32 border-r-2 border-b-2 border-primary/30 transition-all duration-700",
          phase === 'exit' && "translate-x-full translate-y-full"
        )}
      />

      {/* Exit curtains */}
      <div
        className={cn(
          "absolute inset-y-0 left-0 w-1/2 bg-background transition-transform duration-700 ease-in-out",
          phase === 'exit' ? "-translate-x-full" : "translate-x-[-100%]"
        )}
        style={{ transitionDelay: phase === 'exit' ? '0ms' : '0ms' }}
      />
      <div
        className={cn(
          "absolute inset-y-0 right-0 w-1/2 bg-background transition-transform duration-700 ease-in-out",
          phase === 'exit' ? "translate-x-full" : "translate-x-[100%]"
        )}
        style={{ transitionDelay: phase === 'exit' ? '0ms' : '0ms' }}
      />
    </div>
  );
};
