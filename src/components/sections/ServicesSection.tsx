import { useState } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';
import { 
  Search, Share2, Target, Megaphone,
  Globe, Smartphone, Palette, Server, Cloud 
} from 'lucide-react';

const marketingServices = [
  {
    icon: Search,
    title: 'SEO & Performance Marketing',
    description: 'Data-driven strategies that put your brand at the top of search results.',
    details: 'We optimize your digital presence with technical SEO, content strategy, and performance analytics to drive organic growth and qualified leads.',
  },
  {
    icon: Share2,
    title: 'Social Media Marketing',
    description: 'Build authentic connections and grow your community across platforms.',
    details: 'Strategic content creation, community management, and paid social campaigns that turn followers into loyal customers.',
  },
  {
    icon: Target,
    title: 'Paid Ads (Google, Meta)',
    description: 'Precision-targeted advertising that maximizes your ROI.',
    details: 'Expert campaign management across Google Ads, Meta, LinkedIn, and programmatic platforms with continuous optimization.',
  },
  {
    icon: Megaphone,
    title: 'Branding & Creative Campaigns',
    description: 'Memorable brand identities that resonate with your audience.',
    details: 'From brand strategy to visual identity, we create cohesive campaigns that tell your story and drive engagement.',
  },
];

const developmentServices = [
  {
    icon: Globe,
    title: 'Website Development',
    description: 'Fast, responsive websites that convert visitors into customers.',
    details: 'Modern web development with React, Next.js, and cutting-edge technologies for optimal performance and user experience.',
  },
  {
    icon: Smartphone,
    title: 'Web Applications',
    description: 'Powerful web apps that streamline your business operations.',
    details: 'Custom SaaS platforms, dashboards, and enterprise applications built for scale and reliability.',
  },
  {
    icon: Palette,
    title: 'UI/UX Design',
    description: 'User-centered design that delights and converts.',
    details: 'Research-driven design process with prototyping, user testing, and iterative refinement for exceptional experiences.',
  },
  {
    icon: Server,
    title: 'Custom Software & APIs',
    description: 'Tailored solutions that solve your unique challenges.',
    details: 'Backend systems, REST/GraphQL APIs, and integrations that power your digital ecosystem.',
  },
  {
    icon: Cloud,
    title: 'Cloud Solutions',
    description: 'Scalable infrastructure for modern businesses.',
    details: 'AWS, Google Cloud, and Azure expertise with DevOps best practices for reliable, cost-effective operations.',
  },
];

const ServiceCard = ({ service, index }: { service: typeof marketingServices[0]; index: number }) => {
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
        "relative p-6 rounded-2xl bg-card border border-border cursor-pointer transition-all duration-300",
        isExpanded ? "card-glow-hover" : "card-glow hover:card-glow-hover"
      )}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${isExpanded ? 1.02 : 1})`,
        transitionDelay: `${index * 50}ms`,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => setIsExpanded(!isExpanded)}
      data-hover
    >
      <div className="flex items-start gap-4 mb-3">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shrink-0">
          <service.icon className="w-6 h-6 text-primary-foreground" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-bold mb-1">{service.title}</h3>
          <p className="text-sm text-muted-foreground">{service.description}</p>
        </div>
      </div>
      
      <div
        className={cn(
          "overflow-hidden transition-all duration-500",
          isExpanded ? "max-h-32 mt-3 translate-y-0" : "max-h-0 -translate-y-4"
        )}
      >
        <div className="pt-3 border-t border-border">
          <p className="text-sm text-muted-foreground">{service.details}</p>
        </div>
      </div>

      <div className="absolute top-4 right-4">
        <div
          className={cn(
            "w-5 h-5 rounded-full border-2 border-primary flex items-center justify-center transition-transform duration-300",
            isExpanded && "rotate-45"
          )}
        >
          <span className="text-primary text-sm leading-none">+</span>
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
              Full-service digital marketing and software development under one roof
            </p>
            <div className="h-1 w-24 bg-gradient-to-r from-primary to-accent mx-auto rounded-full mt-6" />
          </div>

          {/* Two Column Layout */}
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Marketing Column */}
            <div
              className={`transition-all duration-700 delay-100 ${
                isVisible 
                  ? 'translate-x-0 scale-100' 
                  : '-translate-x-20 scale-95'
              }`}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-accent to-primary flex items-center justify-center">
                  <Megaphone className="w-5 h-5 text-primary-foreground" />
                </div>
                <h3 className="text-2xl font-bold">Digital Marketing & Advertising</h3>
              </div>
              <div className="space-y-4">
                {marketingServices.map((service, index) => (
                  <ServiceCard key={service.title} service={service} index={index} />
                ))}
              </div>
            </div>

            {/* Development Column */}
            <div
              className={`transition-all duration-700 delay-200 ${
                isVisible 
                  ? 'translate-x-0 scale-100' 
                  : 'translate-x-20 scale-95'
              }`}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <Globe className="w-5 h-5 text-primary-foreground" />
                </div>
                <h3 className="text-2xl font-bold">Software & Development</h3>
              </div>
              <div className="space-y-4">
                {developmentServices.map((service, index) => (
                  <ServiceCard key={service.title} service={service} index={index} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};