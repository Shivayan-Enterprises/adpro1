import { Helmet } from 'react-helmet-async';
import { Navbar } from '@/components/Navbar';
import { CustomCursor } from '@/components/CustomCursor';
import { ContactSection } from '@/components/sections/ContactSection';
import { Footer } from '@/components/sections/Footer';

const Contact = () => {
  return (
    <>
      <Helmet>
        <title>Contact | ADPRO - Get in Touch</title>
        <meta 
          name="description" 
          content="Have a project in mind? Contact ADPRO today. We'd love to hear about your project and discuss how we can help." 
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
