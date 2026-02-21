import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const skills = {
  'Frontend': {
    color: 'primary',
    items: ['Angular', 'React', 'Redux', 'NGRX', 'TypeScript', 'JavaScript (ES6+)', 'HTML5', 'CSS3', 'Tailwind CSS', 'Bootstrap', 'Material UI']
  },
  'Backend': {
    color: 'secondary',
    items: ['Node.js', 'Express.js', 'Socket.io', 'SQL']
  },
  'Databases': {
    color: 'accent',
    items: ['MongoDB', 'MySQL']
  },
  'Tools & DevOps': {
    color: 'violet',
    items: ['Git', 'GitHub', 'GitLab', 'VS Code', 'Postman', 'WebStorm', 'Firebase', 'Vercel', 'Netlify']
  }
};

const colorMap: Record<string, string> = {
  primary: 'bg-primary/20 text-primary border-primary/30',
  secondary: 'bg-secondary/20 text-secondary border-secondary/30',
  accent: 'bg-accent/20 text-accent border-accent/30',
  violet: 'bg-violet/20 text-violet border-violet/30',
};

const glowMap: Record<string, string> = {
  primary: 'hover:shadow-[0_0_20px_hsl(340,100%,71%,0.3)]',
  secondary: 'hover:shadow-[0_0_20px_hsl(170,100%,45%,0.3)]',
  accent: 'hover:shadow-[0_0_20px_hsl(30,100%,65%,0.3)]',
  violet: 'hover:shadow-[0_0_20px_hsl(270,80%,75%,0.3)]',
};

const headingColorMap: Record<string, string> = {
  primary: 'text-primary',
  secondary: 'text-secondary',
  accent: 'text-accent',
  violet: 'text-violet',
};

const SkillsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="section-padding relative" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-mono text-secondary tracking-widest uppercase">Tech Arsenal</span>
          <h2 className="text-4xl md:text-6xl font-display font-bold mt-3 text-gradient-rose-teal">
            Skill Constellation
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {Object.entries(skills).map(([category, { color, items }], catIdx) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: catIdx * 0.15 }}
              className="glass rounded-2xl p-6"
            >
              <h3 className={`text-lg font-display font-semibold mb-4 ${headingColorMap[color]}`}>
                {category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {items.map((skill, idx) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.4, delay: catIdx * 0.15 + idx * 0.05 }}
                    className={`px-3 py-1.5 rounded-full text-sm font-mono border transition-shadow duration-300 ${colorMap[color]} ${glowMap[color]}`}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
