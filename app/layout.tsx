import type React from "react"
import type { Metadata } from "next"
import { Inter, Poppins } from "next/font/google"
import "./globals.css"

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
  display: 'swap',
})

const poppins = Poppins({ 
  weight: ['300', '400', '500', '600', '700', '800'],
  subsets: ["latin"],
  variable: '--font-poppins',
  display: 'swap',
})

export const metadata: Metadata = {
  title: "grainZ - Transform Your Body, Transform Your Life",
  description: "Expert fitness training and personalized nutrition coaching by Maitri Ramaiya. Join 500+ successful transformations.",
  keywords: "fitness trainer, personal training, nutrition coaching, online fitness, Maitri Ramaiya, grainZ",
  authors: [{ name: "Maitri Ramaiya" }],
  creator: "Maitri Ramaiya",
  openGraph: {
    title: "grainZ - Transform Your Body, Transform Your Life",
    description: "Expert fitness training and personalized nutrition coaching",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${poppins.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  )
}
