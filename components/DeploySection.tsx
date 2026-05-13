const targets = [
  {
    name: "Docker",
    icon: "🐳",
    files: ["Dockerfile", ".dockerignore", "docker-compose.yml"],
    cmd: "docker-compose up",
    color: "blue",
  },
  {
    name: "Fly.io",
    icon: "✈️",
    files: ["deploy/fly.toml"],
    cmd: "fly deploy",
    color: "violet",
  },
  {
    name: "Railway",
    icon: "🚂",
    files: ["deploy/railway.json"],
    cmd: "railway up",
    color: "purple",
  },
  {
    name: "GCP Cloud Run",
    icon: "☁️",
    files: ["deploy/cloud-run.yaml"],
    cmd: "gcloud run deploy",
    color: "blue",
  },
  {
    name: "AWS Lambda",
    icon: "λ",
    files: ["deploy/template.yaml", "deploy/lambda_handler.py"],
    cmd: "sam deploy",
    color: "orange",
  },
]

export function DeploySection() {
  return (
    <section className="w-full px-4 py-16">
      <div className="text-xs font-semibold tracking-widest text-purple-400 uppercase mb-3">Deploy</div>
      <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-3">
        One config. Deploy anywhere.
      </h2>
      <p className="text-neutral-400 mb-4 max-w-xl">
        AgentVoy generates all deployment files for your chosen target. Your <code className="text-neutral-300 font-mono text-sm">agent.guard.yml</code> guardrails flow directly into infrastructure config — timeouts, memory limits, and security constraints.
      </p>

      {/* Guard → infra mapping callout */}
      <div className="mb-10 bg-neutral-900/60 border border-neutral-800 rounded-xl p-5 max-w-xl">
        <div className="text-xs text-neutral-500 uppercase tracking-widest mb-3">agent.guard.yml → cloud config</div>
        <div className="space-y-2 font-mono text-sm">
          <div className="flex items-center gap-3">
            <code className="text-yellow-400">behavior.timeout: 5m</code>
            <span className="text-neutral-600">→</span>
            <code className="text-neutral-400">Docker HEALTHCHECK, Cloud Run timeout</code>
          </div>
          <div className="flex items-center gap-3">
            <code className="text-yellow-400">behavior.cost_limit: $1.00</code>
            <span className="text-neutral-600">→</span>
            <code className="text-neutral-400">Container memory: 512Mi</code>
          </div>
          <div className="flex items-center gap-3">
            <code className="text-yellow-400">execution.allow_shell: false</code>
            <span className="text-neutral-600">→</span>
            <code className="text-neutral-400">Non-root Docker user</code>
          </div>
        </div>
      </div>

      {/* Targets grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {targets.map((t) => (
          <div
            key={t.name}
            className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 hover:border-neutral-700 transition-colors"
          >
            <div className="flex items-center gap-2.5 mb-3">
              <span className="text-xl">{t.icon}</span>
              <span className="font-semibold text-white">{t.name}</span>
            </div>
            <div className="space-y-1 mb-4">
              {t.files.map((f) => (
                <div key={f} className="flex items-center gap-2 text-xs text-neutral-400 font-mono">
                  <span className="text-green-500">+</span> {f}
                </div>
              ))}
            </div>
            <code className="text-xs font-mono text-green-400 bg-black/40 px-2.5 py-1.5 rounded-lg block">
              $ {t.cmd}
            </code>
          </div>
        ))}

        {/* Deploy to existing project card */}
        <div className="bg-neutral-900/40 border border-dashed border-neutral-700 rounded-xl p-5 hover:border-neutral-600 transition-colors flex flex-col justify-between">
          <div>
            <div className="font-semibold text-white mb-2">Existing project?</div>
            <p className="text-xs text-neutral-400 mb-4">
              Add deployment to any existing agent project without touching your agent code.
            </p>
          </div>
          <code className="text-xs font-mono text-green-400 bg-black/40 px-2.5 py-1.5 rounded-lg block">
            $ npx agentvoy deploy
          </code>
        </div>
      </div>
    </section>
  )
}
