import { getDictionary, validLocale } from "@/lib/get-dictionary"
import { FadeIn } from "@/components/InteractiveComponents"
import { Mail } from "lucide-react"
import MediaCarousel from "@/components/MediaCarousel"

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
    <div className="relative w-full bg-[#F4F8F9]">
      
      {/* HEADER */}
      <section className="relative overflow-hidden pt-16 md:pt-32 pb-20 px-6 lg:px-8 bg-gradient-to-br from-[#05242A] via-[#076476] to-[#04333D] text-white border-b border-white/10">
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-bright-teal/30 rounded-full blur-3xl" />
        </div>
        <div className="max-w-4xl mx-auto text-center flex flex-col gap-6 relative z-10">
          <FadeIn direction="up">
            <span className="font-energize text-brand-yellow text-4xl sm:text-5xl lg:text-7xl">
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

      {/* LITERACIA EDU NA MÍDIA */}
      <section className="py-20 px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col gap-3 max-w-3xl mb-12 text-left">
          <FadeIn direction="up">
            <span className="font-energize text-bright-teal text-4xl sm:text-5xl lg:text-6xl">
              {dict.press.mediaTitle}
            </span>
          </FadeIn>
          <FadeIn direction="up" delay={0.1}>
            <p className="text-sm sm:text-base text-[#0B1E21]/80 font-sans font-light">
              {dict.press.mediaSubtitle}
            </p>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Media coverage carousel */}
          <div className="lg:col-span-8">
            <FadeIn direction="up" delay={0.1}>
              <MediaCarousel items={dict.press.media} />
            </FadeIn>
          </div>

          {/* Press contacts panel */}
          <div className="lg:col-span-4 lg:sticky lg:top-28">
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

