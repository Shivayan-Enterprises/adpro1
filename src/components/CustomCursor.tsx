import { useEffect, useState, useCallback, useRef } from 'react';

export const CustomCursor = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [delayedPosition, setDelayedPosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [trail, setTrail] = useState<Array<{ x: number; y: number; id: number }>>([]);
  const trailIdRef = useRef(0);
  const rafRef = useRef<number>();

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const newPos = { x: e.clientX, y: e.clientY };
    setPosition(newPos);
    setIsVisible(true);
    
    // Add trail particle
    trailIdRef.current += 1;
    setTrail(prev => {
      const newTrail = [...prev, { ...newPos, id: trailIdRef.current }];
      return newTrail.slice(-8); // Keep only last 8 particles
    });
  }, []);

  // Smooth delayed position for outer ring
  useEffect(() => {
    const updateDelayedPosition = () => {
      setDelayedPosition(prev => ({
        x: prev.x + (position.x - prev.x) * 0.15,
        y: prev.y + (position.y - prev.y) * 0.15
      }));
      rafRef.current = requestAnimationFrame(updateDelayedPosition);
    };
    
    rafRef.current = requestAnimationFrame(updateDelayedPosition);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [position]);

  // Clean old trail particles
  useEffect(() => {
    const cleanupInterval = setInterval(() => {
      setTrail(prev => prev.slice(-6));
    }, 100);
    return () => clearInterval(cleanupInterval);
  }, []);

  const handleMouseEnter = useCallback(() => setIsVisible(true), []);
  const handleMouseLeave = useCallback(() => {
    setIsVisible(false);
    setTrail([]);
  }, []);
  const handleMouseDown = useCallback(() => setIsClicking(true), []);
  const handleMouseUp = useCallback(() => setIsClicking(false), []);

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    const attachHoverListeners = () => {
      const hoverElements = document.querySelectorAll('button, a, [data-hover], input, textarea, select');
      
      const handleHoverStart = () => setIsHovering(true);
      const handleHoverEnd = () => setIsHovering(false);

      hoverElements.forEach(el => {
        el.addEventListener('mouseenter', handleHoverStart);
        el.addEventListener('mouseleave', handleHoverEnd);
      });

      return () => {
        hoverElements.forEach(el => {
          el.removeEventListener('mouseenter', handleHoverStart);
          el.removeEventListener('mouseleave', handleHoverEnd);
        });
      };
    };

    const cleanup = attachHoverListeners();

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      cleanup();
    };
  }, [handleMouseMove, handleMouseEnter, handleMouseLeave, handleMouseDown, handleMouseUp]);

  // Re-attach hover listeners when DOM changes
  useEffect(() => {
    const observer = new MutationObserver(() => {
      const hoverElements = document.querySelectorAll('button, a, [data-hover], input, textarea, select');
      
      const handleHoverStart = () => setIsHovering(true);
      const handleHoverEnd = () => setIsHovering(false);

      hoverElements.forEach(el => {
        el.addEventListener('mouseenter', handleHoverStart);
        el.addEventListener('mouseleave', handleHoverEnd);
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);

  if (typeof window !== 'undefined' && 'ontouchstart' in window) {
    return null;
  }

  return (
    <>
      {/* Trail particles */}
      {trail.map((point, index) => (
        <div
          key={point.id}
          className="fixed pointer-events-none z-[9996] rounded-full bg-primary/30"
          style={{
            left: point.x,
            top: point.y,
            width: `${(index + 1) * 1.5}px`,
            height: `${(index + 1) * 1.5}px`,
            transform: 'translate(-50%, -50%)',
            opacity: (index + 1) / trail.length * 0.4,
            transition: 'opacity 0.3s ease-out',
          }}
        />
      ))}

      {/* Main cursor dot */}
      <div
        className="fixed pointer-events-none z-[9999]"
        style={{
          left: position.x,
          top: position.y,
          transform: `translate(-50%, -50%) scale(${isClicking ? 0.7 : 1})`,
          transition: 'transform 0.12s cubic-bezier(0.16, 1, 0.3, 1)',
          opacity: isVisible ? 1 : 0,
        }}
      >
        <div
          className="rounded-full bg-primary shadow-[0_0_15px_hsl(var(--primary)/0.5)]"
          style={{
            width: isHovering ? '10px' : '6px',
            height: isHovering ? '10px' : '6px',
            transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        />
      </div>
      
      {/* Outer ring with magnetic delay */}
      <div
        className="fixed pointer-events-none z-[9998] rounded-full border border-primary/40"
        style={{
          left: delayedPosition.x,
          top: delayedPosition.y,
          width: isHovering ? '56px' : '36px',
          height: isHovering ? '56px' : '36px',
          transform: `translate(-50%, -50%) scale(${isClicking ? 0.85 : 1}) rotate(${isHovering ? '45deg' : '0deg'})`,
          transition: 'width 0.35s cubic-bezier(0.16, 1, 0.3, 1), height 0.35s cubic-bezier(0.16, 1, 0.3, 1), transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.2s',
          opacity: isVisible ? 1 : 0,
          borderColor: isHovering ? 'hsl(var(--accent) / 0.6)' : 'hsl(var(--primary) / 0.4)',
        }}
      />

      {/* Secondary decorative ring */}
      <div
        className="fixed pointer-events-none z-[9997] rounded-full border border-primary/15"
        style={{
          left: delayedPosition.x,
          top: delayedPosition.y,
          width: isHovering ? '72px' : '48px',
          height: isHovering ? '72px' : '48px',
          transform: `translate(-50%, -50%) scale(${isClicking ? 0.9 : 1}) rotate(${isHovering ? '-30deg' : '0deg'})`,
          transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          opacity: isVisible ? (isHovering ? 0.8 : 0.5) : 0,
        }}
      />
    </>
  );
};
