import { Helmet } from 'react-helmet-async';
import { Navbar } from '@/components/Navbar';
import { CustomCursor } from '@/components/CustomCursor';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { TechStackSection } from '@/components/sections/TechStackSection';
import { CTASection } from '@/components/sections/CTASection';
import { Footer } from '@/components/sections/Footer';

const Services = () => {
  return (
    <>
      <Helmet>
        <title>Services | ADPRO - Web & Mobile Development</title>
        <meta 
          name="description" 
          content="Comprehensive digital solutions: Web Development, Mobile Apps, UI/UX Design, Backend & APIs, and Cloud Solutions tailored to your business needs." 
        />
      </Helmet>

      <CustomCursor />
      <Navbar />
      
      <main className="pt-20">
        <ServicesSection />
        <TechStackSection />
        <CTASection />
      </main>

      <Footer />
    </>
  );
};

export default Services;
