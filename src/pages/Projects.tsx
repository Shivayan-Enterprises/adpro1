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
        <title>Projects | ADPRO - Our Portfolio</title>
        <meta 
          name="description" 
          content="Explore ADPRO's portfolio of impactful projects across FinTech, Healthcare, E-Commerce, and more. See our work in action." 
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
