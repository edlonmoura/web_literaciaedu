import { Locale } from "@/lib/get-dictionary"
import { FadeIn } from "@/components/InteractiveComponents"

interface LegalPageProps {
  params: Promise<{ locale: string }>
}

export function generateStaticParams() {
  return [{ locale: 'pt' }, { locale: 'en' }, { locale: 'es' }]
}

export default async function TermsPage({ params }: LegalPageProps) {
  const { locale } = await params
  const activeLocale = (locale as Locale) || "pt"
  const isPt = activeLocale === "pt"
  const isEn = activeLocale === "en"

  const title = isPt ? "Termos de Uso" : isEn ? "Terms of Service" : "Términos de Uso"

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
                Ao acessar e utilizar o site institucional ou os jogos desenvolvidos pela Literacia Edu, você concorda em cumprir e vincular-se aos seguintes Termos de Uso.
              </p>
              <h2 className="text-lg font-bold text-primary-teal font-sans mt-4">1. Licença de Uso</h2>
              <p>
                Os materiais, jogos e conteúdos presentes no site são protegidos por direitos autorais e de propriedade intelectual. Concede-se uma licença temporária e limitada para fins educacionais e não comerciais.
              </p>
              <h2 className="text-lg font-bold text-primary-teal font-sans mt-4">2. Uso Permitido</h2>
              <p>
                Educadores e escolas parceiras podem utilizar nossos guias pedagógicos e jogos físicos em sala de aula de acordo com os acordos de licenciamento individuais. É proibido redistribuir, comercializar ou modificar qualquer software ou conteúdo sem autorização prévia por escrito.
              </p>
            </>
          ) : isEn ? (
            <>
              <p>
                By accessing and using the institutional website or the games developed by Literacia Edu, you agree to comply with and be bound by the following Terms of Service.
              </p>
              <h2 className="text-lg font-bold text-primary-teal font-sans mt-4">1. License</h2>
              <p>
                The materials, games, and content displayed on this website are protected by intellectual property and copyright laws. A temporary, limited license is granted for educational and non-commercial purposes.
              </p>
              <h2 className="text-lg font-bold text-primary-teal font-sans mt-4">2. Permitted Use</h2>
              <p>
                Educators and partner schools may use our pedagogical guides and physical games in classrooms in accordance with individual licensing agreements. Redistributing, selling, or modifying any software or content without prior written permission is strictly prohibited.
              </p>
            </>
          ) : (
            <>
              <p>
                Al acceder y utilizar el sitio web institucional o los juegos desarrollados por Literacia Edu, usted acepta cumplir y estar sujeto a los siguientes Términos de Uso.
              </p>
              <h2 className="text-lg font-bold text-primary-teal font-sans mt-4">1. Licencia de Uso</h2>
              <p>
                Los materiales, juegos y contenidos provistos en este sitio web están protegidos por derechos de autor y de propiedad intelectual. Se otorga una licencia temporal y limitada para fines educativos y no comerciales.
              </p>
              <h2 className="text-lg font-bold text-primary-teal font-sans mt-4">2. Uso Permitido</h2>
              <p>
                Los educadores y las escuelas asociadas pueden utilizar nuestras guías pedagógicas y juegos físicos en el aula de acuerdo con los acuerdos de licencia individuales. Está prohibido redistribuir, comercializar o modificar cualquier software o contenido sin autorización previa por escrito.
              </p>
            </>
          )}
        </FadeIn>
      </div>
    </div>
  )
}
