const features = [
  {
    icon: "⚡",
    title: "Two paths, one command",
    desc: "Build a local agent for experimentation, or a full deployable app with FastAPI server, Streamlit chat UI, and cloud configs — all from npx agentvoy create.",
  },
  {
    icon: "🚀",
    title: "Deploy anywhere",
    desc: "Docker, Fly.io, Railway, GCP Cloud Run, AWS Lambda. AgentVoy generates all deployment files. Your guardrails flow into infrastructure config automatically.",
  },
  {
    icon: "🔒",
    title: "Secure by default",
    desc: "Every project ships with agent.guard.yml. Permissions, cost caps, iteration limits, prompt injection blocking — enforced before you write a line of agent logic.",
  },
  {
    icon: "🔌",
    title: "Any framework. Any model.",
    desc: "OpenAI Agents SDK, Google ADK, CrewAI, LangGraph, Anthropic, LlamaIndex, AutoGen. Swap providers without rewriting your agent.",
  },
  {
    icon: "🤖",
    title: "Multi-agent pipelines",
    desc: "Build sequential pipelines where each agent builds on the previous stage's output. Name your agents, configure the count, and get a production-ready pipeline.py.",
  },
  {
    icon: "🔓",
    title: "Apache 2.0 open source",
    desc: "Fully open source, forever. No vendor lock-in. No usage limits. Fork it, extend it, add your own framework or deployment adapter.",
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
