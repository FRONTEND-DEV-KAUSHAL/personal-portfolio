import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const sections = [
  { id: 'hero', label: 'Home', color: '#FF6B9D' },
  { id: 'skills', label: 'Skills', color: '#00E5CC' },
  { id: 'career', label: 'Career', color: '#FFA94D' },
  { id: 'projects', label: 'Projects', color: '#C084FC' },
  { id: 'stats', label: 'Stats', color: '#FFD700' },
  { id: 'contact', label: 'Contact', color: '#FF6B9D' },
];

const Navigation = () => {
  const [active, setActive] = useState('hero');
  const [hovered, setHovered] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight / 3;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].id);
        if (el && el.offsetTop <= scrollPos) {
          setActive(sections[i].id);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.nav
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 2 }}
      className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col items-center gap-4"
    >
      {sections.map((s) => (
        <div
          key={s.id}
          className="relative flex items-center"
          onMouseEnter={() => setHovered(s.id)}
          onMouseLeave={() => setHovered(null)}
        >
          <AnimatePresence>
            {hovered === s.id && (
              <motion.span
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="absolute right-8 text-xs font-mono whitespace-nowrap px-2 py-1 rounded glass text-foreground"
              >
                {s.label}
              </motion.span>
            )}
          </AnimatePresence>
          <button
            onClick={() => scrollTo(s.id)}
            className="w-3 h-3 rounded-full transition-all duration-300 border border-border"
            style={{
              backgroundColor: active === s.id ? s.color : 'transparent',
              boxShadow: active === s.id ? `0 0 10px ${s.color}80` : 'none',
              transform: active === s.id ? 'scale(1.3)' : 'scale(1)',
            }}
          />
        </div>
      ))}
    </motion.nav>
  );
};

export default Navigation;
