import Link from "next/link"

export default function AutoGenFrameworkPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-2">AutoGen</h1>
      <p className="text-neutral-400 mb-8">Build multi-agent conversations with Microsoft&apos;s AutoGen framework.</p>

      <Pill label="Language" value="Python" />
      <Pill label="Providers" value="OpenAI, Anthropic" />

      <section className="mb-10 mt-8">
        <h2 className="text-xl font-semibold text-white mb-4">Quick start</h2>
        <Step n="1" title="Create the project">
          <Code>npx agentvoy create my-project --framework autogen --provider openai --model gpt-4o --yes</Code>
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
        <Code>{`from autogen import AssistantAgent, UserProxyAgent

llm_config = {
    "config_list": [{
        "model": "gpt-4o",
        "api_key": os.environ["OPENAI_API_KEY"],
    }],
}

def create_agent():
    assistant = AssistantAgent(
        name="agent",
        system_message="You are a helpful AI assistant...",
        llm_config=llm_config,
    )
    return assistant`}</Code>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-white mb-4">Provider support</h2>
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4">
          <table className="w-full text-sm">
            <thead><tr className="text-neutral-500 text-left"><th className="pb-2">Provider</th><th className="pb-2">Config</th><th className="pb-2">Guide</th></tr></thead>
            <tbody className="text-neutral-300">
              <tr><td className="py-1.5">OpenAI</td><td className="py-1.5 font-mono text-xs">api_key from OPENAI_API_KEY</td><td><Link href="/docs/api-keys/openai" className="text-blue-400 hover:underline text-xs">Get key</Link></td></tr>
              <tr><td className="py-1.5">Anthropic</td><td className="py-1.5 font-mono text-xs">api_type: &quot;anthropic&quot;</td><td><Link href="/docs/api-keys/anthropic" className="text-blue-400 hover:underline text-xs">Get key</Link></td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-white mb-4">When to use AutoGen</h2>
        <ul className="text-sm text-neutral-400 space-y-2 ml-4 list-disc">
          <li>You want agents that converse with each other</li>
          <li>You need a UserProxy agent pattern for human-in-the-loop workflows</li>
          <li>You&apos;re building agents that need code execution capabilities</li>
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
