export default function FlyioDeployPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-2">Deploy to Fly.io</h1>
      <p className="text-neutral-400 mb-8">Deploy your agent app to the cloud in one command with Fly.io.</p>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-white mb-4">Prerequisites</h2>
        <ul className="space-y-2 text-sm text-neutral-300">
          <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">1.</span> <span><strong className="text-white">Fly.io account</strong> &mdash; <a href="https://fly.io/app/sign-up" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">fly.io/app/sign-up</a> (free tier available)</span></li>
          <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">2.</span> <span><strong className="text-white">flyctl CLI</strong> installed &mdash; <a href="https://fly.io/docs/flyctl/install/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">fly.io/docs/flyctl/install</a></span></li>
          <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">3.</span> <span>Logged in via <code className="text-neutral-200 bg-neutral-800 px-1.5 py-0.5 rounded text-xs">fly auth login</code></span></li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-white mb-4">Step-by-step</h2>

        <Step n="1" title="Install flyctl">
          <Code>{`# macOS
brew install flyctl

# Linux
curl -L https://fly.io/install.sh | sh

# Windows
powershell -Command "irm https://fly.io/install.ps1 | iex"`}</Code>
        </Step>

        <Step n="2" title="Authenticate">
          <Code>fly auth login</Code>
          <p className="text-sm text-neutral-400 mt-2">This opens your browser to log in. If you dont have an account, sign up at <a href="https://fly.io" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">fly.io</a>.</p>
        </Step>

        <Step n="3" title="Create your project with Fly.io target">
          <Code>npx agentvoy create my-project --build-mode app --deploy-target fly-io --yes</Code>
          <p className="text-sm text-neutral-400 mt-2">This generates a <code className="text-neutral-200 bg-neutral-800 px-1.5 py-0.5 rounded text-xs">deploy/fly.toml</code> alongside your agent code.</p>
        </Step>

        <Step n="4" title="Configure your .env">
          <Code>{`cd my-project-app
cp .env.example .env
# Add your API key to .env`}</Code>
        </Step>

        <Step n="5" title="Deploy">
          <Code>agentvoy deploy --target fly-io</Code>
          <p className="text-sm text-neutral-400 mt-2">AgentVoy automatically:</p>
          <ul className="text-sm text-neutral-400 mt-1 space-y-1 ml-4 list-disc">
            <li>Checks <code className="text-neutral-200 bg-neutral-800 px-1.5 py-0.5 rounded text-xs">flyctl auth</code> status</li>
            <li>Sets secrets from your .env file</li>
            <li>Deploys to Fly.io</li>
          </ul>
        </Step>

        <Step n="6" title="Access your live app">
          <Code>{`# Your agent is live at:
https://my-project.fly.dev

# DevTools dashboard:
https://my-project.fly.dev/dev

# Check status:
fly status`}</Code>
        </Step>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-white mb-4">Generated files</h2>
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4">
          <div className="space-y-1 font-mono text-sm">
            <div className="text-neutral-400"><span className="text-green-500">+</span> Dockerfile</div>
            <div className="text-neutral-400"><span className="text-green-500">+</span> .dockerignore</div>
            <div className="text-neutral-400"><span className="text-green-500">+</span> deploy/fly.toml</div>
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-white mb-4">Useful commands</h2>
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 font-mono text-sm space-y-2">
          <div><span className="text-neutral-500">$</span> <span className="text-green-400">fly logs</span> <span className="text-neutral-600"># Stream live logs</span></div>
          <div><span className="text-neutral-500">$</span> <span className="text-green-400">fly status</span> <span className="text-neutral-600"># Check deployment status</span></div>
          <div><span className="text-neutral-500">$</span> <span className="text-green-400">fly secrets set OPENAI_API_KEY=sk-...</span> <span className="text-neutral-600"># Set secrets</span></div>
          <div><span className="text-neutral-500">$</span> <span className="text-green-400">fly scale count 2</span> <span className="text-neutral-600"># Scale to 2 instances</span></div>
          <div><span className="text-neutral-500">$</span> <span className="text-green-400">fly apps destroy my-project</span> <span className="text-neutral-600"># Delete the app</span></div>
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
