'use client'

export default function Error({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="text-center flex flex-col items-center gap-6 max-w-md">
        <span className="text-6xl">⚠️</span>
        <h1 className="text-4xl font-sans font-bold text-primary-teal">Erro</h1>
        <h2 className="text-xl font-sans font-semibold text-[#0B1E21]">
          Algo correu mal
        </h2>
        <p className="text-sm text-[#0B1E21]/70 leading-relaxed font-sans font-light">
          Ocorreu um erro inesperado. Por favor, tente novamente ou contacte-nos se o problema persistir.
        </p>
        <button
          onClick={reset}
          className="inline-flex items-center gap-2 bg-primary-teal text-white font-semibold px-8 py-3 rounded-xl hover:bg-bright-teal transition-colors"
        >
          Tentar Novamente
        </button>
      </div>
    </div>
  )
}
