import { getDictionary, Locale } from "@/lib/get-dictionary"
import { FadeIn } from "@/components/InteractiveComponents"
import ContactForm from "@/components/ContactForm"
import { Mail, Phone, MapPin, Clock } from "lucide-react"

interface ContactPageProps {
  params: Promise<{ locale: string }>
}

export function generateStaticParams() {
  return [{ locale: 'pt' }, { locale: 'en' }, { locale: 'es' }]
}

export default async function ContactPage({ params }: ContactPageProps) {
  const { locale } = await params
  const activeLocale = (locale as Locale) || "pt"
  const dict = await getDictionary(activeLocale)

  // Map fields for ContactForm props
  const formLabels = {
    name: dict.contact.form.name,
    institution: dict.contact.form.institution,
    role: dict.contact.form.role,
    email: dict.contact.form.email,
    phone: dict.contact.form.phone,
    message: dict.contact.form.message,
    namePlaceholder: dict.contact.form.namePlaceholder,
    institutionPlaceholder: dict.contact.form.institutionPlaceholder,
    rolePlaceholder: dict.contact.form.rolePlaceholder,
    emailPlaceholder: dict.contact.form.emailPlaceholder,
    phonePlaceholder: dict.contact.form.phonePlaceholder,
    messagePlaceholder: dict.contact.form.messagePlaceholder,
  }

  const statusLabels = {
    successTitle: dict.contact.status.successTitle,
    successText: dict.contact.status.successText,
    errorTitle: dict.contact.status.errorTitle,
    errorText: dict.contact.status.errorText,
  }

  return (
    <div className="relative w-full overflow-hidden bg-white">
      
      {/* HEADER */}
      <section className="relative py-20 px-6 lg:px-8 bg-gradient-to-b from-teal-light/20 to-white border-b border-primary-teal/5">
        <div className="max-w-4xl mx-auto text-center flex flex-col gap-6">
          <FadeIn direction="up">
            <span className="font-sawah text-bright-teal text-xl md:text-2xl">
              {dict.common.nav.contact}
            </span>
          </FadeIn>
          <FadeIn direction="up" delay={0.1}>
            <p className="text-lg text-[#0B1E21]/80 max-w-2xl mx-auto font-sans leading-relaxed font-light">
              {dict.contact.subtitle}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* FORM AND INFO SECTION */}
      <section className="py-24 px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Form wrapper */}
          <div className="lg:col-span-7 bg-white border border-primary-teal/5 rounded-3xl p-8 md:p-10 shadow-lg shadow-primary-teal/5 relative z-10">
            <FadeIn direction="right">
              <ContactForm
                labels={formLabels}
                statusLabels={statusLabels}
                submitLabel={dict.common.cta.submit}
                sendingLabel={dict.common.cta.sending}
              />
            </FadeIn>
          </div>

          {/* Contact details sidebar */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            {/* Direct Channels */}
            <FadeIn direction="left" className="bg-gradient-to-br from-bright-teal/8 to-bright-teal/2 border border-primary-teal/8 border-l-4 border-l-bright-teal rounded-3xl p-8 flex flex-col gap-6 hover:shadow-xl hover:shadow-primary-teal/10 hover:-translate-y-1 transition-all duration-400">
              <div className="flex items-center gap-3">
                <span className="text-2xl">📞</span>
                <h3 className="font-sans font-bold text-lg text-primary-teal">
                  {dict.contact.infoTitle}
                </h3>
              </div>
              
              <ul className="flex flex-col gap-4 text-sm text-[#0B1E21] font-medium font-sans">
                <li className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-bright-teal/15 to-bright-teal/5 flex items-center justify-center text-bright-teal shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                    <Mail className="w-4.5 h-4.5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-primary-teal/60 uppercase font-semibold">{dict.contact.emailLabel}</span>
                    <span className="text-sm font-semibold text-primary-teal break-all mt-0.5">contato@literaciaedu.com.br</span>
                  </div>
                </li>

                <li className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-yellow/15 to-brand-yellow/5 flex items-center justify-center text-brand-yellow shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                    <Phone className="w-4.5 h-4.5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-primary-teal/60 uppercase font-semibold">{dict.contact.phoneLabel}</span>
                    <span className="text-sm font-semibold text-primary-teal mt-0.5">+55 (81) 99806-4921</span>
                  </div>
                </li>

                <li className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-orange/15 to-brand-orange/5 flex items-center justify-center text-brand-orange shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                    <Clock className="w-4.5 h-4.5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-primary-teal/60 uppercase font-semibold">{dict.contact.hoursLabel}</span>
                    <span className="text-sm font-semibold text-primary-teal mt-0.5">{dict.contact.hours}</span>
                  </div>
                </li>
              </ul>
            </FadeIn>

            {/* Sede Administrativa */}
            <FadeIn direction="left" delay={0.1} className="bg-gradient-to-br from-brand-yellow/8 to-brand-yellow/2 border border-primary-teal/8 border-l-4 border-l-brand-yellow rounded-3xl p-8 flex flex-col gap-4 shadow-sm hover:shadow-xl hover:shadow-primary-teal/10 hover:-translate-y-1 transition-all duration-400">
              <div className="flex items-center gap-3">
                <span className="text-2xl group-hover:scale-110 transition-transform duration-400">📍</span>
                <h3 className="font-sans font-bold text-lg text-primary-teal">
                  {dict.contact.addressTitle}
                </h3>
              </div>
              <div className="flex gap-4 items-start text-sm text-[#0B1E21]/75 leading-loose font-sans font-light">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-yellow/15 to-brand-yellow/5 flex items-center justify-center shrink-0">
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
