import type { Metadata } from "next"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { Locale } from "@/lib/get-dictionary"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params

  const titles: Record<string, string> = {
    pt: "Literacia Edu | Educação, Ciência e Letramento Digital",
    en: "Literacia Edu | Education, Science and Digital Literacy",
    es: "Literacia Edu | Educación, Ciencia y Alfabetización Digital",
  }

  const descriptions: Record<string, string> = {
    pt: "EdTech focada em letramento midiático, pensamento crítico e resiliência digital para crianças e adolescentes. Jogos sérios e ciência contra a desinformação.",
    en: "EdTech focused on media literacy, critical thinking, and digital resilience for kids and teens. Serious games and science combating disinformation.",
    es: "EdTech enfocada en alfabetización mediática, pensamiento crítico y resiliencia digital para niños y adolescentes. Juegos serios y ciencia contra la desinformación.",
  }

  return {
    title: titles[locale] || titles.pt,
    description: descriptions[locale] || descriptions.pt,
    metadataBase: new URL("https://literaciaedu.com.br"),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        pt: "/pt",
        en: "/en",
        es: "/es",
      },
    },
    openGraph: {
      type: "website",
      locale: locale === "en" ? "en_US" : locale === "es" ? "es_ES" : "pt_BR",
      url: `https://literaciaedu.com.br/${locale}`,
      title: titles[locale] || titles.pt,
      description: descriptions[locale] || descriptions.pt,
      siteName: "Literacia Edu",
    },
    twitter: {
      card: "summary_large_image",
      title: titles[locale] || titles.pt,
      description: descriptions[locale] || descriptions.pt,
    },
  }
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const activeLocale = (locale as Locale) || "pt"

  return (
    <>
      <Navbar locale={activeLocale} />
      <main id="main-content" className="flex-grow pt-24">
        {children}
      </main>
      <Footer locale={activeLocale} />
    </>
  )
}
