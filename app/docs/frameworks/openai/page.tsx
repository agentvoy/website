import Link from "next/link"

export default function OpenAIFrameworkPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-2">OpenAI Agents SDK</h1>
      <p className="text-neutral-400 mb-8">Build agents using the official OpenAI Agents SDK with built-in tool calling and handoffs.</p>

      <Pill label="Language" value="Python" />
      <Pill label="Provider" value="OpenAI" />
      <Pill label="Key required" value="OPENAI_API_KEY" link="/docs/api-keys/openai" />

      <section className="mb-10 mt-8">
        <h2 className="text-xl font-semibold text-white mb-4">Quick start</h2>
        <Step n="1" title="Create the project">
          <Code>npx agentvoy create my-project --framework openai --provider openai --model gpt-4o --yes</Code>
        </Step>
        <Step n="2" title="Install dependencies">
          <Code>{`cd my-project-agent
pip install -r requirements.txt`}</Code>
        </Step>
        <Step n="3" title="Add your API key">
          <Code>{`cp .env.example .env
# Edit .env and add: OPENAI_API_KEY=sk-proj-...`}</Code>
          <p className="text-sm text-neutral-400 mt-2">Need a key? See <Link href="/docs/api-keys/openai" className="text-blue-400 hover:underline">how to get an OpenAI API key</Link>.</p>
        </Step>
        <Step n="4" title="Run">
          <Code>python run.py</Code>
        </Step>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-white mb-4">App mode</h2>
        <Code>npx agentvoy create my-project --framework openai --build-mode app --deploy-target docker --yes</Code>
        <p className="text-sm text-neutral-400 mt-3">Creates a full app with FastAPI server, Streamlit chat UI, DevTools dashboard, and Dockerfile.</p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-white mb-4">What gets generated</h2>
        <Code>{`# agent.py — core agent logic
from agents import Agent, Runner

agent = Agent(
    name="my-project",
    model=os.environ.get("DEFAULT_MODEL", "gpt-4o"),
    instructions="You are a helpful AI assistant...",
    tools=[search_web, read_file],
)

def run_agent(prompt: str, model: str | None = None) -> str:
    """Run agent with guardrails enforcement."""
    from agentvoy_guard import Guard
    guard = Guard.from_config()
    with guard.session() as session:
        session.check_input(prompt)
        result = Runner.run_sync(agent, prompt)
        final = result.final_output
        session.check_output(final)
    return final`}</Code>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-white mb-4">Switching models at runtime</h2>
        <p className="text-sm text-neutral-400 mb-3">Change the model without editing code by setting <code className="text-neutral-200 bg-neutral-800 px-1.5 py-0.5 rounded text-xs">DEFAULT_MODEL</code> in your .env:</p>
        <Code>DEFAULT_MODEL=gpt-4.1</Code>
        <p className="text-sm text-neutral-400 mt-2">In app mode, the Streamlit chat UI also lets you switch models on the fly via a dropdown.</p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-white mb-4">Compatible providers</h2>
        <div className="bg-yellow-500/5 border border-yellow-500/30 rounded-xl p-4 text-sm text-yellow-400/80">
          <p>The OpenAI Agents SDK only works with <strong>OpenAI</strong> as the provider. If you need to use Anthropic or Google models, choose a multi-provider framework like <Link href="/docs/frameworks/crewai" className="underline">CrewAI</Link> or <Link href="/docs/frameworks/langgraph" className="underline">LangGraph</Link>.</p>
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
