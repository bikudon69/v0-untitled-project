"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function Achievements() {
  const metrics = [
    {
      label: "Cloud Architectures",
      value: 20,
      suffix: "+",
      description:
        "Designed and deployed secure, scalable, and cost-efficient cloud architectures for multinational companies.",
    },
    {
      label: "Cost Savings",
      value: 80,
      suffix: "K+",
      description: "Optimized cloud costs, saving companies $80K+ through workload efficiency and right-sizing.",
    },
    {
      label: "Deployment Time",
      value: 35,
      suffix: "%",
      description: "Reduced deployment times by 35% through DevOps automation and streamlined CI/CD pipelines.",
    },
    {
      label: "Security Compliance",
      value: 100,
      suffix: "%",
      description:
        "Architected AWS Well-Architected Framework-compliant solutions with security and compliance best practices.",
    },
  ]

  return (
    <section id="achievements" className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <Badge className="mb-2">Success Stories & Achievements</Badge>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Delivering Measurable Results</h2>
          <p className="text-muted-foreground">
            Proven track record of successful cloud and DevOps implementations that drive business value through
            improved performance, security, and cost efficiency.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {metrics.map((metric, index) => (
            <CounterCard key={index} metric={metric} index={index} />
          ))}
        </div>

        <div className="text-center mt-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl font-bold mb-4">Want to become the next success story?</h3>
            <Button
              size="lg"
              onClick={() => {
                const contactSection = document.querySelector("#contact")
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: "smooth" })
                }
              }}
            >
              Let's work together!
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function CounterCard({ metric, index }: { metric: any; index: number }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  useEffect(() => {
    if (isInView) {
      const duration = 2000 // ms
      const frameDuration = 1000 / 60 // 60fps
      const totalFrames = Math.round(duration / frameDuration)
      let frame = 0

      const counter = setInterval(() => {
        frame++
        const progress = frame / totalFrames
        const currentCount = Math.round(metric.value * progress)

        if (frame === totalFrames) {
          setCount(metric.value)
          clearInterval(counter)
        } else {
          setCount(currentCount)
        }
      }, frameDuration)

      return () => clearInterval(counter)
    }
  }, [isInView, metric.value])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="h-full">
        <CardContent className="p-6">
          <div className="text-center">
            <h3 className="text-3xl md:text-4xl font-bold text-primary mb-2">
              {isInView ? count : 0}
              {metric.suffix}
            </h3>
            <p className="font-medium mb-2">{metric.label}</p>
            <p className="text-sm text-muted-foreground">{metric.description}</p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
