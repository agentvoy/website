const agentSteps = [
  {
    n: "1",
    title: "Create your agent project",
    desc: "Run the command, pick your framework and model interactively — or pass flags to skip all prompts.",
    code: "npx agentvoy create my-project --yes",
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
    desc: "Edit agent.guard.yml to set permissions, cost limits, and behavior constraints.",
    code: "# Edit agent.guard.yml",
  },
]

const appSteps = [
  {
    n: "1",
    title: "Create a deployable app",
    desc: "Choose App mode to get a FastAPI server, Streamlit chat UI, DevTools dashboard, Dockerfile, and cloud configs.",
    code: "npx agentvoy create my-project --build-mode app --yes",
  },
  {
    n: "2",
    title: "Add your API key and install",
    desc: "Copy .env.example to .env. Install Python deps — includes FastAPI, Uvicorn, Streamlit, and websockets.",
    code: "cp .env.example .env && pip install -r requirements.txt",
  },
  {
    n: "3",
    title: "Start with DevTools",
    desc: "Launch the dev server with live tracing. DevTools dashboard opens at /dev — see every LLM call, tool use, and guard check in real time.",
    code: "agentvoy dev",
  },
  {
    n: "4",
    title: "Deploy",
    desc: "One command to build and run with Docker, or deploy to Fly.io. Secrets and health checks handled automatically.",
    code: "agentvoy deploy --target docker",
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
        No installation required. Choose your path — local agent or deployable app.
      </p>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Agent Path */}
        <div>
          <div className="flex items-center gap-2 mb-5">
            <span className="px-2.5 py-1 rounded-md bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold">Path A</span>
            <span className="text-white font-semibold">Local Agent</span>
          </div>
          <div className="space-y-3">
            {agentSteps.map((step) => (
              <div key={step.n} className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-7 h-7 rounded-full border border-blue-500 bg-blue-500/10 text-blue-400 text-xs font-semibold flex items-center justify-center mt-0.5">
                  {step.n}
                </div>
                <div className="flex-1 bg-neutral-900 border border-neutral-800 rounded-xl p-4 hover:border-neutral-700 transition-colors">
                  <div className="font-semibold text-white text-sm mb-1">{step.title}</div>
                  <div className="text-xs text-neutral-400 mb-2.5">{step.desc}</div>
                  <code className="text-xs font-mono text-green-400 bg-black/40 px-2.5 py-1.5 rounded-lg block break-all">
                    $ {step.code}
                  </code>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* App Path */}
        <div>
          <div className="flex items-center gap-2 mb-5">
            <span className="px-2.5 py-1 rounded-md bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-semibold">Path B</span>
            <span className="text-white font-semibold">Deployable App</span>
          </div>
          <div className="space-y-3">
            {appSteps.map((step) => (
              <div key={step.n} className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-7 h-7 rounded-full border border-purple-500 bg-purple-500/10 text-purple-400 text-xs font-semibold flex items-center justify-center mt-0.5">
                  {step.n}
                </div>
                <div className="flex-1 bg-neutral-900 border border-neutral-800 rounded-xl p-4 hover:border-neutral-700 transition-colors">
                  <div className="font-semibold text-white text-sm mb-1">{step.title}</div>
                  <div className="text-xs text-neutral-400 mb-2.5">{step.desc}</div>
                  <code className="text-xs font-mono text-green-400 bg-black/40 px-2.5 py-1.5 rounded-lg block break-all">
                    $ {step.code}
                  </code>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
