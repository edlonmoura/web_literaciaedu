import { getDictionary, validLocale } from "@/lib/get-dictionary"
import { FadeIn } from "@/components/InteractiveComponents"
import ContactForm from "@/components/ContactForm"
import { Mail, MessageCircle, MapPin, Clock } from "lucide-react"

interface ContactPageProps {
  params: Promise<{ locale: string }>
}

export function generateStaticParams() {
  return [{ locale: 'pt' }, { locale: 'en' }, { locale: 'es' }]
}

export default async function ContactPage({ params }: ContactPageProps) {
  const { locale } = await params
  const activeLocale = validLocale(locale)
  const dict = await getDictionary(activeLocale)

  // Map fields for ContactForm props
  const formLabels = {
    name: dict.contact.form.name,
    institution: dict.contact.form.institution,
    role: dict.contact.form.role,
    email: dict.contact.form.email,
    message: dict.contact.form.message,
    namePlaceholder: dict.contact.form.namePlaceholder,
    institutionPlaceholder: dict.contact.form.institutionPlaceholder,
    rolePlaceholder: dict.contact.form.rolePlaceholder,
    emailPlaceholder: dict.contact.form.emailPlaceholder,
    messagePlaceholder: dict.contact.form.messagePlaceholder,
  }

  const statusLabels = {
    successTitle: dict.contact.status.successTitle,
    successText: dict.contact.status.successText,
    errorTitle: dict.contact.status.errorTitle,
    errorText: dict.contact.status.errorText,
  }

  const validationLabels = {
    nameRequired: dict.contact.validation.nameRequired,
    institutionRequired: dict.contact.validation.institutionRequired,
    emailRequired: dict.contact.validation.emailRequired,
    emailInvalid: dict.contact.validation.emailInvalid,
    messageRequired: dict.contact.validation.messageRequired,
  }

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
              {dict.common.nav.contact}
            </span>
          </FadeIn>
          <FadeIn direction="up" delay={0.1}>
            <p className="text-lg text-white/90 max-w-2xl mx-auto font-sans leading-relaxed font-light">
              {dict.contact.subtitle}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* FORM AND INFO SECTION */}
      <section className="py-24 px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Form wrapper */}
          <div className="lg:col-span-7 bg-white/95 backdrop-blur-md border border-primary-teal/10 rounded-3xl p-8 md:p-10 shadow-xl relative z-10">
            <FadeIn direction="right">
              <ContactForm
                labels={formLabels}
                statusLabels={statusLabels}
                validationLabels={validationLabels}
                submitLabel={dict.common.cta.submit}
                sendingLabel={dict.common.cta.sending}
                sendNewMessageLabel={dict.contact.resetButton}
              />
            </FadeIn>
          </div>

          {/* Contact details sidebar */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            {/* Direct Channels */}
            <FadeIn direction="left" className="bg-gradient-to-br from-[#05242A] to-[#076476] border border-white/10 text-white rounded-3xl p-8 flex flex-col gap-6 shadow-2xl hover:shadow-bright-teal/10 transition-all duration-400">
              <div className="flex items-center gap-3">
                <span className="text-bright-teal"><MessageCircle className="w-6 h-6" /></span>
                <h3 className="font-sans font-bold text-lg text-white">
                  {dict.contact.infoTitle}
                </h3>
              </div>
              
              <ul className="flex flex-col gap-4 text-sm text-white font-medium font-sans">
                <li className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-xl bg-bright-teal/20 flex items-center justify-center text-bright-teal shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-sm border border-white/10">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-white/60 uppercase font-semibold">{dict.contact.emailLabel}</span>
                    <span className="text-sm font-semibold text-white break-all mt-0.5">contato@literaciaedu.com.br</span>
                  </div>
                </li>

                <li className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-xl bg-brand-orange/20 flex items-center justify-center text-brand-orange shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-sm border border-white/10">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-white/60 uppercase font-semibold">{dict.contact.hoursLabel}</span>
                    <span className="text-sm font-semibold text-white mt-0.5">{dict.contact.hours}</span>
                  </div>
                </li>
              </ul>
            </FadeIn>

            {/* Sede Administrativa */}
            <FadeIn direction="left" delay={0.1} className="bg-white/90 backdrop-blur-sm border border-primary-teal/10 border-l-4 border-l-brand-yellow rounded-3xl p-8 flex flex-col gap-4 shadow-md hover:shadow-xl transition-all duration-400">
              <div className="flex items-center gap-3">
                <span className="text-brand-yellow group-hover:scale-110 transition-transform duration-400"><MapPin className="w-6 h-6" /></span>
                <h3 className="font-sans font-bold text-lg text-primary-teal">
                  {dict.contact.addressTitle}
                </h3>
              </div>
              <div className="flex gap-4 items-start text-sm text-[#0B1E21]/80 leading-loose font-sans font-light">
                <div className="w-10 h-10 rounded-xl bg-brand-yellow/15 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-brand-yellow" />
                </div>
                <p>{dict.contact.addressText}</p>
              </div>
            </FadeIn>
          </div>

        </div>
      </section>

    </div>
  )
}

