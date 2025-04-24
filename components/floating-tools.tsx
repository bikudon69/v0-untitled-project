"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

// Define the tool icons with their properties
const devopsTools = [
  {
    name: "AWS",
    icon: "/images/tools/aws.svg",
    size: { width: 40, height: 40 },
    initialPosition: { x: "10%", y: "20%" },
    speed: 1,
    depth: 1,
  },
  {
    name: "Docker",
    icon: "/images/tools/docker.svg",
    size: { width: 45, height: 45 },
    initialPosition: { x: "25%", y: "60%" },
    speed: 1.5,
    depth: 2,
  },
  {
    name: "Kubernetes",
    icon: "/images/tools/kubernetes.svg",
    size: { width: 50, height: 50 },
    initialPosition: { x: "40%", y: "30%" },
    speed: 0.8,
    depth: 3,
  },
  {
    name: "Terraform",
    icon: "/images/tools/terraform.svg",
    size: { width: 42, height: 42 },
    initialPosition: { x: "60%", y: "70%" },
    speed: 1.2,
    depth: 2,
  },
  {
    name: "GitHub",
    icon: "/images/tools/github.svg",
    size: { width: 38, height: 38 },
    initialPosition: { x: "75%", y: "40%" },
    speed: 1.3,
    depth: 1,
  },
  {
    name: "Jenkins",
    icon: "/images/tools/jenkins.svg",
    size: { width: 44, height: 44 },
    initialPosition: { x: "85%", y: "65%" },
    speed: 0.9,
    depth: 3,
  },
  {
    name: "Ansible",
    icon: "/images/tools/ansible.svg",
    size: { width: 40, height: 40 },
    initialPosition: { x: "15%", y: "80%" },
    speed: 1.1,
    depth: 2,
  },
  {
    name: "GitLab",
    icon: "/images/tools/gitlab.svg",
    size: { width: 38, height: 38 },
    initialPosition: { x: "35%", y: "50%" },
    speed: 1.4,
    depth: 1,
  },
  {
    name: "Prometheus",
    icon: "/images/tools/prometheus.svg",
    size: { width: 42, height: 42 },
    initialPosition: { x: "55%", y: "25%" },
    speed: 1,
    depth: 3,
  },
  {
    name: "Grafana",
    icon: "/images/tools/grafana.svg",
    size: { width: 40, height: 40 },
    initialPosition: { x: "70%", y: "75%" },
    speed: 1.2,
    depth: 2,
  },
]

// Create placeholder SVGs for each tool
const toolPlaceholders = {
  aws: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="text-[#FF9900]"><path d="M2 12a5 5 0 0 0 5 5 5 5 0 0 0 5-5 5 5 0 0 0-5-5 5 5 0 0 0-5 5Z"/><path d="M12 7a5 5 0 0 0 5 5 5 5 0 0 0 5-5 5 5 0 0 0-5-5 5 5 0 0 0-5 5Z"/><path d="M12 17a5 5 0 0 0 5 5 5 5 0 0 0 5-5 5 5 0 0 0-5-5 5 5 0 0 0-5 5Z"/></svg>`,
  docker: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="text-[#2496ED]"><path d="M22 12.5c0 1.4-1.1 2.5-2.5 2.5S17 13.9 17 12.5 18.1 10 19.5 10 22 11.1 22 12.5Z"/><path d="M5 10h14"/><path d="M5 6h14"/><path d="M5 14h14"/><path d="M5 18h14"/><path d="M2 6h2"/><path d="M2 10h2"/><path d="M2 14h2"/><path d="M2 18h2"/></svg>`,
  kubernetes: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="text-[#326CE5]"><circle cx="12" cy="12" r="10"/><path d="m8 12 4 4 4-4"/><path d="m8 8 4 4 4-4"/></svg>`,
  terraform: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="text-[#7B42BC]"><rect width="8" height="8" x="2" y="2" rx="1"/><rect width="8" height="8" x="14" y="2" rx="1"/><rect width="8" height="8" x="2" y="14" rx="1"/><rect width="8" height="8" x="14" y="14" rx="1"/></svg>`,
  github: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>`,
  jenkins: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="text-[#D33833]"><path d="M14.7 2c.2.6.3 1.2.3 1.8 0 3.3-2.7 6-6 6s-6-2.7-6-6c0-.6.1-1.2.3-1.8h11.4Z"/><path d="M12 9v5"/><path d="M8 9v5"/><path d="M4 9v5"/><path d="M2 18a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v2H2v-2Z"/></svg>`,
  ansible: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="text-[#EE0000]"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z"/><path d="m9 8 7 8"/><path d="m8 15 2-5"/></svg>`,
  gitlab: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="text-[#FC6D26]"><path d="m22 13.29-3.33-10a.42.42 0 0 0-.14-.18.38.38 0 0 0-.22-.11.39.39 0 0 0-.23.07.42.42 0 0 0-.14.18l-2.26 6.67H8.32L6.1 3.26a.42.42 0 0 0-.1-.18.38.38 0 0 0-.26-.08.39.39 0 0 0-.23.07.42.42 0 0 0-.14.18L2 13.29a.74.74 0 0 0 .27.83L12 21l9.69-6.88a.71.71 0 0 0 .31-.83Z"/></svg>`,
  prometheus: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="text-[#E6522C]"><path d="M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Z"/><path d="M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z"/></svg>`,
  grafana: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="text-[#F46800]"><path d="M7 12a5 5 0 0 1 5-5v10a5 5 0 0 1-5-5Z"/><path d="M12 7v10"/><path d="M17 12a5 5 0 0 0-5-5"/><path d="M12 17a5 5 0 0 0 5-5"/></svg>`,
}

export default function FloatingTools() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="fixed bottom-0 left-0 w-full h-40 md:h-60 pointer-events-none overflow-hidden z-10">
      <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>

      {devopsTools.map((tool, index) => {
        // Generate random animation durations and delays
        const floatDuration = 10 + Math.random() * 15
        const floatDelay = Math.random() * 5
        const rotateDuration = 20 + Math.random() * 20
        const rotateDelay = Math.random() * 5
        const pulseDuration = 2 + Math.random() * 3
        const pulseDelay = Math.random() * 2

        // Calculate opacity based on depth (deeper = more transparent)
        const opacity = 1 - (tool.depth - 1) * 0.2

        // Calculate scale based on depth (deeper = smaller)
        const scale = 1 - (tool.depth - 1) * 0.15

        return (
          <motion.div
            key={index}
            className="absolute"
            style={{
              left: tool.initialPosition.x,
              top: tool.initialPosition.y,
              zIndex: 10 - tool.depth,
              opacity,
            }}
            initial={{ scale }}
            animate={{
              x: [0, tool.speed * 20 * (Math.random() > 0.5 ? 1 : -1), 0],
              y: [0, tool.speed * -15, 0],
              rotate: [0, Math.random() > 0.5 ? 10 : -10, 0],
              scale: [scale, scale * 1.05, scale],
            }}
            transition={{
              x: {
                repeat: Number.POSITIVE_INFINITY,
                duration: floatDuration,
                delay: floatDelay,
                ease: "easeInOut",
              },
              y: {
                repeat: Number.POSITIVE_INFINITY,
                duration: floatDuration * 0.7,
                delay: floatDelay,
                ease: "easeInOut",
              },
              rotate: {
                repeat: Number.POSITIVE_INFINITY,
                duration: rotateDuration,
                delay: rotateDelay,
                ease: "easeInOut",
              },
              scale: {
                repeat: Number.POSITIVE_INFINITY,
                duration: pulseDuration,
                delay: pulseDelay,
                ease: "easeInOut",
              },
            }}
          >
            <div className="relative flex items-center justify-center">
              <div className="absolute inset-0 bg-primary/10 rounded-full filter blur-md"></div>
              <div
                className="relative p-2 bg-background/80 backdrop-blur-sm rounded-full shadow-lg"
                dangerouslySetInnerHTML={{
                  __html:
                    toolPlaceholders[tool.name.toLowerCase() as keyof typeof toolPlaceholders] || toolPlaceholders.aws,
                }}
                style={{ width: tool.size.width, height: tool.size.height }}
              ></div>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}
