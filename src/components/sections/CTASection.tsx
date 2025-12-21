import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { MagneticButton } from '../MagneticButton';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const CTASection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div
          ref={ref}
          className={`max-w-4xl mx-auto text-center transition-all duration-700 ${
            isVisible 
              ? 'scale-100 translate-y-0' 
              : 'scale-90 translate-y-10'
          }`}
        >
          {/* Card with animated border */}
          <div className="relative p-12 md:p-16 rounded-3xl bg-gradient-to-br from-primary via-primary/90 to-accent overflow-hidden group">
            {/* Animated pattern overlay */}
            <div className="absolute inset-0 grid-pattern opacity-20" />
            
            {/* Glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition-all duration-500" />
            
            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-bold mb-6 text-primary-foreground">
                Ready to Build Something
                <br />
                <span className="text-primary-foreground/90">Extraordinary?</span>
              </h2>
              
              <p className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto mb-10">
                Let's discuss how we can turn your vision into a powerful, scalable digital solution 
                that drives real business results.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contact">
                  <MagneticButton 
                    variant="outline" 
                    className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 border-primary-foreground group/btn"
                  >
                    <span className="flex items-center gap-2">
                      Start Your Project
                      <ArrowRight className="w-5 h-5 transition-transform group-hover/btn:translate-x-1" />
                    </span>
                  </MagneticButton>
                </Link>
                
                <MagneticButton 
                  variant="outline"
                  className="border-primary-foreground/50 text-primary-foreground hover:bg-primary-foreground/10"
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
