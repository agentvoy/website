'use client'

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between px-6 h-14 bg-black/80 backdrop-blur-md border-b border-neutral-900">
      <a href="/" className="font-bold text-white text-lg tracking-tight">
        AgentVoy
      </a>
      <div className="flex items-center gap-6 text-sm text-neutral-400">
        <a href="#frameworks" className="hover:text-white transition-colors hidden sm:block">Frameworks</a>
        <a href="#guardrails" className="hover:text-white transition-colors hidden sm:block">Guardrails</a>
        <a href="#deploy" className="hover:text-white transition-colors hidden sm:block">Deploy</a>
        <a href="#quickstart" className="hover:text-white transition-colors hidden sm:block">Quick Start</a>
        <a
          href="https://github.com/agentvoy/agentvoy"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-white transition-colors"
        >
          GitHub
        </a>
        <a
          href="https://www.npmjs.com/package/agentvoy"
          target="_blank"
          rel="noopener noreferrer"
          className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-md transition-colors font-medium text-xs"
        >
          npm install
        </a>
      </div>
    </nav>
  )
}
