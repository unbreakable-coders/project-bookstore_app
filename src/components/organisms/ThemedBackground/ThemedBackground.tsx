import { type FC, useEffect, useRef } from 'react';
import { useHolidayTheme } from '@/context/HolidayThemeContext';

// Тип однієї частинки
interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  color: string;
}

const CONFETTI_COLORS = ['#ff6b9d', '#4ecdc4', '#ffd93d', '#6bcf7f'];

const getRandomConfettiColor = () =>
  CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)];

export const ThemedBackground: FC = () => {
  const { theme } = useHolidayTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!theme.particles?.enabled || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const particles: Particle[] = [];
    const density = theme.particles.density || 50;

    const initParticles = () => {
      for (let i = 0; i < density; i++) {
        const baseSize = Math.random() * 2 + 1;
        let speedY = Math.random() * 1 + 0.5;
        let speedX = Math.random() * 0.5 - 0.25;
        let color = '';

        switch (theme.particles?.type) {
          case 'hearts':
            speedY = Math.random() * 0.8 + 0.5;
            speedX = Math.random() * 0.8 - 0.4;
            break;
          case 'leaves':
            speedY = Math.random() * 0.4 + 0.2;
            speedX = Math.random() * 0.5 - 0.25;
            break;
          case 'confetti':
            color = getRandomConfettiColor();
            break;
          case 'stars':
            speedY = Math.random() * 0.1 + 0.05;
            speedX = Math.random() * 0.1 - 0.05;
            break;
        }

        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: baseSize,
          speedX: speedX,
          speedY: speedY,
          opacity: Math.random() * 0.5 + 0.3,
          color: color,
        });
      }
    };

    initParticles();

    const drawParticle = (p: Particle) => {
      ctx.globalAlpha = p.opacity;

      switch (theme.particles?.type) {
        case 'snow':
          ctx.fillStyle = '#408ae3ff';
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
          break;

        case 'hearts':
          ctx.fillStyle = '#ff6b9d';
          ctx.font = `${p.size * 10}px Arial`;
          ctx.fillText('♥', p.x, p.y);
          break;

        case 'leaves':
          ctx.fillStyle = '#ffc000';
          ctx.font = `${p.size * 10}px Arial`;
          ctx.fillText('🍂', p.x, p.y);
          break;

        case 'stars':
          ctx.fillStyle = '#ffd700';
          ctx.font = `${p.size * 8}px Arial`;
          ctx.fillText('★', p.x, p.y);
          break;

        case 'confetti':
          ctx.fillStyle = p.color || CONFETTI_COLORS[0];
          ctx.fillRect(p.x, p.y, p.size * 3, p.size * 6);
          break;
      }

      ctx.globalAlpha = 1;
    };

    let animationFrameId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => {
        drawParticle(p);

        p.x += p.speedX;
        p.y += p.speedY;

        if (p.y > canvas.height + 10) {
          p.y = -p.size * 10;
          p.x = Math.random() * canvas.width;
          if (theme.particles?.type === 'confetti') {
            p.color = getRandomConfettiColor();
          }
        }

        if (p.x > canvas.width) p.x = 0;
        if (p.x < 0) p.x = canvas.width;
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme.particles]);

  const commonProps = {
    className: 'fixed inset-0 -z-10 pointer-events-none',
    style: {
      backgroundColor: 'transparent',
      transition: 'background-color 0.5s ease',
    },
  };

  if (!theme.particles?.enabled) {
    return <div {...commonProps} />;
  }

  return <canvas ref={canvasRef} {...commonProps} />;
};
