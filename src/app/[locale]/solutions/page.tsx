import { getDictionary, Locale } from "@/lib/get-dictionary"
import { FadeIn, ScaleIn } from "@/components/InteractiveComponents"
import { BookOpen, Clock, Users, ArrowRight, ShieldCheck } from "lucide-react"
import Link from "next/link"


interface SolutionsPageProps {
  params: Promise<{ locale: string }>
}

export function generateStaticParams() {
  return [{ locale: 'pt' }, { locale: 'en' }, { locale: 'es' }]
}

export default async function SolutionsPage({ params }: SolutionsPageProps) {
  const { locale } = await params
  const activeLocale = (locale as Locale) || "pt"
  const dict = await getDictionary(activeLocale)

  return (
    <div className="relative w-full overflow-hidden bg-white">
      
      {/* HEADER */}
      <section className="relative py-20 px-6 lg:px-8 bg-gradient-to-b from-teal-light/20 to-white border-b border-primary-teal/5">
        <div className="max-w-4xl mx-auto text-center flex flex-col gap-6">
          <FadeIn direction="up">
            <span className="font-sawah text-bright-teal text-xl md:text-2xl">
              {dict.common.nav.solutions}
            </span>
          </FadeIn>

          <FadeIn direction="up" delay={0.2}>
            <p className="text-lg text-[#0B1E21]/80 max-w-2xl mx-auto font-sans leading-relaxed font-light">
              {dict.solutions.subtitle}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* SOLUTION 1: MEIAS VERDADES MOBILE */}
      <section className="py-24 px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Visual side */}
          <div className="lg:col-span-5 flex justify-center">
            <FadeIn direction="right" className="w-full max-w-sm">
              <div className="relative w-full max-w-[340px] rounded-[2.5rem] bg-[#076476] border-[8px] border-[#0B1E21] shadow-2xl overflow-hidden group">
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-4 bg-[#0B1E21] rounded-full z-20" />
                
                <img
                  src="/images/meias_verdades_mobile.png"
                  alt="Meias Verdades - Jogo Mobile"
                  className="w-full h-auto"
                />

              </div>
            </FadeIn>
          </div>

          {/* Content side */}
          <div className="lg:col-span-7 flex flex-col items-start gap-6">
            <FadeIn direction="left">
              <span className="px-3.5 py-1.5 rounded-full bg-primary-teal/5 border border-primary-teal/10 text-primary-teal text-xs font-semibold uppercase tracking-wider font-sans">
                Edição Digital
              </span>
            </FadeIn>

            <FadeIn direction="left" delay={0.15}>
              <h3 className="text-lg text-bright-teal font-medium font-sans">
                {dict.solutions.meiasVerdades.subtitle}
              </h3>
            </FadeIn>
            <FadeIn direction="left" delay={0.2}>
              <p className="text-sm text-[#0B1E21]/80 leading-relaxed font-sans font-light">
                {dict.home.solutions.items.meiasVerdades.desc}
              </p>
            </FadeIn>

            <div className="flex flex-col gap-4 mt-2 w-full">
              <h4 className="font-semibold text-[#0B1E21] text-[15px] uppercase tracking-wider font-sans">
                {dict.solutions.meiasVerdades.featuresTitle}
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {dict.solutions.meiasVerdades.features.map((feat, index) => (
                  <FadeIn key={index} direction="left" delay={0.25 + index * 0.05} className="flex gap-2.5 items-start">
                    <ShieldCheck className="w-5 h-5 text-bright-teal shrink-0 mt-0.5" />
                    <span className="text-xs text-[#0B1E21]/80 leading-relaxed font-sans">{feat}</span>
                  </FadeIn>
                ))}
              </ul>
            </div>

            <FadeIn direction="left" delay={0.4} className="mt-4 p-4 rounded-xl bg-teal-light/40 border border-primary-teal/5 flex items-center gap-3 text-xs text-primary-teal font-semibold font-sans w-full">
              <Users className="w-5 h-5 shrink-0" />
              <span>{dict.solutions.meiasVerdades.audience}</span>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* SOLUTION 2: MEIAS VERDADES MEMORY CARD GAME */}
      <section className="py-24 bg-teal-light/15 border-y border-primary-teal/5 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Content side */}
          <div className="lg:col-span-7 flex flex-col items-start gap-6 order-last lg:order-first">
            <FadeIn direction="right">
              <span className="px-3.5 py-1.5 rounded-full bg-brand-yellow/10 border border-brand-yellow/20 text-brand-yellow text-xs font-semibold uppercase tracking-wider font-sans bg-white">
                Edição Física / Offline
              </span>
            </FadeIn>

            <FadeIn direction="right" delay={0.15}>
              <h3 className="text-lg text-bright-teal font-medium font-sans">
                {dict.solutions.memoryGame.subtitle}
              </h3>
            </FadeIn>
            <FadeIn direction="right" delay={0.2}>
              <p className="text-sm text-[#0B1E21]/80 leading-relaxed font-sans font-light">
                {dict.home.solutions.items.meiasVerdadesMemory.desc}
              </p>
            </FadeIn>

            <div className="flex flex-col gap-4 mt-2 w-full">
              <h4 className="font-semibold text-[#0B1E21] text-[15px] uppercase tracking-wider font-sans">
                {dict.solutions.memoryGame.featuresTitle}
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {dict.solutions.memoryGame.features.map((feat, index) => (
                  <FadeIn key={index} direction="right" delay={0.25 + index * 0.05} className="flex gap-2.5 items-start">
                    <BookOpen className="w-5 h-5 text-bright-teal shrink-0 mt-0.5" />
                    <span className="text-xs text-[#0B1E21]/80 leading-relaxed font-sans">{feat}</span>
                  </FadeIn>
                ))}
              </ul>
            </div>

            <FadeIn direction="right" delay={0.4} className="mt-4 p-4 rounded-xl bg-white border border-primary-teal/5 flex items-center gap-3 text-xs text-primary-teal font-semibold font-sans w-full">
              <Clock className="w-5 h-5 shrink-0" />
              <span>{dict.solutions.memoryGame.audience}</span>
            </FadeIn>
          </div>

          {/* Visual card deck mockup */}
          <div className="lg:col-span-5 flex justify-center">
            <FadeIn direction="left" className="w-full max-w-sm">
              <div className="relative aspect-square w-full bg-[#076476] border border-primary-teal/10 rounded-2xl p-8 shadow-2xl flex flex-col justify-between items-stretch overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary-teal/20 to-bright-teal/10 opacity-50" />
                
                {/* Real card images */}
                <div className="grid grid-cols-3 gap-4 relative z-10 mt-6">
                  <div className="relative aspect-[2/3] rounded-lg overflow-hidden shadow-lg rotate-[-8deg] translate-x-2 border border-primary-teal/10 hover:rotate-0 hover:translate-y-[-8px] transition-all duration-350">
                    <img src="/images/meias_verdades_esquerda.png" alt="Carta esquerda" className="absolute inset-0 w-full h-full object-cover" />
                  </div>
                  <div className="relative aspect-[2/3] rounded-lg overflow-hidden shadow-lg rotate-[4deg] translate-y-[-10px] hover:rotate-0 hover:translate-y-[-8px] transition-all duration-350">
                    <img src="/images/meias_verdades_meio.png" alt="Carta meio" className="absolute inset-0 w-full h-full object-cover" />
                  </div>
                  <div className="relative aspect-[2/3] rounded-lg overflow-hidden shadow-lg rotate-[12deg] translate-x-[-8px] border border-primary-teal/10 hover:rotate-0 hover:translate-y-[-8px] transition-all duration-350">
                    <img src="/images/meias_verdades_direita.png" alt="Carta direita" className="absolute inset-0 w-full h-full object-cover" />
                  </div>
                </div>

                <div className="text-white text-center mt-auto relative z-10">
                  <span className="font-spaceboards text-xs uppercase tracking-wider text-brand-yellow">{dict.solutions.memoryGame.mockup.boardGame}</span>
                  <p className="text-[10px] text-white/70 font-sans mt-1">{dict.solutions.memoryGame.mockup.desc}</p>
                </div>
              </div>
            </FadeIn>
          </div>

        </div>
      </section>

      {/* SOLUTION 3: CODIGO PATA */}
      <section className="py-24 px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Visual side */}
          <div className="lg:col-span-5 flex justify-center">
            <FadeIn direction="right" className="w-full max-w-sm">
              <div className="relative aspect-square w-full bg-[#076476] border border-white/5 rounded-2xl flex flex-col justify-between shadow-2xl overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-brand-orange/15 to-transparent z-0" />
                <div className="absolute top-4 left-4 z-20 bg-brand-orange text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                  {dict.common.cta.underDevelopment}
                </div>
                
                <div className="relative z-10 flex-1 flex items-center justify-center p-8">
                  <img src="/images/logo_codigo_pata.png" alt="Código P.A.T.A." className="w-full h-auto object-contain" />
                </div>

                <div className="text-white mt-auto relative z-10 flex flex-col gap-1 px-8 pb-8">
                  <span className="font-spaceboards text-xs text-brand-yellow uppercase tracking-wider">{dict.solutions.codigoPata.mockup.letramento}</span>
                  <span className="text-[10px] text-white/55 font-sans">{dict.solutions.codigoPata.mockup.ecossistema}</span>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Content side */}
          <div className="lg:col-span-7 flex flex-col items-start gap-6">
            <FadeIn direction="left">
              <span className="px-3.5 py-1.5 rounded-full bg-brand-orange/10 border border-brand-orange/20 text-brand-orange text-xs font-semibold uppercase tracking-wider font-sans bg-white">
                {dict.common.cta.underDevelopment}
              </span>
            </FadeIn>

            <FadeIn direction="left" delay={0.15}>
              <h3 className="text-lg text-bright-teal font-medium font-sans">
                {dict.solutions.codigoPata.subtitle}
              </h3>
            </FadeIn>
            <FadeIn direction="left" delay={0.2}>
              <p className="text-sm text-[#0B1E21]/80 leading-relaxed font-sans font-light">
                {dict.solutions.codigoPata.desc}
              </p>
            </FadeIn>
            <FadeIn direction="left" delay={0.3} className="p-4 rounded-xl bg-brand-orange/5 border border-brand-orange/10 text-xs text-brand-orange font-semibold font-sans w-full">
              {dict.solutions.codigoPata.status}
            </FadeIn>
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="py-24 bg-gradient-to-tr from-primary-teal to-bright-teal text-white text-center px-6 lg:px-8">
        <div className="max-w-4xl mx-auto flex flex-col items-center gap-8">

          <ScaleIn delay={0.1}>
            <p className="text-white/85 text-base max-w-xl font-sans font-light">
              {dict.solutions.cta.desc}
            </p>
          </ScaleIn>
          <ScaleIn delay={0.2}>
            <Link
              href={`/${activeLocale}/contact`}
              className="inline-flex items-center gap-2 bg-brand-yellow text-primary-teal font-semibold px-8 py-4 rounded-xl hover:bg-white hover:text-[#0B1E21] hover:scale-102 transition-all duration-300 shadow-xl"
            >
              {dict.solutions.cta.button}
              <ArrowRight className="w-4.5 h-4.5" />
            </Link>
          </ScaleIn>
        </div>
      </section>

    </div>
  )
}
