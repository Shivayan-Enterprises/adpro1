import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Zap, Shield, Users, Rocket, Code, HeartHandshake } from 'lucide-react';

const reasons = [
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Performance-optimized applications that load in milliseconds.',
  },
  {
    icon: Shield,
    title: 'Enterprise Security',
    description: 'Bank-grade security practices built into every layer.',
  },
  {
    icon: Users,
    title: 'Dedicated Team',
    description: 'A passionate team fully committed to your success.',
  },
  {
    icon: Rocket,
    title: 'Rapid Delivery',
    description: 'Agile methodology ensures fast time-to-market.',
  },
  {
    icon: Code,
    title: 'Clean Code',
    description: 'Maintainable, well-documented code that scales.',
  },
  {
    icon: HeartHandshake,
    title: 'Long-term Partnership',
    description: 'We grow with you, providing ongoing support.',
  },
];

export const WhySection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="py-24 bg-secondary/30">
      <div className="container mx-auto px-6">
        <div ref={ref}>
          {/* Header */}
          <div
            className={`text-center mb-16 transition-all duration-700 ${
              isVisible 
                ? 'translate-x-0 opacity-100' 
                : '-translate-x-20 opacity-0'
            }`}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Why <span className="text-gradient">ADPRO</span>?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We don't just build software. We build systems that scale.
            </p>
            <div className="h-1 w-24 bg-gradient-to-r from-primary to-accent mx-auto rounded-full mt-6" />
          </div>

          {/* Reasons Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reasons.map((reason, index) => (
              <div
                key={reason.title}
                className={`group p-6 rounded-2xl bg-card border border-border transition-all duration-500 hover:card-glow-hover hover:scale-105 ${
                  isVisible 
                    ? 'translate-y-0 opacity-100' 
                    : 'translate-y-20 opacity-0'
                }`}
                style={{ transitionDelay: `${200 + index * 100}ms` }}
                data-hover
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <reason.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">{reason.title}</h3>
                <p className="text-muted-foreground">{reason.description}</p>
              </div>
            ))}
          </div>

          {/* Quote */}
          <div
            className={`mt-16 text-center transition-all duration-700 delay-700 ${
              isVisible 
                ? 'scale-100 opacity-100' 
                : 'scale-90 opacity-0'
            }`}
          >
            <blockquote className="text-2xl md:text-3xl font-bold text-gradient max-w-3xl mx-auto">
              "Excellence is not a destination but a continuous journey in software craftsmanship."
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
};
