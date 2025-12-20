import { Navbar } from '@/components/Navbar';
import { CustomCursor } from '@/components/CustomCursor';
import { HeroSection } from '@/components/sections/HeroSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { TechStackSection } from '@/components/sections/TechStackSection';
import { WhySection } from '@/components/sections/WhySection';
import { ProjectsSection } from '@/components/sections/ProjectsSection';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { CTASection } from '@/components/sections/CTASection';
import { ContactSection } from '@/components/sections/ContactSection';
import { Footer } from '@/components/sections/Footer';
import { Helmet } from 'react-helmet-async';

const Index = () => {
  return (
    <>
      <Helmet>
        <title>ADPRO - Software Development Company | Web & Mobile Solutions</title>
        <meta 
          name="description" 
          content="ADPRO builds scalable, high-performance digital products. Expert web development, mobile apps, UI/UX design, and cloud solutions for startups and enterprises." 
        />
        <meta name="keywords" content="software development, web development, mobile apps, React, Node.js, cloud solutions, ADPRO" />
        <link rel="canonical" href="https://adpro.dev" />
      </Helmet>

      <CustomCursor />
      <Navbar />
      
      <main>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <TechStackSection />
        <WhySection />
        <ProjectsSection />
        <TestimonialsSection />
        <CTASection />
        <ContactSection />
      </main>

      <Footer />
    </>
  );
};

export default Index;
