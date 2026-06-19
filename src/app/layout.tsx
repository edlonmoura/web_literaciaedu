import type { Metadata } from "next"
import localFont from "next/font/local"
import "./globals.css"

const sawah = localFont({
  src: "../../public/fonts/SawahPersonalUse-RpAYA.otf",
  variable: "--font-sawah",
  display: "swap",
})

const spaceboards = localFont({
  src: "../../public/fonts/Spaceboardsdemo-8MyRB.otf",
  variable: "--font-spaceboards",
  display: "swap",
})

const poppins = localFont({
  src: [
    { path: "../../public/fonts/Poppins-Regular.ttf", weight: "400", style: "normal" },
    { path: "../../public/fonts/Poppins-Medium.ttf", weight: "500", style: "normal" },
    { path: "../../public/fonts/Poppins-Bold.ttf", weight: "700", style: "normal" },
  ],
  variable: "--font-poppins",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://literaciaedu.com.br"),
  title: "Literacia Edu | Educação, Ciência e Letramento Digital",
  description:
    "EdTech focada em letramento midiático, pensamento crítico e resiliência digital para crianças e adolescentes.",
  openGraph: {
    title: "Literacia Edu | Educação, Ciência e Letramento Digital",
    description:
      "EdTech focada em letramento midiático, pensamento crítico e resiliência digital para crianças e adolescentes.",
    url: "https://literaciaedu.com.br",
    siteName: "Literacia Edu",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "/logo/LOGO__LITERACIA_EDU_Prancheta_03.png",
        width: 1200,
        height: 630,
        alt: "Literacia Edu",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Literacia Edu | Educação, Ciência e Letramento Digital",
    description:
      "EdTech focada em letramento midiático, pensamento crítico e resiliência digital para crianças e adolescentes.",
    images: ["/logo/LOGO__LITERACIA_EDU_Prancheta_03.png"],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt" className="scroll-smooth">
      <body
        className={`${poppins.variable} ${sawah.variable} ${spaceboards.variable} font-sans bg-white text-[#0B1E21] antialiased min-h-screen flex flex-col`}
      >
        {children}
      </body>
    </html>
  )
}
