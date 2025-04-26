"use client"

import { useEffect, useState, useRef } from "react"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const [trailPoints, setTrailPoints] = useState<Array<{ x: number; y: number; opacity: number }>>([])
  const requestRef = useRef<number>()
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

    const animate = () => {
      // Update trail points
      setTrailPoints((prevPoints) => {
        // Add new point at current mouse position
        const newPoints = [
          { x: mousePosition.x, y: mousePosition.y, opacity: 0.8 },
          ...prevPoints.slice(0, 7), // Keep only 8 points
        ]

        // Fade out points gradually
        return newPoints.map((point, index) => ({
          ...point,
          opacity: Math.max(0.1, 0.8 - index * 0.1),
        }))
      })

      requestRef.current = requestAnimationFrame(animate)
    }

    requestRef.current = requestAnimationFrame(animate)
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current)
      }
    }
  }, [mousePosition, isMobile, prefersReducedMotion])

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

  // Determine cursor colors based on theme
  const primaryColor = theme === "dark" ? "#60a5fa" : "#3b82f6"
  const secondaryColor = theme === "dark" ? "#93c5fd" : "#2563eb"
  const ringColor = theme === "dark" ? "rgba(96, 165, 250, 0.2)" : "rgba(59, 130, 246, 0.2)"

  return (
    <>
      {/* Trail effect */}
      {isVisible &&
        trailPoints.map((point, index) => (
          <motion.div
            key={index}
            className="fixed top-0 left-0 pointer-events-none z-50"
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              translateX: point.x,
              translateY: point.y,
              opacity: point.opacity,
            }}
          >
            <div
              className="rounded-full"
              style={{
                width: 8 - index,
                height: 8 - index,
                backgroundColor: primaryColor,
                opacity: point.opacity,
                transform: `translate(-50%, -50%)`,
              }}
            />
          </motion.div>
        ))}

      {/* Main cursor */}
      {isVisible && (
        <motion.div
          className="fixed top-0 left-0 pointer-events-none z-50"
          animate={{
            x: mousePosition.x,
            y: mousePosition.y,
          }}
          transition={{
            type: "spring",
            damping: 25,
            stiffness: 300,
            mass: 0.5,
          }}
        >
          <motion.div
            className="relative"
            animate={{
              scale: isHovering ? 1.5 : 1,
              opacity: 1,
            }}
          >
            {/* Outer ring */}
            <motion.div
              className="absolute rounded-full border-2"
              style={{
                borderColor: primaryColor,
                width: isClicking ? 24 : 32,
                height: isClicking ? 24 : 32,
                backgroundColor: "transparent",
                transform: "translate(-50%, -50%)",
                transition: "width 0.2s, height 0.2s",
              }}
            />

            {/* Inner dot */}
            <motion.div
              className="absolute rounded-full"
              style={{
                backgroundColor: secondaryColor,
                width: isClicking ? 8 : 6,
                height: isClicking ? 8 : 6,
                transform: "translate(-50%, -50%)",
                transition: "width 0.2s, height 0.2s",
              }}
            />

            {/* DevOps-themed elements */}
            {isHovering && (
              <motion.div
                className="absolute"
                style={{
                  width: 40,
                  height: 40,
                  transform: "translate(-50%, -50%)",
                }}
                initial={{ opacity: 0, rotate: 0 }}
                animate={{ opacity: 1, rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                {/* Circular progress-like element */}
                <svg width="40" height="40" viewBox="0 0 40 40">
                  <circle
                    cx="20"
                    cy="20"
                    r="16"
                    fill="none"
                    stroke={ringColor}
                    strokeWidth="2"
                    strokeDasharray="100"
                    strokeDashoffset="25"
                  />
                  <circle
                    cx="20"
                    cy="20"
                    r="16"
                    fill="none"
                    stroke={primaryColor}
                    strokeWidth="2"
                    strokeDasharray="100"
                    strokeDashoffset="75"
                    strokeLinecap="round"
                  />
                </svg>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* Click ripple effect */}
      {isClicking && isVisible && (
        <motion.div
          className="fixed top-0 left-0 pointer-events-none z-40"
          initial={{
            x: mousePosition.x,
            y: mousePosition.y,
            scale: 0,
            opacity: 0.5,
          }}
          animate={{
            scale: 2,
            opacity: 0,
          }}
          transition={{
            duration: 0.8,
            ease: "easeOut",
          }}
        >
          <div
            className="rounded-full border-2"
            style={{
              borderColor: primaryColor,
              width: 40,
              height: 40,
              transform: "translate(-50%, -50%)",
            }}
          />
        </motion.div>
      )}
    </>
  )
}
