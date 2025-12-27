import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useCountUp } from '@/hooks/useCountUp';
import { useState } from 'react';

const stats = [
  { value: 150, suffix: '+', label: 'Projects Delivered' },
  { value: 50, suffix: '+', label: 'Happy Clients' },
  { value: 2, suffix: '+', label: 'Years Experience' },
  { value: 99, suffix: '%', label: 'Client Satisfaction' },
];

const StatCard = ({ value, suffix, label }: { value: number; suffix: string; label: string }) => {
  const [isHovered] = useState(true);
  const count = useCountUp(value, isHovered, 2000);

  return (
    <div
      className="text-center p-6 rounded-2xl bg-card border border-border transition-all duration-300 hover:card-glow-hover hover:scale-105"
  
    >
      <div className="text-4xl md:text-5xl font-bold text-gradient mb-2">
        {count}{suffix}
      </div>
      <div className="text-muted-foreground font-medium">{label}</div>
    </div>
  );
};

export const AboutSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div ref={ref} className="max-w-4xl mx-auto">
          {/* Header */}
          <div
            className={`text-center mb-16 transition-all duration-700 ${
              isVisible 
                ? 'translate-x-0 scale-100' 
                : '-translate-x-20 scale-95'
            }`}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              About <span className="text-gradient">ADPRO</span>
            </h2>
            <div className="h-1 w-24 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
          </div>

          {/* Content */}
          <div
            className={`text-center mb-16 transition-all duration-700 delay-150 ${
              isVisible 
                ? 'translate-x-0 scale-100' 
                : 'translate-x-20 scale-95'
            }`}
          >
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-6">
              We are a team of passionate developers, designers, and strategists dedicated to 
              building exceptional digital experiences. Since 2016, we've been helping startups 
              and enterprises transform their ideas into powerful, scalable software solutions.
            </p>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Our approach combines cutting-edge technology with user-centered design principles, 
              ensuring that every product we deliver not only meets but exceeds expectations.
            </p>
          </div>

          {/* Stats */}
          <div
            className={`grid grid-cols-2 lg:grid-cols-4 gap-6 `}
          >
            {stats.map((stat, index) => (
              <div
                key={stat.label}
              >
                <StatCard {...stat} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
