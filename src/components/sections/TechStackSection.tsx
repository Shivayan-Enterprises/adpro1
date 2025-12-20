import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { ReactIcon, AngularIcon, NodeIcon, MongoDBIcon, AWSIcon, GoogleAdsIcon, AnalyticsIcon, SEOIcon, GrowthIcon } from '../TechIcons';
import { FloatingIcon } from '../FloatingIcon';

const devTechnologies = [
  { icon: ReactIcon, name: 'React', color: '#61DAFB', label: 'Production-ready React apps' },
  { icon: AngularIcon, name: 'Angular', color: '#DD0031', label: 'Enterprise Angular solutions' },
  { icon: NodeIcon, name: 'Node.js', color: '#339933', label: 'Scalable Node.js backends' },
  { icon: MongoDBIcon, name: 'MongoDB', color: '#47A248', label: 'Flexible NoSQL databases' },
  { icon: AWSIcon, name: 'AWS', color: '#FF9900', label: 'Cloud-native infrastructure' },
];

const marketingTools = [
  { icon: GoogleAdsIcon, name: 'Google Ads', color: '#4285F4', label: 'ROI-focused ad campaigns' },
  { icon: AnalyticsIcon, name: 'Analytics', color: '#E37400', label: 'Data-driven insights' },
  { icon: SEOIcon, name: 'SEO Tools', color: '#34A853', label: 'Search optimization' },
  { icon: GrowthIcon, name: 'Growth', color: '#9333EA', label: 'Performance marketing' },
];

const additionalTech = [
  'TypeScript', 'Next.js', 'PostgreSQL', 'Redis', 
  'Docker', 'Kubernetes', 'GraphQL', 'Python'
];

const marketingPlatforms = [
  'Meta Ads', 'LinkedIn', 'HubSpot', 'Mailchimp',
  'Semrush', 'Ahrefs', 'Hotjar', 'Mixpanel'
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
                ? 'translate-y-0 scale-100' 
                : 'translate-y-20 scale-95'
            }`}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Our <span className="text-gradient">Technology & Tools</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Cutting-edge technologies and marketing platforms that power your growth
            </p>
            <div className="h-1 w-24 bg-gradient-to-r from-primary to-accent mx-auto rounded-full mt-6" />
          </div>

          {/* Two Sections */}
          <div className="grid lg:grid-cols-2 gap-16 mb-16">
            {/* Development Technologies */}
            <div
              className={`transition-all duration-700 delay-100 ${
                isVisible 
                  ? 'translate-x-0 scale-100' 
                  : '-translate-x-20 scale-95'
              }`}
            >
              <h3 className="text-xl font-bold text-center mb-8">Development Stack</h3>
              <div className="flex flex-wrap justify-center gap-6 mb-8">
                {devTechnologies.map((tech, index) => (
                  <FloatingIcon
                    key={tech.name}
                    icon={<tech.icon className="w-8 h-8" style={{ color: tech.color }} />}
                    label={tech.label}
                    delay={index * 0.2}
                    reverse={index % 2 === 1}
                  />
                ))}
              </div>
              <div className="flex flex-wrap justify-center gap-2">
                {additionalTech.map((tech, index) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 rounded-full bg-card border border-border text-xs font-medium hover:border-primary hover:scale-105 transition-all duration-200 cursor-default"
                    style={{ transitionDelay: `${index * 30}ms` }}
                    data-hover
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Marketing Tools */}
            <div
              className={`transition-all duration-700 delay-200 ${
                isVisible 
                  ? 'translate-x-0 scale-100' 
                  : 'translate-x-20 scale-95'
              }`}
            >
              <h3 className="text-xl font-bold text-center mb-8">Marketing Arsenal</h3>
              <div className="flex flex-wrap justify-center gap-6 mb-8">
                {marketingTools.map((tool, index) => (
                  <FloatingIcon
                    key={tool.name}
                    icon={<tool.icon className="w-8 h-8" style={{ color: tool.color }} />}
                    label={tool.label}
                    delay={index * 0.2}
                    reverse={index % 2 === 0}
                  />
                ))}
              </div>
              <div className="flex flex-wrap justify-center gap-2">
                {marketingPlatforms.map((platform, index) => (
                  <span
                    key={platform}
                    className="px-3 py-1.5 rounded-full bg-card border border-border text-xs font-medium hover:border-accent hover:scale-105 transition-all duration-200 cursor-default"
                    style={{ transitionDelay: `${index * 30}ms` }}
                    data-hover
                  >
                    {platform}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Code Snippet Decoration */}
          <div
            className={`max-w-2xl mx-auto transition-all duration-700 delay-400 ${
              isVisible 
                ? 'translate-y-0 scale-100' 
                : 'translate-y-20 scale-95'
            }`}
          >
            <div className="rounded-2xl bg-card border border-border overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-3 bg-secondary/50 border-b border-border">
                <div className="w-3 h-3 rounded-full bg-destructive" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="ml-2 text-xs text-muted-foreground">adpro.tsx</span>
              </div>
              <pre className="p-6 text-sm overflow-x-auto">
                <code className="text-muted-foreground">
                  <span className="text-primary">const</span>{' '}
                  <span className="text-accent">ADPRO</span> = () ={'> {'}{'\n'}
                  {'  '}<span className="text-primary">return</span> ({'\n'}
                  {'    '}&lt;<span className="text-accent">Growth</span>&gt;{'\n'}
                  {'      '}&lt;<span className="text-accent">Marketing</span> strategy="data-driven" /&gt;{'\n'}
                  {'      '}&lt;<span className="text-accent">Development</span> quality="production" /&gt;{'\n'}
                  {'      '}&lt;<span className="text-accent">Results</span> guaranteed /&gt;{'\n'}
                  {'    '}&lt;/<span className="text-accent">Growth</span>&gt;{'\n'}
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