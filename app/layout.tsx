import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import CustomCursor from "@/components/custom-cursor"
import type { Metadata } from "next"
import Script from "next/script"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Biku Shah - DevOps & Cloud Solution Architect",
  description:
    "DevOps and Cloud Solution Architect with 4+ years of experience in designing and implementing secure, scalable, and cost-efficient cloud architectures.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="scroll-restoration" content="manual" />
        {/* Other meta tags */}
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
          <CustomCursor />

          {/* Add this script to force scroll to top */}
          <Script id="scroll-to-top">
            {`
              if (typeof window !== 'undefined') {
                window.scrollTo(0, 0);
              }
            `}
          </Script>
        </ThemeProvider>
      </body>
    </html>
  )
}
