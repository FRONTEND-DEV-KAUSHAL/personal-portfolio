import { motion } from 'framer-motion';
import { ArrowDown, Mail, Phone, MapPin, FileText } from 'lucide-react';

const HeroSection = () => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* HeroCanvas is now fixed position, rendered in Index */}

      {/* Gradient overlay */}
      <div className="absolute inset-0 z-[1] pointer-events-none" style={{
        background: 'radial-gradient(ellipse at center, transparent 30%, hsl(230, 60%, 8%) 80%)'
      }} />

      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mb-4"
        >
          <span className="inline-block px-4 py-1.5 rounded-full glass text-sm font-mono text-primary tracking-wider">
            FULL STACK DEVELOPER
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-6xl md:text-8xl lg:text-9xl font-display font-bold tracking-tight mb-6"
        >
          <span className="text-gradient-rose-teal">KAUSHAL</span>
          <br />
          <span className="text-foreground">GOHIL</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 font-body"
        >
          Results-driven developer with 3+ years crafting scalable web applications
          with the MEAN/MERN stack. Turning ideas into high-performance digital experiences.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-8"
        >
          <a href="mailto:gohilkaushal16@email.com" className="flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-foreground hover:glow-rose transition-shadow duration-300">
            <Mail className="w-4 h-4 text-primary" />
            gohilkaushal16@email.com
          </a>
          <a href="tel:+918799303752" className="flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-foreground hover:glow-teal transition-shadow duration-300">
            <Phone className="w-4 h-4 text-secondary" />
            +91 8799303752
          </a>
          <span className="flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-muted-foreground">
            <MapPin className="w-4 h-4 text-accent" />
            Surat, Gujarat
          </span>
        </motion.div>

        {/* Resume Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="mb-12"
        >
          <a
            href="/resume/kaushal_gohil_resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            data-interactive
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full font-display font-semibold text-primary-foreground text-base transition-all duration-300 hover:scale-105 glow-rose"
            style={{
              background: 'linear-gradient(135deg, hsl(340, 100%, 71%), hsl(170, 100%, 45%))',
            }}
          >
            <FileText className="w-5 h-5" />
            See Resume
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs text-muted-foreground tracking-widest uppercase">Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowDown className="w-5 h-5 text-primary" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
