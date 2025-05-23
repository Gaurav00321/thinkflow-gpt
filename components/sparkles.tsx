"use client";

import { useEffect, useRef, useState } from "react";

// Custom hook for mouse position
export const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", updateMousePosition);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
    };
  }, []);

  return mousePosition;
};

interface SparklesProps {
  id?: string;
  background?: string;
  minSize?: number;
  maxSize?: number;
  particleDensity?: number;
  className?: string;
  particleColor?: string;
}

export const SparklesCore = ({
  id = "tsparticles",
  background = "transparent",
  minSize = 0.6,
  maxSize = 1.4,
  particleDensity = 100,
  className = "h-full w-full",
  particleColor = "#FFFFFF",
}: SparklesProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePosition = useMousePosition();
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Set initial dimensions
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas dimensions directly on the element
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particles: Particle[] = [];
    let animationFrameId: number;

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      canvasWidth: number;
      canvasHeight: number;

      constructor(canvasWidth: number, canvasHeight: number) {
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.x = Math.random() * this.canvasWidth;
        this.y = Math.random() * this.canvasHeight;
        this.size = Math.random() * (maxSize - minSize) + minSize;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Wrap around edges
        if (this.x > this.canvasWidth) this.x = 0;
        if (this.x < 0) this.x = this.canvasWidth;
        if (this.y > this.canvasHeight) this.y = 0;
        if (this.y < 0) this.y = this.canvasHeight;

        // Mouse interaction
        const dx = mousePosition.x - this.x;
        const dy = mousePosition.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 100) {
          const angle = Math.atan2(dy, dx);
          this.x -= Math.cos(angle) * 1;
          this.y -= Math.sin(angle) * 1;
        }
      }

      draw(context: CanvasRenderingContext2D) {
        context.fillStyle = particleColor;
        context.beginPath();
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        context.fill();
      }
    }

    const init = () => {
      particles = [];
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;

      for (let i = 0; i < particleDensity; i++) {
        particles.push(new Particle(canvasWidth, canvasHeight));
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        particle.update();
        particle.draw(ctx);
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    init();
    animate();

    const handleResize = () => {
      if (typeof window === "undefined") return;

      // Update canvas dimensions
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });

      // Reinitialize particles for new dimensions
      init();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [
    maxSize,
    minSize,
    particleColor,
    particleDensity,
    mousePosition.x,
    mousePosition.y,
  ]);

  return (
    <canvas
      ref={canvasRef}
      id={id}
      className={className}
      style={{
        background,
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",      }}
    />
  );
};
