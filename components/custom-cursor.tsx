"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [cursorVariant, setCursorVariant] = useState("default")
  const [isClicking, setIsClicking] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Check if it's a mobile device
    const checkMobile = () => {
      setIsMobile(
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
          window.innerWidth <= 768,
      )
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    // Only add mouse event listeners if not on mobile
    if (!isMobile) {
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
          setCursorVariant("hover")
        } else {
          setCursorVariant("default")
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
        window.removeEventListener("resize", checkMobile)
        document.body.style.cursor = "auto"
      }
    }

    return () => {
      window.removeEventListener("resize", checkMobile)
    }
  }, [isMobile])

  // Don't render the custom cursor on mobile devices
  if (isMobile) return null

  const variants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      height: 32,
      width: 32,
      backgroundColor: "rgba(59, 130, 246, 0.1)",
      borderColor: "rgba(59, 130, 246, 0.5)",
    },
    hover: {
      x: mousePosition.x - 24,
      y: mousePosition.y - 24,
      height: 48,
      width: 48,
      backgroundColor: "rgba(59, 130, 246, 0.2)",
      borderColor: "rgba(59, 130, 246, 0.7)",
    },
  }

  const springTransition = {
    type: "spring",
    damping: 25,
    stiffness: 300,
    mass: 0.5,
  }

  return (
    <>
      {/* Main cursor */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border-2 mix-blend-difference pointer-events-none z-50"
        variants={variants}
        animate={cursorVariant}
        transition={springTransition}
        style={{ opacity: isVisible ? 1 : 0 }}
      />

      {/* Dot cursor */}
      <motion.div
        className="fixed top-0 left-0 rounded-full bg-primary pointer-events-none z-50"
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
          scale: isClicking ? 0.5 : 1,
        }}
        style={{
          width: 8,
          height: 8,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{
          type: "spring",
          damping: 40,
          stiffness: 500,
        }}
      />

      {/* Trailing particles */}
      {isVisible && (
        <motion.div
          className="fixed top-0 left-0 w-4 h-4 rounded-full bg-primary/30 pointer-events-none z-50"
          initial={{ scale: 1, opacity: 0.7 }}
          animate={{
            x: mousePosition.x - 8,
            y: mousePosition.y - 8,
            scale: 0,
            opacity: 0,
          }}
          transition={{
            duration: 0.5,
            ease: "easeOut",
          }}
        />
      )}

      {/* Click ripple effect */}
      {isClicking && (
        <motion.div
          className="fixed top-0 left-0 rounded-full border-2 border-primary pointer-events-none z-50"
          initial={{
            x: mousePosition.x - 20,
            y: mousePosition.y - 20,
            scale: 0,
            opacity: 1,
            width: 40,
            height: 40,
          }}
          animate={{
            scale: 1.5,
            opacity: 0,
          }}
          transition={{
            duration: 0.5,
            ease: "easeOut",
          }}
        />
      )}
    </>
  )
}
