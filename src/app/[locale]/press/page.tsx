import { getDictionary, Locale } from "@/lib/get-dictionary"
import { FadeIn } from "@/components/InteractiveComponents"
import { Mail, Phone, Calendar } from "lucide-react"

interface PressPageProps {
  params: Promise<{ locale: string }>
}

export function generateStaticParams() {
  return [{ locale: 'pt' }, { locale: 'en' }, { locale: 'es' }]
}

export default async function PressPage({ params }: PressPageProps) {
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
              {dict.common.nav.press}
            </span>
          </FadeIn>
          <FadeIn direction="up" delay={0.1}>
            <p className="text-lg text-[#0B1E21]/80 max-w-2xl mx-auto font-sans leading-relaxed font-light">
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
            
            {/* Empty state or list layout */}
            <FadeIn direction="right" delay={0.1} className="flex flex-col gap-6">
              {dict.press.releases.map((release, index) => {
                const emojis = ["📰", "🎙️", "📺", "🏅", "🌐"]
                const accentColors = ["border-l-bright-teal", "border-l-brand-yellow", "border-l-brand-orange", "border-l-primary-teal", "border-l-bright-teal"]
                const bgColors = ["from-bright-teal/8 to-bright-teal/2", "from-brand-yellow/8 to-brand-yellow/2", "from-brand-orange/8 to-brand-orange/2", "from-primary-teal/8 to-primary-teal/2", "from-bright-teal/8 to-bright-teal/2"]
                return (
                  <div key={index} className={`p-6 bg-gradient-to-br ${bgColors[index]} border border-primary-teal/8 border-l-4 ${accentColors[index]} rounded-2xl flex gap-5 group hover:bg-white hover:shadow-xl hover:shadow-primary-teal/10 hover:-translate-y-1 transition-all duration-400`}>
                    <div className="flex flex-col items-center gap-2 shrink-0">
                      <span className="text-2xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-400">{emojis[index % emojis.length]}</span>
                      <div className="w-px h-6 bg-primary-teal/15" />
                    </div>
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center gap-2 text-[10px] text-primary-teal/60 font-semibold font-sans">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{release.date}</span>
                        <span>•</span>
                        <span>{release.category}</span>
                      </div>
                      <h3 className="font-semibold text-base text-primary-teal font-sans leading-snug group-hover:text-bright-teal transition-colors">
                        {release.title}
                      </h3>
                      <p className="text-xs text-[#0B1E21]/65 leading-loose font-sans font-light">
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
            <FadeIn direction="left" delay={0.1} className="bg-gradient-to-br from-bright-teal/8 to-bright-teal/2 border border-primary-teal/8 border-l-4 border-l-bright-teal p-8 rounded-2xl flex flex-col gap-6 shadow-sm hover:shadow-xl hover:shadow-primary-teal/10 hover:-translate-y-1 transition-all duration-400">
              <div className="flex items-center gap-3">
                <span className="text-2xl">✉️</span>
                <h3 className="text-lg font-sans font-bold text-primary-teal">
                  {dict.press.contactTitle}
                </h3>
              </div>
              <p className="text-xs text-[#0B1E21]/70 leading-loose font-sans font-light">
                {dict.press.contactText}
              </p>

              <div className="flex flex-col gap-4 text-xs text-[#0B1E21] font-medium font-sans">
                <div className="flex items-center gap-3 p-3 bg-white/60 rounded-xl">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-bright-teal/15 to-bright-teal/5 flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4 text-bright-teal" />
                  </div>
                  <span>{dict.press.contactEmail}</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-white/60 rounded-xl">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-yellow/15 to-brand-yellow/5 flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4 text-brand-yellow" />
                  </div>
                  <span>{dict.press.contactPhone}</span>
                </div>
              </div>
            </FadeIn>
          </div>

        </div>
      </section>

    </div>
  )
}
