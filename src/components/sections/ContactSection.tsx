import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Mail, Phone, MapPin, Linkedin, Github, Send } from 'lucide-react';
import { sendEmail } from '@/api/contact';
import { toast } from 'sonner';

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isLoading, setIsLoading] = useState(false);

  return (
    <section id="contact" className="section-padding relative" ref={ref}>
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-mono text-secondary tracking-widest uppercase">Let's Connect</span>
          <h2 className="text-4xl md:text-6xl font-display font-bold mt-3 text-gradient-violet-rose">
            Contact Dimension
          </h2>
          <p className="text-muted-foreground mt-4 max-w-md mx-auto">
            Ready to build something extraordinary? Let's make it happen.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-6"
          >
            <a href="mailto:gohilkaushal16@email.com" className="flex items-center gap-4 glass rounded-xl p-4 group hover:glow-rose transition-shadow duration-300">
              <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                <Mail className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Email</p>
                <p className="text-foreground font-mono text-sm">gohilkaushal16@email.com</p>
              </div>
            </a>

            <a href="tel:+918799303752" className="flex items-center gap-4 glass rounded-xl p-4 group hover:glow-teal transition-shadow duration-300">
              <div className="w-12 h-12 rounded-xl bg-secondary/20 flex items-center justify-center">
                <Phone className="w-5 h-5 text-secondary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Phone</p>
                <p className="text-foreground font-mono text-sm">+91 8799303752</p>
              </div>
            </a>

            <div className="flex items-center gap-4 glass rounded-xl p-4">
              <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center">
                <MapPin className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Location</p>
                <p className="text-foreground font-mono text-sm">Surat, Gujarat, India</p>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-xl glass flex items-center justify-center text-muted-foreground hover:text-primary hover:glow-rose transition-all duration-300"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-xl glass flex items-center justify-center text-muted-foreground hover:text-secondary hover:glow-teal transition-all duration-300"
              >
                <Github className="w-5 h-5" />
              </a>
            </div>
          </motion.div>

          {/* Contact form */}
          <motion.form
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="glass rounded-2xl p-6 space-y-4"
            onSubmit={async (e) => {
              e.preventDefault();
              
              // Validation
              if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
                toast.error('Please fill in all fields');
                return;
              }

              // Email validation
              const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
              if (!emailRegex.test(formData.email)) {
                toast.error('Please enter a valid email');
                return;
              }

              setIsLoading(true);
              try {
                const result = await sendEmail(formData);
                if (result.success) {
                  toast.success(result.message);
                  setFormData({ name: '', email: '', message: '' });
                } else {
                  toast.error(result.message);
                }
              } catch (error) {
                toast.error('Failed to send email');
              } finally {
                setIsLoading(false);
              }
            }}
          >
            <div>
              <label className="text-xs text-muted-foreground font-mono block mb-1.5">Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-muted/50 border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-body disabled:opacity-50"
                placeholder="Your name"
                disabled={isLoading}
              />
            </div>
            <div>
              <label className="text-xs text-muted-foreground font-mono block mb-1.5">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-muted/50 border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-body disabled:opacity-50"
                placeholder="you@email.com"
                disabled={isLoading}
              />
            </div>
            <div>
              <label className="text-xs text-muted-foreground font-mono block mb-1.5">Message</label>
              <textarea
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full bg-muted/50 border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none font-body disabled:opacity-50"
                placeholder="Let's build something amazing..."
                disabled={isLoading}
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-primary-foreground font-display font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity glow-rose disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-4 h-4" />
              {isLoading ? 'Sending...' : 'Send Message'}
            </button>
          </motion.form>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center mt-20 pt-8 border-t border-border">
        <p className="text-sm text-muted-foreground font-mono">
          Designed & Built by <span className="text-primary">Kaushal Gohil</span> © {new Date().getFullYear()}
        </p>
      </div>
    </section>
  );
};

export default ContactSection;
