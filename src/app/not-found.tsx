import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="text-center flex flex-col items-center gap-6 max-w-md">
        <span className="text-6xl">🔍</span>
        <h1 className="text-4xl font-sans font-bold text-primary-teal">404</h1>
        <h2 className="text-xl font-sans font-semibold text-[#0B1E21]">
          Página não encontrada
        </h2>
        <p className="text-sm text-[#0B1E21]/70 leading-relaxed font-sans font-light">
          A página que procura não existe ou foi movida. Verifique o URL ou volte para a página inicial.
        </p>
        <Link
          href="/pt"
          className="inline-flex items-center gap-2 bg-primary-teal text-white font-semibold px-8 py-3 rounded-xl hover:bg-bright-teal transition-colors"
        >
          Voltar ao Início
        </Link>
      </div>
    </div>
  )
}
