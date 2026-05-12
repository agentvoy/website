const features = [
  {
    icon: "⚡",
    title: "One command setup",
    desc: "Run npx agentvoy create and get a complete, runnable project — no boilerplate hunting, no framework-specific config spelunking.",
  },
  {
    icon: "🔒",
    title: "Secure by default",
    desc: "Every project ships with guardrails config. Permissions, cost caps, iteration limits — defined before you write a line of agent logic.",
  },
  {
    icon: "🔌",
    title: "Any model provider",
    desc: "OpenAI, Anthropic, Google, Groq, Mistral, or Ollama locally. Swap providers without rewriting your agent.",
  },
  {
    icon: "📐",
    title: "Universal guardrails standard",
    desc: "agent.guard.yml is a framework-agnostic format. Define security constraints once, enforce them across any framework.",
  },
  {
    icon: "🖥️",
    title: "No GPU required",
    desc: "Runs on any laptop. Just bring your API key. Or use Ollama for fully local, free inference with no cloud costs.",
  },
  {
    icon: "🔓",
    title: "Apache 2.0 open source",
    desc: "Fully open source, forever. No vendor lock-in. No usage limits. Fork it, extend it, add your own framework adapter.",
  },
]

export function FeaturesSection() {
  return (
    <section className="w-full px-4 py-16 max-w-6xl mx-auto">
      <div className="text-xs font-semibold tracking-widest text-blue-400 uppercase mb-3">Why AgentVoy</div>
      <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-3">
        Everything you need to ship agents.
      </h2>
      <p className="text-neutral-400 mb-10 max-w-xl">
        From zero to production-ready agent project in one command.
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {features.map((f) => (
          <div
            key={f.title}
            className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 hover:border-neutral-600 transition-colors"
          >
            <div className="text-2xl mb-3">{f.icon}</div>
            <div className="font-semibold text-white mb-2">{f.title}</div>
            <div className="text-sm text-neutral-400 leading-relaxed">{f.desc}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
