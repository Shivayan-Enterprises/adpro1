import { MagneticButton } from '../MagneticButton';
import { FloatingIcon } from '../FloatingIcon';
import { ReactIcon, AngularIcon, NodeIcon, MongoDBIcon, AWSIcon } from '../TechIcons';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Link } from 'react-router-dom';

export const HeroSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Animated Grid Background */}
      <div className="absolute inset-0 grid-pattern animate-grid-move opacity-50" />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />

      {/* Floating Tech Icons */}
      <div className="absolute inset-0 pointer-events-none">
        <FloatingIcon
          icon={<ReactIcon className="w-8 h-8 text-[#61DAFB]" />}
          label="Production-ready React apps"
          className="absolute top-32 left-[10%] pointer-events-auto"
          delay={0}
        />
        <FloatingIcon
          icon={<AngularIcon className="w-8 h-8 text-[#DD0031]" />}
          label="Enterprise Angular solutions"
          className="absolute top-48 right-[15%] pointer-events-auto"
          delay={0.5}
          reverse
        />
        <FloatingIcon
          icon={<NodeIcon className="w-8 h-8 text-[#339933]" />}
          label="Scalable Node.js backends"
          className="absolute bottom-40 left-[15%] pointer-events-auto"
          delay={1}
        />
        <FloatingIcon
          icon={<MongoDBIcon className="w-8 h-8 text-[#47A248]" />}
          label="Flexible MongoDB databases"
          className="absolute bottom-32 right-[10%] pointer-events-auto"
          delay={1.5}
          reverse
        />
        <FloatingIcon
          icon={<AWSIcon className="w-8 h-8 text-[#FF9900]" />}
          label="Cloud-native AWS infrastructure"
          className="absolute top-1/2 right-[5%] pointer-events-auto hidden lg:block"
          delay={2}
        />
      </div>

      {/* Content */}
      <div 
        ref={ref}
        className="relative z-10 container mx-auto px-6 text-center"
      >
        <div
          className={`transition-all duration-700 ${
            isVisible 
              ? 'translate-y-0 scale-100' 
              : 'translate-y-20 scale-95'
          }`}
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Advertising Ideas.
            <br />
            <span className="text-gradient">Developing Digital Products.</span>
          </h1>
        </div>

        <div
          className={`transition-all duration-700 delay-150 ${
            isVisible 
              ? 'translate-y-0 scale-100' 
              : 'translate-y-20 scale-95'
          }`}
        >
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-10">
            ADPRO helps brands grow with performance-driven marketing and scalable software solutions.
          </p>
        </div>

        <div
          className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-700 delay-300 ${
            isVisible 
              ? 'translate-y-0 scale-100' 
              : 'translate-y-20 scale-95'
          }`}
        >
          <Link to="/contact">
            <MagneticButton variant="primary">
              Grow Your Brand
            </MagneticButton>
          </Link>
          <Link to="/services">
            <MagneticButton variant="outline">
              Build Your Product
            </MagneticButton>
          </Link>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/50 flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-primary rounded-full animate-bounce-gentle" />
        </div>
      </div>
    </section>
  );
};
