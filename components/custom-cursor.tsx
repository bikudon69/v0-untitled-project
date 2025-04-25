"use client"

import { useEffect, useState, useRef } from "react"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [prevMousePosition, setPrevMousePosition] = useState({ x: 0, y: 0 })
  const [velocity, setVelocity] = useState({ x: 0, y: 0 })
  const [rotation, setRotation] = useState(0)
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isMoving, setIsMoving] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const [bubbles, setBubbles] = useState<{ id: number; x: number; y: number; size: number; delay: number }[]>([])
  const requestRef = useRef<number>()
  const lastTimeRef = useRef<number>(0)
  const idleTimerRef = useRef<number>(0)
  const bubbleIdRef = useRef<number>(0)
  const { theme } = useTheme()

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    setPrefersReducedMotion(mediaQuery.matches)

    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches)
    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [])

  // Check if it's a mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
          window.innerWidth <= 768,
      )
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Animation loop using requestAnimationFrame
  useEffect(() => {
    if (isMobile || prefersReducedMotion) return

    const animate = (time: number) => {
      if (!lastTimeRef.current) {
        lastTimeRef.current = time
      }

      const deltaTime = time - lastTimeRef.current
      lastTimeRef.current = time

      // Calculate velocity
      const dx = mousePosition.x - prevMousePosition.x
      const dy = mousePosition.y - prevMousePosition.y
      const distance = Math.sqrt(dx * dx + dy * dy)

      // Update velocity with some smoothing
      setVelocity((prev) => ({
        x: prev.x * 0.8 + dx * 0.2,
        y: prev.y * 0.8 + dy * 0.2,
      }))

      // Calculate rotation based on movement direction
      if (distance > 0.5) {
        const angle = Math.atan2(dy, dx) * (180 / Math.PI)
        setRotation((prev) => {
          // Smooth rotation transition
          const diff = angle - prev
          const adjustedDiff = diff > 180 ? diff - 360 : diff < -180 ? diff + 360 : diff
          return prev + adjustedDiff * 0.2
        })
        idleTimerRef.current = 0
        setIsMoving(true)
      } else {
        idleTimerRef.current += deltaTime
        if (idleTimerRef.current > 100) {
          setIsMoving(false)
        }
      }

      // Create bubbles occasionally when moving
      if (distance > 2 && Math.random() < 0.05) {
        const newBubble = {
          id: bubbleIdRef.current++,
          x: mousePosition.x,
          y: mousePosition.y,
          size: 3 + Math.random() * 5,
          delay: Math.random() * 0.5,
        }
        setBubbles((prev) => [...prev.slice(-4), newBubble]) // Keep only the last 5 bubbles
      }

      setPrevMousePosition(mousePosition)
      requestRef.current = requestAnimationFrame(animate)
    }

    requestRef.current = requestAnimationFrame(animate)
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current)
      }
    }
  }, [mousePosition, prevMousePosition, isMobile, prefersReducedMotion])

  // Mouse event handlers
  useEffect(() => {
    if (isMobile || prefersReducedMotion) return

    const mouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      })
      setIsVisible(true)
    }

    const mouseDown = () => setIsClicking(true)
    const mouseUp = () => setIsClicking(false)

    const handleMouseEnter = () => {
      document.body.style.cursor = "none"
      setIsVisible(true)
    }

    const handleMouseLeave = () => {
      document.body.style.cursor = "auto"
      setIsVisible(false)
    }

    // Check for interactive elements
    const handleElementMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("button") ||
        target.closest("a") ||
        target.getAttribute("role") === "button" ||
        target.classList.contains("cursor-pointer")
      ) {
        setIsHovering(true)
      } else {
        setIsHovering(false)
      }
    }

    document.addEventListener("mousemove", mouseMove)
    document.addEventListener("mousedown", mouseDown)
    document.addEventListener("mouseup", mouseUp)
    document.addEventListener("mouseenter", handleMouseEnter)
    document.addEventListener("mouseleave", handleMouseLeave)
    document.addEventListener("mouseover", handleElementMouseEnter)

    return () => {
      document.removeEventListener("mousemove", mouseMove)
      document.removeEventListener("mousedown", mouseDown)
      document.removeEventListener("mouseup", mouseUp)
      document.removeEventListener("mouseenter", handleMouseEnter)
      document.removeEventListener("mouseleave", handleMouseLeave)
      document.removeEventListener("mouseover", handleElementMouseEnter)
      document.body.style.cursor = "auto"
    }
  }, [isMobile, prefersReducedMotion])

  // Don't render the custom cursor on mobile devices or if reduced motion is preferred
  if (isMobile || prefersReducedMotion) return null

  // Determine fish color based on theme
  const fishColor = theme === "dark" ? "#60a5fa" : "#3b82f6"
  const fishStrokeColor = theme === "dark" ? "#93c5fd" : "#2563eb"

  return (
    <>
      {/* Main fish cursor */}
      {isVisible && (
        <motion.div
          className="fixed top-0 left-0 pointer-events-none z-50"
          animate={{
            x: mousePosition.x - 20,
            y: mousePosition.y - 12,
            rotate: rotation,
            scale: isHovering ? 1.2 : 1,
          }}
          transition={{
            type: "spring",
            damping: 25,
            stiffness: 300,
            mass: 0.5,
          }}
        >
          <div className={`relative w-[40px] h-[24px] ${isMoving ? "animate-fish-swim" : "animate-fish-idle"}`}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 24" className="w-full h-full">
              {/* Fish body */}
              <path
                d="M36,12c0,5.5-7.2,10-16,10S4,17.5,4,12S11.2,2,20,2S36,6.5,36,12z"
                fill={fishColor}
                stroke={fishStrokeColor}
                strokeWidth="1.5"
                className={`${isHovering ? "animate-fish-excited" : ""}`}
              />
              {/* Tail */}
              <path
                d="M4,12c-2-3,0-6,0-6v12C4,18,2,15,4,12z"
                fill={fishColor}
                stroke={fishStrokeColor}
                strokeWidth="1.5"
                className="animate-fish-tail"
              />
              {/* Eye */}
              <circle cx="28" cy="9" r="2" fill="white" />
              <circle cx="28" cy="9" r="1" fill="black" />
              {/* Fin */}
              <path
                d="M20,2c0,0-2,4-2,10s2,10,2,10"
                fill="none"
                stroke={fishStrokeColor}
                strokeWidth="1.5"
                opacity="0.7"
              />
            </svg>
          </div>
        </motion.div>
      )}

      {/* Bubbles */}
      {isVisible &&
        bubbles.map((bubble) => (
          <motion.div
            key={bubble.id}
            className="fixed top-0 left-0 rounded-full border border-primary/50 bg-primary/10 pointer-events-none z-40"
            initial={{
              x: bubble.x - bubble.size / 2,
              y: bubble.y - bubble.size / 2,
              width: bubble.size,
              height: bubble.size,
              opacity: 0.7,
            }}
            animate={{
              y: bubble.y - 50 - Math.random() * 50,
              opacity: 0,
              scale: 1.5 + Math.random(),
            }}
            transition={{
              duration: 1 + Math.random(),
              ease: "easeOut",
              delay: bubble.delay,
            }}
          />
        ))}

      {/* Water ripple effect on click */}
      {isClicking && (
        <motion.div
          className="fixed top-0 left-0 rounded-full border-2 border-primary/50 pointer-events-none z-40"
          initial={{
            x: mousePosition.x - 20,
            y: mousePosition.y - 20,
            scale: 0,
            opacity: 1,
            width: 40,
            height: 40,
          }}
          animate={{
            scale: 2.5,
            opacity: 0,
          }}
          transition={{
            duration: 0.8,
            ease: "easeOut",
          }}
        />
      )}

      {/* Secondary ripple for more water effect */}
      {isClicking && (
        <motion.div
          className="fixed top-0 left-0 rounded-full border border-primary/30 pointer-events-none z-40"
          initial={{
            x: mousePosition.x - 15,
            y: mousePosition.y - 15,
            scale: 0,
            opacity: 0.5,
            width: 30,
            height: 30,
          }}
          animate={{
            scale: 3,
            opacity: 0,
          }}
          transition={{
            duration: 1.2,
            ease: "easeOut",
            delay: 0.1,
          }}
        />
      )}
    </>
  )
}
