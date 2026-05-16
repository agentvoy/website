export default function AnthropicKeyPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-2">Get your Anthropic API Key</h1>
      <p className="text-neutral-400 mb-8">Access Claude Opus, Sonnet, and Haiku models.</p>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-white mb-4">Step-by-step</h2>

        <Step n="1" title="Create an Anthropic account">
          <p className="text-sm text-neutral-400">Go to <a href="https://console.anthropic.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">console.anthropic.com</a> and sign up or log in.</p>
        </Step>

        <Step n="2" title="Navigate to API keys">
          <p className="text-sm text-neutral-400">Go to <a href="https://console.anthropic.com/settings/keys" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">console.anthropic.com/settings/keys</a> or click <strong className="text-white">Settings</strong> &rarr; <strong className="text-white">API keys</strong> in the sidebar.</p>
        </Step>

        <Step n="3" title="Create a new key">
          <p className="text-sm text-neutral-400">Click <strong className="text-white">Create Key</strong>. Name it &quot;AgentVoy&quot;. Copy the key immediately.</p>
        </Step>

        <Step n="4" title="Add billing">
          <p className="text-sm text-neutral-400">Go to <a href="https://console.anthropic.com/settings/billing" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Billing</a> and add credits. New accounts start on Tier 1 ($5 credits). Claude Sonnet costs ~$3 per million input tokens.</p>
          <div className="bg-yellow-500/5 border border-yellow-500/30 rounded-lg p-3 mt-2 text-xs text-yellow-400/80">
            <strong>Note:</strong> Some models (like Claude Opus) require higher tiers. Check your tier at <a href="https://console.anthropic.com/settings/limits" target="_blank" rel="noopener noreferrer" className="underline">Settings &rarr; Limits</a>.
          </div>
        </Step>

        <Step n="5" title="Add to your .env">
          <Code>ANTHROPIC_API_KEY=sk-ant-api03-...</Code>
          <p className="text-sm text-neutral-400 mt-2">Your key starts with <code className="text-neutral-200 bg-neutral-800 px-1.5 py-0.5 rounded text-xs">sk-ant-api03-</code>.</p>
        </Step>
      </section>

      <Info title="Compatible frameworks" items={["Anthropic SDK", "CrewAI", "LangGraph", "LlamaIndex", "AutoGen"]} />

      <section>
        <h2 className="text-xl font-semibold text-white mb-4">Available models</h2>
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4">
          <table className="w-full text-sm">
            <thead><tr className="text-neutral-500 text-left"><th className="pb-2">Model</th><th className="pb-2">Best for</th><th className="pb-2">Tier</th></tr></thead>
            <tbody className="text-neutral-300">
              <tr><td className="py-1 font-mono text-green-400">claude-sonnet-4-20250514</td><td>Best balance of speed and intelligence</td><td>Tier 1+</td></tr>
              <tr><td className="py-1 font-mono text-green-400">claude-opus-4-20250514</td><td>Most capable, complex tasks</td><td>Tier 2+</td></tr>
              <tr><td className="py-1 font-mono text-green-400">claude-haiku-4-5-20251001</td><td>Fast and cost-effective</td><td>Tier 1+</td></tr>
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
