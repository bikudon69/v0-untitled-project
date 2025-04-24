"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, Calendar, Clock } from "lucide-react"
import Image from "next/image"

export default function Blog() {
  const articles = [
    {
      title: "Building a Multi-Region AWS Architecture for High Availability",
      excerpt:
        "Learn how to design and implement a multi-region AWS architecture that ensures high availability and disaster recovery capabilities.",
      image: "/placeholder.svg?height=400&width=600",
      date: "Apr 15, 2023",
      readTime: "12 min read",
      tags: ["AWS", "Architecture", "High Availability"],
    },
    {
      title: "Implementing GitOps with ArgoCD and Kubernetes",
      excerpt:
        "A comprehensive guide to implementing GitOps workflows using ArgoCD for continuous delivery on Kubernetes clusters.",
      image: "/placeholder.svg?height=400&width=600",
      date: "Mar 22, 2023",
      readTime: "10 min read",
      tags: ["Kubernetes", "GitOps", "ArgoCD"],
    },
    {
      title: "Cost Optimization Strategies for Cloud Infrastructure",
      excerpt:
        "Practical strategies and tools to optimize your cloud infrastructure costs without sacrificing performance or reliability.",
      image: "/placeholder.svg?height=400&width=600",
      date: "Feb 8, 2023",
      readTime: "8 min read",
      tags: ["Cost Optimization", "Cloud", "FinOps"],
    },
  ]

  return (
    <section id="blog" className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <Badge className="mb-2">Resources</Badge>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Cloud & DevOps Insights</h2>
          <p className="text-muted-foreground">
            Technical articles, architecture diagrams, and best practices to help you navigate the world of cloud
            infrastructure and DevOps.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {articles.map((article, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-background rounded-xl border overflow-hidden hover:shadow-lg transition-all"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={article.image || "/placeholder.svg"}
                  alt={article.title}
                  fill
                  className="object-cover transition-transform hover:scale-105"
                />
              </div>
              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-3">
                  {article.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="font-bold text-xl mb-2">{article.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">{article.excerpt}</p>
                <div className="flex items-center text-sm text-muted-foreground mb-4">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>{article.date}</span>
                  <span className="mx-2">•</span>
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{article.readTime}</span>
                </div>
                <Button variant="ghost" size="sm" className="w-full justify-between group">
                  Read article
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Button variant="outline" className="group">
            View all articles
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </section>
  )
}
