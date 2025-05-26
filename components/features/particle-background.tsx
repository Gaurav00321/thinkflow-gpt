"use client"

import { useEffect, useRef } from "react"

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: 0, y: 0, radius: 150 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions with higher pixel density
    const setCanvasDimensions = () => {
      const pixelRatio = window.devicePixelRatio || 1
      canvas.width = window.innerWidth * pixelRatio
      canvas.height = window.innerHeight * pixelRatio
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      ctx.scale(pixelRatio, pixelRatio)
    }

    setCanvasDimensions()

    // Particle properties
    const particlesArray: Particle[] = []
    const numberOfParticles = Math.min(120, Math.floor(window.innerWidth / 15))

    // Create particles
    for (let i = 0; i < numberOfParticles; i++) {
      particlesArray.push(new Particle(canvas))
    }

    // Mouse move handler
    const handleMouseMove = (event: MouseEvent) => {
      mouseRef.current.x = event.clientX
      mouseRef.current.y = event.clientY
    }

    // Animation loop
    let animationFrameId: number

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width / window.devicePixelRatio, canvas.height / window.devicePixelRatio)

      // Update and draw particles
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update(mouseRef.current)
        particlesArray[i].draw(ctx)
      }

      // Connect particles
      connectParticles(ctx, particlesArray, mouseRef.current)

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    // Event listeners
    window.addEventListener("resize", setCanvasDimensions)
    window.addEventListener("mousemove", handleMouseMove)

    // Cleanup
    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
      window.removeEventListener("mousemove", handleMouseMove)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none opacity-60"
      aria-hidden="true"
    />
  )
}

class Particle {
  x: number
  y: number
  size: number
  baseSize: number
  speedX: number
  speedY: number
  canvas: HTMLCanvasElement
  color: string
  glowColor: string
  baseSpeedX: number
  baseSpeedY: number

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas
    this.x = Math.random() * canvas.width
    this.y = Math.random() * canvas.height
    this.baseSize = Math.random() * 2 + 1
    this.size = this.baseSize
    this.speedX = (Math.random() - 0.5) * 0.8
    this.speedY = (Math.random() - 0.5) * 0.8
    this.baseSpeedX = this.speedX
    this.baseSpeedY = this.speedY
    
    // Create a purple-tinted color palette
    const hue = Math.random() * 60 + 240 // Range from 240 to 300 (blue to purple)
    const saturation = Math.random() * 40 + 60 // 60-100%
    const lightness = Math.random() * 20 + 50 // 50-70%
    this.color = `hsla(${hue}, ${saturation}%, ${lightness}%, 0.8)`
    this.glowColor = `hsla(${hue}, ${saturation}%, ${lightness}%, 0.3)`
  }

  update(mouse: { x: number; y: number; radius: number }) {
    // Update position
    this.x += this.speedX
    this.y += this.speedY

    // Mouse interaction
    const dx = mouse.x - this.x
    const dy = mouse.y - this.y
    const distance = Math.sqrt(dx * dx + dy * dy)

    if (distance < mouse.radius) {
      const force = (mouse.radius - distance) / mouse.radius
      const angle = Math.atan2(dy, dx)
      
      // Push particles away from mouse
      this.speedX = this.baseSpeedX - (Math.cos(angle) * force * 2)
      this.speedY = this.baseSpeedY - (Math.sin(angle) * force * 2)
      this.size = this.baseSize * (1 + force)
    } else {
      // Return to base values
      this.speedX = this.baseSpeedX
      this.speedY = this.baseSpeedY
      this.size = this.baseSize
    }

    // Wrap around edges
    if (this.x > this.canvas.width) this.x = 0
    else if (this.x < 0) this.x = this.canvas.width

    if (this.y > this.canvas.height) this.y = 0
    else if (this.y < 0) this.y = this.canvas.height
  }

  draw(ctx: CanvasRenderingContext2D) {
    // Draw glow
    const gradient = ctx.createRadialGradient(
      this.x,
      this.y,
      0,
      this.x,
      this.y,
      this.size * 3
    )
    gradient.addColorStop(0, this.glowColor)
    gradient.addColorStop(1, 'transparent')
    
    ctx.fillStyle = gradient
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.size * 3, 0, Math.PI * 2)
    ctx.fill()

    // Draw particle
    ctx.fillStyle = this.color
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
    ctx.fill()
  }
}

function connectParticles(
  ctx: CanvasRenderingContext2D,
  particles: Particle[],
  mouse: { x: number; y: number; radius: number }
) {
  const maxDistance = 120

  for (let a = 0; a < particles.length; a++) {
    for (let b = a; b < particles.length; b++) {
      const dx = particles[a].x - particles[b].x
      const dy = particles[a].y - particles[b].y
      const distance = Math.sqrt(dx * dx + dy * dy)

      if (distance < maxDistance) {
        // Calculate base opacity based on distance
        const opacity = (1 - distance / maxDistance) * 0.5

        // Check if either particle is near mouse for enhanced glow
        const mouseDistA = Math.sqrt(
          Math.pow(mouse.x - particles[a].x, 2) + Math.pow(mouse.y - particles[a].y, 2)
        )
        const mouseDistB = Math.sqrt(
          Math.pow(mouse.x - particles[b].x, 2) + Math.pow(mouse.y - particles[b].y, 2)
        )
        const mouseInfluence =
          (1 - Math.min(mouseDistA, mouseDistB) / mouse.radius) * 0.5

        // Create gradient for line
        const gradient = ctx.createLinearGradient(
          particles[a].x,
          particles[a].y,
          particles[b].x,
          particles[b].y
        )
        gradient.addColorStop(0, `hsla(260, 100%, 70%, ${opacity + mouseInfluence})`)
        gradient.addColorStop(1, `hsla(280, 100%, 70%, ${opacity + mouseInfluence})`)

        ctx.strokeStyle = gradient
        ctx.lineWidth = Math.min(opacity * 2, 0.5)
        ctx.beginPath()
        ctx.moveTo(particles[a].x, particles[a].y)
        ctx.lineTo(particles[b].x, particles[b].y)
        ctx.stroke()
      }
    }
  }
}
