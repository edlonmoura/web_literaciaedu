import Link from "next/link"
import Image from "next/image"
import { Mail, Phone, MapPin } from "lucide-react"
import { Locale } from "@/lib/get-dictionary"

interface FooterProps {
  locale: Locale
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  )
}

export default function Footer({ locale }: FooterProps) {
  const footerLabels = {
    pt: {
      desc: "Educação, Ciência e Letramento Digital para o Amanhã. Edtech focada em desenvolver resiliência digital e pensamento crítico em crianças e adolescentes.",
      navTitle: "Navegação",
      solutionsTitle: "Soluções",
      contactTitle: "Contato",
      about: "Quem Somos",
      solutions: "Nossas Soluções",
      press: "Imprensa",
      contact: "Contato",
      privacy: "Política de Privacidade",
      terms: "Termos de Uso",
      rights: "© 2026 Literacia Edu. Todos os direitos reservados. CNPJ: 54.896.712/0001-92.",
      address: "Recife, PE - Brasil",
    },
    en: {
      desc: "Education, Science, and Digital Literacy for Tomorrow. Edtech focused on developing digital resilience and critical thinking in children and teens.",
      navTitle: "Navigation",
      solutionsTitle: "Solutions",
      contactTitle: "Contact",
      about: "About Us",
      solutions: "Our Solutions",
      press: "Press",
      contact: "Contact Us",
      privacy: "Privacy Policy",
      terms: "Terms of Service",
      rights: "© 2026 Literacia Edu. All rights reserved. CNPJ: 54.896.712/0001-92.",
      address: "Recife, PE - Brazil",
    },
    es: {
      desc: "Educación, Ciencia y Alfabetización Digital para el Mañana. Edtech enfocada en desarrollar resiliencia digital y pensamiento crítico en niños y adolescentes.",
      navTitle: "Navegación",
      solutionsTitle: "Soluciones",
      contactTitle: "Contacto",
      about: "Quiénes Somos",
      solutions: "Nuestras Soluciones",
      press: "Prensa",
      contact: "Contáctenos",
      privacy: "Política de Privacidad",
      terms: "Términos de Uso",
      rights: "© 2026 Literacia Edu. Todos los derechos reservados. CNPJ: 54.896.712/0001-92.",
      address: "Recife, PE - Brasil",
    },
  }

  const labels = footerLabels[locale] || footerLabels.pt
  const homeLabel = locale === "pt" ? "Início" : locale === "en" ? "Home" : "Inicio"

  return (
    <footer className="bg-navy-dark text-white border-t border-white/5 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-12">
          {/* Logo & Description */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <Link href={`/${locale}`} className="relative w-44 h-12 block">
              <Image
                src="/logo/LOGO__LITERACIA_EDU_Prancheta_16.png"
                alt="Literacia Edu Logo"
                fill
                className="object-contain"
                sizes="176px"
              />
            </Link>
            <p className="text-white/70 text-[14px] leading-relaxed max-w-sm">
              {labels.desc}
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-4 mt-2">
              <a
                href="https://instagram.com/literaciaedu"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-bright-teal hover:text-white transition-all duration-300 group"
                aria-label="Instagram @literaciaedu"
              >
                <InstagramIcon className="w-5 h-5 text-white/80 group-hover:text-white transition-colors" />
              </a>
              <a
                href="mailto:karoline@literaciaedu.com"
                className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-bright-teal hover:text-white transition-all duration-300 group"
                aria-label="E-mail Literacia Edu"
              >
                <Mail className="w-5 h-5 text-white/80 group-hover:text-white transition-colors" />
              </a>
            </div>
          </div>

          {/* Navigation links */}
          <div className="flex flex-col gap-5">
            <h3 className="font-semibold text-white text-[14px] uppercase tracking-wider">
              {labels.navTitle}
            </h3>
            <ul className="flex flex-col gap-3 text-[14px] text-white/75">
              <li><Link href={`/${locale}`} className="hover:text-bright-teal transition-colors">{homeLabel}</Link></li>
              <li><Link href={`/${locale}/about`} className="hover:text-bright-teal transition-colors">{labels.about}</Link></li>
              <li><Link href={`/${locale}/solutions`} className="hover:text-bright-teal transition-colors">{labels.solutions}</Link></li>
              <li><Link href={`/${locale}/press`} className="hover:text-bright-teal transition-colors">{labels.press}</Link></li>
            </ul>
          </div>

          {/* Solutions links */}
          <div className="flex flex-col gap-5">
            <h3 className="font-semibold text-white text-[14px] uppercase tracking-wider">
              {labels.solutionsTitle}
            </h3>
            <ul className="flex flex-col gap-3 text-[14px] text-white/75">
              <li><Link href={`/${locale}/solutions`} className="hover:text-bright-teal transition-colors">Meias#Verdades</Link></li>
              <li>
                <Link href={`/${locale}/solutions`} className="hover:text-bright-teal transition-colors">
                  {locale === "pt" ? "Jogo da Memória" : locale === "en" ? "Memory Game" : "Juego de Memoria"}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/solutions`} className="hover:text-bright-teal transition-colors flex items-center gap-1.5">
                  Código P.A.T.A.
                  <span className="text-[10px] bg-white/10 px-1.5 py-0.5 rounded text-white/60 font-medium">DEV</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact details */}
          <div className="flex flex-col gap-5">
            <h3 className="font-semibold text-white text-[14px] uppercase tracking-wider">
              {labels.contactTitle}
            </h3>
            <ul className="flex flex-col gap-3.5 text-[14px] text-white/75">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-bright-teal shrink-0 mt-0.5" />
                <span>{labels.address}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-bright-teal shrink-0" />
                <span>+55 81 99656-1408</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-bright-teal shrink-0" />
                <span className="break-all">karoline@literaciaedu.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider and Copyright */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <p className="text-white/50 text-xs">{labels.rights}</p>
          <div className="flex items-center gap-6 text-xs text-white/55">
            <Link href={`/${locale}/privacy`} className="hover:text-bright-teal transition-colors">{labels.privacy}</Link>
            <Link href={`/${locale}/terms`} className="hover:text-bright-teal transition-colors">{labels.terms}</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
