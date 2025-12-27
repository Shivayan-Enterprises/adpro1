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
        <title>Services | ADPRO - Digital Marketing & Software Development</title>
        <meta 
          name="description" 
          content="Full-service digital marketing, advertising, and software development. SEO, paid ads, web development, and custom software solutions." 
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
