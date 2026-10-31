"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { motion, useReducedMotion } from "framer-motion"

const SLIDES = [
  { src: "/images/slide-1.jpeg", alt: "Meias#Verdades - foto 1" },
  { src: "/images/slide-2.jpeg", alt: "Meias#Verdades - foto 2" },
  { src: "/images/slide-3.jpeg", alt: "Meias#Verdades - foto 3" },
  { src: "/images/slide-4.jpeg", alt: "Meias#Verdades - foto 4" },
]

const INTERVAL_MS = 4000
const SWIPE_THRESHOLD = 50

export default function HeroSlideshow() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const reduceMotion = useReducedMotion()
  const touchStartX = useRef(0)
  const touchStartY = useRef(0)
  const touchActive = useRef(false)

  useEffect(() => {
    if (paused) return
    const id = setInterval(() => {
      setIndex((current) => (current + 1) % SLIDES.length)
    }, INTERVAL_MS)
    return () => clearInterval(id)
  }, [paused])

  const handleTouchStart = (event: React.TouchEvent) => {
    touchStartX.current = event.touches[0].clientX
    touchStartY.current = event.touches[0].clientY
    touchActive.current = true
    setPaused(true)
  }

  const handleTouchEnd = (event: React.TouchEvent) => {
    if (!touchActive.current) return
    touchActive.current = false
    setPaused(false)

    const deltaX = touchStartX.current - event.changedTouches[0].clientX
    const deltaY = touchStartY.current - event.changedTouches[0].clientY
    // Horizontal gestures change the slide; vertical ones let the page scroll.
    if (Math.abs(deltaX) < SWIPE_THRESHOLD || Math.abs(deltaX) < Math.abs(deltaY)) return

    setIndex((current) => (current + (deltaX > 0 ? 1 : -1) + SLIDES.length) % SLIDES.length)
  }

  return (
    <div
      className="w-full h-full relative"
      style={{ touchAction: "pan-y" }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {SLIDES.map((slide, i) => (
        <motion.div
          key={slide.src}
          className="absolute inset-0"
          initial={false}
          animate={{ opacity: i === index ? 1 : 0 }}
          transition={{ duration: reduceMotion ? 0 : 1.1, ease: "easeInOut" }}
          aria-hidden={i !== index}
        >
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            draggable={false}
            sizes="(max-width: 640px) calc(100vw - 48px), 448px"
            className="object-cover transition-transform duration-[7000ms] ease-out"
            style={{ transform: i === index && !reduceMotion ? "scale(1.08)" : "scale(1)" }}
            priority={i === 0}
          />
        </motion.div>
      ))}

      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1.5">
        {SLIDES.map((slide, i) => (
          <span
            key={slide.src}
            className={`h-1 rounded-full transition-all duration-500 ${
              i === index ? "w-5 bg-brand-yellow" : "w-1.5 bg-white/40"
            }`}
          />
        ))}
      </div>
    </div>
  )
}
