"use client"

import { motion } from "framer-motion"
import { Cloud, Lock, Gauge, Workflow, Brain, Repeat } from "lucide-react"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function Services() {
  const services = [
    {
      title: "Cloud Implementation, Migration & Modernization",
      description:
        "Design and implement highly resilient, performance-optimized architectures with operational excellence. Provide end-to-end cloud migration strategies with minimal disruption.",
      icon: <Cloud className="h-10 w-10 text-primary" />,
    },
    {
      title: "DevOps Automation",
      description:
        "Implement CI/CD pipelines and automate infrastructure using Terraform, CloudFormation, Docker, ECS, and EKS to reduce deployment times by 35%.",
      icon: <Workflow className="h-10 w-10 text-primary" />,
    },
    {
      title: "Security & Compliance",
      description:
        "Implement comprehensive security strategies using AWS Security Hub, GuardDuty, WAF, IAM, CloudTrail, and centralized logging.",
      icon: <Lock className="h-10 w-10 text-primary" />,
    },
    {
      title: "Cost Optimization",
      description:
        "Identify cost-saving opportunities and implement efficient architectures that optimize cloud spending without sacrificing performance.",
      icon: <Gauge className="h-10 w-10 text-primary" />,
    },
    {
      title: "Disaster Recovery & Resilience",
      description:
        "Design and implement robust disaster recovery solutions with high availability and business continuity planning.",
      icon: <Repeat className="h-10 w-10 text-primary" />,
    },
    {
      title: "AI/ML Workload Integration",
      description:
        "Deploy and optimize AI/ML workloads using Amazon Bedrock, Rekognition, SageMaker and other cutting-edge technologies.",
      icon: <Brain className="h-10 w-10 text-primary" />,
    },
  ]

  return (
    <section id="services" className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <Badge className="mb-2">My Services</Badge>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Expert Cloud & DevOps Solutions</h2>
          <p className="text-muted-foreground">
            Delivering comprehensive cloud and DevOps solutions tailored to your business needs. From migration to
            optimization, I ensure your cloud infrastructure is secure, scalable, and cost-effective.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full overflow-hidden transition-all hover:shadow-lg">
                <CardHeader>
                  <div className="mb-4">{service.icon}</div>
                  <CardTitle>{service.title}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
