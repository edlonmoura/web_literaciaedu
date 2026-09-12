import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Target, Brain, Award, Newspaper, Dna, Globe, Eye, Shield, Syringe, Gamepad2, Zap, BarChart3 } from "lucide-react"
import { getDictionary, validLocale } from "@/lib/get-dictionary"
import { FadeIn, FloatingElement, ScaleIn, StaggerContainer, StaggerItem, SwayingFloat } from "@/components/InteractiveComponents"

interface HomePageProps {
  params: Promise<{ locale: string }>
}

export function generateStaticParams() {
  return [{ locale: 'pt' }, { locale: 'en' }, { locale: 'es' }]
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params
  const activeLocale = validLocale(locale)
  const dict = await getDictionary(activeLocale)

  const partners = [
    { name: "UFPE", type: dict.home.partners.types.academic },
    { name: "KU Leuven", type: dict.home.partners.types.research },
    { name: "Sudene", type: dict.home.partners.types.acceleration },
    { name: "UFRPE", type: dict.home.partners.types.academic },
    { name: "SEMAS", type: dict.home.partners.types.government }
  ]

  return (
    <div className="relative w-full overflow-hidden">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Literacia Edu",
            "url": `https://literaciaedu.com.br/${activeLocale}`,
            "logo": "https://literaciaedu.com.br/logo/LOGO__LITERACIA_EDU_Prancheta_15.png",
            "description": dict.common.footer.description,
            "sameAs": [
              "https://instagram.com/literaciaedu"
            ],
            "founder": {
              "@type": "Person",
              "name": "Karoline Fernandes"
            }
          })
        }}
      />
      
      {/* SECTION 1: HERO */}
      <section className="relative min-h-[90vh] flex items-center justify-center px-6 lg:px-8 py-20 bg-gradient-to-br from-[#05242A] via-[#076476] to-[#04333D] text-white">
        {/* Animated Background Mesh */}
        <div className="absolute inset-0 z-0 opacity-30">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-bright-teal/30 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-yellow/20 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          {/* Hero Content */}
          <div className="lg:col-span-7 flex flex-col items-start text-left gap-6">
            <FadeIn direction="right" delay={0.1}>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-bright-teal text-xs font-semibold uppercase tracking-wider backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-bright-teal animate-ping" />
                {dict.home.hero.badge}
              </div>
            </FadeIn>
            
            <FadeIn direction="right" delay={0.2}>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-energize font-bold text-white leading-[1.1] tracking-tight">
                {dict.home.hero.title}
              </h1>
            </FadeIn>

            <FadeIn direction="right" delay={0.3}>
              <p className="text-white/85 text-base sm:text-lg leading-relaxed max-w-2xl font-sans font-light">
                {dict.home.hero.subtitle}
              </p>
            </FadeIn>

            <FadeIn direction="right" delay={0.4} className="w-full">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mt-2">
                <Link
                  href={`/${activeLocale}/solutions`}
                  className="inline-flex items-center justify-center gap-2 bg-brand-yellow text-[#05242A] font-bold px-7 py-4 rounded-xl hover:bg-white hover:text-[#05242A] transition-all duration-300 shadow-lg shadow-brand-yellow/20 hover:shadow-xl hover:-translate-y-0.5 text-[15px]"
                >
                  {dict.common.cta.solutions}
                  <ArrowRight className="w-4.5 h-4.5" />
                </Link>
                <Link
                  href={`/${activeLocale}/contact`}
                  className="inline-flex items-center justify-center bg-white/10 text-white border border-white/20 font-semibold px-7 py-4 rounded-xl hover:bg-white/20 hover:border-white/30 backdrop-blur-md transition-all duration-200 text-[15px]"
                >
                  {dict.common.cta.contact}
                </Link>
              </div>
            </FadeIn>
          </div>

          {/* Hero Visual Mockup */}
          <div className="lg:col-span-5 flex justify-center relative">
            <FadeIn direction="left" delay={0.3} className="w-full max-w-md">
              <FloatingElement speed={5}>
                <div className="relative aspect-[4/3] w-full rounded-2xl bg-gradient-to-tr from-bright-teal to-brand-yellow p-1 shadow-2xl shadow-black/40 overflow-hidden group">
                  <div className="absolute inset-0 bg-[#05242A]/10 mix-blend-overlay" />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/80 via-transparent to-transparent z-10" />
                  
                  {/* Floating badge inside visual */}
                  <div className="absolute top-4 right-4 z-20 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-3 py-1.5 text-white text-xs font-semibold tracking-wider">
                    Meias#Verdades
                  </div>

                  <div className="absolute bottom-6 left-6 right-6 z-20 text-white flex flex-col gap-1.5">
                    <p className="font-sans font-bold text-lg uppercase tracking-wider text-brand-yellow">
                      {dict.home.hero.mockup.letramento}
                    </p>
                    <p className="text-sm text-white/95 leading-relaxed font-sans font-light">
                      {dict.home.hero.mockup.desc}
                    </p>
                  </div>
                  
                  {/* Styled Inner Mockup Graphic */}
                  <div className="w-full h-full bg-[#05242A] relative flex items-center justify-center">
                    {/* Brand Symbol Fox Placeholder */}
                    <div className="relative w-40 h-40 opacity-90 transition-transform duration-300 group-hover:scale-105 -mt-12">
                      <Image
                        src="/images/logo_literacia.png"
                        alt="Literacia Edu Fox Symbol"
                        fill
                        className="object-contain"
                        sizes="160px"
                      />
                    </div>
                  </div>
                </div>
              </FloatingElement>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* SECTION 2: IMPACT METRICS */}
      <section className="py-20 bg-gradient-to-b from-[#EBF3F5] via-[#F4F8F9] to-[#EBF3F5] border-y border-primary-teal/10 relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col gap-3">
            <FadeIn direction="up" delay={0.1}>
              <p className="text-[#0B1E21]/80 text-sm sm:text-base font-sans font-medium">
                {dict.home.impact.subtitle}
              </p>
            </FadeIn>
          </div>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {dict.home.impact.items.map((item, index) => {
              const iconColors = ["text-bright-teal", "text-brand-yellow", "text-brand-orange", "text-primary-teal"]
              const accentColors = ["from-bright-teal/15 to-bright-teal/5", "from-brand-yellow/15 to-brand-yellow/5", "from-brand-orange/15 to-brand-orange/5", "from-primary-teal/15 to-primary-teal/5"]
              const borderColors = ["border-t-bright-teal", "border-t-brand-yellow", "border-t-brand-orange", "border-t-primary-teal"]
              const icons = [
                <Dna key="dna" className="w-7 h-7" />,
                <Target key="target" className="w-7 h-7" />,
                <Award key="award" className="w-7 h-7" />,
                <Globe key="globe" className="w-7 h-7" />
              ]
              return (
                <StaggerItem key={index}>
                  <div className={`bg-white/90 backdrop-blur-sm p-8 rounded-2xl border border-primary-teal/10 border-t-4 ${borderColors[index]} shadow-sm hover:shadow-xl hover:shadow-primary-teal/10 transition-all duration-400 flex flex-col items-center gap-5 group hover:border-bright-teal/30 text-center hover:-translate-y-1 h-full`}>
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${accentColors[index]} flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-400 shadow-sm`}>
                      <span className={`${iconColors[index]} group-hover:scale-110 transition-transform duration-400`}>{icons[index]}</span>
                    </div>
                    <div className="flex flex-col gap-2 items-center">
                      <span className="text-4xl font-spaceboards text-primary-teal group-hover:text-brand-orange transition-colors duration-300">
                        {item.value}
                      </span>
                      <h3 className="font-semibold text-[#0B1E21] text-base font-sans">
                        {item.label}
                      </h3>
                    </div>
                    <div className="w-10 h-px bg-primary-teal/15" />
                    <p className="text-xs text-[#0B1E21]/70 leading-loose font-sans font-light">
                      {item.desc}
                    </p>
                  </div>
                </StaggerItem>
              )
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* SECTION 3: POR QUE ISSO IMPORTA */}
      <section className="py-24 bg-[#F4F8F9] relative">
        <SwayingFloat duration={5.5} sway={4} lift={6} className="absolute top-10 right-20 hidden lg:block">
          <div className="relative w-56 h-56 opacity-40">
            <Image
              src="/images/logo_literacia.png"
              alt="Literacia Edu"
              fill
              className="object-contain"
              sizes="224px"
            />
          </div>
        </SwayingFloat>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20 flex flex-col gap-3">
            <FadeIn direction="up">
              <span className="font-energize text-bright-teal text-5xl sm:text-6xl lg:text-7xl">
                {dict.home.importance.kicker}
              </span>
            </FadeIn>
            <FadeIn direction="up" delay={0.2}>
              <p className="text-[#0B1E21]/80 text-sm sm:text-base max-w-2xl mx-auto font-sans font-light">
                {dict.home.importance.subtitle}
              </p>
            </FadeIn>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {dict.home.importance.items.map((item, index) => {
              const iconColors = ["text-bright-teal", "text-brand-yellow", "text-brand-orange", "text-primary-teal"]
              const accentColors = ["border-l-bright-teal", "border-l-brand-yellow", "border-l-brand-orange", "border-l-primary-teal"]
              const bgColors = ["from-bright-teal/10 to-white", "from-brand-yellow/10 to-white", "from-brand-orange/10 to-white", "from-primary-teal/10 to-white"]
              const icons = [
                <Newspaper key="news" className="w-7 h-7" />,
                <Eye key="eye" className="w-7 h-7" />,
                <Brain key="brain" className="w-7 h-7" />,
                <Shield key="shield" className="w-7 h-7" />
              ]
              
              return (
                <FadeIn key={index} direction="up" delay={index * 0.1}>
                  <div className={`p-8 rounded-2xl bg-gradient-to-br ${bgColors[index]} border border-primary-teal/10 border-l-4 ${accentColors[index]} flex gap-6 shadow-sm hover:shadow-xl hover:shadow-primary-teal/10 hover:-translate-y-1 transition-all duration-400 group h-full`}>
                    <div className="flex flex-col items-center gap-3 shrink-0">
                      <span className={`${iconColors[index]} group-hover:scale-110 group-hover:rotate-6 transition-all duration-400`}>{icons[index]}</span>
                      <div className="w-px h-8 bg-primary-teal/15" />
                    </div>
                    <div className="flex flex-col gap-3">
                      <h3 className="font-semibold text-lg text-primary-teal font-sans group-hover:text-bright-teal transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-sm text-[#0B1E21]/80 leading-loose font-sans font-light">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </FadeIn>
              )
            })}
          </div>
        </div>
      </section>

      {/* SECTION 4: SOLUÇÕES (CARDS DETALHADOS) */}
      <section className="py-24 bg-gradient-to-br from-[#031417] via-[#05242A] to-[#076476] text-white relative overflow-hidden">
        {/* Decorative Grid Line Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] z-0" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-bright-teal/15 rounded-full blur-3xl z-0" />
        <SwayingFloat duration={6} sway={3} lift={4} className="absolute top-12 left-20 hidden lg:block z-10">
          <div className="relative w-40 h-40 opacity-30">
            <Image
              src="/images/logo_literacia.png"
              alt="Literacia Edu"
              fill
              className="object-contain"
              sizes="160px"
            />
          </div>
        </SwayingFloat>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20 flex flex-col gap-4">
            <FadeIn direction="up">
              <span className="font-energize text-brand-yellow text-5xl sm:text-6xl lg:text-7xl">
                {dict.home.solutions.kicker}
              </span>
            </FadeIn>
            <FadeIn direction="up" delay={0.2}>
              <p className="text-white/80 text-sm sm:text-base max-w-2xl mx-auto font-sans font-light">
                {dict.home.solutions.subtitle}
              </p>
            </FadeIn>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {/* Jogo 1: Meias#Verdades Mobile */}
            <FadeIn direction="up" delay={0.1} className="flex">
              <div className="bg-[#05242A]/80 backdrop-blur-md border border-white/10 p-8 rounded-2xl flex flex-col justify-between hover:border-bright-teal/40 hover:shadow-2xl hover:shadow-bright-teal/10 transition-all duration-350 group hover:-translate-y-1.5 w-full">
                <div className="flex flex-col gap-6">
                  <div className="flex justify-between items-center">
                    <span className="px-3 py-1 rounded-full bg-bright-teal/15 border border-bright-teal/30 text-bright-teal text-xs font-semibold tracking-wider uppercase font-sans">
                      {dict.home.solutions.items.meiasVerdades.badge}
                    </span>
                    <span className="text-xs text-white/50 font-sans">{dict.home.solutions.items.meiasVerdades.support}</span>
                  </div>
                  <div className="flex flex-col gap-3">
                    <h3 className="text-2xl font-sans font-bold text-white tracking-wide">
                      {dict.home.solutions.items.meiasVerdades.title}
                    </h3>
                    <p className="text-sm text-white/80 leading-relaxed font-sans font-light">
                      {dict.home.solutions.items.meiasVerdades.desc}
                    </p>
                  </div>
                </div>
                <Link
                  href={`/${activeLocale}/solutions`}
                  className="mt-8 inline-flex items-center gap-2 text-sm text-bright-teal font-semibold hover:text-white transition-colors group/link pt-4 border-t border-white/10"
                >
                  {dict.common.cta.more}
                  <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                </Link>
              </div>
            </FadeIn>

            {/* Jogo 2: Jogo da Memória Meias#Verdades Offline */}
            <FadeIn direction="up" delay={0.2} className="flex">
              <div className="bg-[#05242A]/80 backdrop-blur-md border border-white/10 p-8 rounded-2xl flex flex-col justify-between hover:border-brand-yellow/40 hover:shadow-2xl hover:shadow-brand-yellow/10 transition-all duration-350 group hover:-translate-y-1.5 w-full">
                <div className="flex flex-col gap-6">
                  <div className="flex justify-between items-center">
                    <span className="px-3 py-1 rounded-full bg-brand-yellow/15 border border-brand-yellow/30 text-brand-yellow text-xs font-semibold tracking-wider uppercase font-sans">
                      {dict.home.solutions.items.meiasVerdadesMemory.badge}
                    </span>
                    <span className="text-xs text-white/50 font-sans">{dict.home.solutions.items.meiasVerdadesMemory.alignment}</span>
                  </div>
                  <div className="flex flex-col gap-3">
                    <h3 className="text-2xl font-sans font-bold text-white tracking-wide">
                      {dict.home.solutions.items.meiasVerdadesMemory.title}
                    </h3>
                    <p className="text-sm text-white/80 leading-relaxed font-sans font-light">
                      {dict.home.solutions.items.meiasVerdadesMemory.desc}
                    </p>
                  </div>
                </div>
                <Link
                  href={`/${activeLocale}/solutions`}
                  className="mt-8 inline-flex items-center gap-2 text-sm text-brand-yellow font-semibold hover:text-white transition-colors group/link pt-4 border-t border-white/10"
                >
                  {dict.common.cta.more}
                  <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                </Link>
              </div>
            </FadeIn>

            {/* Jogo 3: Código P.A.T.A. */}
            <FadeIn direction="up" delay={0.3} className="flex">
              <div className="bg-[#05242A]/80 backdrop-blur-md border border-white/10 p-8 rounded-2xl flex flex-col justify-between hover:border-brand-orange/40 hover:shadow-2xl hover:shadow-brand-orange/10 transition-all duration-350 group hover:-translate-y-1.5 w-full relative">
                <div className="flex flex-col gap-6">
                  <div className="flex justify-between items-center">
                    <span className="px-3 py-1 rounded-full bg-brand-orange/15 border border-brand-orange/30 text-brand-orange text-xs font-semibold tracking-wider uppercase font-sans">
                      {dict.home.solutions.items.codigoPata.badge}
                    </span>
                    <span className="text-[10px] bg-brand-yellow text-[#05242A] px-2.5 py-0.5 rounded font-bold uppercase tracking-wider scale-95 shadow-sm">
                      {dict.common.cta.underDevelopment}
                    </span>
                  </div>
                  <div className="flex flex-col gap-3">
                    <h3 className="text-2xl font-sans font-bold text-white tracking-wide">
                      {dict.home.solutions.items.codigoPata.title}
                    </h3>
                    <p className="text-sm text-white/80 leading-relaxed font-sans font-light">
                      {dict.home.solutions.items.codigoPata.desc}
                    </p>
                  </div>
                </div>
                <div className="mt-8 text-xs text-white/50 pt-4 border-t border-white/10 font-sans italic">
                  {dict.home.solutions.items.codigoPata.launch}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* SECTION 5: METODOLOGIA CIENTÍFICA */}
      <section className="py-24 bg-gradient-to-b from-[#F4F8F9] via-[#E6F0F2] to-[#F4F8F9] relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            {/* Left Graphics */}
            <div className="lg:col-span-5 flex flex-col items-center gap-8">
              <div className="grid grid-cols-2 gap-4 relative w-full">
                <div className="absolute inset-0 bg-bright-teal/10 blur-3xl rounded-full z-0" />
              {dict.home.methodology.cards.map((card, index) => {
                const iconColors = ["text-bright-teal", "text-brand-yellow", "text-brand-orange", "text-primary-teal"]
                const accentColors = ["border-l-bright-teal", "border-l-brand-yellow", "border-l-brand-orange", "border-l-primary-teal"]
                const bgColors = ["from-bright-teal/10 to-white", "from-brand-yellow/10 to-white", "from-brand-orange/10 to-white", "from-primary-teal/10 to-white"]
                const icons = [
                  <Syringe key="syringe" className="w-6 h-6" />,
                  <Gamepad2 key="gamepad" className="w-6 h-6" />,
                  <Zap key="zap" className="w-6 h-6" />,
                  <BarChart3 key="chart" className="w-6 h-6" />
                ]
                return (
                  <div key={index} className={`p-6 bg-gradient-to-br ${bgColors[index]} border border-primary-teal/10 border-l-4 ${accentColors[index]} rounded-2xl flex flex-col gap-3 relative z-10 shadow-sm hover:shadow-lg hover:shadow-primary-teal/10 transition-all duration-350 group hover:-translate-y-1`}>
                    <div className="flex items-center justify-between">
                      <span className={`${iconColors[index]} group-hover:scale-110 group-hover:rotate-6 transition-all duration-400`}>{icons[index]}</span>
                      <div className="w-8 h-px bg-primary-teal/15" />
                    </div>
                    <span className="font-semibold text-[#0B1E21] text-[15px] font-sans group-hover:text-bright-teal transition-colors">{card.title}</span>
                    <span className="text-xs text-[#0B1E21]/75 leading-loose font-sans font-light">
                      {card.desc}
                    </span>
                  </div>
                )
              })}
              </div>
              <SwayingFloat duration={5} sway={3} lift={5}>
                <div className="relative w-48 h-48 opacity-40">
                  <Image
                    src="/images/logo_literacia.png"
                    alt="Literacia Edu"
                    fill
                    className="object-contain"
                    sizes="192px"
                  />
                </div>
              </SwayingFloat>
            </div>

            {/* Right Content */}
            <div className="lg:col-span-7 flex flex-col items-start gap-6">
              <FadeIn direction="left">
                <span className="font-energize text-bright-teal text-5xl sm:text-6xl lg:text-7xl">
                  {dict.home.methodology.kicker}
                </span>
              </FadeIn>
              <FadeIn direction="left" delay={0.2}>
                <p className="text-[#0B1E21]/80 text-sm sm:text-base leading-relaxed font-sans font-light">
                  {dict.home.methodology.subtitle}
                </p>
              </FadeIn>

              <div className="flex flex-col gap-5 mt-4 w-full">
                {dict.home.methodology.items.map((item, index) => (
                  <FadeIn key={index} direction="left" delay={0.15 + index * 0.05} className="flex gap-4 items-start border-l-2 border-bright-teal/40 pl-4 py-1 hover:border-bright-teal transition-colors duration-200">
                    <div>
                      <h4 className="font-semibold text-primary-teal text-base font-sans">{item.title}</h4>
                      <p className="text-xs text-[#0B1E21]/80 leading-relaxed mt-1 font-sans font-light">{item.desc}</p>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7: PROVAS SOCIAIS (PARCEIROS) */}
      <section className="py-20 bg-[#F4F8F9] border-t border-primary-teal/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12 flex flex-col gap-2">
            <FadeIn direction="up">
              <h2 className="text-xs uppercase tracking-widest text-[#0B1E21]/55 font-semibold font-sans">
                {dict.home.partners.title}
              </h2>
            </FadeIn>
          </div>

          <StaggerContainer className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
            {partners.map((partner, index) => (
              <StaggerItem key={index} className="flex flex-col items-center justify-center p-6 bg-white/80 backdrop-blur-sm border border-primary-teal/10 rounded-2xl hover:bg-white hover:shadow-md hover:border-bright-teal/30 transition-all duration-300 group select-none">
                <span className="font-spaceboards text-primary-teal/60 text-xl tracking-wider group-hover:text-bright-teal transition-colors">
                  {partner.name}
                </span>
                <span className="text-[10px] text-primary-teal/50 group-hover:text-primary-teal transition-colors font-medium mt-1 font-sans">
                  {partner.type}
                </span>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* SECTION 8: IMPRENSA (TEASER) */}
      <section className="py-24 bg-gradient-to-b from-[#E6F0F2]/60 to-[#F4F8F9] border-t border-primary-teal/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-16">
            <div className="flex flex-col gap-3 max-w-2xl text-left">
              <FadeIn direction="right">
                <span className="font-energize text-bright-teal text-5xl sm:text-6xl lg:text-7xl">
                  {dict.home.press.kicker}
                </span>
              </FadeIn>
              <FadeIn direction="right" delay={0.2}>
                <p className="text-[#0B1E21]/80 text-sm sm:text-base font-sans font-light">
                  {dict.home.press.subtitle}
                </p>
              </FadeIn>
            </div>
            <SwayingFloat duration={5} sway={3} lift={4} className="hidden lg:block shrink-0">
              <div className="relative w-32 h-32 opacity-40">
                <Image
                  src="/images/logo_literacia.png"
                  alt="Literacia Edu"
                  fill
                  className="object-contain"
                  sizes="128px"
                />
              </div>
            </SwayingFloat>
            <FadeIn direction="left" delay={0.2} className="shrink-0">
              <Link
                href={`/${activeLocale}/press`}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary-teal hover:text-bright-teal transition-colors font-sans"
              >
                Ver assessoria de imprensa
                <ArrowRight className="w-4 h-4" />
              </Link>
            </FadeIn>
          </div>

          {/* Grayscale news slots (waiting content) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {dict.home.press.articles.map((article, index) => (
              <FadeIn key={index} direction="up" delay={0.1 + index * 0.1} className="flex">
                <div className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl border border-primary-teal/10 flex flex-col justify-between gap-6 shadow-sm hover:shadow-md transition-shadow w-full">
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-2 text-[11px] text-primary-teal/70 font-semibold font-sans">
                      <Newspaper className="w-3.5 h-3.5" />
                      <span>{article.category}</span>
                      <span>•</span>
                      <span>{article.date}</span>
                    </div>
                    <h3 className="font-semibold text-base text-primary-teal font-sans leading-snug">
                      {article.title}
                    </h3>
                    <p className="text-xs text-[#0B1E21]/75 leading-relaxed font-sans font-light">
                      {article.desc}
                    </p>
                  </div>
                  <span className="text-xs text-[#0B1E21]/50 font-semibold uppercase tracking-wider font-sans">
                    {article.source}
                  </span>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 9: CTA FINAL */}
      <section className="relative py-28 px-6 lg:px-8 bg-gradient-to-br from-[#05242A] via-primary-teal to-[#06B7A7] text-white text-center overflow-hidden">
        {/* Animated circle layers */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-white/10 rounded-full scale-100 opacity-20 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-white/10 rounded-full scale-110 opacity-10 pointer-events-none" />
        
        <div className="max-w-4xl mx-auto flex flex-col items-center gap-8 relative z-10">
          <ScaleIn>
            <p className="text-white/90 text-base sm:text-lg max-w-2xl leading-relaxed font-sans font-light">
              {dict.home.ctaFinal.subtitle}
            </p>
          </ScaleIn>

          <ScaleIn delay={0.2} className="w-full">
            <div className="flex justify-center mt-2">
              <Link
                href={`/${activeLocale}/contact`}
                className="inline-flex items-center justify-center bg-brand-yellow text-[#05242A] font-bold text-[15px] px-8 py-4 rounded-xl hover:bg-white hover:text-[#05242A] hover:scale-102 transition-all duration-300 shadow-xl shadow-black/20"
              >
                {dict.home.ctaFinal.button}
              </Link>
            </div>
          </ScaleIn>
        </div>
      </section>

    </div>
  )
}
