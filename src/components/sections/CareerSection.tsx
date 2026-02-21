import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Briefcase, Calendar } from 'lucide-react';

const experiences = [
  {
    company: 'Appgambit',
    role: 'Full Stack Web Developer',
    period: 'June 2023 – Present',
    location: 'Surat, Gujarat',
    color: 'primary' as const,
    highlights: [
      'Architecting robust features in agile teams, improving performance and scalability',
      'Leading development of TNT (Track and Trace) for secure financial transaction tracking',
      'Optimizing MySQL & SQL database structures for enterprise-level security modules',
    ]
  },
  {
    company: 'Daydreamsoft Infotech LLP',
    role: 'MEAN/MERN Developer',
    period: 'Oct 2022 – June 2023',
    location: 'Surat, Gujarat',
    color: 'secondary' as const,
    highlights: [
      'Resolved critical bugs and deployed new features across diverse web applications',
      'Built secure Video Call app and Social Media platform with real-time communication',
      'Streamlined development with Git version control and peer code reviews',
    ]
  },
  {
    company: 'Red and White Multimedia Institute',
    role: 'Lab Coordinator',
    period: 'May 2022 – Oct 2022',
    location: 'Surat, Gujarat',
    color: 'accent' as const,
    highlights: [
      'Coordinated lab sessions and guided students in web development technologies',
    ]
  },
];

const borderColors: Record<string, string> = {
  primary: 'border-l-primary',
  secondary: 'border-l-secondary',
  accent: 'border-l-accent',
};

const dotColors: Record<string, string> = {
  primary: 'bg-primary shadow-[0_0_12px_hsl(340,100%,71%,0.6)]',
  secondary: 'bg-secondary shadow-[0_0_12px_hsl(170,100%,45%,0.6)]',
  accent: 'bg-accent shadow-[0_0_12px_hsl(30,100%,65%,0.6)]',
};

const badgeColors: Record<string, string> = {
  primary: 'text-primary bg-primary/10',
  secondary: 'text-secondary bg-secondary/10',
  accent: 'text-accent bg-accent/10',
};

const CareerSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="career" className="section-padding relative" ref={ref}>
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-mono text-accent tracking-widest uppercase">The Journey</span>
          <h2 className="text-4xl md:text-6xl font-display font-bold mt-3 text-gradient-violet-rose">
            Career Timeline
          </h2>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-secondary to-accent" />

          {experiences.map((exp, idx) => (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: idx * 0.2 }}
              className={`relative mb-12 md:w-[calc(50%-2rem)] ${
                idx % 2 === 0 ? 'md:ml-0 md:mr-auto' : 'md:ml-auto md:mr-0'
              } ml-16 md:ml-auto`}
            >
              {/* Timeline dot */}
              <div className={`absolute -left-[2.45rem] md:left-auto ${
                idx % 2 === 0 ? 'md:-right-[2.55rem]' : 'md:-left-[2.55rem]'
              } top-6 w-4 h-4 rounded-full ${dotColors[exp.color]} z-10`} />

              <div className={`glass rounded-2xl p-6 border-l-2 ${borderColors[exp.color]}`}>
                <div className="flex items-start justify-between flex-wrap gap-2 mb-3">
                  <div>
                    <h3 className="text-xl font-display font-bold text-foreground">{exp.company}</h3>
                    <p className={`text-sm font-mono ${badgeColors[exp.color]} inline-block px-2 py-0.5 rounded mt-1`}>
                      <Briefcase className="w-3 h-3 inline mr-1" />
                      {exp.role}
                    </p>
                  </div>
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {exp.period}
                  </span>
                </div>
                <ul className="space-y-2">
                  {exp.highlights.map((h, i) => (
                    <li key={i} className="text-sm text-muted-foreground flex gap-2">
                      <span className="text-primary mt-1">▸</span>
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CareerSection;
