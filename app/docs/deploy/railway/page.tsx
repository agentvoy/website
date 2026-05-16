export default function RailwayDeployPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-2">Deploy to Railway</h1>
      <p className="text-neutral-400 mb-8">One-click cloud deployment with Railway. No Docker knowledge needed.</p>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-white mb-4">Prerequisites</h2>
        <ul className="space-y-2 text-sm text-neutral-300">
          <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">1.</span> <span><strong className="text-white">Railway account</strong> &mdash; <a href="https://railway.app" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">railway.app</a> (free trial with $5 credit)</span></li>
          <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">2.</span> <span><strong className="text-white">Railway CLI</strong> &mdash; <code className="text-neutral-200 bg-neutral-800 px-1.5 py-0.5 rounded text-xs">npm install -g @railway/cli</code></span></li>
          <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">3.</span> <span>Logged in via <code className="text-neutral-200 bg-neutral-800 px-1.5 py-0.5 rounded text-xs">railway login</code></span></li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-white mb-4">Step-by-step</h2>

        <Step n="1" title="Install Railway CLI">
          <Code>npm install -g @railway/cli</Code>
        </Step>

        <Step n="2" title="Authenticate">
          <Code>railway login</Code>
          <p className="text-sm text-neutral-400 mt-2">Opens your browser to authenticate with Railway.</p>
        </Step>

        <Step n="3" title="Create your project with Railway target">
          <Code>npx agentvoy create my-project --build-mode app --deploy-target railway --yes</Code>
        </Step>

        <Step n="4" title="Configure your .env">
          <Code>{`cd my-project-app
cp .env.example .env
# Add your API key to .env`}</Code>
        </Step>

        <Step n="5" title="Deploy">
          <Code>agentvoy deploy --target railway</Code>
          <p className="text-sm text-neutral-400 mt-2">AgentVoy initializes a Railway project, sets environment variables from your .env, and deploys.</p>
        </Step>

        <Step n="6" title="Access your app">
          <Code>{`# Get your deployment URL
railway open

# View logs
railway logs`}</Code>
        </Step>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-white mb-4">Generated files</h2>
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4">
          <div className="space-y-1 font-mono text-sm">
            <div className="text-neutral-400"><span className="text-green-500">+</span> Dockerfile</div>
            <div className="text-neutral-400"><span className="text-green-500">+</span> .dockerignore</div>
            <div className="text-neutral-400"><span className="text-green-500">+</span> deploy/railway.json</div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-white mb-4">Useful commands</h2>
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 font-mono text-sm space-y-2">
          <div><span className="text-neutral-500">$</span> <span className="text-green-400">railway logs</span> <span className="text-neutral-600"># Stream logs</span></div>
          <div><span className="text-neutral-500">$</span> <span className="text-green-400">railway variables set OPENAI_API_KEY=sk-...</span> <span className="text-neutral-600"># Set variables</span></div>
          <div><span className="text-neutral-500">$</span> <span className="text-green-400">railway open</span> <span className="text-neutral-600"># Open dashboard</span></div>
          <div><span className="text-neutral-500">$</span> <span className="text-green-400">railway down</span> <span className="text-neutral-600"># Tear down</span></div>
        </div>
      </section>
    </div>
  )
}

function Step({ n, title, children }: { n: string; title: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-4 mb-6">
      <div className="flex-shrink-0 w-7 h-7 rounded-full border border-blue-500 bg-blue-500/10 text-blue-400 text-xs font-semibold flex items-center justify-center mt-0.5">{n}</div>
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
