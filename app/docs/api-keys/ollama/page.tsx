export default function OllamaPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-2">Set up Ollama (Local Models)</h1>
      <p className="text-neutral-400 mb-8">Run AI models locally on your machine. No API key required. Completely free and private.</p>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-white mb-4">Step-by-step</h2>

        <Step n="1" title="Install Ollama">
          <Code>{`# macOS
brew install ollama

# Linux
curl -fsSL https://ollama.com/install.sh | sh

# Or download from: https://ollama.com/download`}</Code>
        </Step>

        <Step n="2" title="Start the Ollama server">
          <Code>ollama serve</Code>
          <p className="text-sm text-neutral-400 mt-2">This starts a local API server at <code className="text-neutral-200 bg-neutral-800 px-1.5 py-0.5 rounded text-xs">http://localhost:11434</code>. On macOS, the Ollama app starts this automatically.</p>
        </Step>

        <Step n="3" title="Pull a model">
          <Code>{`# Pull Llama 3 (recommended)
ollama pull llama3

# Pull other models
ollama pull mistral
ollama pull codellama`}</Code>
          <p className="text-sm text-neutral-400 mt-2">Models are downloaded once and cached locally. Llama 3 (8B) is about 4.7 GB.</p>
        </Step>

        <Step n="4" title="Verify it works">
          <Code>ollama run llama3 &quot;Hello, world!&quot;</Code>
        </Step>

        <Step n="5" title="Configure your AgentVoy project">
          <p className="text-sm text-neutral-400 mb-2">No API key is needed. Just set the model in your .env:</p>
          <Code>{`# No API key needed for Ollama!
DEFAULT_MODEL=llama3`}</Code>
        </Step>
      </section>

      <div className="bg-green-500/5 border border-green-500/30 rounded-xl p-4 mb-10 text-sm text-green-400/80">
        <strong>100% free and private.</strong> All inference runs locally. No data leaves your machine. No API costs.
      </div>

      <Info title="Compatible frameworks" items={["CrewAI"]} />

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-white mb-4">Popular models</h2>
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4">
          <table className="w-full text-sm">
            <thead><tr className="text-neutral-500 text-left"><th className="pb-2">Model</th><th className="pb-2">Size</th><th className="pb-2">Best for</th></tr></thead>
            <tbody className="text-neutral-300">
              <tr><td className="py-1 font-mono text-green-400">llama3</td><td>4.7 GB</td><td>General purpose</td></tr>
              <tr><td className="py-1 font-mono text-green-400">mistral</td><td>4.1 GB</td><td>General purpose, fast</td></tr>
              <tr><td className="py-1 font-mono text-green-400">codellama</td><td>3.8 GB</td><td>Code generation</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-white mb-4">System requirements</h2>
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 text-sm text-neutral-300 space-y-2">
          <div><strong className="text-white">RAM:</strong> At least 8 GB for 7B models, 16 GB for 13B models</div>
          <div><strong className="text-white">Storage:</strong> 5-10 GB per model</div>
          <div><strong className="text-white">GPU:</strong> Optional but recommended for faster inference</div>
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
