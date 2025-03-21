"use client"

import { useRef, useEffect, useMemo } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, useGLTF, Environment } from "@react-three/drei"
import { useTheme } from "next-themes"
import gsap from "gsap"
import * as THREE from "three"

function Model({ theme }: { theme: string | undefined }) {
  const group = useRef<THREE.Group>(null)
  const { scene } = useGLTF("/assets/3d/duck.glb")

  useEffect(() => {
    if (group.current) {
      gsap.to(group.current.rotation, {
        y: group.current.rotation.y + Math.PI * 2,
        duration: 20,
        ease: "none",
        repeat: -1,
      })
    }
  }, [])

  // Clone the scene to avoid modifying the original
  const model = useMemo(() => {
    return scene.clone()
  }, [scene])

  // Apply material color based on theme
  useEffect(() => {
    if (model) {
      model.traverse((child) => {
        if (child instanceof THREE.Mesh && child.material) {
          // Check if it's a single material or an array
          if (Array.isArray(child.material)) {
            child.material.forEach((mat) => {
              mat.color = new THREE.Color(theme === "dark" ? "#8a2be2" : "#ff6b6b")
            })
          } else {
            child.material.color = new THREE.Color(theme === "dark" ? "#8a2be2" : "#ff6b6b")
          }
        }
      })
    }
  }, [model, theme])

  return (
    <group ref={group}>
      <primitive object={model} scale={2} position={[0, -1, 0]} />
    </group>
  )
}

export function HeroSection() {
  const { theme } = useTheme()

  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      <div className="container flex flex-col md:flex-row items-center">
        <div className="flex flex-col space-y-6 md:w-1/2 text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight tracking-tighter">
            The Ultimate AI-Powered SaaS for <span className="text-primary">Businesses & Students</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-[600px]">
            Seamless AI-assisted coding, workflow automation, and interactive conversations with cutting-edge AI models.
          </p>
          <div className="flex flex-wrap justify-center md:justify-start gap-4">
            <Link href="/chat">
              <Button size="lg" className="h-12 px-8">
                Try for free
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button variant="outline" size="lg" className="h-12 px-8">
                Dashboard
              </Button>
            </Link>
          </div>
        </div>
        <div className="w-full md:w-1/2 h-[400px] mt-10 md:mt-0">
          <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
            <Model theme={theme} />
            <OrbitControls enableZoom={false} enablePan={false} />
            <Environment preset="city" />
          </Canvas>
        </div>
      </div>
    </section>
  )
}

