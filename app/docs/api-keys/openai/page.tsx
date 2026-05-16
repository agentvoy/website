export default function OpenAIKeyPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-2">Get your OpenAI API Key</h1>
      <p className="text-neutral-400 mb-8">Access GPT-4o, GPT-4.1, o1, and other OpenAI models.</p>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-white mb-4">Step-by-step</h2>

        <Step n="1" title="Create an OpenAI account">
          <p className="text-sm text-neutral-400">Go to <a href="https://platform.openai.com/signup" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">platform.openai.com/signup</a> and create an account (or log in if you already have one).</p>
        </Step>

        <Step n="2" title="Navigate to API keys">
          <p className="text-sm text-neutral-400">Go to <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">platform.openai.com/api-keys</a> or click your profile icon &rarr; <strong className="text-white">API keys</strong>.</p>
        </Step>

        <Step n="3" title="Create a new secret key">
          <p className="text-sm text-neutral-400">Click <strong className="text-white">Create new secret key</strong>. Give it a name like &quot;AgentVoy&quot;. Copy the key immediately &mdash; you will not be able to see it again.</p>
        </Step>

        <Step n="4" title="Add billing">
          <p className="text-sm text-neutral-400">Go to <a href="https://platform.openai.com/settings/organization/billing/overview" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Billing</a> and add a payment method. New accounts get $5 in free credits. GPT-4o costs ~$2.50 per million input tokens.</p>
        </Step>

        <Step n="5" title="Add to your .env">
          <Code>OPENAI_API_KEY=sk-proj-...</Code>
          <p className="text-sm text-neutral-400 mt-2">Your key starts with <code className="text-neutral-200 bg-neutral-800 px-1.5 py-0.5 rounded text-xs">sk-proj-</code> (project key) or <code className="text-neutral-200 bg-neutral-800 px-1.5 py-0.5 rounded text-xs">sk-</code> (legacy).</p>
        </Step>
      </section>

      <Info title="Compatible frameworks" items={["OpenAI Agents SDK", "CrewAI", "LangGraph", "LlamaIndex", "AutoGen"]} />

      <section>
        <h2 className="text-xl font-semibold text-white mb-4">Available models</h2>
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4">
          <table className="w-full text-sm">
            <thead><tr className="text-neutral-500 text-left"><th className="pb-2">Model</th><th className="pb-2">Best for</th></tr></thead>
            <tbody className="text-neutral-300">
              <tr><td className="py-1 font-mono text-green-400">gpt-4o</td><td>General purpose, fast</td></tr>
              <tr><td className="py-1 font-mono text-green-400">gpt-4o-mini</td><td>Cost-effective, lighter tasks</td></tr>
              <tr><td className="py-1 font-mono text-green-400">gpt-4.1</td><td>Latest, most capable</td></tr>
              <tr><td className="py-1 font-mono text-green-400">o1</td><td>Advanced reasoning</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}

function Step({ n, title, children }: { n: string; title: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-4 mb-6">
      <div className="flex-shrink-0 w-7 h-7 rounded-full border border-green-500 bg-green-500/10 text-green-400 text-xs font-semibold flex items-center justify-center mt-0.5">{n}</div>
      <div className="flex-1">
        <h3 className="font-semibold text-white text-sm mb-2">{title}</h3>
        {children}
      </div>
    </div>
  )
}

function Code({ children }: { children: React.ReactNode }) {
  return (
    <pre className="bg-black/50 border border-neutral-800 rounded-lg px-4 py-3 font-mono text-sm text-green-400 overflow-x-auto whitespace-pre-wrap">{children}</pre>
  )
}

function Info({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="mb-10">
      <div className="bg-blue-500/5 border border-blue-500/30 rounded-xl p-4">
        <h3 className="text-sm font-semibold text-blue-400 mb-2">{title}</h3>
        <div className="flex flex-wrap gap-2">
          {items.map(item => (
            <span key={item} className="px-2.5 py-1 rounded-md bg-neutral-900 border border-neutral-800 text-neutral-300 text-xs">{item}</span>
          ))}
        </div>
      </div>
    </section>
  )
}
