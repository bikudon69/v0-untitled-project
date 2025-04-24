"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"
import Image from "next/image"

export default function Testimonials() {
  const testimonials = [
    {
      quote:
        "Working with this DevOps architect transformed our infrastructure. We've seen dramatic improvements in reliability, performance, and our team's ability to deliver features quickly.",
      author: "Sarah Johnson",
      title: "CTO, FinTech Innovations",
      image: "/placeholder.svg?height=100&width=100",
      logo: "/placeholder-logo.svg",
    },
    {
      quote:
        "The cloud migration strategy was executed flawlessly. We moved our entire infrastructure to AWS with zero downtime and have seen a 40% reduction in our monthly cloud spend.",
      author: "Michael Chen",
      title: "VP of Engineering, E-commerce Platform",
      image: "/placeholder.svg?height=100&width=100",
      logo: "/placeholder-logo.svg",
    },
    {
      quote:
        "The Kubernetes implementation has been a game-changer for our development workflow. We can now deploy multiple times a day with confidence, and our infrastructure scales automatically with demand.",
      author: "Alex Rodriguez",
      title: "Director of DevOps, SaaS Provider",
      image: "/placeholder.svg?height=100&width=100",
      logo: "/placeholder-logo.svg",
    },
  ]

  const [current, setCurrent] = useState(0)
  const [autoplay, setAutoplay] = useState(true)

  useEffect(() => {
    if (!autoplay) return

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [autoplay, testimonials.length])

  const next = () => {
    setAutoplay(false)
    setCurrent((prev) => (prev + 1) % testimonials.length)
  }

  const prev = () => {
    setAutoplay(false)
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section id="testimonials" className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <Badge className="mb-2">Testimonials</Badge>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">What Clients Say</h2>
          <p className="text-muted-foreground">
            Don't just take my word for it. Here's what clients have to say about working together on their cloud and
            DevOps initiatives.
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden rounded-xl bg-background border">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${current * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="w-full flex-shrink-0">
                  <div className="grid md:grid-cols-5 gap-6 p-6 md:p-8">
                    <div className="md:col-span-3 flex flex-col justify-center">
                      <Quote className="h-10 w-10 text-primary/20 mb-4" />
                      <blockquote className="text-lg md:text-xl font-medium mb-6">"{testimonial.quote}"</blockquote>
                      <div className="flex items-center gap-4">
                        <Image
                          src={testimonial.image || "/placeholder.svg"}
                          alt={testimonial.author}
                          width={48}
                          height={48}
                          className="rounded-full"
                        />
                        <div>
                          <div className="font-medium">{testimonial.author}</div>
                          <div className="text-sm text-muted-foreground">{testimonial.title}</div>
                        </div>
                      </div>
                    </div>
                    <div className="md:col-span-2 flex items-center justify-center">
                      <div className="bg-muted/30 rounded-lg p-8 w-full h-full flex items-center justify-center">
                        <Image
                          src={testimonial.logo || "/placeholder.svg"}
                          alt="Company logo"
                          width={200}
                          height={100}
                          className="max-w-[200px] max-h-[100px] object-contain"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center mt-6 gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setAutoplay(false)
                  setCurrent(index)
                }}
                className={`w-2.5 h-2.5 rounded-full transition-colors ${
                  current === index ? "bg-primary" : "bg-muted-foreground/30"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          <Button
            variant="outline"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-background/80 backdrop-blur-sm"
            onClick={prev}
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-background/80 backdrop-blur-sm"
            onClick={next}
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  )
}
