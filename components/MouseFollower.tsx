"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"

export function MouseFollower() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY })
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden" onMouseMove={handleMouseMove}>
      <motion.div
        className="absolute h-8 w-8 rounded-full bg-amber-200 opacity-20 blur-xl"
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
        }}
        transition={{ type: "spring", damping: 30, stiffness: 200 }}
      />
    </div>
  )
}

