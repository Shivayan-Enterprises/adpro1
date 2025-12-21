import { useState } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';
import { Globe, Smartphone, Palette, Server, Cloud } from 'lucide-react';

const services = [
  {
    icon: Globe,
    title: 'Web Development',
    description: 'Custom web applications built with modern frameworks for optimal performance and scalability.',
    details: 'We specialize in React, Angular, Vue.js, and Next.js to create blazing-fast, SEO-optimized web applications that scale with your business needs.',
  },
  {
    icon: Smartphone,
    title: 'Mobile App Development',
    description: 'Native and cross-platform mobile apps that deliver exceptional user experiences.',
    details: 'From React Native to Flutter, we build mobile applications that feel native while sharing code across platforms, reducing time-to-market.',
  },
  {
    icon: Palette,
    title: 'UI/UX Design',
    description: 'User-centered design that combines aesthetics with functionality.',
    details: 'Our design process focuses on user research, prototyping, and iterative testing to create interfaces that users love to interact with.',
  },
  {
    icon: Server,
    title: 'Backend & APIs',
    description: 'Robust backend systems and RESTful APIs that power your applications.',
    details: 'We architect scalable backends using Node.js, Python, and Go, with databases like PostgreSQL, MongoDB, and Redis for optimal data management.',
  },
  {
    icon: Cloud,
    title: 'Cloud Solutions',
    description: 'Cloud-native architecture and DevOps practices for modern infrastructure.',
    details: 'AWS, Google Cloud, and Azure experts who implement CI/CD pipelines, containerization with Docker/Kubernetes, and infrastructure as code.',
  },
];

const ServiceCard = ({ service, index }: { service: typeof services[0]; index: number }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / 20;
    const y = (e.clientY - rect.top - rect.height / 2) / 20;
    setTilt({ x: -y, y: x });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div
      className={cn(
        "relative p-8 rounded-2xl bg-card border border-border cursor-pointer transition-all duration-300",
        isExpanded ? "card-glow-hover" : "card-glow hover:card-glow-hover"
      )}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${isExpanded ? 1.02 : 1})`,
        transitionDelay: `${index * 100}ms`,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => setIsExpanded(!isExpanded)}
      data-hover
    >
      <div className="flex items-start gap-4 mb-4">
        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shrink-0">
          <service.icon className="w-7 h-7 text-primary-foreground" />
        </div>
        <div>
          <h3 className="text-xl font-bold mb-2">{service.title}</h3>
          <p className="text-muted-foreground">{service.description}</p>
        </div>
      </div>
      
      <div
        className={cn(
          "overflow-hidden transition-all duration-500",
          isExpanded ? "max-h-40 mt-4 translate-y-0" : "max-h-0 -translate-y-4"
        )}
      >
        <div className="pt-4 border-t border-border">
          <p className="text-muted-foreground">{service.details}</p>
        </div>
      </div>

      <div className="absolute top-4 right-4">
        <div
          className={cn(
            "w-6 h-6 rounded-full border-2 border-primary flex items-center justify-center transition-transform duration-300",
            isExpanded && "rotate-45"
          )}
        >
          <span className="text-primary text-lg leading-none">+</span>
        </div>
      </div>
    </div>
  );
};

export const ServicesSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="services" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-6">
        <div ref={ref}>
          {/* Header */}
          <div
            className={`text-center mb-16 transition-all duration-700 ${
              isVisible 
                ? 'translate-y-0 scale-100' 
                : 'translate-y-20 scale-95'
            }`}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Our <span className="text-gradient">Services</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive digital solutions tailored to your business needs
            </p>
            <div className="h-1 w-24 bg-gradient-to-r from-primary to-accent mx-auto rounded-full mt-6" />
          </div>

          {/* Services Grid */}
          <div
            className={`grid md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-700 delay-200 ${
              isVisible 
                ? 'translate-y-0 scale-100' 
                : 'translate-y-20 scale-95'
            }`}
          >
            {services.map((service, index) => (
              <ServiceCard key={service.title} service={service} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
