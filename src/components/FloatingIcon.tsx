import { useRef, useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface FloatingIconProps {
  icon: React.ReactNode;
  label: string;
  className?: string;
  delay?: number;
  reverse?: boolean;
}

export const FloatingIcon = ({ 
  icon, 
  label, 
  className, 
  delay = 0,
  reverse = false 
}: FloatingIconProps) => {
  const iconRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!iconRef.current) return;
      
      const rect = iconRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const distanceX = (e.clientX - centerX) / 50;
      const distanceY = (e.clientY - centerY) / 50;
      
      setOffset({ x: distanceX, y: distanceY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      ref={iconRef}
      className={cn(
        "relative group",
        reverse ? "animate-float-reverse" : "animate-float",
        className
      )}
      style={{
        animationDelay: `${delay}s`,
        transform: `translate(${offset.x}px, ${offset.y}px)`,
        transition: 'transform 0.3s ease-out',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-hover
    >
      <div
        className={cn(
          "w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-card border border-border flex items-center justify-center transition-all duration-300",
          isHovered && "scale-110 card-glow-hover rotate-6"
        )}
      >
        {icon}
      </div>
      
      {/* Tooltip */}
      <div
        className={cn(
          "absolute -bottom-12 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-lg bg-card border border-border text-sm font-medium whitespace-nowrap transition-all duration-300 pointer-events-none",
          isHovered ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
        )}
      >
        {label}
      </div>
    </div>
  );
};
