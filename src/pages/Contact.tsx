import { Helmet } from 'react-helmet-async';
import { Navbar } from '@/components/Navbar';
import { CustomCursor } from '@/components/CustomCursor';
import { ContactSection } from '@/components/sections/ContactSection';
import { Footer } from '@/components/sections/Footer';

const Contact = () => {
  return (
    <>
      <Helmet>
        <title>Contact | ADPRO - Start Your Project</title>
        <meta 
          name="description" 
          content="Ready to grow your brand or build your product? Contact ADPRO today. Let's discuss how marketing and technology can transform your business." 
        />
      </Helmet>

      <CustomCursor />
      <Navbar />
      
      <main className="pt-20">
        <ContactSection />
      </main>

      <Footer />
    </>
  );
};

export default Contact;
