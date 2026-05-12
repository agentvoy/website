const steps = [
  {
    n: "1",
    title: "Create your agent project",
    desc: "Run the command, pick your framework and model provider interactively — or pass flags to skip all prompts.",
    code: "npx agentvoy create my-agent",
  },
  {
    n: "2",
    title: "Add your API key",
    desc: "Copy .env.example to .env and add your key. Supports OpenAI, Anthropic, Google, Groq, Mistral, and local Ollama.",
    code: "cp .env.example .env",
  },
  {
    n: "3",
    title: "Install and run",
    desc: "Install Python dependencies and start your agent. The interactive REPL is ready immediately.",
    code: "pip install -r requirements.txt && python run.py",
  },
  {
    n: "4",
    title: "Configure guardrails",
    desc: "Edit agent.guard.yml to set permissions, cost limits, and behavior constraints for your specific use case.",
    code: "# Edit agent.guard.yml",
  },
]

export function QuickStartSection() {
  return (
    <section className="w-full px-4 py-16 max-w-6xl mx-auto">
      <div className="text-xs font-semibold tracking-widest text-blue-400 uppercase mb-3">Quick Start</div>
      <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-3">
        Up and running in 60 seconds.
      </h2>
      <p className="text-neutral-400 mb-10 max-w-xl">
        No installation required. Just run the command and follow the prompts.
      </p>

      <div className="space-y-4">
        {steps.map((step) => (
          <div key={step.n} className="flex gap-5 items-start">
            <div className="flex-shrink-0 w-8 h-8 rounded-full border border-blue-500 bg-blue-500/10 text-blue-400 text-sm font-semibold flex items-center justify-center mt-1">
              {step.n}
            </div>
            <div className="flex-1 bg-neutral-900 border border-neutral-800 rounded-xl p-5 hover:border-neutral-700 transition-colors">
              <div className="font-semibold text-white mb-1">{step.title}</div>
              <div className="text-sm text-neutral-400 mb-3">{step.desc}</div>
              <code className="text-xs font-mono text-green-400 bg-black/40 px-3 py-1.5 rounded-lg block">
                $ {step.code}
              </code>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
