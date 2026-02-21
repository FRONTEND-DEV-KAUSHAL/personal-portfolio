import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { X, ExternalLink, Shield, Brain, MessageCircle, Video, Gamepad2, Heart } from 'lucide-react';

const projects = [
  {
    name: 'TNT – Track and Trace Cash',
    description: 'Architected secure workflows to assist businesses in providing guaranteed security for financial transfers from customers to banks.',
    icon: Shield,
    color: '#FFD700',
    gradient: 'from-[hsl(51,100%,50%)] to-[hsl(30,100%,65%)]',
    tech: ['Angular', 'Node.js', 'MySQL', 'Express.js'],
  },
  {
    name: 'PulseCheck.ai',
    description: 'AI-powered habit tracking application that utilizes intelligent guides and summaries to help users build consistent routines.',
    icon: Brain,
    color: '#C084FC',
    gradient: 'from-[hsl(270,80%,75%)] to-[hsl(340,100%,71%)]',
    tech: ['React', 'Node.js', 'AI/ML', 'MongoDB'],
  },
  {
    name: 'Simple Chat Application',
    description: 'Real-time communication platform with file transfers, friend management, and emoji support.',
    icon: MessageCircle,
    color: '#00E5CC',
    gradient: 'from-[hsl(170,100%,45%)] to-[hsl(200,100%,50%)]',
    tech: ['Angular', 'Node.js', 'Socket.io'],
  },
  {
    name: 'Video Call Platform',
    description: 'Zoom-like video conferencing designed for the deaf community, utilizing Janus.js for high-quality streaming.',
    icon: Video,
    color: '#FF6B9D',
    gradient: 'from-[hsl(340,100%,71%)] to-[hsl(270,80%,75%)]',
    tech: ['Angular', 'Janus.js', 'WebRTC'],
  },
  {
    name: 'Gamerznet.net',
    description: 'Specialized social media platform for the gaming community with real-time chat reactions.',
    icon: Gamepad2,
    color: '#FFA94D',
    gradient: 'from-[hsl(30,100%,65%)] to-[hsl(51,100%,50%)]',
    tech: ['React', 'Socket.io', 'MongoDB'],
  },
  {
    name: 'Dermamatrimony',
    description: 'Niche matchmaking application designed to help users with skin conditions find compatible partners.',
    icon: Heart,
    color: '#FF6B9D',
    gradient: 'from-[hsl(340,100%,71%)] to-[hsl(0,80%,65%)]',
    tech: ['Angular', 'Node.js', 'MongoDB'],
  },
];

const ProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <section id="projects" className="section-padding relative" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-mono text-primary tracking-widest uppercase">Explorable Worlds</span>
          <h2 className="text-4xl md:text-6xl font-display font-bold mt-3 text-gradient-rose-teal">
            Project Galaxy
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, idx) => {
            const Icon = project.icon;
            return (
              <motion.div
                key={project.name}
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                whileHover={{ scale: 1.03, y: -5 }}
                onClick={() => setSelected(idx)}
                className="glass rounded-2xl p-6 cursor-pointer group relative overflow-hidden transition-shadow duration-500"
                style={{
                  boxShadow: `0 0 0px ${project.color}00`,
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = `0 0 30px ${project.color}40`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = `0 0 0px ${project.color}00`;
                }}
              >
                {/* Gradient accent */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${project.gradient} opacity-60 group-hover:opacity-100 transition-opacity`} />

                <div className="flex items-start gap-4 mb-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${project.color}20` }}
                  >
                    <Icon className="w-6 h-6" style={{ color: project.color }} />
                  </div>
                  <h3 className="text-lg font-display font-bold text-foreground leading-tight">
                    {project.name}
                  </h3>
                </div>

                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-1.5">
                  {project.tech.map(t => (
                    <span key={t} className="text-xs font-mono px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Project detail modal */}
      {selected !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-background/80 backdrop-blur-xl"
          onClick={() => setSelected(null)}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            className="glass-strong rounded-3xl p-8 max-w-lg w-full relative"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setSelected(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {(() => {
              const p = projects[selected];
              const Icon = p.icon;
              return (
                <>
                  <div className="flex items-center gap-4 mb-6">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center"
                      style={{ backgroundColor: `${p.color}20` }}
                    >
                      <Icon className="w-7 h-7" style={{ color: p.color }} />
                    </div>
                    <h3 className="text-2xl font-display font-bold text-foreground">{p.name}</h3>
                  </div>
                  <p className="text-muted-foreground mb-6">{p.description}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {p.tech.map(t => (
                      <span key={t} className="text-sm font-mono px-3 py-1 rounded-full border border-border text-foreground">
                        {t}
                      </span>
                    ))}
                  </div>
                </>
              );
            })()}
          </motion.div>
        </motion.div>
      )}
    </section>
  );
};

export default ProjectsSection;
