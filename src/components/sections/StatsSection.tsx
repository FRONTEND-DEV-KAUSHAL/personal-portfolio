import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { Code, Folder, Clock, Layers } from 'lucide-react';

const stats = [
  { label: 'Years Experience', value: 3, suffix: '+', icon: Clock, color: '#FF6B9D' },
  { label: 'Major Projects', value: 6, suffix: '+', icon: Folder, color: '#00E5CC' },
  { label: 'Tech Stacks', value: 4, suffix: '+', icon: Layers, color: '#FFA94D' },
  { label: 'Code Passion', value: 100, suffix: '%', icon: Code, color: '#C084FC' },
];

const AnimatedCounter = ({ target, suffix, isInView }: { target: number; suffix: string; isInView: boolean }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 2000;
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isInView, target]);

  return (
    <span className="text-5xl md:text-6xl font-display font-bold">
      {count}{suffix}
    </span>
  );
};

const StatsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="stats" className="section-padding relative" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-mono text-gold tracking-widest uppercase">By The Numbers</span>
          <h2 className="text-4xl md:text-6xl font-display font-bold mt-3 text-gradient-rose-teal">
            Achievement Stats
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="glass rounded-2xl p-6 text-center group hover:scale-105 transition-transform duration-300"
                style={{
                  boxShadow: 'none',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = `0 0 30px ${stat.color}30`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                }}
              >
                <Icon className="w-8 h-8 mx-auto mb-4" style={{ color: stat.color }} />
                <AnimatedCounter target={stat.value} suffix={stat.suffix} isInView={isInView} />
                <p className="text-sm text-muted-foreground mt-2 font-mono">{stat.label}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
