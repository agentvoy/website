const frameworks = [
  { name: "OpenAI Agents SDK", lang: "Python", available: true },
  { name: "Google ADK",        lang: "Python", available: true },
  { name: "CrewAI",            lang: "Python", available: true },
  { name: "LangGraph",         lang: "Python", available: true },
  { name: "Anthropic SDK",     lang: "Python", available: true },
  { name: "LlamaIndex",        lang: "Python", available: false },
]

const providers = [
  { name: "OpenAI",     models: "GPT-4o, o1" },
  { name: "Anthropic",  models: "Claude Sonnet 4, Opus 4" },
  { name: "Google",     models: "Gemini 2.0 Flash" },
  { name: "Ollama",     models: "llama3, mistral (local)" },
  { name: "Groq",       models: "llama-3.3-70b" },
  { name: "Mistral",    models: "mistral-large" },
]

export function FrameworksSection() {
  return (
    <section className="w-full px-4 py-16 max-w-6xl mx-auto">
      <div className="text-xs font-semibold tracking-widest text-blue-400 uppercase mb-3">Frameworks</div>
      <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-3">
        One CLI. Any framework.
      </h2>
      <p className="text-neutral-400 mb-10 max-w-xl">
        Pick your stack. AgentVoy generates the right boilerplate for each framework automatically.
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-14">
        {frameworks.map((fw) => (
          <div
            key={fw.name}
            className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 hover:border-neutral-600 transition-colors"
          >
            <div className="font-semibold text-sm text-white mb-1">{fw.name}</div>
            <div className="text-xs text-neutral-500 mb-3">{fw.lang}</div>
            <div className={`text-xs flex items-center gap-1 ${fw.available ? "text-green-400" : "text-neutral-500"}`}>
              <span>{fw.available ? "●" : "◌"}</span>
              {fw.available ? "Available" : "Coming soon"}
            </div>
          </div>
        ))}
      </div>

      <div className="text-xs font-semibold tracking-widest text-blue-400 uppercase mb-3">Model Providers</div>
      <h2 className="text-2xl font-bold text-white tracking-tight mb-3">Any model. Bring your key.</h2>
      <p className="text-neutral-400 mb-8 max-w-xl">
        OpenAI, Anthropic, Google, Groq, Mistral — or run fully local with Ollama. No GPU required.
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {providers.map((p) => (
          <div
            key={p.name}
            className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 hover:border-neutral-600 transition-colors"
          >
            <div className="font-semibold text-sm text-white mb-1">{p.name}</div>
            <div className="text-xs text-neutral-500">{p.models}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
