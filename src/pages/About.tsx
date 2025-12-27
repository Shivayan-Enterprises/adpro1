import { Helmet } from 'react-helmet-async';
import { Navbar } from '@/components/Navbar';
import { CustomCursor } from '@/components/CustomCursor';
import { AboutSection } from '@/components/sections/AboutSection';
import { WhySection } from '@/components/sections/WhySection';
import { CTASection } from '@/components/sections/CTASection';
import { Footer } from '@/components/sections/Footer';

const About = () => {
  return (
    <>
      <Helmet>
        <title>About ADPRO | Digital Marketing & Software Development</title>
        <meta 
          name="description" 
          content="Learn about ADPRO - a passionate team of marketers, developers, and strategists delivering growth through digital marketing and technology." 
        />
      </Helmet>

      <CustomCursor />
      <Navbar />
      
      <main className="pt-20">
        <AboutSection />
        <WhySection />
        <CTASection />
      </main>

      <Footer />
    </>
  );
};

export default About;
