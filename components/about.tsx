"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Cloud, Shield, Gauge } from "lucide-react"

export default function About() {
  const expertise = [
    {
      title: "Cloud Expert",
      description: "AWS certified solutions architect",
      icon: <Cloud className="h-8 w-8 text-sky-500" />,
    },
    {
      title: "DevOps Master",
      description: "CI/CD and automation specialist",
      icon: <CheckCircle className="h-8 w-8 text-green-500" />,
    },
    {
      title: "Security Focused",
      description: "Implement robust security solutions",
      icon: <Shield className="h-8 w-8 text-red-500" />,
    },
    {
      title: "Cost Optimizer",
      description: "$80K+ saved through optimization",
      icon: <Gauge className="h-8 w-8 text-amber-500" />,
    },
  ]

  return (
    <section id="about" className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="relative w-full aspect-square max-w-md mx-auto lg:mx-0">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-primary/5 rounded-2xl transform -rotate-3" />
              <div className="absolute inset-0 bg-gradient-to-bl from-primary/10 to-background/80 rounded-2xl transform rotate-3" />
              <div className="relative h-full w-full overflow-hidden rounded-xl border shadow-xl">
                {/* Fallback placeholder shown while image loads */}
                <div className="absolute inset-0 flex items-center justify-center bg-muted">
                  <span className="text-muted-foreground">Loading profile image...</span>
                </div>
                <Image
                  src="/images/biku-portrait.png"
                  alt="Biku Shah - DevOps Solution Architect"
                  width={600}
                  height={600}
                  className="object-cover h-full w-full relative z-10"
                  priority
                  onError={(e) => {
                    // Fallback to a placeholder if the image fails to load
                    const target = e.target as HTMLImageElement
                    target.src = "https://via.placeholder.com/600x600?text=Biku+Shah"
                    target.onerror = null // Prevent infinite loop if placeholder also fails
                  }}
                />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col space-y-6"
          >
            <div>
              <Badge className="mb-2">About Me</Badge>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">The Expert Behind The Cloud</h2>
              <h3 className="text-xl font-medium text-primary mb-4">Biku Shah - DevOps Solution Architect</h3>
              <p className="text-muted-foreground mb-6">Hi, I'm Biku Shah</p>
              <p className="text-muted-foreground mb-6">
                As a DevOps/Solution Architect with over 4+ years of experience, I specialize in designing and
                implementing secure, scalable, and cost-efficient cloud architectures that help businesses thrive in the
                digital landscape.
              </p>
              <p className="text-muted-foreground">
                My expertise spans across cloud computing, solution architecture, DevOps automation, cloud migration,
                security, and disaster recovery. I've successfully delivered high-impact projects for multinational
                companies in finance, healthcare, e-commerce, logistics, OTT streaming, ERP, and AI/ML workloads.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
              {expertise.map((item, index) => (
                <Card key={index} className="border bg-background/50 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center text-center">
                      <div className="mb-4">{item.icon}</div>
                      <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
