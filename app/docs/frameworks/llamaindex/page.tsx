import Link from "next/link"

export default function LlamaIndexFrameworkPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-2">LlamaIndex</h1>
      <p className="text-neutral-400 mb-8">Build RAG-first ReAct agents with LlamaIndex for data-heavy applications.</p>

      <Pill label="Language" value="Python" />
      <Pill label="Providers" value="OpenAI, Anthropic, Google" />

      <section className="mb-10 mt-8">
        <h2 className="text-xl font-semibold text-white mb-4">Quick start</h2>
        <Step n="1" title="Create the project">
          <Code>npx agentvoy create my-project --framework llamaindex --provider openai --model gpt-4o --yes</Code>
        </Step>
        <Step n="2" title="Install and run">
          <Code>{`cd my-project-agent
pip install -r requirements.txt
cp .env.example .env
# Add your API key
python run.py`}</Code>
        </Step>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-white mb-4">What gets generated</h2>
        <Code>{`from llama_index.core.agent import ReActAgent
from llama_index.llms.openai import OpenAI

llm = OpenAI(model=os.environ.get("DEFAULT_MODEL", "gpt-4o"))

def create_agent():
    tools = get_tools()
    agent = ReActAgent.from_tools(
        tools, llm=llm, verbose=True,
        system_prompt="You are a helpful AI assistant...",
    )
    return agent`}</Code>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-white mb-4">Provider support</h2>
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4">
          <table className="w-full text-sm">
            <thead><tr className="text-neutral-500 text-left"><th className="pb-2">Provider</th><th className="pb-2">LlamaIndex class</th><th className="pb-2">Guide</th></tr></thead>
            <tbody className="text-neutral-300">
              <tr><td className="py-1.5">OpenAI</td><td className="py-1.5 font-mono text-xs">llama_index.llms.openai.OpenAI</td><td><Link href="/docs/api-keys/openai" className="text-blue-400 hover:underline text-xs">Get key</Link></td></tr>
              <tr><td className="py-1.5">Anthropic</td><td className="py-1.5 font-mono text-xs">llama_index.llms.anthropic.Anthropic</td><td><Link href="/docs/api-keys/anthropic" className="text-blue-400 hover:underline text-xs">Get key</Link></td></tr>
              <tr><td className="py-1.5">Google</td><td className="py-1.5 font-mono text-xs">llama_index.llms.gemini.Gemini</td><td><Link href="/docs/api-keys/google" className="text-blue-400 hover:underline text-xs">Get key</Link></td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-white mb-4">When to use LlamaIndex</h2>
        <ul className="text-sm text-neutral-400 space-y-2 ml-4 list-disc">
          <li>You&apos;re building RAG (Retrieval-Augmented Generation) applications</li>
          <li>Your agent needs to search and reason over large document collections</li>
          <li>You want built-in indexing and retrieval tools</li>
        </ul>
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
