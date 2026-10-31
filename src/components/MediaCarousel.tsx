"use client"

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { Calendar, ExternalLink, Newspaper, Podcast, Radio, Tv } from "lucide-react"

function InstagramIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  )
}

export interface MediaItem {
  type: string
  category: string
  date: string
  title: string
  desc: string
  source: string
  cta: string
  url: string
  instagram?: string
}

const INTERVAL_MS = 6000
const WHEEL_THRESHOLD = 40
const WHEEL_WINDOW_MS = 250
const SWIPE_THRESHOLD = 50

const ACCENTS = [
  { border: "border-l-bright-teal", icon: "text-bright-teal", bg: "bg-gradient-to-br from-bright-teal/10 to-white", ring: "ring-bright-teal" },
  { border: "border-l-brand-yellow", icon: "text-brand-yellow", bg: "bg-gradient-to-br from-brand-yellow/10 to-white", ring: "ring-brand-yellow" },
  { border: "border-l-brand-orange", icon: "text-brand-orange", bg: "bg-gradient-to-br from-brand-orange/10 to-white", ring: "ring-brand-orange" },
  { border: "border-l-primary-teal", icon: "text-primary-teal", bg: "bg-gradient-to-br from-primary-teal/10 to-white", ring: "ring-primary-teal" },
]

function iconFor(type: string) {
  if (type === "video") return Tv
  if (type === "podcast") return Podcast
  if (type === "radio") return Radio
  return Newspaper
}

export default function MediaCarousel({ items }: { items: MediaItem[] }) {
  const [index, setIndex] = useState(0)
  const [dir, setDir] = useState(1)
  const [paused, setPaused] = useState(false)
  const reduceMotion = useReducedMotion()
  const containerRef = useRef<HTMLDivElement>(null)
  const wheelAccumulator = useRef(0)
  const wheelStamp = useRef(0)
  const touchStartY = useRef(0)
  const touchStartX = useRef(0)
  const touchActive = useRef(false)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const [heights, setHeights] = useState<number[]>([])

  // Measure every card so the container can follow the active one.
  // The ResizeObserver delivers the initial measurement before first paint
  // and re-measures on resize, orientation change and font load.
  useLayoutEffect(() => {
    const cards = cardRefs.current.filter((el): el is HTMLDivElement => el !== null)
    if (!cards.length) return

    const observer = new ResizeObserver(() => {
      setHeights(cards.map((el) => el.offsetHeight))
    })
    cards.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [items.length])

  const advance = useCallback(
    (step: number) => {
      setDir(step > 0 ? 1 : -1)
      setIndex((current) => (current + step + items.length) % items.length)
    },
    [items.length]
  )

  // Autoplay — paused on hover/focus/touch, fully disabled for reduced motion
  useEffect(() => {
    if (paused || reduceMotion) return
    const id = setTimeout(() => advance(1), INTERVAL_MS)
    return () => clearTimeout(id)
  }, [index, paused, reduceMotion, advance])

  // Wheel — only deliberate gestures (>= threshold within a short window) are
  // captured; light scrolls fall through so the page is never trapped.
  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const handleWheel = (event: WheelEvent) => {
      const now = Date.now()
      if (now - wheelStamp.current > WHEEL_WINDOW_MS) wheelAccumulator.current = 0
      wheelStamp.current = now
      wheelAccumulator.current += event.deltaY

      if (Math.abs(wheelAccumulator.current) < WHEEL_THRESHOLD) return

      event.preventDefault()
      const forward = wheelAccumulator.current > 0
      wheelAccumulator.current = 0
      advance(forward ? 1 : -1)
    }

    el.addEventListener("wheel", handleWheel, { passive: false })
    return () => el.removeEventListener("wheel", handleWheel)
  }, [advance])

  const goTo = (next: number) => {
    setDir(next > index ? 1 : -1)
    setIndex(next)
  }

  const handleTouchStart = (event: React.TouchEvent) => {
    touchStartY.current = event.touches[0].clientY
    touchStartX.current = event.touches[0].clientX
    touchActive.current = true
    setPaused(true)
  }

  const handleTouchEnd = (event: React.TouchEvent) => {
    if (!touchActive.current) return
    touchActive.current = false
    setPaused(false)

    const deltaY = touchStartY.current - event.changedTouches[0].clientY
    const deltaX = touchStartX.current - event.changedTouches[0].clientX
    if (Math.abs(deltaY) < SWIPE_THRESHOLD || Math.abs(deltaY) < Math.abs(deltaX)) return

    advance(deltaY > 0 ? 1 : -1)
  }

  return (
    <div
      ref={containerRef}
      className="relative select-none"
      style={{ touchAction: "none" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className="relative min-h-[280px] transition-[height] ease-out"
        style={{
          height: heights.length > index ? heights[index] : undefined,
          transitionDuration: reduceMotion ? "0ms" : "700ms",
        }}
      >
        {items.map((item, i) => {
          const isActive = i === index
          const accent = ACCENTS[i % ACCENTS.length]
          const Icon = iconFor(item.type)
          const offset = isActive ? 0 : dir > 0 ? 24 : -24

          return (
            <div
              key={i}
              ref={(el) => {
                cardRefs.current[i] = el
              }}
              style={{ transform: `translateY(${offset}px)` }}
              className={`absolute inset-x-0 top-0 transition-all duration-700 ease-out ${
                isActive
                  ? "opacity-100 z-10"
                  : "opacity-0 z-0 pointer-events-none"
              }`}
              aria-hidden={!isActive}
            >
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                tabIndex={isActive ? 0 : -1}
                className={`group ${accent.bg} p-6 rounded-2xl border border-primary-teal/10 border-l-4 flex gap-5 shadow-sm hover:shadow-xl hover:shadow-primary-teal/10 transition-shadow duration-500`}
              >
                {isActive && (
                  <motion.span
                    key={`flash-${i}`}
                    initial={{ opacity: reduceMotion ? 0 : 0.55 }}
                    animate={{ opacity: 0 }}
                    transition={{ duration: 0.9, ease: "easeOut" }}
                    className={`pointer-events-none absolute inset-0 rounded-2xl ring-2 ring-inset ${accent.ring}`}
                  />
                )}

                <div className="flex flex-col items-center gap-3 shrink-0">
                  <span
                    className={`${accent.icon} ${
                      isActive ? "scale-110" : ""
                    } transition-transform duration-500`}
                  >
                    <Icon className="w-6 h-6" />
                  </span>
                  <div className="w-px flex-1 bg-primary-teal/15" />
                </div>

                <div className={`flex flex-col gap-3 flex-1 min-w-0 ${item.instagram ? "pr-9" : ""}`}>
                  <div className="flex flex-wrap items-center gap-2 text-[10px] text-primary-teal/70 font-semibold font-sans">
                    <Calendar className="w-3.5 h-3.5 shrink-0" />
                    {item.date && <span>{item.date}</span>}
                    {item.date && <span>•</span>}
                    <span>{item.category}</span>
                  </div>

                  <h3 className="font-semibold text-base sm:text-lg text-primary-teal font-sans leading-snug transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs text-[#0B1E21]/75 leading-loose font-sans font-light">
                    {item.desc}
                  </p>

                  <div className="flex items-center justify-between gap-3 pt-2 mt-auto">
                    <span className="text-xs text-[#0B1E21]/50 font-semibold uppercase tracking-wider font-sans truncate">
                      {item.source}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary-teal transition-colors font-sans shrink-0">
                      {item.cta}
                      <ExternalLink className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </a>

              {item.instagram && (
                <a
                  href={item.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  tabIndex={isActive ? 0 : -1}
                  aria-label="Instagram"
                  className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-white/80 border border-primary-teal/10 flex items-center justify-center text-primary-teal/70 hover:text-primary-teal hover:bg-white hover:shadow-md hover:scale-110 transition-all duration-300"
                >
                  <InstagramIcon className="w-4 h-4" />
                </a>
              )}
            </div>
          )
        })}
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
        <div className="flex-1 min-w-[120px] h-1.5 rounded-full bg-primary-teal/10 overflow-hidden">
          <div
            key={`progress-${index}`}
            className="h-full w-full origin-left rounded-full bg-brand-yellow"
            style={{
              animation: `carousel-progress ${INTERVAL_MS}ms linear forwards`,
              animationPlayState: paused || reduceMotion ? "paused" : "running",
            }}
          />
        </div>

        <div className="flex items-center gap-1">
          {items.map((item, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i)}
              aria-label={item.title}
              aria-current={i === index}
              className="group flex items-center justify-center h-11 w-7 focus:outline-none focus-visible:ring-2 focus-visible:ring-bright-teal/40 rounded"
            >
              <span
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  i === index
                    ? "w-6 bg-bright-teal"
                    : "w-1.5 bg-primary-teal/25 group-hover:bg-primary-teal/50"
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
