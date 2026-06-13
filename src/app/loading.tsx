export default function Loading() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="text-center flex flex-col items-center gap-6">
        <div className="w-12 h-12 border-4 border-primary-teal/20 border-t-bright-teal rounded-full animate-spin" />
        <p className="text-sm text-[#0B1E21]/70 font-sans font-light">
          A carregar...
        </p>
      </div>
    </div>
  )
}
