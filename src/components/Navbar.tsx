"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import { Menu, X, Globe, ChevronDown } from "lucide-react"
import { motion } from "framer-motion"
import type { Locale } from "@/lib/get-dictionary"

interface NavbarProps {
  locale: Locale
}

export default function Navbar({ locale }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Lock body scroll while the mobile drawer is open
  useEffect(() => {
    if (!isOpen) return
    const previous = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = previous
    }
  }, [isOpen])

  // Close menus when the route changes (including back/forward navigation).
  // Adjusting state during render is the React-recommended pattern here —
  // an effect would cause a cascading render.
  const [lastPathname, setLastPathname] = useState(pathname)
  if (lastPathname !== pathname) {
    setLastPathname(pathname)
    if (isOpen) setIsOpen(false)
    if (langOpen) setLangOpen(false)
  }

  // Translations for Navbar labels (fallback static translations just in case, or we pass them down)
  const navLabels = {
    pt: {
      home: "Início",
      about: "Quem Somos",
      solutions: "Soluções",
      press: "Imprensa",
      contact: "Contato",
      cta: "Fale Conosco",
    },
    en: {
      home: "Home",
      about: "About Us",
      solutions: "Solutions",
      press: "Press",
      contact: "Contact",
      cta: "Contact Us",
    },
    es: {
      home: "Inicio",
      about: "Quiénes Somos",
      solutions: "Soluciones",
      press: "Prensa",
      contact: "Contacto",
      cta: "Contáctanos",
    },
  }

  const labels = navLabels[locale] || navLabels.pt

  const navigation = [
    { name: labels.home, href: `/${locale}` },
    { name: labels.about, href: `/${locale}/about` },
    { name: labels.solutions, href: `/${locale}/solutions` },
    { name: labels.press, href: `/${locale}/press` },
    { name: labels.contact, href: `/${locale}/contact` },
  ]

  const switchLocale = (newLocale: string) => {
    if (!pathname) return
    const segments = pathname.split("/")
    segments[1] = newLocale
    const newPath = segments.join("/")
    router.push(newPath)
    setLangOpen(false)
    setIsOpen(false)
  }

  // Find active route
  const isActive = (href: string) => {
    if (href === `/${locale}`) {
      return pathname === href
    }
    return pathname?.startsWith(href)
  }

  return (
    <>
    <header
      className={`fixed top-0 left-0 right-0 z-50 glass border-b border-primary-teal/10 transition-all duration-350 ${
        isScrolled ? "shadow-sm py-1.5 md:py-2.5" : "py-2 md:py-3"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href={`/${locale}`} className="flex items-center gap-2 focus:outline-none shrink-0">
          <div className="relative w-[152px] h-[41px] sm:w-[200px] sm:h-[54px] md:w-[300px] md:h-[80px] transition-transform duration-200 hover:scale-102">
            {/* Prancheta 15 is our primary colored horizontal logo */}
            <Image
              src="/logo/LOGO__LITERACIA_EDU_Prancheta_15.png"
              alt="Literacia Edu Logo"
              fill
              className="object-contain"
              priority
              sizes="(max-width: 640px) 152px, (max-width: 768px) 200px, 300px"
            />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 font-medium">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`text-[15px] transition-colors duration-200 hover:text-bright-teal relative py-2 ${
                isActive(item.href)
                  ? "text-primary-teal font-bold"
                  : "text-[#0B1E21]/80"
              }`}
            >
              {item.name}
              {isActive(item.href) && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-bright-teal rounded-full" />
              )}
            </Link>
          ))}
        </nav>

        {/* Right CTA and Lang Switcher */}
        <div className="hidden md:flex items-center gap-6">
          {/* Language Switcher */}
          <div className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className={`flex items-center gap-1.5 text-sm font-semibold py-2 px-3 rounded-lg transition-all duration-200 focus:outline-none text-[#0B1E21]/85 hover:text-primary-teal hover:bg-teal-light`}
              aria-label="Select Language"
              aria-expanded={langOpen}
            >
              <Globe className="w-4 h-4 text-primary-teal" />
              <span className="uppercase">{locale}</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${langOpen ? "rotate-180" : ""}`} />
            </button>

            {langOpen && (
              <div className="absolute right-0 mt-2 w-36 bg-white rounded-xl shadow-lg border border-primary-teal/5 py-1 z-50">
                <button
                  onClick={() => switchLocale("pt")}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-teal-light transition-colors ${
                    locale === "pt" ? "text-primary-teal font-semibold" : "text-[#0B1E21]/80"
                  }`}
                >
                  Português
                </button>
                <button
                  onClick={() => switchLocale("en")}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-teal-light transition-colors ${
                    locale === "en" ? "text-primary-teal font-semibold" : "text-[#0B1E21]/80"
                  }`}
                >
                  English
                </button>
                <button
                  onClick={() => switchLocale("es")}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-teal-light transition-colors ${
                    locale === "es" ? "text-primary-teal font-semibold" : "text-[#0B1E21]/80"
                  }`}
                >
                  Español
                </button>
              </div>
            )}
          </div>

          {/* CTA Button */}
          <Link
            href={`/${locale}/contact`}
            className="inline-flex items-center justify-center bg-brand-yellow text-[#05242A] font-bold text-[14px] px-5 py-2.5 rounded-xl hover:bg-white hover:text-[#05242A] transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 focus:ring-2 focus:ring-bright-teal/20"
          >
            {labels.cta}
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="md:hidden flex items-center gap-1 sm:gap-2 shrink-0">
          {/* Quick Lang Select for Mobile */}
          <button
            onClick={() => setLangOpen(!langOpen)}
            className="flex items-center gap-1 text-sm font-semibold p-2.5 rounded-lg focus:outline-none text-[#0B1E21]"
            aria-label="Select Language"
            aria-expanded={langOpen}
          >
            <Globe className="w-5 h-5 text-bright-teal" />
            <span className="uppercase">{locale}</span>
          </button>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2.5 rounded-lg focus:outline-none text-primary-teal hover:bg-teal-light"
            aria-label="Toggle Menu"
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Lang Dropdown */}
      {langOpen && (
        <div className="md:hidden absolute right-4 top-full mt-2 min-w-[72px] bg-white rounded-lg shadow-md border border-primary-teal/10 p-2 z-50 flex flex-col gap-1">
          <button onClick={() => switchLocale("pt")} className={`px-3 py-3 text-left text-sm font-semibold hover:bg-teal-light rounded ${locale === "pt" ? "text-primary-teal" : ""}`}>PT</button>
          <button onClick={() => switchLocale("en")} className={`px-3 py-3 text-left text-sm font-semibold hover:bg-teal-light rounded ${locale === "en" ? "text-primary-teal" : ""}`}>EN</button>
          <button onClick={() => switchLocale("es")} className={`px-3 py-3 text-left text-sm font-semibold hover:bg-teal-light rounded ${locale === "es" ? "text-primary-teal" : ""}`}>ES</button>
        </div>
      )}
    </header>

    {/* Mobile Drawer Navigation — rendered outside <header> so the
        header's backdrop-filter cannot clip this fixed element */}
    {isOpen && (
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="md:hidden fixed inset-0 z-40 bg-white pt-[76px] pb-10 px-6 overflow-y-auto border-t border-primary-teal/10"
      >
        <nav className="flex flex-col gap-2 font-semibold text-lg">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className={`py-3.5 border-b border-primary-teal/5 transition-colors ${
                isActive(item.href) ? "text-primary-teal" : "text-[#0B1E21]"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="flex flex-col gap-4 mt-8">
          <Link
            href={`/${locale}/contact`}
            onClick={() => setIsOpen(false)}
            className="w-full text-center bg-primary-teal text-white font-semibold py-4 rounded-xl hover:bg-bright-teal transition-colors shadow-lg"
          >
            {labels.cta}
          </Link>
        </div>
      </motion.div>
    )}
    </>
  )
}
