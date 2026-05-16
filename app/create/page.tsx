'use client'

import { useState } from "react"
import { Copy, Check, ChevronLeft, ChevronRight, Terminal, ArrowRight } from "lucide-react"
import Link from "next/link"

// ── Data ──────────────────────────────────────────────────────────

type BuildMode = "agent" | "app"
type AgentMode = "single" | "multi"

const frameworks = [
  { id: "openai", name: "OpenAI Agents SDK", desc: "Official OpenAI agent framework" },
  { id: "anthropic", name: "Anthropic SDK", desc: "Claude-powered agents" },
  { id: "crewai", name: "CrewAI", desc: "Role-based multi-agent crews" },
  { id: "langgraph", name: "LangGraph", desc: "Stateful graph-based agents" },
  { id: "google-adk", name: "Google ADK", desc: "Google's Agent Development Kit" },
  { id: "llamaindex", name: "LlamaIndex", desc: "RAG-first ReAct agents" },
  { id: "autogen", name: "AutoGen", desc: "Microsoft's multi-agent framework" },
]

const providers = [
  { id: "openai", name: "OpenAI", models: ["gpt-4o", "gpt-4o-mini", "gpt-4.1", "o1"] },
  { id: "anthropic", name: "Anthropic", models: ["claude-sonnet-4-20250514", "claude-opus-4-20250514", "claude-haiku-4-5-20251001"] },
  { id: "google", name: "Google", models: ["gemini-2.0-flash", "gemini-2.5-pro"] },
  { id: "ollama", name: "Ollama (local)", models: ["llama3", "mistral", "codellama"] },
  { id: "groq", name: "Groq", models: ["llama-3.3-70b-versatile"] },
  { id: "mistral", name: "Mistral", models: ["mistral-large-latest"] },
]

const frameworkProviders: Record<string, string[]> = {
  openai: ["openai"],
  anthropic: ["anthropic"],
  "google-adk": ["google"],
  crewai: ["openai", "anthropic", "google", "ollama", "groq"],
  langgraph: ["openai", "anthropic", "google"],
  llamaindex: ["openai", "anthropic", "google"],
  autogen: ["openai", "anthropic"],
}

const providerKeyNames: Record<string, string> = {
  openai: "OPENAI_API_KEY",
  anthropic: "ANTHROPIC_API_KEY",
  google: "GOOGLE_API_KEY",
  ollama: "No key needed",
  groq: "GROQ_API_KEY",
  mistral: "MISTRAL_API_KEY",
}

const deployTargets = [
  { id: "docker", name: "Docker", desc: "Build and run locally" },
  { id: "fly-io", name: "Fly.io", desc: "Deploy to cloud in one command" },
  { id: "railway", name: "Railway", desc: "One-click cloud deploy" },
  { id: "gcp-cloud-run", name: "GCP Cloud Run", desc: "Google Cloud serverless" },
  { id: "aws-lambda", name: "AWS Lambda", desc: "Serverless on AWS" },
]

// ── Component ─────────────────────────────────────────────────────

export default function CreatePage() {
  // Wizard state
  const [step, setStep] = useState(0)
  const [projectName, setProjectName] = useState("my-project")
  const [buildMode, setBuildMode] = useState<BuildMode>("app")
  const [agentMode, setAgentMode] = useState<AgentMode>("single")
  const [agentCount, setAgentCount] = useState(3)
  const [agentNames, setAgentNames] = useState(["researcher", "writer", "reviewer"])
  const [framework, setFramework] = useState("openai")
  const [provider, setProvider] = useState("openai")
  const [model, setModel] = useState("gpt-4o")
  const [deployTarget, setDeployTarget] = useState("docker")
  const [copied, setCopied] = useState(false)

  const selectedProvider = providers.find(p => p.id === provider)

  // Steps differ based on build mode
  const steps = buildMode === "app"
    ? ["Project", "Build Mode", "Agents", "Framework", "Provider & Model", "Deploy Target", "Done"]
    : ["Project", "Build Mode", "Framework", "Provider & Model", "Done"]

  const totalSteps = steps.length
  const isLast = step === totalSteps - 1

  // Build the command
  const buildCommand = () => {
    const parts = ["npx agentvoy create", projectName]
    parts.push(`--framework ${framework}`)
    parts.push(`--provider ${provider}`)
    parts.push(`--model ${model}`)
    if (buildMode === "app") {
      parts.push("--build-mode app")
      if (agentMode === "multi") {
        parts.push("--agent-mode multi")
      }
      parts.push(`--deploy-target ${deployTarget}`)
    }
    parts.push("--yes")
    return parts.join(" ")
  }

  const command = buildCommand()

  const copyCommand = () => {
    navigator.clipboard.writeText(command)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const next = () => { if (step < totalSteps - 1) setStep(step + 1) }
  const prev = () => { if (step > 0) setStep(step - 1) }

  const nameValid = /^[a-z0-9-_]+$/.test(projectName) && projectName.length > 0

  // Map step index to content based on build mode
  const getStepContent = () => {
    if (step === 0) return renderProjectName()
    if (step === 1) return renderBuildMode()

    if (buildMode === "app") {
      if (step === 2) return renderAgents()
      if (step === 3) return renderFramework()
      if (step === 4) return renderProviderModel()
      if (step === 5) return renderDeployTarget()
      if (step === 6) return renderDone()
    } else {
      if (step === 2) return renderFramework()
      if (step === 3) return renderProviderModel()
      if (step === 4) return renderDone()
    }
  }

  // When build mode changes, adjust step count
  const handleBuildModeChange = (mode: BuildMode) => {
    setBuildMode(mode)
    if (mode === "agent") {
      setDeployTarget("docker")
    }
  }

  const handleAgentCountChange = (count: number) => {
    setAgentCount(count)
    const defaults = ["researcher", "writer", "reviewer", "validator", "publisher"]
    const names = Array.from({ length: count }, (_, i) => agentNames[i] || defaults[i] || `agent${i + 1}`)
    setAgentNames(names)
  }

  const handleAgentNameChange = (index: number, name: string) => {
    const updated = [...agentNames]
    updated[index] = name
    setAgentNames(updated)
  }

  // ── Step renderers ──────────────────────────────────────────────

  function renderProjectName() {
    return (
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Project name</h2>
        <p className="text-neutral-400 text-sm mb-6">Choose a name for your agent project.</p>
        <input
          type="text"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value.toLowerCase().replace(/[^a-z0-9-_]/g, ""))}
          className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-4 py-3 text-white font-mono text-sm focus:outline-none focus:border-blue-500 transition-colors"
          placeholder="my-project"
          autoFocus
        />
        {!nameValid && projectName.length > 0 && (
          <p className="text-red-400 text-xs mt-2">Use lowercase letters, numbers, hyphens, and underscores only</p>
        )}
        <p className="text-neutral-500 text-xs mt-2">
          Your project folder will be: <span className="text-neutral-300 font-mono">{projectName}-{buildMode}/</span>
        </p>
      </div>
    )
  }

  function renderBuildMode() {
    return (
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">What do you want to build?</h2>
        <p className="text-neutral-400 text-sm mb-6">Choose your path based on your goals.</p>
        <div className="grid gap-3">
          <button
            onClick={() => handleBuildModeChange("agent")}
            className={`text-left p-5 rounded-xl border transition-all ${
              buildMode === "agent"
                ? "border-blue-500 bg-blue-500/10"
                : "border-neutral-800 bg-neutral-900 hover:border-neutral-600"
            }`}
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="text-blue-400 text-xs font-semibold px-2 py-0.5 bg-blue-500/10 border border-blue-500/30 rounded">Path A</span>
              <span className="font-semibold text-white">Agent</span>
            </div>
            <p className="text-sm text-neutral-400">Local agent for development & experimentation. Flat structure, interactive REPL, zero infra.</p>
          </button>
          <button
            onClick={() => handleBuildModeChange("app")}
            className={`text-left p-5 rounded-xl border transition-all ${
              buildMode === "app"
                ? "border-purple-500 bg-purple-500/10"
                : "border-neutral-800 bg-neutral-900 hover:border-neutral-600"
            }`}
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="text-purple-400 text-xs font-semibold px-2 py-0.5 bg-purple-500/10 border border-purple-500/30 rounded">Path B</span>
              <span className="font-semibold text-white">App</span>
            </div>
            <p className="text-sm text-neutral-400">Deployable agentic app with FastAPI server, Streamlit chat UI, DevTools dashboard, and cloud configs.</p>
          </button>
        </div>
      </div>
    )
  }

  function renderAgents() {
    return (
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Agent configuration</h2>
        <p className="text-neutral-400 text-sm mb-6">Single agent or multi-agent pipeline?</p>
        <div className="grid gap-3 mb-6">
          <button
            onClick={() => setAgentMode("single")}
            className={`text-left p-4 rounded-xl border transition-all ${
              agentMode === "single"
                ? "border-blue-500 bg-blue-500/10"
                : "border-neutral-800 bg-neutral-900 hover:border-neutral-600"
            }`}
          >
            <span className="font-semibold text-white">Single agent</span>
            <p className="text-xs text-neutral-400 mt-1">One agent powering the app. Simpler, faster to build.</p>
          </button>
          <button
            onClick={() => setAgentMode("multi")}
            className={`text-left p-4 rounded-xl border transition-all ${
              agentMode === "multi"
                ? "border-purple-500 bg-purple-500/10"
                : "border-neutral-800 bg-neutral-900 hover:border-neutral-600"
            }`}
          >
            <span className="font-semibold text-white">Multi-agent pipeline</span>
            <p className="text-xs text-neutral-400 mt-1">Sequential pipeline — each agent builds on the previous stage.</p>
          </button>
        </div>

        {agentMode === "multi" && (
          <div className="space-y-4 border-t border-neutral-800 pt-5">
            <div>
              <label className="text-sm text-neutral-400 block mb-2">Number of agents (2–5)</label>
              <div className="flex gap-2">
                {[2, 3, 4, 5].map(n => (
                  <button
                    key={n}
                    onClick={() => handleAgentCountChange(n)}
                    className={`w-10 h-10 rounded-lg border font-semibold text-sm transition-all ${
                      agentCount === n
                        ? "border-purple-500 bg-purple-500/10 text-purple-400"
                        : "border-neutral-800 bg-neutral-900 text-neutral-400 hover:border-neutral-600"
                    }`}
                  >
                    {n}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              {agentNames.slice(0, agentCount).map((name, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="text-xs text-neutral-500 w-16">Agent {i + 1}</span>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => handleAgentNameChange(i, e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ""))}
                    className="flex-1 bg-neutral-900 border border-neutral-700 rounded-lg px-3 py-2 text-white font-mono text-sm focus:outline-none focus:border-purple-500 transition-colors"
                  />
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2 text-xs text-neutral-500 font-mono">
              <span>Pipeline:</span>
              <span className="text-purple-400">{agentNames.slice(0, agentCount).join(" → ")}</span>
            </div>
          </div>
        )}
      </div>
    )
  }

  function renderFramework() {
    return (
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Choose a framework</h2>
        <p className="text-neutral-400 text-sm mb-6">AgentVoy generates the right boilerplate for each framework.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {frameworks.map(fw => (
            <button
              key={fw.id}
              onClick={() => setFramework(fw.id)}
              className={`text-left p-4 rounded-xl border transition-all ${
                framework === fw.id
                  ? "border-blue-500 bg-blue-500/10"
                  : "border-neutral-800 bg-neutral-900 hover:border-neutral-600"
              }`}
            >
              <div className="font-semibold text-white text-sm">{fw.name}</div>
              <div className="text-xs text-neutral-500 mt-1">{fw.desc}</div>
            </button>
          ))}
        </div>
      </div>
    )
  }

  function renderProviderModel() {
    return (
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Provider & model</h2>
        <p className="text-neutral-400 text-sm mb-6">Choose your LLM provider and model. You can switch models at runtime in the chat UI.</p>

        <div className="mb-6">
          <label className="text-xs text-neutral-500 uppercase tracking-widest block mb-3">Provider</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {providers.map(p => (
              <button
                key={p.id}
                onClick={() => { setProvider(p.id); setModel(p.models[0]) }}
                className={`text-left p-3 rounded-xl border transition-all ${
                  provider === p.id
                    ? "border-blue-500 bg-blue-500/10"
                    : "border-neutral-800 bg-neutral-900 hover:border-neutral-600"
                }`}
              >
                <div className="font-semibold text-white text-sm">{p.name}</div>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-xs text-neutral-500 uppercase tracking-widest block mb-3">Model</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {selectedProvider?.models.map(m => (
              <button
                key={m}
                onClick={() => setModel(m)}
                className={`text-left p-3 rounded-xl border font-mono text-sm transition-all ${
                  model === m
                    ? "border-green-500 bg-green-500/10 text-green-400"
                    : "border-neutral-800 bg-neutral-900 text-neutral-400 hover:border-neutral-600"
                }`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>

        {/* Compatibility notice */}
        {frameworkProviders[framework] && !frameworkProviders[framework].includes(provider) && (
          <div className="mt-6 bg-yellow-500/5 border border-yellow-500/30 rounded-xl p-4">
            <p className="text-yellow-400 text-sm font-medium mb-1">Compatibility notice</p>
            <p className="text-yellow-400/70 text-xs">
              The <span className="font-mono font-semibold">{frameworks.find(f => f.id === framework)?.name}</span> framework may not support{" "}
              <span className="font-mono font-semibold">{providers.find(p => p.id === provider)?.name}</span> natively.
              Supported providers: {frameworkProviders[framework].map(pid => providers.find(p => p.id === pid)?.name || pid).join(", ")}.
            </p>
          </div>
        )}

        {providerKeyNames[provider] && (
          <div className="mt-4 text-xs text-neutral-500">
            Requires <span className="font-mono text-neutral-300">{providerKeyNames[provider]}</span> in your <span className="font-mono text-neutral-300">.env</span> file.
            You can switch models at runtime by changing <span className="font-mono text-neutral-300">DEFAULT_MODEL</span> in <span className="font-mono text-neutral-300">.env</span>.
          </div>
        )}
      </div>
    )
  }

  function renderDeployTarget() {
    return (
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Deployment target</h2>
        <p className="text-neutral-400 text-sm mb-6">Where do you want to deploy? You can always change this later with <code className="text-neutral-300 font-mono text-xs">agentvoy deploy</code>.</p>
        <div className="grid gap-3">
          {deployTargets.map(t => (
            <button
              key={t.id}
              onClick={() => setDeployTarget(t.id)}
              className={`text-left p-4 rounded-xl border transition-all ${
                deployTarget === t.id
                  ? "border-purple-500 bg-purple-500/10"
                  : "border-neutral-800 bg-neutral-900 hover:border-neutral-600"
              }`}
            >
              <div className="font-semibold text-white text-sm">{t.name}</div>
              <div className="text-xs text-neutral-500 mt-1">{t.desc}</div>
            </button>
          ))}
        </div>
      </div>
    )
  }

  function renderDone() {
    const projectFiles = buildMode === "app" ? [
      "src/agents/" + (agentMode === "multi" ? agentNames.slice(0, agentCount).map(n => n + ".py").join(", ") : "agent.py"),
      "src/tools/tools.py",
      "src/trace/tracer.py",
      ...(agentMode === "multi" ? ["src/pipeline.py"] : []),
      "server.py",
      "streamlit_app.py",
      "devtools.html",
      "Dockerfile",
      "agent.guard.yml",
    ] : [
      "agent.py",
      "tools.py",
      "run.py",
      "agent.guard.yml",
      "requirements.txt",
    ]

    return (
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Your project is ready</h2>
        <p className="text-neutral-400 text-sm mb-6">Copy the command below and run it in your terminal.</p>

        {/* Command box */}
        <div className="bg-neutral-900 border border-neutral-700 rounded-xl p-4 mb-6">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Terminal size={14} className="text-neutral-500" />
              <span className="text-xs text-neutral-500">Terminal</span>
            </div>
            <button
              onClick={copyCommand}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-md text-xs font-medium transition-colors"
            >
              {copied ? <Check size={12} /> : <Copy size={12} />}
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
          <code className="text-sm font-mono text-green-400 block break-all leading-relaxed">
            $ {command}
          </code>
        </div>

        {/* What you get */}
        <div className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-4 mb-6">
          <div className="text-xs text-neutral-500 uppercase tracking-widest mb-3">
            {projectName}-{buildMode}/
          </div>
          <div className="space-y-1">
            {projectFiles.map(f => (
              <div key={f} className="flex items-center gap-2 text-xs font-mono">
                <span className="text-green-500">+</span>
                <span className="text-neutral-400">{f}</span>
              </div>
            ))}
          </div>
        </div>

        {/* API key & model info */}
        <div className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-4 mb-6">
          <div className="text-xs text-neutral-500 uppercase tracking-widest mb-3">Required API key</div>
          <div className="flex items-center gap-2 text-sm">
            <span className="font-mono text-yellow-400">{providerKeyNames[provider] || `${provider.toUpperCase()}_API_KEY`}</span>
            <span className="text-neutral-600">in your .env file</span>
          </div>
          {frameworkProviders[framework] && !frameworkProviders[framework].includes(provider) && (
            <p className="text-yellow-400/70 text-xs mt-2">
              Note: {frameworks.find(f => f.id === framework)?.name} may also require its native provider key. See framework docs.
            </p>
          )}
          <p className="text-neutral-500 text-xs mt-2">
            To switch models later, edit <span className="font-mono text-neutral-300">DEFAULT_MODEL</span> in your <span className="font-mono text-neutral-300">.env</span> file — no code changes needed.
          </p>
        </div>

        {/* Next steps */}
        {buildMode === "app" && (
          <div className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-4">
            <div className="text-xs text-neutral-500 uppercase tracking-widest mb-3">After creating</div>
            <div className="space-y-2 text-xs font-mono">
              <div className="text-neutral-400"><span className="text-green-400">$</span> cd {projectName}-app</div>
              <div className="text-neutral-400"><span className="text-green-400">$</span> pip install -r requirements.txt</div>
              <div className="text-neutral-400"><span className="text-green-400">$</span> cp .env.example .env</div>
              <div className="text-neutral-400"><span className="text-green-400">$</span> agentvoy dev <span className="text-neutral-600">← starts server + DevTools at /dev</span></div>
              <div className="text-neutral-400"><span className="text-green-400">$</span> agentvoy deploy --target {deployTarget} <span className="text-neutral-600">← deploy</span></div>
            </div>
          </div>
        )}
      </div>
    )
  }

  // ── Layout ────────────────────────────────────────────────────────

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 flex items-center justify-between px-6 h-14 bg-black/80 backdrop-blur-md border-b border-neutral-900">
        <Link href="/" className="font-bold text-white text-lg tracking-tight">
          AgentVoy
        </Link>
        <div className="flex items-center gap-4 text-sm text-neutral-400">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <a
            href="https://github.com/agentvoy/agentvoy"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            GitHub
          </a>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-2">
            Create your agent project
          </h1>
          <p className="text-neutral-400">
            Configure your project visually — get a ready-to-run command.
          </p>
        </div>

        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            {steps.map((s, i) => (
              <button
                key={s}
                onClick={() => i <= step && setStep(i)}
                className={`text-xs transition-colors ${
                  i === step ? "text-blue-400 font-semibold" :
                  i < step ? "text-neutral-400 cursor-pointer hover:text-neutral-300" :
                  "text-neutral-600"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
          <div className="h-1 bg-neutral-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500 rounded-full transition-all duration-300"
              style={{ width: `${((step) / (totalSteps - 1)) * 100}%` }}
            />
          </div>
        </div>

        {/* Step content */}
        <div className="min-h-[400px]">
          {getStepContent()}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-neutral-800">
          <button
            onClick={prev}
            disabled={step === 0}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-colors ${
              step === 0
                ? "text-neutral-600 cursor-not-allowed"
                : "text-neutral-400 hover:text-white border border-neutral-800 hover:border-neutral-600"
            }`}
          >
            <ChevronLeft size={16} /> Back
          </button>

          {!isLast ? (
            <button
              onClick={next}
              disabled={step === 0 && !nameValid}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                step === 0 && !nameValid
                  ? "bg-neutral-800 text-neutral-500 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-500 text-white"
              }`}
            >
              Next <ChevronRight size={16} />
            </button>
          ) : (
            <button
              onClick={copyCommand}
              className="flex items-center gap-2 px-5 py-2.5 bg-green-600 hover:bg-green-500 text-white rounded-lg text-sm font-medium transition-colors"
            >
              {copied ? <Check size={16} /> : <Copy size={16} />}
              {copied ? "Copied!" : "Copy command"}
            </button>
          )}
        </div>

        {/* Live preview bar */}
        <div className="mt-6 bg-neutral-900/60 border border-neutral-800 rounded-xl p-3">
          <div className="flex items-center gap-2 text-xs text-neutral-500 mb-1.5">
            <Terminal size={12} />
            <span>Live preview</span>
          </div>
          <code className="text-xs font-mono text-green-400/80 break-all">$ {command}</code>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-neutral-900 px-6 py-5 flex items-center justify-between text-xs text-neutral-500">
        <span>
          © 2026 AgentVoy ·{" "}
          <a href="https://github.com/ChinmayMurugkar" target="_blank" rel="noopener noreferrer" className="hover:text-neutral-300 transition-colors">
            Chinmay Murugkar
          </a>
        </span>
        <a
          href="https://github.com/agentvoy/agentvoy"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-neutral-300 transition-colors"
        >
          GitHub
        </a>
      </footer>
    </main>
  )
}
