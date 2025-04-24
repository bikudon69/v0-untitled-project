"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ArrowDown, Server, Database, Cloud, Shield } from "lucide-react"

export default function Hero() {
  const scrollToAbout = () => {
    const aboutSection = document.querySelector("#about")
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section id="hero" className="relative pt-20 lg:pt-24 min-h-screen flex items-center overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-br from-primary/20 to-transparent" />
        <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <pattern id="grid" width="8" height="8" patternUnits="userSpaceOnUse">
            <path d="M 8 0 L 0 0 0 8" fill="none" stroke="currentColor" strokeWidth="0.5" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="container relative z-10 mx-auto px-4 py-16 md:py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col space-y-6"
          >
            <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              <span>DevOps / Solution Architect</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              <span className="block">Scalable. Secure.</span>
              <span className="block text-primary">✨ Your Cloud, My Expertise.</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-lg">
              With 4+ years of experience in cloud architecture and DevOps, I help businesses build efficient, secure,
              and scalable cloud solutions.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button size="lg" onClick={() => scrollToAbout()} className="group">
                Learn More
                <ArrowDown className="ml-2 h-4 w-4 transition-transform group-hover:translate-y-1" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => {
                  const contactSection = document.querySelector("#contact")
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: "smooth" })
                  }
                }}
              >
                Get in Touch
              </Button>
            </div>

            <div className="pt-6">
              <p className="text-sm text-muted-foreground mb-3">Expertise In:</p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 bg-background/80 backdrop-blur-sm border rounded-lg px-3 py-1.5">
                  <Cloud className="h-4 w-4 text-sky-500" />
                  <span className="text-sm font-medium">AWS</span>
                </div>
                <div className="flex items-center gap-2 bg-background/80 backdrop-blur-sm border rounded-lg px-3 py-1.5">
                  <Database className="h-4 w-4 text-blue-500" />
                  <span className="text-sm font-medium">DevOps</span>
                </div>
                <div className="flex items-center gap-2 bg-background/80 backdrop-blur-sm border rounded-lg px-3 py-1.5">
                  <Server className="h-4 w-4 text-green-500" />
                  <span className="text-sm font-medium">Architecture</span>
                </div>
                <div className="flex items-center gap-2 bg-background/80 backdrop-blur-sm border rounded-lg px-3 py-1.5">
                  <Shield className="h-4 w-4 text-red-500" />
                  <span className="text-sm font-medium">Security</span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <CloudInfrastructureDiagram />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center cursor-pointer"
          onClick={() => {
            const aboutSection = document.querySelector("#about")
            if (aboutSection) {
              aboutSection.scrollIntoView({ behavior: "smooth" })
            }
          }}
          role="button"
          tabIndex={0}
          aria-label="Scroll to about section"
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              const aboutSection = document.querySelector("#about")
              if (aboutSection) {
                aboutSection.scrollIntoView({ behavior: "smooth" })
              }
            }
          }}
        >
          <p className="text-sm text-muted-foreground mb-2 hover:text-primary transition-colors">
            Scroll to learn more
          </p>
          <ArrowDown className="h-5 w-5 mx-auto animate-bounce" />
        </motion.div>
      </div>
    </section>
  )
}

function CloudInfrastructureDiagram() {
  return (
    <div className="relative w-full h-[400px] md:h-[500px] bg-background/50 backdrop-blur-sm rounded-xl border shadow-lg p-6 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-background/0" />

      {/* Cloud Architecture Diagram */}
      <svg width="100%" height="100%" viewBox="0 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Cloud Platform */}
        <rect
          x="100"
          y="50"
          width="600"
          height="500"
          rx="20"
          fill="currentColor"
          fillOpacity="0.05"
          stroke="currentColor"
          strokeOpacity="0.2"
          strokeWidth="2"
        />
        <text x="400" y="30" textAnchor="middle" className="text-sm font-medium" fill="currentColor">
          Cloud Platform
        </text>

        {/* VPC */}
        <rect
          x="150"
          y="100"
          width="500"
          height="400"
          rx="10"
          fill="currentColor"
          fillOpacity="0.05"
          stroke="currentColor"
          strokeOpacity="0.2"
          strokeWidth="2"
          strokeDasharray="5 5"
        />
        <text x="180" y="90" className="text-xs" fill="currentColor">
          Virtual Private Cloud
        </text>

        {/* Availability Zones */}
        <rect
          x="180"
          y="150"
          width="200"
          height="300"
          rx="5"
          fill="#3b82f6"
          fillOpacity="0.1"
          stroke="#3b82f6"
          strokeOpacity="0.3"
          strokeWidth="1"
        />
        <text x="280" y="140" textAnchor="middle" className="text-xs" fill="currentColor">
          Availability Zone 1
        </text>

        <rect
          x="420"
          y="150"
          width="200"
          height="300"
          rx="5"
          fill="#3b82f6"
          fillOpacity="0.1"
          stroke="#3b82f6"
          strokeOpacity="0.3"
          strokeWidth="1"
        />
        <text x="520" y="140" textAnchor="middle" className="text-xs" fill="currentColor">
          Availability Zone 2
        </text>

        {/* Web Tier */}
        <rect
          x="200"
          y="180"
          width="160"
          height="80"
          rx="5"
          fill="#10b981"
          fillOpacity="0.2"
          stroke="#10b981"
          strokeWidth="1"
        />
        <text x="280" y="220" textAnchor="middle" className="text-xs" fill="currentColor">
          Web Servers
        </text>

        <rect
          x="440"
          y="180"
          width="160"
          height="80"
          rx="5"
          fill="#10b981"
          fillOpacity="0.2"
          stroke="#10b981"
          strokeWidth="1"
        />
        <text x="520" y="220" textAnchor="middle" className="text-xs" fill="currentColor">
          Web Servers
        </text>

        {/* App Tier */}
        <rect
          x="200"
          y="280"
          width="160"
          height="80"
          rx="5"
          fill="#6366f1"
          fillOpacity="0.2"
          stroke="#6366f1"
          strokeWidth="1"
        />
        <text x="280" y="320" textAnchor="middle" className="text-xs" fill="currentColor">
          Application Servers
        </text>

        <rect
          x="440"
          y="280"
          width="160"
          height="80"
          rx="5"
          fill="#6366f1"
          fillOpacity="0.2"
          stroke="#6366f1"
          strokeWidth="1"
        />
        <text x="520" y="320" textAnchor="middle" className="text-xs" fill="currentColor">
          Application Servers
        </text>

        {/* Database Tier */}
        <rect
          x="200"
          y="380"
          width="160"
          height="50"
          rx="5"
          fill="#f59e0b"
          fillOpacity="0.2"
          stroke="#f59e0b"
          strokeWidth="1"
        />
        <text x="280" y="410" textAnchor="middle" className="text-xs" fill="currentColor">
          Database Primary
        </text>

        <rect
          x="440"
          y="380"
          width="160"
          height="50"
          rx="5"
          fill="#f59e0b"
          fillOpacity="0.2"
          stroke="#f59e0b"
          strokeWidth="1"
        />
        <text x="520" y="410" textAnchor="middle" className="text-xs" fill="currentColor">
          Database Replica
        </text>

        {/* Load Balancer */}
        <rect
          x="320"
          y="100"
          width="160"
          height="40"
          rx="20"
          fill="#ec4899"
          fillOpacity="0.2"
          stroke="#ec4899"
          strokeWidth="1"
        />
        <text x="400" y="125" textAnchor="middle" className="text-xs" fill="currentColor">
          Load Balancer
        </text>

        {/* Connections */}
        <line x1="400" y1="140" x2="400" y2="160" stroke="currentColor" strokeOpacity="0.5" strokeWidth="1" />
        <line x1="400" y1="160" x2="280" y2="180" stroke="currentColor" strokeOpacity="0.5" strokeWidth="1" />
        <line x1="400" y1="160" x2="520" y2="180" stroke="currentColor" strokeOpacity="0.5" strokeWidth="1" />

        <line x1="280" y1="260" x2="280" y2="280" stroke="currentColor" strokeOpacity="0.5" strokeWidth="1" />
        <line x1="520" y1="260" x2="520" y2="280" stroke="currentColor" strokeOpacity="0.5" strokeWidth="1" />

        <line x1="280" y1="360" x2="280" y2="380" stroke="currentColor" strokeOpacity="0.5" strokeWidth="1" />
        <line x1="520" y1="360" x2="520" y2="380" stroke="currentColor" strokeOpacity="0.5" strokeWidth="1" />

        <line
          x1="360"
          y1="405"
          x2="440"
          y2="405"
          stroke="currentColor"
          strokeOpacity="0.5"
          strokeWidth="1"
          strokeDasharray="4 2"
        />

        {/* Security Group */}
        <rect
          x="140"
          y="80"
          width="520"
          height="440"
          rx="15"
          fill="none"
          stroke="#ef4444"
          strokeOpacity="0.3"
          strokeWidth="1"
          strokeDasharray="10 5"
        />
        <text x="180" y="70" className="text-xs" fill="#ef4444">
          Security Groups
        </text>
      </svg>

      {/* Animated Elements */}
      <div className="absolute top-[125px] left-[400px] w-2 h-2 rounded-full bg-primary animate-ping" />
      <div
        className="absolute top-[220px] left-[280px] w-2 h-2 rounded-full bg-green-500 animate-ping"
        style={{ animationDelay: "1s" }}
      />
      <div
        className="absolute top-[220px] left-[520px] w-2 h-2 rounded-full bg-green-500 animate-ping"
        style={{ animationDelay: "1.5s" }}
      />
      <div
        className="absolute top-[320px] left-[280px] w-2 h-2 rounded-full bg-indigo-500 animate-ping"
        style={{ animationDelay: "2s" }}
      />
      <div
        className="absolute top-[320px] left-[520px] w-2 h-2 rounded-full bg-indigo-500 animate-ping"
        style={{ animationDelay: "2.5s" }}
      />
      <div
        className="absolute top-[410px] left-[280px] w-2 h-2 rounded-full bg-amber-500 animate-ping"
        style={{ animationDelay: "3s" }}
      />
      <div
        className="absolute top-[410px] left-[520px] w-2 h-2 rounded-full bg-amber-500 animate-ping"
        style={{ animationDelay: "3.5s" }}
      />
    </div>
  )
}
