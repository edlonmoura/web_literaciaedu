"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import { Menu, X, Globe, ChevronDown } from "lucide-react"
import { Locale } from "@/lib/get-dictionary"

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
      solutions: "Soluções", // Wait, in es it's "Soluciones"
      press: "Prensa",
      contact: "Contacto",
      cta: "Contáctanos",
    },
  }

  const labels = navLabels[locale] || navLabels.pt
  // Corrections
  if (locale === "es") {
    labels.solutions = "Soluciones"
  }

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
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-350 ${
        isScrolled
          ? "glass border-b border-primary-teal/10 shadow-sm py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href={`/${locale}`} className="flex items-center gap-2 focus:outline-none">
          <div className="relative w-44 h-12 md:w-52 md:h-14 transition-transform duration-200 hover:scale-102">
            {/* Prancheta 15 is our primary colored horizontal logo */}
            <Image
              src="/logo/LOGO_ LITERACIA EDU_Prancheta 15.png"
              alt="Literacia Edu Logo"
              fill
              className="object-contain"
              priority
              sizes="(max-width: 768px) 144px, 176px"
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
                  ? "text-primary-teal font-semibold"
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
              className="flex items-center gap-1.5 text-sm font-semibold text-[#0B1E21]/85 hover:text-primary-teal py-2 px-3 rounded-lg hover:bg-teal-light transition-all duration-200 focus:outline-none"
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
            className="inline-flex items-center justify-center bg-primary-teal text-white font-semibold text-[14px] px-5 py-2.5 rounded-xl hover:bg-bright-teal transition-all duration-300 shadow-md shadow-primary-teal/10 hover:shadow-lg hover:shadow-bright-teal/10 hover:-translate-y-0.5 focus:ring-2 focus:ring-bright-teal/20"
          >
            {labels.cta}
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="md:hidden flex items-center gap-4">
          {/* Quick Lang Select for Mobile */}
          <button
            onClick={() => setLangOpen(!langOpen)}
            className="flex items-center gap-1 text-sm font-semibold text-[#0B1E21] p-1.5 rounded-lg hover:bg-teal-light focus:outline-none"
            aria-label="Select Language"
          >
            <Globe className="w-4 h-4 text-primary-teal" />
            <span className="uppercase">{locale}</span>
          </button>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-1.5 text-primary-teal rounded-lg hover:bg-teal-light focus:outline-none"
            aria-label="Toggle Menu"
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Lang Dropdown Drawer overlay */}
      {langOpen && (
        <div className="md:hidden absolute right-16 top-16 bg-white rounded-lg shadow-md border border-primary-teal/10 p-2 z-50 flex flex-col gap-1">
          <button onClick={() => switchLocale("pt")} className="px-3 py-1.5 text-left text-sm font-semibold hover:bg-teal-light rounded">PT</button>
          <button onClick={() => switchLocale("en")} className="px-3 py-1.5 text-left text-sm font-semibold hover:bg-teal-light rounded">EN</button>
          <button onClick={() => switchLocale("es")} className="px-3 py-1.5 text-left text-sm font-semibold hover:bg-teal-light rounded">ES</button>
        </div>
      )}

      {/* Mobile Drawer Navigation */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 top-[72px] bg-white z-40 transition-all duration-300 flex flex-col justify-between p-6 border-t border-primary-teal/10 animate-fade-in">
          <nav className="flex flex-col gap-6 font-semibold text-lg">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`py-2 border-b border-primary-teal/5 transition-colors ${
                  isActive(item.href) ? "text-primary-teal" : "text-[#0B1E21]"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="flex flex-col gap-4 mt-8 pb-12">
            <Link
              href={`/${locale}/contact`}
              onClick={() => setIsOpen(false)}
              className="w-full text-center bg-primary-teal text-white font-semibold py-3.5 rounded-xl hover:bg-bright-teal transition-colors shadow-lg"
            >
              {labels.cta}
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
