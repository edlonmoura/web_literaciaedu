import { getDictionary, validLocale } from "@/lib/get-dictionary"
import { FadeIn, ScaleIn } from "@/components/InteractiveComponents"
import { BookOpen, Clock, Users, ArrowRight, ShieldCheck } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface SolutionsPageProps {
  params: Promise<{ locale: string }>
}

export function generateStaticParams() {
  return [{ locale: 'pt' }, { locale: 'en' }, { locale: 'es' }]
}

export default async function SolutionsPage({ params }: SolutionsPageProps) {
  const { locale } = await params
  const activeLocale = validLocale(locale)
  const dict = await getDictionary(activeLocale)

  return (
    <div className="relative w-full overflow-hidden bg-[#F4F8F9]">
      
      {/* HEADER */}
      <section className="relative pt-32 pb-20 px-6 lg:px-8 bg-gradient-to-br from-[#05242A] via-[#076476] to-[#04333D] text-white border-b border-white/10">
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-bright-teal/30 rounded-full blur-3xl" />
        </div>
        <div className="max-w-4xl mx-auto text-center flex flex-col gap-6 relative z-10">
          <FadeIn direction="up">
            <span className="font-energize text-brand-yellow text-5xl sm:text-6xl lg:text-7xl">
              {dict.common.nav.solutions}
            </span>
          </FadeIn>

          <FadeIn direction="up" delay={0.2}>
            <p className="text-lg text-white/90 max-w-2xl mx-auto font-sans leading-relaxed font-light">
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
              <div className="relative w-full max-w-[340px] rounded-[2.5rem] bg-[#05242A] border-[6px] border-bright-teal shadow-2xl overflow-hidden group">
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-4 bg-[#031417] rounded-full z-20" />
                
                <Image
                  src="/images/meias_verdades_mobile.png"
                  alt="Meias Verdades - Jogo Mobile"
                  width={340}
                  height={600}
                  className="w-full h-auto"
                />
              </div>
            </FadeIn>
          </div>

          {/* Content side */}
          <div className="lg:col-span-7 flex flex-col items-start gap-6">
            <FadeIn direction="left">
              <span className="px-3.5 py-1.5 rounded-full bg-bright-teal/15 border border-bright-teal/30 text-primary-teal text-xs font-bold uppercase tracking-wider font-sans">
                Edição Digital
              </span>
            </FadeIn>

            <FadeIn direction="left" delay={0.15}>
              <h3 className="text-xl text-primary-teal font-bold font-sans">
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
                  <FadeIn key={index} direction="left" delay={0.25 + index * 0.05} className="flex gap-2.5 items-start bg-white/80 backdrop-blur-xs p-3.5 rounded-xl border border-primary-teal/10 shadow-xs">
                    <ShieldCheck className="w-5 h-5 text-bright-teal shrink-0 mt-0.5" />
                    <span className="text-xs text-[#0B1E21]/80 leading-relaxed font-sans">{feat}</span>
                  </FadeIn>
                ))}
              </ul>
            </div>

            <FadeIn direction="left" delay={0.4} className="mt-4 p-4 rounded-xl bg-white/90 border border-primary-teal/15 shadow-sm flex items-center gap-3 text-xs text-primary-teal font-semibold font-sans w-full">
              <Users className="w-5 h-5 text-bright-teal shrink-0" />
              <span>{dict.solutions.meiasVerdades.audience}</span>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* SOLUTION 2: MEIAS VERDADES MEMORY CARD GAME */}
      <section className="py-24 bg-gradient-to-b from-[#EBF3F5] via-[#F4F8F9] to-[#EBF3F5] border-y border-primary-teal/10 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Content side */}
          <div className="lg:col-span-7 flex flex-col items-start gap-6 order-last lg:order-first">
            <FadeIn direction="right">
              <span className="px-3.5 py-1.5 rounded-full bg-brand-yellow/20 border border-brand-yellow/40 text-[#05242A] text-xs font-bold uppercase tracking-wider font-sans bg-white shadow-xs">
                Edição Física / Offline
              </span>
            </FadeIn>

            <FadeIn direction="right" delay={0.15}>
              <h3 className="text-xl text-primary-teal font-bold font-sans">
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
                  <FadeIn key={index} direction="right" delay={0.25 + index * 0.05} className="flex gap-2.5 items-start bg-white/80 backdrop-blur-xs p-3.5 rounded-xl border border-primary-teal/10 shadow-xs">
                    <BookOpen className="w-5 h-5 text-bright-teal shrink-0 mt-0.5" />
                    <span className="text-xs text-[#0B1E21]/80 leading-relaxed font-sans">{feat}</span>
                  </FadeIn>
                ))}
              </ul>
            </div>

            <FadeIn direction="right" delay={0.4} className="mt-4 p-4 rounded-xl bg-white/90 border border-primary-teal/15 shadow-sm flex items-center gap-3 text-xs text-primary-teal font-semibold font-sans w-full">
              <Clock className="w-5 h-5 text-brand-yellow shrink-0" />
              <span>{dict.solutions.memoryGame.audience}</span>
            </FadeIn>
          </div>

          {/* Visual card deck mockup */}
          <div className="lg:col-span-5 flex justify-center">
            <FadeIn direction="left" className="w-full max-w-sm">
              <div className="relative aspect-square w-full bg-gradient-to-br from-[#05242A] to-[#076476] border border-white/10 rounded-2xl p-8 shadow-2xl flex flex-col items-center overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-tr from-bright-teal/20 to-brand-yellow/10 opacity-50" />
                
                {/* Real card images */}
                <div className="flex justify-center items-center gap-4 relative z-10 mt-auto mb-auto">
                  <div className="relative w-[120px] h-[170px] rounded-xl overflow-hidden shadow-2xl rotate-[-8deg] border-2 border-white/20 hover:rotate-0 hover:translate-y-[-8px] transition-all duration-350">
                    <Image src="/images/meias_verdades_esquerda.png" alt="Carta esquerda" fill className="object-cover" sizes="140px" />
                  </div>
                  <div className="relative w-[120px] h-[170px] rounded-xl overflow-hidden shadow-2xl rotate-[3deg] border-2 border-white/30 hover:rotate-0 hover:translate-y-[-8px] transition-all duration-350">
                    <Image src="/images/meias_verdades_meio.png" alt="Carta meio" fill className="object-cover" sizes="140px" />
                  </div>
                  <div className="relative w-[120px] h-[170px] rounded-xl overflow-hidden shadow-2xl rotate-[8deg] border-2 border-white/20 hover:rotate-0 hover:translate-y-[-8px] transition-all duration-350">
                    <Image src="/images/meias_verdades_direita.png" alt="Carta direita" fill className="object-cover" sizes="140px" />
                  </div>
                </div>

                <div className="text-white text-center mt-auto relative z-10">
                  <span className="font-spaceboards text-xs uppercase tracking-wider text-brand-yellow">{dict.solutions.memoryGame.mockup.boardGame}</span>
                  <p className="text-[10px] text-white/80 font-sans mt-1">{dict.solutions.memoryGame.mockup.desc}</p>
                </div>
              </div>
            </FadeIn>
          </div>

        </div>
      </section>

      {/* SOLUTION 3: LIVRO MEIAS#VERDADES */}
      <section className="py-24 px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Visual side */}
          <div className="lg:col-span-5 flex justify-center order-first lg:order-last">
            <FadeIn direction="left" className="w-full max-w-sm">
              <div className="relative w-full max-w-[340px] rounded-2xl bg-[#05242A] border border-white/10 shadow-2xl overflow-hidden group">
                <Image
                  src="/images/livro_meias_verdades.png"
                  alt="Livro Meias#Verdades - Karoline Fernandes"
                  width={340}
                  height={480}
                  className="w-full h-auto"
                />
              </div>
            </FadeIn>
          </div>

          {/* Content side */}
          <div className="lg:col-span-7 flex flex-col items-start gap-6">
            <FadeIn direction="right">
              <span className="px-3.5 py-1.5 rounded-full bg-bright-teal/15 border border-bright-teal/30 text-primary-teal text-xs font-bold uppercase tracking-wider font-sans">
                Publicação Acadêmica
              </span>
            </FadeIn>

            <FadeIn direction="right" delay={0.15}>
              <h3 className="text-xl text-primary-teal font-bold font-sans">
                {dict.solutions.livro.subtitle}
              </h3>
            </FadeIn>
            <FadeIn direction="right" delay={0.2}>
              <p className="text-sm text-[#0B1E21]/80 leading-relaxed font-sans font-light">
                {dict.solutions.livro.desc}
              </p>
            </FadeIn>

            <div className="flex flex-col gap-4 mt-2 w-full">
              <h4 className="font-semibold text-[#0B1E21] text-[15px] uppercase tracking-wider font-sans">
                {dict.solutions.livro.featuresTitle}
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {dict.solutions.livro.features.map((feat, index) => (
                  <FadeIn key={index} direction="right" delay={0.25 + index * 0.05} className="flex gap-2.5 items-start bg-white/80 backdrop-blur-xs p-3.5 rounded-xl border border-primary-teal/10 shadow-xs">
                    <BookOpen className="w-5 h-5 text-bright-teal shrink-0 mt-0.5" />
                    <span className="text-xs text-[#0B1E21]/80 leading-relaxed font-sans">{feat}</span>
                  </FadeIn>
                ))}
              </ul>
            </div>

            <FadeIn direction="right" delay={0.4} className="mt-4 p-4 rounded-xl bg-white/90 border border-primary-teal/15 shadow-sm flex items-center gap-3 text-xs text-primary-teal font-semibold font-sans w-full">
              <Users className="w-5 h-5 text-bright-teal shrink-0" />
              <span>{dict.solutions.livro.audience}</span>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* SOLUTION 4: CODIGO PATA */}
      <section className="py-24 px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Visual side */}
          <div className="lg:col-span-5 flex justify-center">
            <FadeIn direction="right" className="w-full max-w-sm">
              <div className="relative aspect-square w-full bg-[#05242A] border border-white/10 rounded-2xl p-8 flex flex-col justify-between shadow-2xl overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-brand-orange/20 to-transparent z-0" />
                <div className="absolute top-4 left-4 z-20 bg-brand-yellow text-[#05242A] text-[10px] font-bold px-2.5 py-0.5 rounded uppercase tracking-wider shadow-sm">
                  {dict.common.cta.underDevelopment}
                </div>
                
                {/* Tech grid representations */}
                <div className="w-full flex-1 relative z-10 mt-6 overflow-hidden rounded-2xl">
                  <Image src="/images/logo_pata.png" alt="Código P.A.T.A." width={400} height={300} className="w-full h-full object-cover" />
                </div>

                <div className="text-white mt-auto relative z-10 flex flex-col gap-1">
                  <span className="font-spaceboards text-xs text-brand-yellow uppercase tracking-wider">{dict.solutions.codigoPata.mockup.letramento}</span>
                  <span className="text-[10px] text-white/70 font-sans">{dict.solutions.codigoPata.mockup.ecossistema}</span>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Content side */}
          <div className="lg:col-span-7 flex flex-col items-start gap-6">
            <FadeIn direction="left">
              <span className="px-3.5 py-1.5 rounded-full bg-brand-orange/15 border border-brand-orange/30 text-brand-orange text-xs font-bold uppercase tracking-wider font-sans bg-white">
                {dict.common.cta.underDevelopment}
              </span>
            </FadeIn>

            <FadeIn direction="left" delay={0.15}>
              <h3 className="text-xl text-primary-teal font-bold font-sans">
                {dict.solutions.codigoPata.subtitle}
              </h3>
            </FadeIn>
            <FadeIn direction="left" delay={0.2}>
              <p className="text-sm text-[#0B1E21]/80 leading-relaxed font-sans font-light">
                {dict.solutions.codigoPata.desc}
              </p>
            </FadeIn>
            <FadeIn direction="left" delay={0.3} className="p-4 rounded-xl bg-brand-orange/10 border border-brand-orange/20 text-xs text-brand-orange font-semibold font-sans w-full">
              {dict.solutions.codigoPata.status}
            </FadeIn>
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="py-24 bg-gradient-to-br from-[#05242A] via-primary-teal to-[#06B7A7] text-white text-center px-6 lg:px-8 relative overflow-hidden shadow-2xl">
        <div className="max-w-4xl mx-auto flex flex-col items-center gap-8 relative z-10">

          <ScaleIn delay={0.1}>
            <p className="text-white/90 text-base sm:text-lg max-w-xl font-sans font-light leading-relaxed">
              {dict.solutions.cta.desc}
            </p>
          </ScaleIn>
          <ScaleIn delay={0.2}>
            <Link
              href={`/${activeLocale}/contact`}
              className="inline-flex items-center gap-2 bg-brand-yellow text-[#05242A] font-bold px-8 py-4 rounded-xl hover:bg-white hover:text-[#05242A] hover:scale-102 transition-all duration-300 shadow-xl"
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

