import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Zap, Shield, Users, Rocket, Code, HeartHandshake } from 'lucide-react';

const reasons = [
  {
    icon: Zap,
    title: 'Marketing + Development',
    description: 'One team, one vision. Your campaigns and products work together seamlessly.',
  },
  {
    icon: Shield,
    title: 'Data-Driven Campaigns',
    description: 'Every decision backed by analytics. Every campaign optimized for results.',
  },
  {
    icon: Users,
    title: 'Dedicated Team',
    description: 'A passionate team fully committed to your growth and success.',
  },
  {
    icon: Rocket,
    title: 'Scalable Systems',
    description: 'Technology built to grow with you, from startup to enterprise.',
  },
  {
    icon: Code,
    title: 'Creative Strategy',
    description: 'Bold ideas backed by technology. Innovation that drives engagement.',
  },
  {
    icon: HeartHandshake,
    title: 'Long-term Partnership',
    description: 'We grow with you, providing ongoing support and optimization.',
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
                ? 'translate-x-0 scale-100' 
                : '-translate-x-20 scale-95'
            }`}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Why <span className="text-gradient">ADPRO</span>?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Marketing and development under one roof. Strategy backed by technology.
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
                    ? 'translate-y-0 scale-100' 
                    : 'translate-y-20 scale-90'
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
                ? 'scale-100 translate-y-0' 
                : 'scale-90 translate-y-10'
            }`}
          >
            <blockquote className="text-2xl md:text-3xl font-bold text-gradient max-w-3xl mx-auto">
              "We don't just build software or run campaigns. We build systems that scale your business."
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
};