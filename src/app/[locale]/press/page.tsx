import { getDictionary, validLocale } from "@/lib/get-dictionary"
import { FadeIn } from "@/components/InteractiveComponents"
import { Mail, Calendar, Newspaper, Radio, Tv, Award, Globe } from "lucide-react"

interface PressPageProps {
  params: Promise<{ locale: string }>
}

export function generateStaticParams() {
  return [{ locale: 'pt' }, { locale: 'en' }, { locale: 'es' }]
}

export default async function PressPage({ params }: PressPageProps) {
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
              {dict.common.nav.press}
            </span>
          </FadeIn>
          <FadeIn direction="up" delay={0.1}>
            <p className="text-lg text-white/90 max-w-2xl mx-auto font-sans leading-relaxed font-light">
              {dict.press.subtitle}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* CORE INFORMATION AND DOWNLOADS */}
      <section className="py-24 px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Main releases/editorial list */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            
            <FadeIn direction="right" delay={0.1} className="flex flex-col gap-6">
              {dict.press.releases.map((release, index) => {
                const iconColors = ["text-bright-teal", "text-brand-yellow", "text-brand-orange", "text-primary-teal", "text-bright-teal"]
                const accentColors = ["border-l-bright-teal", "border-l-brand-yellow", "border-l-brand-orange", "border-l-primary-teal", "border-l-bright-teal"]
                const icons = [
                  <Newspaper key="news" className="w-6 h-6" />,
                  <Radio key="radio" className="w-6 h-6" />,
                  <Tv key="tv" className="w-6 h-6" />,
                  <Award key="award" className="w-6 h-6" />,
                  <Globe key="globe" className="w-6 h-6" />
                ]
                return (
                  <div key={index} className={`p-6 bg-white/90 backdrop-blur-sm border border-primary-teal/10 border-l-4 ${accentColors[index]} rounded-2xl flex gap-5 group hover:bg-white hover:shadow-xl hover:shadow-primary-teal/10 hover:-translate-y-1 transition-all duration-400`}>
                    <div className="flex flex-col items-center gap-2 shrink-0">
                      <span className={`${iconColors[index]} group-hover:scale-110 group-hover:rotate-6 transition-all duration-400`}>{icons[index % icons.length]}</span>
                      <div className="w-px h-6 bg-primary-teal/15" />
                    </div>
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center gap-2 text-[10px] text-primary-teal/70 font-semibold font-sans">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{release.date}</span>
                        <span>•</span>
                        <span>{release.category}</span>
                      </div>
                      <h3 className="font-semibold text-base text-primary-teal font-sans leading-snug group-hover:text-bright-teal transition-colors">
                        {release.title}
                      </h3>
                      <p className="text-xs text-[#0B1E21]/75 leading-loose font-sans font-light">
                        {release.desc}
                      </p>
                    </div>
                  </div>
                )
              })}
            </FadeIn>
          </div>

          {/* Media Kit / Press Contacts sidebar */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            {/* Press contacts panel */}
            <FadeIn direction="left" delay={0.1} className="bg-gradient-to-br from-[#05242A] to-[#076476] border border-white/10 text-white p-8 rounded-2xl flex flex-col gap-6 shadow-2xl hover:shadow-bright-teal/10 transition-all duration-400">
              <div className="flex items-center gap-3">
                <span className="text-bright-teal"><Mail className="w-6 h-6" /></span>
                <h3 className="text-lg font-sans font-bold text-white">
                  {dict.press.contactTitle}
                </h3>
              </div>
              <p className="text-xs text-white/80 leading-loose font-sans font-light">
                {dict.press.contactText}
              </p>

              <div className="flex flex-col gap-4 text-xs text-white font-medium font-sans">
                <div className="flex items-center gap-3 p-3.5 bg-white/10 rounded-xl border border-white/10">
                  <div className="w-8 h-8 rounded-lg bg-bright-teal/20 flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4 text-bright-teal" />
                  </div>
                  <span>{dict.press.contactEmail}</span>
                </div>
              </div>
            </FadeIn>
          </div>

        </div>
      </section>

    </div>
  )
}

