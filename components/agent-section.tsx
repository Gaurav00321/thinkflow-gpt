"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Terminal } from "lucide-react"
import { useState, useEffect } from "react"
import ParticleBackground from "./features/particle-background"

export default function AgentSection() {
  const [isTyping, setIsTyping] = useState(true);
  const [displayedCode, setDisplayedCode] = useState("");
  const fullCode = `const response = await fetch('https://api.thinkflowgpt.com/v1/generate', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_API_KEY'
  },
  body: JSON.stringify({
    prompt: 'Generate a creative marketing tagline for an AI product',
    max_tokens: 50,
    temperature: 0.7
  })
});

const data = await response.json();
console.log(data.result); // "Unleash Tomorrow's Potential Today with ThinkFlowGPT"`;

  useEffect(() => {
    let currentIndex = 0;
    let typingInterval: NodeJS.Timeout;

    const startTyping = () => {
      typingInterval = setInterval(() => {
        if (currentIndex < fullCode.length) {
          setDisplayedCode(prev => prev + fullCode[currentIndex]);
          currentIndex++;
        } else {
          clearInterval(typingInterval);
          setTimeout(() => {
            setDisplayedCode("");
            currentIndex = 0;
            startTyping();
          }, 2000);
        }
      }, 30);
    };

    startTyping();

    return () => {
      clearInterval(typingInterval);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden py-20">
      {/* Particle Background */}
      <ParticleBackground />

      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-950 to-purple-950/30 mix-blend-multiply" />
      
      {/* Background grid pattern */}
      <div 
        className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:radial-gradient(white,transparent_85%)] pointer-events-none opacity-10"
        style={{ backgroundSize: "30px 30px" }}
      />

      {/* Content container */}
      <div className="container relative z-10 px-4">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center text-4xl md:text-6xl font-bold mb-4"
        >
          <span className="bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
            ThinkFlowGPT
          </span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center text-lg md:text-xl text-gray-300 mb-16"
        >
          The future of software development, coded with intelligence
        </motion.p>

        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="w-full max-w-[800px] mx-auto"
        >
          <div className="rounded-lg overflow-hidden shadow-[0_0_30px_rgba(124,58,237,0.3)] border border-purple-500/30">
            {/* Terminal header */}
            <div className="bg-black/20 backdrop-blur-sm px-4 py-2 flex items-center">
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="ml-4 text-gray-400 text-sm flex items-center">
                <Terminal className="h-4 w-4 mr-2" />
                <span>ThinkFlowGPT API Example</span>
              </div>
            </div>

            {/* Terminal content with fixed height */}
            <div className="bg-black/10 backdrop-blur-sm h-[390px] font-mono text-sm relative">
              <div className="absolute inset-0 p-6 overflow-auto">
                {displayedCode.split('\n').map((line: string, index: number) => (
                  <div key={index} className="min-h-[1.5em] whitespace-pre relative">
                    {line.split(/([{}[\]().,;=<>+\-*/]|\s+)/).map((part: string, i: number) => {
                      let className = "text-gray-300"; // default color
                      if (part.match(/^(const|await|return)$/)) className = "text-purple-400";
                      else if (part.match(/^(fetch|JSON|console)$/)) className = "text-yellow-300";
                      else if (part.match(/^['"].*['"]$/)) className = "text-green-300";
                      else if (part.match(/^[0-9.]+$/)) className = "text-yellow-300";
                      else if (part.match(/^[{}[\]().,;=<>+\-*/]$/)) className = "text-white";
                      return <span key={i} className={className}>{part}</span>;
                    })}
                  </div>
                ))}
                <motion.span
                  className="inline-block w-2 h-4 bg-purple-400 ml-1"
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
