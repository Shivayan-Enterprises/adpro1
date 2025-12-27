import { Helmet } from 'react-helmet-async';
import { Navbar } from '@/components/Navbar';
import { CustomCursor } from '@/components/CustomCursor';
import { ProjectsSection } from '@/components/sections/ProjectsSection';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { CTASection } from '@/components/sections/CTASection';
import { Footer } from '@/components/sections/Footer';

const Projects = () => {
  return (
    <>
      <Helmet>
        <title>Work | ADPRO - Marketing Campaigns & Software Projects</title>
        <meta 
          name="description" 
          content="Explore ADPRO's portfolio of successful marketing campaigns, websites, and software products that drive real business results." 
        />
      </Helmet>

      <CustomCursor />
      <Navbar />
      
      <main className="pt-20">
        <ProjectsSection />
        <TestimonialsSection />
        <CTASection />
      </main>

      <Footer />
    </>
  );
};

export default Projects;
