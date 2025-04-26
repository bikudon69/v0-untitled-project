"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Terminal, X, Maximize2, Minimize2, Copy, CheckCheck } from "lucide-react"

type CommandHistory = {
  command: string
  output: string | JSX.Element
  isError?: boolean
}

export default function TerminalExperience() {
  const [input, setInput] = useState("")
  const [history, setHistory] = useState<CommandHistory[]>([])
  const [currentPath, setCurrentPath] = useState("~/portfolio")
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showWelcome, setShowWelcome] = useState(true)
  const [copied, setCopied] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Prevent this component from stealing focus on initial load
    const preventInitialFocus = () => {
      if (!sessionStorage.getItem("pageLoaded")) {
        sessionStorage.setItem("pageLoaded", "true")
        window.scrollTo(0, 0)
      }
    }

    preventInitialFocus()
  }, [])

  // Auto-scroll to bottom when history changes
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [history])

  // Only focus input when user interacts with the terminal
  useEffect(() => {
    // Don't auto-focus on initial page load
    const handleTerminalClick = () => {
      if (inputRef.current) {
        inputRef.current.focus()
      }
    }

    const terminalElement = terminalRef.current
    if (terminalElement) {
      terminalElement.addEventListener("click", handleTerminalClick)
    }

    return () => {
      if (terminalElement) {
        terminalElement.removeEventListener("click", handleTerminalClick)
      }
    }
  }, [])

  // Welcome message
  useEffect(() => {
    if (showWelcome) {
      const welcomeMessage = (
        <div className="text-green-500">
          <p className="text-xl font-bold mb-2">Welcome to Biku's DevOps Terminal!</p>
          <p className="mb-2">Try these commands to learn more about my skills and experience:</p>
          <ul className="list-disc list-inside mb-2 space-y-1">
            <li>
              <span className="text-primary font-mono">help</span> - Show available commands
            </li>
            <li>
              <span className="text-primary font-mono">skills</span> - List my technical skills
            </li>
            <li>
              <span className="text-primary font-mono">projects</span> - View my notable projects
            </li>
            <li>
              <span className="text-primary font-mono">experience</span> - See my work experience
            </li>
            <li>
              <span className="text-primary font-mono">certifications</span> - View my certifications
            </li>
            <li>
              <span className="text-primary font-mono">contact</span> - Get my contact information
            </li>
            <li>
              <span className="text-primary font-mono">clear</span> - Clear the terminal
            </li>
          </ul>
          <p>Type a command and press Enter to execute.</p>
        </div>
      )
      setHistory([{ command: "", output: welcomeMessage }])
      setShowWelcome(false)
    }
  }, [showWelcome])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && input.trim()) {
      executeCommand(input.trim())
      setInput("")
    }
  }

  const handleCopy = () => {
    const terminalContent = history
      .map((item) => {
        if (item.command) {
          return `$ ${item.command}\n${typeof item.output === "string" ? item.output : "Output is not plain text"}`
        }
        return typeof item.output === "string" ? item.output : "Output is not plain text"
      })
      .join("\n\n")

    navigator.clipboard.writeText(terminalContent)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const executeCommand = (cmd: string) => {
    const commandLower = cmd.toLowerCase()
    let output: string | JSX.Element = "Command not found. Type 'help' to see available commands."
    let isError = true

    // Add the command to history
    const newHistory = [...history, { command: cmd, output: "", isError: false }]

    // Process commands
    if (commandLower === "help") {
      output = (
        <div className="space-y-2">
          <p className="font-bold">Available Commands:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>
              <span className="text-primary font-mono">help</span> - Show this help message
            </li>
            <li>
              <span className="text-primary font-mono">skills</span> - List my technical skills
            </li>
            <li>
              <span className="text-primary font-mono">projects</span> - View my notable projects
            </li>
            <li>
              <span className="text-primary font-mono">experience</span> - See my work experience
            </li>
            <li>
              <span className="text-primary font-mono">certifications</span> - View my certifications
            </li>
            <li>
              <span className="text-primary font-mono">contact</span> - Get my contact information
            </li>
            <li>
              <span className="text-primary font-mono">clear</span> - Clear the terminal
            </li>
            <li>
              <span className="text-primary font-mono">ls</span> - List directory contents
            </li>
            <li>
              <span className="text-primary font-mono">cd [directory]</span> - Change directory
            </li>
            <li>
              <span className="text-primary font-mono">whoami</span> - Display user information
            </li>
            <li>
              <span className="text-primary font-mono">date</span> - Show current date and time
            </li>
          </ul>
        </div>
      )
      isError = false
    } else if (commandLower === "skills") {
      output = (
        <div className="space-y-3">
          <div>
            <p className="font-bold text-primary">Cloud Platforms:</p>
            <p>AWS (Advanced), Azure (Intermediate), GCP (Intermediate)</p>
          </div>
          <div>
            <p className="font-bold text-primary">DevOps & CI/CD:</p>
            <p>Docker, Kubernetes, Jenkins, GitHub Actions, GitLab CI, ArgoCD, Terraform, Ansible</p>
          </div>
          <div>
            <p className="font-bold text-primary">Monitoring & Observability:</p>
            <p>Prometheus, Grafana, ELK Stack, CloudWatch, Datadog</p>
          </div>
          <div>
            <p className="font-bold text-primary">Security:</p>
            <p>AWS Security Hub, GuardDuty, IAM, WAF, CloudTrail, VPC Security</p>
          </div>
          <div>
            <p className="font-bold text-primary">Programming:</p>
            <p>Python, Bash, JavaScript/TypeScript, Go (basic)</p>
          </div>
        </div>
      )
      isError = false
    } else if (commandLower === "projects") {
      output = (
        <div className="space-y-3">
          <div>
            <p className="font-bold text-primary">Multi-Region AWS Architecture (Financial Services)</p>
            <p>
              • Designed and implemented a highly available, fault-tolerant architecture across multiple AWS regions
            </p>
            <p>• Reduced recovery time objective (RTO) from hours to minutes</p>
            <p>• Implemented automated failover mechanisms with Route53 health checks</p>
          </div>
          <div>
            <p className="font-bold text-primary">Kubernetes Migration (E-commerce Platform)</p>
            <p>• Migrated monolithic application to microservices architecture on EKS</p>
            <p>• Implemented GitOps workflow with ArgoCD for continuous deployment</p>
            <p>• Reduced deployment times by 35% and improved resource utilization by 40%</p>
          </div>
          <div>
            <p className="font-bold text-primary">Cloud Cost Optimization (SaaS Provider)</p>
            <p>• Analyzed and optimized AWS infrastructure costs, saving $80K+ annually</p>
            <p>• Implemented auto-scaling policies based on usage patterns</p>
            <p>• Created custom dashboards for cost monitoring and forecasting</p>
          </div>
        </div>
      )
      isError = false
    } else if (commandLower === "experience") {
      output = (
        <div className="space-y-3">
          <div>
            <p className="font-bold text-primary">DevOps Solution Architect | Company Name | 2021-Present</p>
            <p>• Lead cloud architecture and DevOps initiatives for enterprise clients</p>
            <p>• Design and implement CI/CD pipelines and infrastructure automation</p>
            <p>• Provide technical leadership for cloud migration and modernization projects</p>
          </div>
          <div>
            <p className="font-bold text-primary">Cloud Engineer | Previous Company | 2019-2021</p>
            <p>• Managed AWS infrastructure for high-traffic web applications</p>
            <p>• Implemented containerization strategy using Docker and ECS</p>
            <p>• Developed infrastructure as code using Terraform and CloudFormation</p>
          </div>
        </div>
      )
      isError = false
    } else if (commandLower === "certifications") {
      output = (
        <div className="space-y-2">
          <p>• AWS Certified Solutions Architect - Professional</p>
          <p>• AWS Certified DevOps Engineer - Professional</p>
          <p>• Certified Kubernetes Administrator (CKA)</p>
          <p>• HashiCorp Certified Terraform Associate</p>
          <p>• Microsoft Certified: Azure Administrator Associate</p>
        </div>
      )
      isError = false
    } else if (commandLower === "contact") {
      output = (
        <div className="space-y-2">
          <p>• Email: bikulinuxer@gmail.com</p>
          <p>• Phone: +977 9815379697</p>
          <p>• LinkedIn: linkedin.com/in/bikushah</p>
          <p>• GitHub: github.com/biku-shah</p>
          <p>• Twitter: x.com/1bikushah</p>
        </div>
      )
      isError = false
    } else if (commandLower === "clear") {
      setHistory([])
      return
    } else if (commandLower === "ls") {
      output = "projects/  skills.md  experience.txt  certifications.pdf  contact.json"
      isError = false
    } else if (commandLower.startsWith("cd ")) {
      const dir = cmd.split(" ")[1]
      if (dir === "..") {
        if (currentPath !== "~") {
          setCurrentPath(currentPath.split("/").slice(0, -1).join("/") || "~")
          output = ""
        } else {
          output = "Already at root directory"
        }
      } else if (dir === "~" || dir === "/") {
        setCurrentPath("~")
        output = ""
      } else {
        setCurrentPath(`${currentPath}/${dir}`)
        output = ""
      }
      isError = false
    } else if (commandLower === "whoami") {
      output = "biku-shah - DevOps Solution Architect"
      isError = false
    } else if (commandLower === "date") {
      output = new Date().toString()
      isError = false
    } else if (commandLower.startsWith("sudo")) {
      output = "Nice try! You don't have sudo privileges here. 😉"
      isError = true
    } else if (commandLower.includes("rm -rf")) {
      output = "Whoa there! Let's not delete anything important. 😅"
      isError = true
    }

    // Update the last item in history with the output
    newHistory[newHistory.length - 1] = {
      command: cmd,
      output,
      isError,
    }

    setHistory(newHistory)
  }

  const handleDemoCommand = (command: string) => {
    setInput(command)
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  return (
    <section id="terminal-experience" className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <Badge className="mb-2">Interactive</Badge>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Live Terminal Experience</h2>
          <p className="text-muted-foreground">
            Explore my skills, projects, and experience through this interactive terminal. Type commands to discover
            more about my DevOps expertise.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className={`max-w-4xl mx-auto ${isFullscreen ? "fixed inset-0 z-50 m-0 max-w-none" : ""}`}
        >
          <Card className={`border shadow-lg overflow-hidden ${isFullscreen ? "h-full rounded-none" : ""}`}>
            <div className="bg-gray-800 text-white p-2 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Terminal className="h-4 w-4" />
                <span className="text-sm font-medium">DevOps Terminal</span>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 text-gray-400 hover:text-white hover:bg-gray-700 rounded-sm"
                  onClick={handleCopy}
                  title="Copy terminal content"
                >
                  {copied ? <CheckCheck className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 text-gray-400 hover:text-white hover:bg-gray-700 rounded-sm"
                  onClick={() => setIsFullscreen(!isFullscreen)}
                  title={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
                >
                  {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 text-gray-400 hover:text-white hover:bg-gray-700 rounded-sm"
                  onClick={() => setHistory([])}
                  title="Clear terminal"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <CardContent className={`p-0 ${isFullscreen ? "h-[calc(100%-40px)]" : "h-[400px]"}`}>
              <div ref={terminalRef} className="bg-gray-900 text-gray-100 p-4 font-mono text-sm h-full overflow-y-auto">
                {history.map((item, index) => (
                  <div key={index} className="mb-4">
                    {item.command && (
                      <div className="flex items-start">
                        <span className="text-green-400 mr-2">{currentPath}$</span>
                        <span>{item.command}</span>
                      </div>
                    )}
                    <div className={`mt-1 ${item.isError ? "text-red-400" : "text-gray-300"}`}>
                      {typeof item.output === "string" ? item.output : item.output}
                    </div>
                  </div>
                ))}
                <div className="flex items-center">
                  <span className="text-green-400 mr-2">{currentPath}$</span>
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    className="bg-transparent border-none outline-none text-white w-full"
                    aria-label="Terminal input"
                    autoComplete="off"
                    spellCheck="false"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="mt-8 max-w-4xl mx-auto">
          <p className="text-center text-sm text-muted-foreground mb-4">Try these commands:</p>
          <div className="flex flex-wrap justify-center gap-2">
            {["help", "skills", "projects", "experience", "certifications", "contact"].map((cmd) => (
              <Button
                key={cmd}
                variant="outline"
                size="sm"
                onClick={() => handleDemoCommand(cmd)}
                className="font-mono"
              >
                {cmd}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
