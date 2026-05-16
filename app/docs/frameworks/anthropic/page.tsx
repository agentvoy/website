import Link from "next/link"

export default function AnthropicFrameworkPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-2">Anthropic SDK</h1>
      <p className="text-neutral-400 mb-8">Build agents using the Anthropic Python SDK with Claude models and tool use.</p>

      <Pill label="Language" value="Python" />
      <Pill label="Provider" value="Anthropic" />
      <Pill label="Key required" value="ANTHROPIC_API_KEY" link="/docs/api-keys/anthropic" />

      <section className="mb-10 mt-8">
        <h2 className="text-xl font-semibold text-white mb-4">Quick start</h2>
        <Step n="1" title="Create the project">
          <Code>npx agentvoy create my-project --framework anthropic --provider anthropic --model claude-sonnet-4-20250514 --yes</Code>
        </Step>
        <Step n="2" title="Install dependencies">
          <Code>{`cd my-project-agent
pip install -r requirements.txt`}</Code>
        </Step>
        <Step n="3" title="Add your API key">
          <Code>{`cp .env.example .env
# Edit .env and add: ANTHROPIC_API_KEY=sk-ant-api03-...`}</Code>
          <p className="text-sm text-neutral-400 mt-2">Need a key? See <Link href="/docs/api-keys/anthropic" className="text-blue-400 hover:underline">how to get an Anthropic API key</Link>.</p>
        </Step>
        <Step n="4" title="Run">
          <Code>python run.py</Code>
        </Step>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-white mb-4">App mode</h2>
        <Code>npx agentvoy create my-project --framework anthropic --build-mode app --deploy-target docker --yes</Code>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-white mb-4">What gets generated</h2>
        <Code>{`# agent.py — uses Anthropic's tool_use pattern
import anthropic
from dotenv import load_dotenv
load_dotenv()

client = anthropic.Anthropic()

def create_agent():
    tools = get_tools()
    return {"client": client, "tools": tools}

def run_agent(prompt: str, model: str | None = None) -> str:
    from agentvoy_guard import Guard
    guard = Guard.from_config()
    _model = model or os.environ.get("DEFAULT_MODEL", "claude-sonnet-4-20250514")

    with guard.session() as session:
        session.check_input(prompt)
        response = client.messages.create(
            model=_model,
            max_tokens=8096,
            system="You are a helpful AI assistant...",
            messages=[{"role": "user", "content": prompt}],
            tools=tools,
        )
        final = response.content[0].text
        session.check_output(final)
    return final`}</Code>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-white mb-4">Switching models at runtime</h2>
        <Code>DEFAULT_MODEL=claude-haiku-4-5-20251001</Code>
        <p className="text-sm text-neutral-400 mt-2">Or switch via the chat UI model dropdown in app mode.</p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-white mb-4">Compatible providers</h2>
        <div className="bg-yellow-500/5 border border-yellow-500/30 rounded-xl p-4 text-sm text-yellow-400/80">
          <p>The Anthropic SDK only works with <strong>Anthropic</strong> as the provider. For multi-provider support, use <Link href="/docs/frameworks/crewai" className="underline">CrewAI</Link> or <Link href="/docs/frameworks/langgraph" className="underline">LangGraph</Link>.</p>
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
