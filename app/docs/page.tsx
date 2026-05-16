import Link from "next/link"

const categories = [
  {
    title: "Features",
    desc: "Learn how to use AgentVoy's built-in features.",
    color: "purple",
    links: [
      { href: "/docs/guides/guardrails", label: "Guardrails" },
      { href: "/docs/guides/devtools", label: "DevTools Dashboard" },
      { href: "/docs/guides/multi-agent", label: "Multi-Agent Pipelines" },
      { href: "/docs/guides/chat-ui", label: "Streamlit Chat UI" },
    ],
  },
  {
    title: "Frameworks",
    desc: "Get started with any of the 7 supported agent frameworks.",
    color: "blue",
    links: [
      { href: "/docs/frameworks/openai", label: "OpenAI Agents SDK" },
      { href: "/docs/frameworks/anthropic", label: "Anthropic SDK" },
      { href: "/docs/frameworks/crewai", label: "CrewAI" },
      { href: "/docs/frameworks/langgraph", label: "LangGraph" },
      { href: "/docs/frameworks/google-adk", label: "Google ADK" },
      { href: "/docs/frameworks/llamaindex", label: "LlamaIndex" },
      { href: "/docs/frameworks/autogen", label: "AutoGen" },
    ],
  },
  {
    title: "API Keys",
    desc: "Step-by-step guides to get your API key from each provider.",
    color: "green",
    links: [
      { href: "/docs/api-keys/openai", label: "OpenAI" },
      { href: "/docs/api-keys/anthropic", label: "Anthropic" },
      { href: "/docs/api-keys/google", label: "Google" },
      { href: "/docs/api-keys/groq", label: "Groq" },
      { href: "/docs/api-keys/mistral", label: "Mistral" },
      { href: "/docs/api-keys/ollama", label: "Ollama (Local)" },
    ],
  },
  {
    title: "Deploy",
    desc: "Deploy your agent to any cloud platform in one command.",
    color: "orange",
    links: [
      { href: "/docs/deploy/docker", label: "Docker" },
      { href: "/docs/deploy/fly-io", label: "Fly.io" },
      { href: "/docs/deploy/railway", label: "Railway" },
      { href: "/docs/deploy/gcp-cloud-run", label: "GCP Cloud Run" },
      { href: "/docs/deploy/aws-lambda", label: "AWS Lambda" },
    ],
  },
]

const colorMap: Record<string, string> = {
  blue: "border-blue-500/30 bg-blue-500/5",
  green: "border-green-500/30 bg-green-500/5",
  purple: "border-purple-500/30 bg-purple-500/5",
  orange: "border-orange-500/30 bg-orange-500/5",
}

const labelColorMap: Record<string, string> = {
  blue: "text-blue-400",
  green: "text-green-400",
  purple: "text-purple-400",
  orange: "text-orange-400",
}

export default function DocsPage() {
  return (
    <div>
      <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-3">Documentation</h1>
      <p className="text-neutral-400 mb-10 max-w-xl">
        Everything you need to build, configure, and deploy AI agents with AgentVoy.
      </p>

      {/* Quick start */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 mb-10">
        <h2 className="text-lg font-semibold text-white mb-2">Quick start</h2>
        <p className="text-sm text-neutral-400 mb-4">Create your first agent project in 30 seconds:</p>
        <div className="space-y-2 font-mono text-sm">
          <div className="bg-black/50 rounded-lg px-4 py-2.5">
            <span className="text-neutral-500">$</span> <span className="text-green-400">npx agentvoy create my-project</span>
          </div>
          <div className="bg-black/50 rounded-lg px-4 py-2.5">
            <span className="text-neutral-500">$</span> <span className="text-green-400">cd my-project-app && pip install -r requirements.txt</span>
          </div>
          <div className="bg-black/50 rounded-lg px-4 py-2.5">
            <span className="text-neutral-500">$</span> <span className="text-green-400">cp .env.example .env</span>
            <span className="text-neutral-600"> # add your API key</span>
          </div>
          <div className="bg-black/50 rounded-lg px-4 py-2.5">
            <span className="text-neutral-500">$</span> <span className="text-green-400">agentvoy dev</span>
            <span className="text-neutral-600"> # starts server + DevTools</span>
          </div>
        </div>
      </div>

      {/* Category cards */}
      <div className="grid md:grid-cols-2 gap-6">
        {categories.map((cat) => (
          <div key={cat.title} className={`border rounded-xl p-5 ${colorMap[cat.color]}`}>
            <h3 className={`font-semibold text-lg mb-1 ${labelColorMap[cat.color]}`}>{cat.title}</h3>
            <p className="text-sm text-neutral-400 mb-4">{cat.desc}</p>
            <ul className="space-y-1">
              {cat.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-neutral-300 hover:text-white transition-colors flex items-center gap-1.5"
                  >
                    <span className="text-neutral-600">-</span> {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}
