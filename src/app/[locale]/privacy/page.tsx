import { Locale } from "@/lib/get-dictionary"
import { FadeIn } from "@/components/InteractiveComponents"

interface LegalPageProps {
  params: Promise<{ locale: string }>
}

export function generateStaticParams() {
  return [{ locale: 'pt' }, { locale: 'en' }, { locale: 'es' }]
}

export default async function PrivacyPage({ params }: LegalPageProps) {
  const { locale } = await params
  const activeLocale = (locale as Locale) || "pt"
  const isPt = activeLocale === "pt"
  const isEn = activeLocale === "en"

  const title = isPt ? "Política de Privacidade" : isEn ? "Privacy Policy" : "Política de Privacidad"
  
  return (
    <div className="relative w-full overflow-hidden bg-white py-16 px-6 lg:px-8">
      <div className="max-w-3xl mx-auto flex flex-col gap-8">
        <FadeIn direction="up">
          <h1 className="text-3xl sm:text-4xl font-sans font-bold text-primary-teal">{title}</h1>
        </FadeIn>
        
        <FadeIn direction="up" delay={0.1} className="prose prose-teal max-w-none text-sm leading-relaxed text-[#0B1E21]/80 font-sans flex flex-col gap-6 font-light">
          {isPt ? (
            <>
              <p>
                A Literacia Edu está comprometida em proteger sua privacidade. Esta Política de Privacidade explica como coletamos, usamos e protegemos as informações fornecidas por meio de nosso site e de nossos jogos educativos.
              </p>
              <h2 className="text-lg font-bold text-primary-teal font-sans mt-4">1. Coleta de Informações</h2>
              <p>
                Não coletamos informações pessoais identificáveis de crianças e adolescentes em nossos jogos móveis sem o consentimento prévio dos responsáveis. Em nosso site institucional, coletamos informações profissionais (como nome, instituição e e-mail) fornecidas ativamente no formulário de contato.
              </p>
              <h2 className="text-lg font-bold text-primary-teal font-sans mt-4">2. Uso dos Dados</h2>
              <p>
                As informações coletadas são usadas exclusivamente para responder a solicitações de contato, propostas de parcerias e compartilhamento de materiais pedagógicos solicitados.
              </p>
              <h2 className="text-lg font-bold text-primary-teal font-sans mt-4">3. Segurança</h2>
              <p>
                Adotamos medidas técnicas e organizacionais adequadas para proteger seus dados pessoais contra acesso não autorizado, perda ou alteração, em total conformidade com a LGPD (Lei Geral de Proteção de Dados Pessoais).
              </p>
            </>
          ) : isEn ? (
            <>
              <p>
                Literacia Edu is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard the information provided through our website and our educational games.
              </p>
              <h2 className="text-lg font-bold text-primary-teal font-sans mt-4">1. Information Collection</h2>
              <p>
                We do not collect personally identifiable information from children and teens in our mobile games without prior parental consent. On our institutional website, we collect professional information (such as name, institution, and email) actively provided through the contact form.
              </p>
              <h2 className="text-lg font-bold text-primary-teal font-sans mt-4">2. Data Usage</h2>
              <p>
                The collected information is used exclusively to respond to contact requests, partnership proposals, and to share requested pedagogical materials.
              </p>
              <h2 className="text-lg font-bold text-primary-teal font-sans mt-4">3. Security</h2>
              <p>
                We adopt appropriate technical and organizational measures to protect your personal data against unauthorized access, loss, or alteration, in compliance with standard data protection regulations.
              </p>
            </>
          ) : (
            <>
              <p>
                Literacia Edu se compromete a proteger su privacidad. Esta Política de Privacidad explica cómo recopilamos, usamos y protegemos la información provista a través de nuestro sitio web y de nuestros juegos educativos.
              </p>
              <h2 className="text-lg font-bold text-primary-teal font-sans mt-4">1. Recopilación de Información</h2>
              <p>
                No recopilamos información de identificación personal de niños y adolescentes en nuestros juegos móviles sin el consentimiento previo de sus padres. En nuestro sitio web institucional, recopilamos información profesional (como nombre, institución y correo electrónico) provista activamente a través del formulario de contacto.
              </p>
              <h2 className="text-lg font-bold text-primary-teal font-sans mt-4">2. Uso de Datos</h2>
              <p>
                La información recopilada se utiliza exclusivamente para responder a las solicitudes de contacto, propuestas de alianzas y para compartir los materiales pedagógicos solicitados.
              </p>
              <h2 className="text-lg font-bold text-primary-teal font-sans mt-4">3. Seguridad</h2>
              <p>
                Adoptamos las medidas técnicas y organizativas adecuadas para proteger sus datos personales contra el acceso no autorizado, la pérdida o alteración de los mismos.
              </p>
            </>
          )}
        </FadeIn>
      </div>
    </div>
  )
}
