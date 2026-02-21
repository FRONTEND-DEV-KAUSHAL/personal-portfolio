import { useEffect, useRef, useCallback } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface Trail {
  x: number;
  y: number;
  id: number;
  color: string;
}

const COLORS = ['#FF6B9D', '#00E5CC', '#FFA94D', '#C084FC', '#FFD700'];

const CustomCursor = () => {
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const springX = useSpring(cursorX, { stiffness: 500, damping: 28 });
  const springY = useSpring(cursorY, { stiffness: 500, damping: 28 });

  const isHovering = useRef(false);
  const isClicking = useRef(false);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const trailCanvasRef = useRef<HTMLCanvasElement>(null);
  const trails = useRef<Trail[]>([]);
  const trailId = useRef(0);
  const mousePos = useRef({ x: 0, y: 0 });
  const animFrameRef = useRef<number>(0);

  const drawTrails = useCallback(() => {
    const canvas = trailCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const now = Date.now();
    trails.current = trails.current.filter((t) => now - t.id < 600);

    trails.current.forEach((t) => {
      const age = (now - t.id) / 600;
      const size = (1 - age) * 4;
      const opacity = (1 - age) * 0.7;
      ctx.beginPath();
      ctx.arc(t.x, t.y, size, 0, Math.PI * 2);
      ctx.fillStyle = t.color + Math.round(opacity * 255).toString(16).padStart(2, '0');
      ctx.fill();
    });

    animFrameRef.current = requestAnimationFrame(drawTrails);
  }, []);

  useEffect(() => {
    // Hide default cursor
    document.body.style.cursor = 'none';

    const handleMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      mousePos.current = { x: e.clientX, y: e.clientY };

      // Add trail particle
      trails.current.push({
        x: e.clientX,
        y: e.clientY,
        id: Date.now(),
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
      });
    };

    const handleEnterInteractive = () => {
      isHovering.current = true;
      if (cursorRingRef.current) {
        cursorRingRef.current.style.transform = 'translate(-50%, -50%) scale(2)';
        cursorRingRef.current.style.borderColor = '#FF6B9D';
        cursorRingRef.current.style.backgroundColor = 'rgba(255,107,157,0.1)';
      }
      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = 'translate(-50%, -50%) scale(0.5)';
      }
    };

    const handleLeaveInteractive = () => {
      isHovering.current = false;
      if (cursorRingRef.current) {
        cursorRingRef.current.style.transform = 'translate(-50%, -50%) scale(1)';
        cursorRingRef.current.style.borderColor = '#00E5CC';
        cursorRingRef.current.style.backgroundColor = 'transparent';
      }
      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = 'translate(-50%, -50%) scale(1)';
      }
    };

    const handleMouseDown = () => {
      isClicking.current = true;
      if (cursorRingRef.current) {
        cursorRingRef.current.style.transform = `translate(-50%, -50%) scale(${isHovering.current ? 1.5 : 0.8})`;
      }
    };

    const handleMouseUp = () => {
      isClicking.current = false;
      if (cursorRingRef.current) {
        cursorRingRef.current.style.transform = `translate(-50%, -50%) scale(${isHovering.current ? 2 : 1})`;
      }
    };

    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    // Observe interactive elements
    const addListeners = () => {
      const interactives = document.querySelectorAll('a, button, [role="button"], input, textarea, [data-interactive]');
      interactives.forEach((el) => {
        el.addEventListener('mouseenter', handleEnterInteractive);
        el.addEventListener('mouseleave', handleLeaveInteractive);
        (el as HTMLElement).style.cursor = 'none';
      });
    };

    addListeners();
    const observer = new MutationObserver(addListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    animFrameRef.current = requestAnimationFrame(drawTrails);

    return () => {
      document.body.style.cursor = '';
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      observer.disconnect();
      cancelAnimationFrame(animFrameRef.current);
    };
  }, [cursorX, cursorY, drawTrails]);

  // Hide on mobile/touch
  const isTouchDevice = typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0);
  if (isTouchDevice) return null;

  return (
    <>
      <canvas
        ref={trailCanvasRef}
        className="fixed inset-0 z-[9998] pointer-events-none"
        style={{ width: '100vw', height: '100vh' }}
      />
      {/* Dot */}
      <motion.div
        ref={cursorDotRef}
        className="fixed z-[9999] pointer-events-none rounded-full"
        style={{
          left: springX,
          top: springY,
          width: 8,
          height: 8,
          backgroundColor: '#FF6B9D',
          transform: 'translate(-50%, -50%)',
          boxShadow: '0 0 10px #FF6B9D80',
        }}
      />
      {/* Ring */}
      <motion.div
        ref={cursorRingRef}
        className="fixed z-[9999] pointer-events-none rounded-full transition-all duration-200"
        style={{
          left: springX,
          top: springY,
          width: 36,
          height: 36,
          border: '1.5px solid #00E5CC',
          transform: 'translate(-50%, -50%)',
        }}
      />
    </>
  );
};

export default CustomCursor;
