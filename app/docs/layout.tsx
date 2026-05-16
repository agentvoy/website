'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronRight, Menu, X } from "lucide-react"
import { useState } from "react"

const sections = [
  {
    title: "Getting Started",
    links: [
      { href: "/docs", label: "Overview" },
    ],
  },
  {
    title: "Frameworks",
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
    title: "Features",
    links: [
      { href: "/docs/guides/guardrails", label: "Guardrails" },
      { href: "/docs/guides/devtools", label: "DevTools Dashboard" },
      { href: "/docs/guides/multi-agent", label: "Multi-Agent Pipelines" },
      { href: "/docs/guides/chat-ui", label: "Streamlit Chat UI" },
    ],
  },
  {
    title: "Deploy",
    links: [
      { href: "/docs/deploy/docker", label: "Docker" },
      { href: "/docs/deploy/fly-io", label: "Fly.io" },
      { href: "/docs/deploy/railway", label: "Railway" },
      { href: "/docs/deploy/gcp-cloud-run", label: "GCP Cloud Run" },
      { href: "/docs/deploy/aws-lambda", label: "AWS Lambda" },
    ],
  },
]

function Sidebar({ pathname, onNavigate }: { pathname: string; onNavigate?: () => void }) {
  return (
    <nav className="space-y-6">
      {sections.map((section) => (
        <div key={section.title}>
          <div className="text-xs font-semibold tracking-widest text-neutral-500 uppercase mb-2">
            {section.title}
          </div>
          <ul className="space-y-0.5">
            {section.links.map((link) => {
              const active = pathname === link.href
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={onNavigate}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-colors ${
                      active
                        ? "bg-blue-500/10 text-blue-400 font-medium"
                        : "text-neutral-400 hover:text-white hover:bg-neutral-800/50"
                    }`}
                  >
                    {active && <ChevronRight size={12} />}
                    <span>{link.label}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      ))}
    </nav>
  )
}

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 flex items-center justify-between px-6 h-14 bg-black/80 backdrop-blur-md border-b border-neutral-900">
        <div className="flex items-center gap-6">
          <Link href="/" className="font-bold text-white text-lg tracking-tight">
            AgentVoy
          </Link>
          <span className="text-neutral-600">/</span>
          <Link href="/docs" className="text-sm text-neutral-400 hover:text-white transition-colors">
            Docs
          </Link>
        </div>
        <div className="flex items-center gap-4 text-sm text-neutral-400">
          <Link href="/" className="hover:text-white transition-colors hidden sm:block">Home</Link>
          <Link href="/create" className="hover:text-white transition-colors hidden sm:block">Create</Link>
          <a href="https://github.com/agentvoy/agentvoy" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors hidden sm:block">
            GitHub
          </a>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="sm:hidden text-neutral-400 hover:text-white"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto flex">
        {/* Desktop sidebar */}
        <aside className="hidden md:block w-64 flex-shrink-0 border-r border-neutral-900 p-6 sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto">
          <Sidebar pathname={pathname} />
        </aside>

        {/* Mobile sidebar */}
        {mobileOpen && (
          <div className="fixed inset-0 top-14 z-40 bg-black/95 md:hidden p-6 overflow-y-auto">
            <Sidebar pathname={pathname} onNavigate={() => setMobileOpen(false)} />
          </div>
        )}

        {/* Content */}
        <main className="flex-1 min-w-0 px-6 md:px-12 py-10 max-w-4xl">
          {children}
        </main>
      </div>
    </div>
  )
}
