import { useState } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';
import { ExternalLink } from 'lucide-react';

const projects = [
  {
    title: 'FinTech Dashboard',
    category: 'Web Application',
    description: 'Real-time financial analytics platform with ML-powered insights.',
    tags: ['React', 'Node.js', 'PostgreSQL', 'AWS'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
  },
  {
    title: 'Healthcare Mobile App',
    category: 'Mobile Development',
    description: 'Patient management system with telemedicine capabilities.',
    tags: ['React Native', 'Firebase', 'WebRTC'],
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=600&h=400&fit=crop',
  },
  {
    title: 'E-Commerce Platform',
    category: 'Full Stack',
    description: 'Scalable marketplace handling 100K+ daily transactions.',
    tags: ['Next.js', 'MongoDB', 'Stripe', 'Redis'],
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop',
  },
  {
    title: 'IoT Management System',
    category: 'Enterprise Solution',
    description: 'Industrial IoT platform monitoring 10,000+ connected devices.',
    tags: ['Angular', 'Python', 'AWS IoT', 'Kubernetes'],
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=400&fit=crop',
  },
  {
    title: 'SaaS Analytics Tool',
    category: 'Web Application',
    description: 'Business intelligence platform with custom reporting.',
    tags: ['Vue.js', 'Go', 'ClickHouse', 'Docker'],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
  },
  {
    title: 'Social Media App',
    category: 'Mobile Development',
    description: 'Community platform with real-time messaging and content sharing.',
    tags: ['Flutter', 'Node.js', 'MongoDB', 'Socket.io'],
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&h=400&fit=crop',
  },
];

const ProjectCard = ({ project, index }: { project: typeof projects[0]; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={cn(
        "group relative rounded-2xl overflow-hidden bg-card border border-border transition-all duration-500 hover:scale-[1.02]",
        isHovered && "card-glow-hover"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-hover
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="p-6">
        <span className="text-xs font-medium text-primary uppercase tracking-wider">
          {project.category}
        </span>
        <h3 className="text-xl font-bold mt-2 mb-3 flex items-center gap-2 text-card-foreground">
          {project.title}
          <ExternalLink className="w-4 h-4 scale-0 group-hover:scale-100 transition-transform duration-300" />
        </h3>
        
        {/* Description - slides in on hover */}
        <div
          className={cn(
            "transition-all duration-300 overflow-hidden",
            isHovered ? "max-h-20 translate-y-0" : "max-h-0 -translate-y-4"
          )}
        >
          <p className="text-muted-foreground text-sm mb-4">
            {project.description}
          </p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag, tagIndex) => (
            <span
              key={tag}
              className={cn(
                "px-2 py-1 rounded-md bg-secondary text-secondary-foreground text-xs font-medium transition-all duration-300",
                isHovered && "scale-105"
              )}
              style={{ transitionDelay: `${tagIndex * 50}ms` }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export const ProjectsSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="projects" className="py-24">
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
              Featured <span className="text-gradient">Projects</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A selection of our most impactful work across various industries
            </p>
            <div className="h-1 w-24 bg-gradient-to-r from-primary to-accent mx-auto rounded-full mt-6" />
          </div>

          {/* Projects Grid */}
          <div
            className={`grid md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-700 delay-200 ${
              isVisible 
                ? 'translate-y-0 scale-100' 
                : 'translate-y-20 scale-95'
            }`}
          >
            {projects.map((project, index) => (
              <div
                key={project.title}
                className="transition-all duration-500"
                style={{ transitionDelay: `${200 + index * 100}ms` }}
              >
                <ProjectCard project={project} index={index} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
