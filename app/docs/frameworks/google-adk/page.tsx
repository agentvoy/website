import Link from "next/link"

export default function GoogleADKFrameworkPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-2">Google ADK</h1>
      <p className="text-neutral-400 mb-8">Build agents using Google&apos;s Agent Development Kit with Gemini models.</p>

      <Pill label="Language" value="Python" />
      <Pill label="Provider" value="Google" />
      <Pill label="Key required" value="GOOGLE_API_KEY" link="/docs/api-keys/google" />

      <section className="mb-10 mt-8">
        <h2 className="text-xl font-semibold text-white mb-4">Quick start</h2>
        <Step n="1" title="Create the project">
          <Code>npx agentvoy create my-project --framework google-adk --provider google --model gemini-2.0-flash --yes</Code>
        </Step>
        <Step n="2" title="Install and configure">
          <Code>{`cd my-project-agent
pip install -r requirements.txt
cp .env.example .env
# Add: GOOGLE_API_KEY=AIza...`}</Code>
        </Step>
        <Step n="3" title="Run with ADK CLI">
          <Code>{`# Interactive terminal
adk run my_project_agent

# Or use the ADK web UI
adk web my_project_agent`}</Code>
        </Step>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-white mb-4">Project structure</h2>
        <p className="text-sm text-neutral-400 mb-3">Google ADK uses a package-based structure (different from other frameworks):</p>
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 font-mono text-sm text-neutral-400 space-y-1">
          <div>my-project-agent/</div>
          <div className="ml-4">my_project_agent/</div>
          <div className="ml-8">__init__.py</div>
          <div className="ml-8">agent.py <span className="text-neutral-600"># root_agent definition</span></div>
          <div className="ml-8">tools.py</div>
          <div className="ml-4">agent.guard.yml</div>
          <div className="ml-4">requirements.txt</div>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-white mb-4">Multi-agent mode</h2>
        <p className="text-sm text-neutral-400 mb-3">Google ADK handles multi-agent natively using sub-agents. AgentVoy generates the ADK sub-agent structure instead of a pipeline.py:</p>
        <Code>npx agentvoy create my-project --framework google-adk --build-mode app --agent-mode multi --yes</Code>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-white mb-4">Compatible providers</h2>
        <div className="bg-yellow-500/5 border border-yellow-500/30 rounded-xl p-4 text-sm text-yellow-400/80">
          <p>Google ADK works best with <strong>Google</strong> (Gemini) as the provider. Using other providers may require additional configuration. Get your key: <Link href="/docs/api-keys/google" className="underline">Google API key guide</Link>.</p>
        </div>
      </section>
    </div>
  )
}

function Pill({ label, value, link }: { label: string; value: string; link?: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-neutral-900 border border-neutral-800 text-xs mr-2 mb-2">
      <span className="text-neutral-500">{label}:</span>
      {link ? <Link href={link} className="text-blue-400 hover:underline">{value}</Link> : <span className="text-neutral-300">{value}</span>}
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
