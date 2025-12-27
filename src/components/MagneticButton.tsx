import { useRef, useState, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary' | 'outline';
  onClick?: () => void;
}

export const MagneticButton = ({ 
  children, 
  className, 
  variant = 'primary',
  onClick 
}: MagneticButtonProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;
    
    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    setPosition({ x: x * 0.3, y: y * 0.3 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const baseStyles = "relative px-8 py-4 rounded-xl font-outfit font-semibold text-lg overflow-hidden transition-all duration-200";
  
  const variants = {
    primary: "bg-primary text-primary-foreground hover:glow-strong active:scale-95",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 active:scale-95",
    outline: "bg-transparent border-2 border-primary text-foreground hover:bg-primary/10 active:scale-95",
  };

  return (
    <button
      ref={buttonRef}
      className={cn(baseStyles, variants[variant], className)}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      <span className="relative z-10">{children}</span>
      <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-0 hover:opacity-100 transition-opacity duration-300" />
    </button>
  );
};
