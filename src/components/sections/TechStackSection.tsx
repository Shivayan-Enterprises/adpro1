import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { ReactIcon, AngularIcon, NodeIcon, MongoDBIcon, AWSIcon } from '../TechIcons';
import { FloatingIcon } from '../FloatingIcon';

const technologies = [
  { icon: ReactIcon, name: 'React', color: '#61DAFB', label: 'Production-ready React apps' },
  { icon: AngularIcon, name: 'Angular', color: '#DD0031', label: 'Enterprise Angular solutions' },
  { icon: NodeIcon, name: 'Node.js', color: '#339933', label: 'Scalable Node.js backends' },
  { icon: MongoDBIcon, name: 'MongoDB', color: '#47A248', label: 'Flexible NoSQL databases' },
  { icon: AWSIcon, name: 'AWS', color: '#FF9900', label: 'Cloud-native infrastructure' },
];

const additionalTech = [
  'TypeScript', 'Next.js', 'PostgreSQL', 'Redis', 
  'Docker', 'Kubernetes', 'GraphQL', 'Python',
  'Go', 'Terraform', 'GitHub Actions', 'Figma'
];

export const TechStackSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="tech-stack" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div ref={ref}>
          {/* Header */}
          <div
            className={`text-center mb-16 transition-all duration-700 ${
              isVisible 
                ? 'translate-y-0 opacity-100' 
                : 'translate-y-20 opacity-0'
            }`}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Our <span className="text-gradient">Technology Stack</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We use cutting-edge technologies to build robust, scalable solutions
            </p>
            <div className="h-1 w-24 bg-gradient-to-r from-primary to-accent mx-auto rounded-full mt-6" />
          </div>

          {/* Main Tech Icons */}
          <div
            className={`flex flex-wrap justify-center gap-8 md:gap-16 mb-16 transition-all duration-700 delay-200 ${
              isVisible 
                ? 'scale-100 opacity-100' 
                : 'scale-90 opacity-0'
            }`}
          >
            {technologies.map((tech, index) => (
              <FloatingIcon
                key={tech.name}
                icon={<tech.icon className="w-10 h-10" style={{ color: tech.color }} />}
                label={tech.label}
                delay={index * 0.3}
                reverse={index % 2 === 1}
              />
            ))}
          </div>

          {/* Additional Technologies */}
          <div
            className={`flex flex-wrap justify-center gap-3 max-w-3xl mx-auto transition-all duration-700 delay-400 ${
              isVisible 
                ? 'translate-y-0 opacity-100' 
                : 'translate-y-20 opacity-0'
            }`}
          >
            {additionalTech.map((tech, index) => (
              <span
                key={tech}
                className="px-4 py-2 rounded-full bg-card border border-border text-sm font-medium hover:border-primary hover:scale-105 transition-all duration-200 cursor-default"
                style={{ transitionDelay: `${400 + index * 50}ms` }}
                data-hover
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Code Snippet Decoration */}
          <div
            className={`mt-16 max-w-2xl mx-auto transition-all duration-700 delay-600 ${
              isVisible 
                ? 'translate-x-0 opacity-100' 
                : 'translate-x-20 opacity-0'
            }`}
          >
            <div className="rounded-2xl bg-card border border-border overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-3 bg-secondary/50 border-b border-border">
                <div className="w-3 h-3 rounded-full bg-destructive" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="ml-2 text-xs text-muted-foreground">app.tsx</span>
              </div>
              <pre className="p-6 text-sm overflow-x-auto">
                <code className="text-muted-foreground">
                  <span className="text-primary">const</span>{' '}
                  <span className="text-accent">ADPRO</span> = () ={'> {'}{'\n'}
                  {'  '}<span className="text-primary">return</span> ({'\n'}
                  {'    '}&lt;<span className="text-accent">Innovation</span>&gt;{'\n'}
                  {'      '}&lt;<span className="text-accent">Scalability</span> /&gt;{'\n'}
                  {'      '}&lt;<span className="text-accent">Performance</span> /&gt;{'\n'}
                  {'      '}&lt;<span className="text-accent">Excellence</span> /&gt;{'\n'}
                  {'    '}&lt;/<span className="text-accent">Innovation</span>&gt;{'\n'}
                  {'  '});{'\n'}
                  {'}'};
                </code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
