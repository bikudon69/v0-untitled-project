"use client"

import { useEffect, useRef } from "react"
import Hero from "@/components/hero"
import About from "@/components/about"
import Services from "@/components/services"
import Achievements from "@/components/achievements"
import Contact from "@/components/contact"
import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import TerminalExperience from "@/components/terminal-experience"

export default function Home() {
  const topRef = useRef(null)

  useEffect(() => {
    // Debug scroll position
    const logScrollPosition = () => {
      console.log("Scroll position:", window.scrollY)
    }

    // Log initial scroll position
    console.log("Initial scroll position:", window.scrollY)

    // Log when hash changes
    const logHashChange = () => {
      console.log("Hash changed to:", window.location.hash)
    }

    window.addEventListener("scroll", logScrollPosition)
    window.addEventListener("hashchange", logHashChange)

    // Force scroll to top
    window.scrollTo(0, 0)

    return () => {
      window.removeEventListener("scroll", logScrollPosition)
      window.removeEventListener("hashchange", logHashChange)
    }
  }, [])

  useEffect(() => {
    // Scroll to top on initial load
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: "auto" })
    }
  }, [])

  return (
    <div className="flex min-h-screen flex-col">
      <div ref={topRef} id="page-top"></div>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Achievements />
        <TerminalExperience />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
