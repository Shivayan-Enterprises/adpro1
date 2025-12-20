import { useState } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { MagneticButton } from '../MagneticButton';
import { cn } from '@/lib/utils';
import { Send, Mail, Phone, MapPin } from 'lucide-react';
import { toast } from 'sonner';

export const ContactSection = () => {
  const { ref, isVisible } = useScrollAnimation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast.success('Message sent successfully! We\'ll get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const contactInfo = [
    { icon: Mail, label: 'Email', value: 'hello@adpro.dev' },
    { icon: Phone, label: 'Phone', value: '+1 (555) 123-4567' },
    { icon: MapPin, label: 'Location', value: 'San Francisco, CA' },
  ];

  return (
    <section id="contact" className="py-24 bg-secondary/30">
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
              Let's <span className="text-gradient">Connect</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Have a project in mind? We'd love to hear about it. Send us a message 
              and we'll respond as soon as possible.
            </p>
            <div className="h-1 w-24 bg-gradient-to-r from-primary to-accent mx-auto rounded-full mt-6" />
          </div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Contact Form */}
            <div
              className={`transition-all duration-700 delay-200 ${
                isVisible 
                  ? 'translate-x-0 opacity-100' 
                  : '-translate-x-20 opacity-0'
              }`}
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field */}
                <div className="relative">
                  <label
                    className={cn(
                      "absolute left-4 transition-all duration-200 pointer-events-none",
                      focusedField === 'name' || formData.name
                        ? "-top-2.5 text-xs text-primary bg-background px-2"
                        : "top-4 text-muted-foreground"
                    )}
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('name')}
                    onBlur={() => setFocusedField(null)}
                    required
                    className={cn(
                      "w-full px-4 py-4 rounded-xl bg-card border transition-all duration-200 outline-none",
                      focusedField === 'name'
                        ? "border-primary ring-2 ring-primary/20"
                        : "border-border hover:border-primary/50"
                    )}
                  />
                </div>

                {/* Email Field */}
                <div className="relative">
                  <label
                    className={cn(
                      "absolute left-4 transition-all duration-200 pointer-events-none",
                      focusedField === 'email' || formData.email
                        ? "-top-2.5 text-xs text-primary bg-background px-2"
                        : "top-4 text-muted-foreground"
                    )}
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    required
                    className={cn(
                      "w-full px-4 py-4 rounded-xl bg-card border transition-all duration-200 outline-none",
                      focusedField === 'email'
                        ? "border-primary ring-2 ring-primary/20"
                        : "border-border hover:border-primary/50"
                    )}
                  />
                </div>

                {/* Message Field */}
                <div className="relative">
                  <label
                    className={cn(
                      "absolute left-4 transition-all duration-200 pointer-events-none",
                      focusedField === 'message' || formData.message
                        ? "-top-2.5 text-xs text-primary bg-background px-2"
                        : "top-4 text-muted-foreground"
                    )}
                  >
                    Your Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('message')}
                    onBlur={() => setFocusedField(null)}
                    required
                    rows={5}
                    className={cn(
                      "w-full px-4 py-4 rounded-xl bg-card border transition-all duration-200 outline-none resize-none",
                      focusedField === 'message'
                        ? "border-primary ring-2 ring-primary/20"
                        : "border-border hover:border-primary/50"
                    )}
                  />
                </div>

                <MagneticButton
                  variant="primary"
                  className={cn(
                    "w-full",
                    isSubmitting && "opacity-70 pointer-events-none"
                  )}
                >
                  <span className="flex items-center justify-center gap-2">
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                    <Send className={cn(
                      "w-5 h-5 transition-transform",
                      !isSubmitting && "group-hover:translate-x-1"
                    )} />
                  </span>
                </MagneticButton>
              </form>
            </div>

            {/* Contact Info */}
            <div
              className={`transition-all duration-700 delay-400 ${
                isVisible 
                  ? 'translate-x-0 opacity-100' 
                  : 'translate-x-20 opacity-0'
              }`}
            >
              <div className="h-full flex flex-col justify-center space-y-8">
                {contactInfo.map((info, index) => (
                  <div
                    key={info.label}
                    className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:scale-105"
                    style={{ transitionDelay: `${400 + index * 100}ms` }}
                    data-hover
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                      <info.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">{info.label}</div>
                      <div className="font-semibold">{info.value}</div>
                    </div>
                  </div>
                ))}

                {/* Map decoration */}
                <div className="mt-8 p-6 rounded-2xl bg-card border border-border overflow-hidden">
                  <div className="aspect-video rounded-xl bg-secondary/50 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 grid-pattern opacity-30" />
                    <div className="relative z-10 text-center">
                      <MapPin className="w-12 h-12 text-primary mx-auto mb-2 animate-bounce-gentle" />
                      <p className="text-sm text-muted-foreground">San Francisco, CA</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
