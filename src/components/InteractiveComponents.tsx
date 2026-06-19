"use client"

import React from "react"
import { motion } from "framer-motion"

interface TransitionProps {
  children: React.ReactNode
  className?: string
  delay?: number
  duration?: number
  direction?: "up" | "down" | "left" | "right" | "none"
  distance?: number
}

export function FadeIn({
  children,
  className = "",
  delay = 0,
  duration = 0.5,
  direction = "up",
  distance = 30,
}: TransitionProps) {
  const directions = {
    up: { y: distance },
    down: { y: -distance },
    left: { x: distance },
    right: { x: -distance },
    none: {},
  }

  return (
    <motion.div
      className={className}
      initial={{
        opacity: 0,
        ...directions[direction],
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
      }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: duration,
        delay: delay,
        ease: [0.21, 0.47, 0.32, 0.98], // Custom premium ease-out
      }}
    >
      {children}
    </motion.div>
  )
}

export function ScaleIn({
  children,
  className = "",
  delay = 0,
  duration = 0.4,
}: TransitionProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale: 0.92 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: duration,
        delay: delay,
        ease: "easeOut",
      }}
    >
      {children}
    </motion.div>
  )
}

export function FloatingElement({
  children,
  className = "",
  speed = 4, // Duration of one full cycle in seconds
}: {
  children: React.ReactNode
  className?: string
  speed?: number
}) {
  return (
    <motion.div
      className={className}
      animate={{
        y: [0, -10, 0],
      }}
      transition={{
        duration: speed,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  )
}

export function SwayingFloat({
  children,
  className = "",
  duration = 4,
  sway = 6,
  lift = 8,
}: {
  children: React.ReactNode
  className?: string
  duration?: number
  sway?: number
  lift?: number
}) {
  return (
    <motion.div
      className={className}
      animate={{
        y: [0, -lift, 0],
        rotate: [-sway, sway, -sway],
      }}
      transition={{
        duration: duration,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  )
}

export function StaggerContainer({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-150px" }}
      variants={{
        hidden: { opacity: 0 },
        show: {
          opacity: 1,
          transition: {
            staggerChildren: 0.12,
            delayChildren: delay,
          },
        },
      }}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({
  children,
  className = "",
  direction = "up",
  distance = 20,
}: {
  children: React.ReactNode
  className?: string
  direction?: "up" | "down" | "left" | "right" | "none"
  distance?: number
}) {
  const directions = {
    up: { y: distance },
    down: { y: -distance },
    left: { x: distance },
    right: { x: -distance },
    none: {},
  }

  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, ...directions[direction] },
        show: { opacity: 1, x: 0, y: 0 },
      }}
      transition={{
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1], // premium out cubic
      }}
    >
      {children}
    </motion.div>
  )
}
