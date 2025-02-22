"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Flower2 } from "lucide-react"

export function FloatingFlowers() {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })

  useEffect(() => {
    function handleResize() {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight })
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <div className="pointer-events-none fixed inset-0 z-40 overflow-hidden">
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          initial={{
            x: Math.random() * windowSize.width,
            y: -20,
            rotate: 0,
          }}
          animate={{
            y: windowSize.height + 20,
            rotate: 360,
          }}
          transition={{
            duration: Math.random() * 5 + 5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        >
          <Flower2 className="h-4 w-4 text-amber-200" />
        </motion.div>
      ))}
    </div>
  )
}

