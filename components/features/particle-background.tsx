"use client"

import { useEffect, useRef } from "react"

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Particle properties
    const particlesArray: Particle[] = []
    const numberOfParticles = Math.min(100, Math.floor(window.innerWidth / 20))

    // Create particles
    for (let i = 0; i < numberOfParticles; i++) {
      particlesArray.push(new Particle(canvas))
    }

    // Animation loop
    let animationFrameId: number

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update and draw particles
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update()
        particlesArray[i].draw(ctx)
      }

      // Connect particles
      connectParticles(ctx, particlesArray)

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    // Cleanup
    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none opacity-40"
      aria-hidden="true"
    />
  )
}

class Particle {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  canvas: HTMLCanvasElement
  color: string

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas
    this.x = Math.random() * canvas.width
    this.y = Math.random() * canvas.height
    this.size = Math.random() * 3 + 1
    this.speedX = Math.random() * 0.5 - 0.25
    this.speedY = Math.random() * 0.5 - 0.25
    this.color = `rgba(${Math.floor(Math.random() * 100 + 155)}, ${Math.floor(Math.random() * 50 + 100)}, ${Math.floor(Math.random() * 155 + 100)}, ${Math.random() * 0.5 + 0.2})`
  }

  update() {
    // Update position
    this.x += this.speedX
    this.y += this.speedY

    // Bounce off edges
    if (this.x > this.canvas.width || this.x < 0) {
      this.speedX = -this.speedX
    }

    if (this.y > this.canvas.height || this.y < 0) {
      this.speedY = -this.speedY
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.color
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
    ctx.fill()
  }
}

function connectParticles(ctx: CanvasRenderingContext2D, particles: Particle[]) {
  const maxDistance = 150

  for (let a = 0; a < particles.length; a++) {
    for (let b = a; b < particles.length; b++) {
      const dx = particles[a].x - particles[b].x
      const dy = particles[a].y - particles[b].y
      const distance = Math.sqrt(dx * dx + dy * dy)

      if (distance < maxDistance) {
        const opacity = 1 - distance / maxDistance
        ctx.strokeStyle = `rgba(148, 0, 211, ${opacity * 0.5})`
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.moveTo(particles[a].x, particles[a].y)
        ctx.lineTo(particles[b].x, particles[b].y)
        ctx.stroke()
      }
    }
  }
}
