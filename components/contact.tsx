"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Phone, Calendar, Github, Linkedin, Twitter } from "lucide-react"

export default function Contact() {
  return (
    <section id="contact" className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <Badge className="mb-2">Contact</Badge>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Let's Build the Future Together!</h2>
          <p className="text-muted-foreground">
            Ready to transform your cloud infrastructure? Whether you need migration, optimization, or security
            enhancements, I'm here to help you build something exceptional.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Card className="border shadow-lg">
              <CardHeader>
                <CardTitle className="text-center">Contact Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-start gap-4">
                    <Mail className="h-6 w-6 text-primary mt-1" />
                    <div>
                      <h4 className="font-semibold mb-1">Email</h4>
                      <a
                        href="mailto:bikulinuxer@gmail.com"
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        bikulinuxer@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Phone className="h-6 w-6 text-primary mt-1" />
                    <div>
                      <h4 className="font-semibold mb-1">Phone</h4>
                      <a
                        href="tel:+9779815379697"
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        +977 9815379697
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Linkedin className="h-6 w-6 text-primary mt-1" />
                    <div>
                      <h4 className="font-semibold mb-1">LinkedIn</h4>
                      <a
                        href="https://linkedin.com/in/bikushah"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        linkedin.com/in/bikushah
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Github className="h-6 w-6 text-primary mt-1" />
                    <div>
                      <h4 className="font-semibold mb-1">GitHub</h4>
                      <a
                        href="https://github.com/biku-shah"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        github.com/biku-shah
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Twitter className="h-6 w-6 text-primary mt-1" />
                    <div>
                      <h4 className="font-semibold mb-1">Twitter</h4>
                      <a
                        href="https://x.com/1bikushah"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        x.com/1bikushah
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Calendar className="h-6 w-6 text-primary mt-1" />
                    <div>
                      <h4 className="font-semibold mb-1">Schedule a Call</h4>
                      <p className="text-sm text-muted-foreground">
                        30-minute consultation to discuss your cloud challenges
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex justify-center">
                  <Button size="lg" className="px-8" onClick={() => window.open("https://calendly.com", "_blank")}>
                    Schedule a Consultation
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
