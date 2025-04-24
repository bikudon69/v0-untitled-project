import Link from "next/link"
import { Cloud, Heart } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto px-4 md:px-6 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex flex-col items-center md:items-start mb-6 md:mb-0">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <Cloud className="h-6 w-6 text-primary" />
              <span className="font-bold text-lg">Biku Shah</span>
            </Link>
            <p className="text-sm text-muted-foreground text-center md:text-left">Your Go-To Guy for Cloudy Days ☁️</p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 mb-6 md:mb-0">
            <div>
              <h3 className="text-sm font-semibold mb-2">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#hero" className="text-muted-foreground hover:text-foreground transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="#about" className="text-muted-foreground hover:text-foreground transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#services" className="text-muted-foreground hover:text-foreground transition-colors">
                    Services
                  </Link>
                </li>
                <li>
                  <Link href="#contact" className="text-muted-foreground hover:text-foreground transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-muted-foreground mb-4 md:mb-0">
            &copy; {currentYear} Biku Shah. All rights reserved.
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            Made with <Heart className="h-4 w-4 mx-1 text-red-500" /> and modern cloud technology
          </div>
        </div>
      </div>
    </footer>
  )
}
