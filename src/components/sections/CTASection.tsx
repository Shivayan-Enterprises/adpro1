import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { MagneticButton } from '../MagneticButton';
import { ArrowRight } from 'lucide-react';

export const CTASection = () => {
  const { ref, isVisible } = useScrollAnimation();

  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div
          ref={ref}
          className={`max-w-4xl mx-auto text-center transition-all duration-700 ${
            isVisible 
              ? 'scale-100 opacity-100' 
              : 'scale-90 opacity-0'
          }`}
        >
          {/* Animated border card */}
          <div className="relative p-12 md:p-16 rounded-3xl bg-card border border-border overflow-hidden group">
            {/* Animated gradient border */}
            <div className="absolute inset-0 rounded-3xl p-[2px] bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] animate-pulse-glow opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                Ready to Build Something
                <br />
                <span className="text-gradient">Extraordinary?</span>
              </h2>
              
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
                Let's discuss how we can turn your vision into a powerful, scalable digital solution 
                that drives real business results.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <MagneticButton 
                  variant="primary" 
                  className="group/btn"
                  onClick={scrollToContact}
                >
                  <span className="flex items-center gap-2">
                    Start Your Project
                    <ArrowRight className="w-5 h-5 transition-transform group-hover/btn:translate-x-1" />
                  </span>
                </MagneticButton>
                
                <MagneticButton 
                  variant="outline"
                  onClick={() => window.open('mailto:hello@adpro.dev', '_blank')}
                >
                  Schedule a Call
                </MagneticButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
