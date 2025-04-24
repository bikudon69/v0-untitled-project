import Hero from "@/components/hero"
import About from "@/components/about"
import Services from "@/components/services"
import Achievements from "@/components/achievements"
import Contact from "@/components/contact"
import Footer from "@/components/footer"
import Navbar from "@/components/navbar"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Achievements />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
