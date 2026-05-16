import Link from "next/link"

export default function CrewAIFrameworkPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-2">CrewAI</h1>
      <p className="text-neutral-400 mb-8">Build role-based multi-agent crews with CrewAI. The most flexible framework for multi-provider support.</p>

      <Pill label="Language" value="Python" />
      <Pill label="Providers" value="OpenAI, Anthropic, Google, Ollama, Groq" />

      <section className="mb-10 mt-8">
        <h2 className="text-xl font-semibold text-white mb-4">Quick start</h2>
        <Step n="1" title="Create the project">
          <Code>npx agentvoy create my-project --framework crewai --provider openai --model gpt-4o --yes</Code>
        </Step>
        <Step n="2" title="Install dependencies">
          <Code>{`cd my-project-agent
pip install -r requirements.txt`}</Code>
        </Step>
        <Step n="3" title="Add your API key">
          <Code>{`cp .env.example .env
# Edit .env and add your API key`}</Code>
        </Step>
        <Step n="4" title="Run">
          <Code>python run.py</Code>
        </Step>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-white mb-4">Multi-agent mode</h2>
        <p className="text-sm text-neutral-400 mb-3">CrewAI handles multi-agent orchestration natively using roles and tasks:</p>
        <Code>npx agentvoy create my-project --framework crewai --build-mode app --agent-mode multi --yes</Code>
        <p className="text-sm text-neutral-400 mt-3">AgentVoy generates CrewAI&apos;s native crew structure with roles (researcher, writer, reviewer) instead of a pipeline.py file.</p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-white mb-4">Provider support</h2>
        <p className="text-sm text-neutral-400 mb-3">CrewAI supports the most providers of any framework:</p>
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4">
          <table className="w-full text-sm">
            <thead><tr className="text-neutral-500 text-left"><th className="pb-2">Provider</th><th className="pb-2">API key</th><th className="pb-2">Guide</th></tr></thead>
            <tbody className="text-neutral-300">
              {[
                { name: "OpenAI", key: "OPENAI_API_KEY", link: "/docs/api-keys/openai" },
                { name: "Anthropic", key: "ANTHROPIC_API_KEY", link: "/docs/api-keys/anthropic" },
                { name: "Google", key: "GOOGLE_API_KEY", link: "/docs/api-keys/google" },
                { name: "Ollama", key: "No key needed", link: "/docs/api-keys/ollama" },
                { name: "Groq", key: "GROQ_API_KEY", link: "/docs/api-keys/groq" },
              ].map(p => (
                <tr key={p.name}>
                  <td className="py-1.5">{p.name}</td>
                  <td className="py-1.5 font-mono text-yellow-400 text-xs">{p.key}</td>
                  <td className="py-1.5"><Link href={p.link} className="text-blue-400 hover:underline text-xs">Get key</Link></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-white mb-4">Switching models</h2>
        <Code>DEFAULT_MODEL=claude-sonnet-4-20250514</Code>
        <p className="text-sm text-neutral-400 mt-2">CrewAI can use any supported provider&apos;s model. Just set the model name and ensure the correct API key is in your .env.</p>
      </section>
    </div>
  )
}

function Pill({ label, value }: { label: string; value: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-neutral-900 border border-neutral-800 text-xs mr-2 mb-2">
      <span className="text-neutral-500">{label}:</span>
      <span className="text-neutral-300">{value}</span>
    </span>
  )
}

function Step({ n, title, children }: { n: string; title: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-4 mb-6">
      <div className="flex-shrink-0 w-7 h-7 rounded-full border border-blue-500 bg-blue-500/10 text-blue-400 text-xs font-semibold flex items-center justify-center mt-0.5">{n}</div>
      <div className="flex-1"><h3 className="font-semibold text-white text-sm mb-2">{title}</h3>{children}</div>
    </div>
  )
}

function Code({ children }: { children: React.ReactNode }) {
  return <pre className="bg-black/50 border border-neutral-800 rounded-lg px-4 py-3 font-mono text-sm text-green-400 overflow-x-auto whitespace-pre-wrap">{children}</pre>
}
