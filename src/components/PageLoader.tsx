import { cn } from '@/lib/utils';

interface PageLoaderProps {
  isLoading: boolean;
}

export const PageLoader = ({ isLoading }: PageLoaderProps) => {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="relative">
        {/* Spinning rings */}
        <div className="w-16 h-16 relative">
          {/* Outer ring */}
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary animate-rotate-slow" />
          {/* Middle ring */}
          <div 
            className="absolute inset-2 rounded-full border-4 border-transparent border-r-accent animate-rotate-slow" 
            style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}
          />
          {/* Inner dot */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-3 h-3 rounded-full bg-gradient-to-r from-primary to-accent animate-pulse-glow" />
          </div>
        </div>

        {/* Orbiting dots */}
        <div className="absolute -inset-4 animate-rotate-slow">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-primary" />
        </div>
        <div className="absolute -inset-4 animate-rotate-slow" style={{ animationDelay: '0.5s' }}>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-accent" />
        </div>
      </div>
    </div>
  );
};
