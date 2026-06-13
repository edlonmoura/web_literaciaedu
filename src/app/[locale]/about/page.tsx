import { getDictionary, Locale } from "@/lib/get-dictionary"
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/InteractiveComponents"
import { BookOpen, ShieldAlert, Award, Compass, Eye, Heart, Syringe, Dna } from "lucide-react"
import Image from "next/image"

interface AboutPageProps {
  params: Promise<{ locale: string }>
}

export function generateStaticParams() {
  return [{ locale: 'pt' }, { locale: 'en' }, { locale: 'es' }]
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params
  const activeLocale = (locale as Locale) || "pt"
  const dict = await getDictionary(activeLocale)

  const valueIcons = [Award, Compass, Heart, BookOpen]

  return (
    <div className="relative w-full overflow-hidden bg-white">
      
      {/* HEADER SECTION */}
      <section className="relative py-20 px-6 lg:px-8 bg-gradient-to-b from-teal-light/20 to-white border-b border-primary-teal/5">
        <div className="max-w-4xl mx-auto text-center flex flex-col gap-6">
          <FadeIn direction="up">
            <span className="font-sawah text-bright-teal text-xl md:text-2xl">
              {dict.common.nav.about}
            </span>
          </FadeIn>

          <FadeIn direction="up" delay={0.2}>
            <p className="text-lg text-[#0B1E21]/80 max-w-2xl mx-auto font-sans leading-relaxed font-light">
              {dict.about.subtitle}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* HISTORY SECTION */}
      <section className="py-24 px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          <div className="lg:col-span-6 flex flex-col gap-6">
            <FadeIn direction="right">
              <p className="text-[#0B1E21]/85 text-sm sm:text-base leading-relaxed font-sans font-light">
                {dict.about.historyDesc}
              </p>
            </FadeIn>
            
            {/* Scientific Vaccine Block */}
            <FadeIn direction="right" delay={0.2} className="mt-4">
              <div className="p-6 rounded-2xl bg-gradient-to-br from-bright-teal/8 to-bright-teal/2 border border-primary-teal/8 border-l-4 border-l-bright-teal flex items-start gap-4 hover:shadow-lg hover:shadow-primary-teal/10 hover:-translate-y-1 transition-all duration-400">
                <span className="text-bright-teal shrink-0 mt-1 group-hover:scale-110 transition-transform duration-400"><Syringe className="w-8 h-8" /></span>
                <div className="flex flex-col gap-2">
                  <h3 className="font-semibold text-primary-teal font-sans text-base">{dict.about.vacinaTitle}</h3>
                  <p className="text-xs text-[#0B1E21]/70 leading-loose font-sans font-light">
                    {dict.about.vacinaDesc}
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Timeline side */}
          <div className="lg:col-span-6 flex flex-col gap-8 relative border-l border-primary-teal/15 pl-6 lg:pl-10 py-2 ml-4">
            <h3 className="font-sans font-bold text-xl text-primary-teal uppercase tracking-wider mb-2">
              {dict.about.timeline.title}
            </h3>
            {dict.about.timeline.items.map((item, index) => (
              <FadeIn key={index} direction="left" delay={index * 0.1} className="relative group">
                {/* Bullet node */}
                <span className="absolute -left-[31px] lg:-left-[47px] top-1.5 w-4 h-4 rounded-full bg-white border-2 border-bright-teal group-hover:bg-bright-teal transition-colors duration-300" />
                <div className="flex flex-col gap-1.5">
                  <span className="font-spaceboards text-bright-teal text-lg">{item.year}</span>
                  <h4 className="font-semibold text-primary-teal text-base font-sans leading-snug">{item.title}</h4>
                  <p className="text-xs text-[#0B1E21]/75 leading-relaxed font-sans font-light">{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* MISSION, VISION, VALUES */}
      <section className="py-24 bg-teal-light/15 border-y border-primary-teal/5 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Mission and Vision Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <FadeIn direction="right" className="bg-gradient-to-br from-bright-teal/8 to-bright-teal/2 p-8 rounded-2xl border border-primary-teal/8 border-l-4 border-l-bright-teal shadow-sm hover:shadow-xl hover:shadow-primary-teal/10 hover:-translate-y-1 transition-all duration-400 flex gap-6 items-start group">
              <span className="text-bright-teal shrink-0 mt-1 group-hover:scale-110 group-hover:rotate-6 transition-all duration-400"><Compass className="w-8 h-8" /></span>
              <div className="flex flex-col gap-2">
                <h3 className="text-xl font-sans font-bold text-primary-teal group-hover:text-bright-teal transition-colors">{dict.about.mission.title}</h3>
                <p className="text-sm text-[#0B1E21]/70 leading-loose font-sans font-light">{dict.about.mission.desc}</p>
              </div>
            </FadeIn>

            <FadeIn direction="left" className="bg-gradient-to-br from-brand-yellow/8 to-brand-yellow/2 p-8 rounded-2xl border border-primary-teal/8 border-l-4 border-l-brand-yellow shadow-sm hover:shadow-xl hover:shadow-primary-teal/10 hover:-translate-y-1 transition-all duration-400 flex gap-6 items-start group">
              <span className="text-brand-yellow shrink-0 mt-1 group-hover:scale-110 group-hover:rotate-6 transition-all duration-400"><Eye className="w-8 h-8" /></span>
              <div className="flex flex-col gap-2">
                <h3 className="text-xl font-sans font-bold text-primary-teal group-hover:text-bright-teal transition-colors">{dict.about.vision.title}</h3>
                <p className="text-sm text-[#0B1E21]/70 leading-loose font-sans font-light">{dict.about.vision.desc}</p>
              </div>
            </FadeIn>
          </div>

          {/* Core Values */}
          <div className="text-center mb-12 flex flex-col gap-2">
            <span className="font-sawah text-bright-teal text-xl">{dict.about.values.title}</span>
          </div>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {dict.about.values.items.map((item, index) => {
              const icons = [
                <Award key="award" className="w-7 h-7" />,
                <Compass key="compass" className="w-7 h-7" />,
                <Heart key="heart" className="w-7 h-7" />,
                <BookOpen key="book" className="w-7 h-7" />
              ]
              const iconColors = ["text-bright-teal", "text-brand-yellow", "text-brand-orange", "text-primary-teal"]
              const accentColors = ["border-l-bright-teal", "border-l-brand-yellow", "border-l-brand-orange", "border-l-primary-teal"]
              const bgColors = ["from-bright-teal/8 to-bright-teal/2", "from-brand-yellow/8 to-brand-yellow/2", "from-brand-orange/8 to-brand-orange/2", "from-primary-teal/8 to-primary-teal/2"]
              return (
                <StaggerItem key={index}>
                  <div className={`bg-gradient-to-br ${bgColors[index]} p-8 rounded-2xl border border-primary-teal/8 border-l-4 ${accentColors[index]} shadow-sm hover:shadow-xl hover:shadow-primary-teal/10 transition-all duration-400 hover:-translate-y-1 flex flex-col gap-4 group h-full`}>
                    <span className={`${iconColors[index]} group-hover:scale-110 group-hover:rotate-6 transition-all duration-400`}>{icons[index]}</span>
                    <h4 className="font-semibold text-[#0B1E21] text-base font-sans group-hover:text-bright-teal transition-colors">{item.title}</h4>
                    <div className="w-8 h-px bg-primary-teal/15" />
                    <p className="text-xs text-[#0B1E21]/65 leading-loose font-sans font-light">{item.desc}</p>
                  </div>
                </StaggerItem>
              )
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* THE SCIENCE BEHIND IT */}
      <section className="py-24 px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-5 flex justify-center order-last lg:order-first">
            <FadeIn direction="right" className="w-full max-w-sm">
              <div className="relative aspect-square w-full rounded-2xl bg-[#076476] border border-primary-teal/15 p-8 flex flex-col items-center justify-center gap-6 shadow-2xl text-center group hover:shadow-primary-teal/20 transition-all duration-400">
                <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-transparent to-transparent opacity-80" />
                <span className="text-white relative z-10 group-hover:scale-110 group-hover:rotate-6 transition-all duration-400"><Dna className="w-14 h-14" /></span>
                <h3 className="text-white text-xl font-sans font-bold relative z-10">{dict.about.inoculacaoTitle}</h3>
                <p className="text-white/75 text-xs leading-loose relative z-10 max-w-xs font-sans font-light">
                  {dict.about.inoculacaoDesc}
                </p>
              </div>
            </FadeIn>
          </div>

          <div className="lg:col-span-7 flex flex-col items-start gap-6">
            <FadeIn direction="left">
              <span className="font-sawah text-bright-teal text-xl md:text-2xl">{dict.about.scienceKicker}</span>
            </FadeIn>
            <FadeIn direction="left" delay={0.1} className="flex flex-col gap-4 text-[#0B1E21]/80 text-sm sm:text-base leading-loose font-sans font-light">
              <p>{dict.about.scienceDesc1}</p>
              <p>{dict.about.scienceDesc2}</p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* FOUNDER BRAND CORNER */}
      <section className="py-24 bg-navy-dark text-white px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem] z-0" />
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">
          <div className="lg:col-span-7 flex flex-col items-start gap-6">
            <FadeIn direction="right">
              <span className="font-sawah text-brand-yellow text-xl md:text-2xl">{dict.about.founderTitle}</span>
            </FadeIn>
            <FadeIn direction="right" delay={0.1}>
              <span className="font-sawah text-white/80 text-lg flex flex-col leading-tight">
                {dict.home.founder.subtitle.split(/[,.] ?/).filter(Boolean).map((line, i) => (
                  <span key={i}>{line}</span>
                ))}
              </span>
            </FadeIn>
            <FadeIn direction="right" delay={0.15}>
              <div className="flex flex-col gap-1">
                <span className="text-xl font-bold text-brand-yellow font-sans">{dict.home.founder.name}</span>
                <span className="text-xs font-semibold uppercase tracking-wider text-white/60 font-sans">{dict.home.founder.role}</span>
              </div>
            </FadeIn>
            <FadeIn direction="right" delay={0.2}>
              <p className="text-white/80 text-sm sm:text-base leading-relaxed font-sans font-light">
                {dict.home.founder.bio}
              </p>
            </FadeIn>
            <FadeIn direction="right" delay={0.3}>
              <div className="p-6 bg-white/5 border border-white/10 rounded-2xl italic text-white/90 text-sm font-medium border-l-4 border-l-brand-yellow leading-relaxed max-w-xl font-sans">
                {dict.home.founder.quote}
              </div>
            </FadeIn>
          </div>
          <div className="lg:col-span-5 flex justify-center">
            <FadeIn direction="left" className="w-full max-w-xs">
              <div className="relative aspect-[4/5] w-full bg-navy-deep border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="/images/fundadora.png"
                  alt="Fundadora - Karoline Maria Fernandes da Costa e Silva"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/90 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 z-10 p-6 flex flex-col items-center gap-2">
                  <span className="font-spaceboards text-lg uppercase tracking-wider text-brand-yellow">{dict.home.founder.name}</span>
                  <span className="text-[10px] text-white/50 tracking-widest font-sans uppercase">{dict.home.founder.roleLabel}</span>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

    </div>
  )
}
