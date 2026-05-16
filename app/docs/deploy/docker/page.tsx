export default function DockerDeployPage() {
  return (
    <div className="prose-docs">
      <h1 className="text-3xl font-bold text-white mb-2">Deploy with Docker</h1>
      <p className="text-neutral-400 mb-8">Build and run your agent locally or on any Docker-compatible host.</p>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-white mb-4">Prerequisites</h2>
        <ul className="space-y-2 text-sm text-neutral-300">
          <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">1.</span> <span><strong className="text-white">Docker Desktop</strong> installed &mdash; <a href="https://www.docker.com/products/docker-desktop/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">docker.com/products/docker-desktop</a></span></li>
          <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">2.</span> <span>An AgentVoy app project (created with <code className="text-neutral-200 bg-neutral-800 px-1.5 py-0.5 rounded text-xs">--build-mode app</code>)</span></li>
          <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">3.</span> <span>A <code className="text-neutral-200 bg-neutral-800 px-1.5 py-0.5 rounded text-xs">.env</code> file with your API key</span></li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-white mb-4">Step-by-step</h2>

        <Step n="1" title="Create your project">
          <Code>npx agentvoy create my-project --build-mode app --deploy-target docker --yes</Code>
          <p className="text-sm text-neutral-400 mt-2">This generates a Dockerfile, .dockerignore, and docker-compose.yml alongside your agent code.</p>
        </Step>

        <Step n="2" title="Configure your environment">
          <Code>cd my-project-app{"\n"}cp .env.example .env</Code>
          <p className="text-sm text-neutral-400 mt-2">Open <code className="text-neutral-200 bg-neutral-800 px-1.5 py-0.5 rounded text-xs">.env</code> and add your API key (e.g. <code className="text-neutral-200 bg-neutral-800 px-1.5 py-0.5 rounded text-xs">OPENAI_API_KEY=sk-...</code>).</p>
        </Step>

        <Step n="3" title="Deploy with one command">
          <Code>agentvoy deploy --target docker</Code>
          <p className="text-sm text-neutral-400 mt-2">This runs <code className="text-neutral-200 bg-neutral-800 px-1.5 py-0.5 rounded text-xs">docker build</code> and <code className="text-neutral-200 bg-neutral-800 px-1.5 py-0.5 rounded text-xs">docker run</code> automatically. Your agent is now live at:</p>
          <ul className="text-sm text-neutral-300 mt-2 space-y-1 ml-4">
            <li>Agent API: <code className="text-green-400 bg-neutral-800 px-1.5 py-0.5 rounded text-xs">http://localhost:8080</code></li>
            <li>DevTools: <code className="text-green-400 bg-neutral-800 px-1.5 py-0.5 rounded text-xs">http://localhost:8080/dev</code></li>
            <li>Health: <code className="text-green-400 bg-neutral-800 px-1.5 py-0.5 rounded text-xs">http://localhost:8080/health</code></li>
          </ul>
        </Step>

        <Step n="4" title="(Alternative) Manual Docker commands">
          <Code>{`# Build the image
docker build -t my-project .

# Run the container
docker run -p 8080:8080 --env-file .env my-project

# Or use docker-compose
docker compose up`}</Code>
        </Step>

        <Step n="5" title="Dry run (generate files only)">
          <Code>agentvoy deploy --target docker --dry-run</Code>
          <p className="text-sm text-neutral-400 mt-2">Generates Dockerfile, .dockerignore, and docker-compose.yml without building or running.</p>
        </Step>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-white mb-4">Generated files</h2>
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4">
          <div className="space-y-1 font-mono text-sm">
            <div className="text-neutral-400"><span className="text-green-500">+</span> Dockerfile</div>
            <div className="text-neutral-400"><span className="text-green-500">+</span> .dockerignore</div>
            <div className="text-neutral-400"><span className="text-green-500">+</span> docker-compose.yml</div>
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-white mb-4">Guard-to-Docker mapping</h2>
        <p className="text-sm text-neutral-400 mb-3">Your <code className="text-neutral-200 bg-neutral-800 px-1.5 py-0.5 rounded text-xs">agent.guard.yml</code> settings flow directly into the Dockerfile:</p>
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 font-mono text-sm text-neutral-300 space-y-1">
          <div><span className="text-yellow-400">timeout: 5m</span> &rarr; HEALTHCHECK interval</div>
          <div><span className="text-yellow-400">cost_limit: $1.00</span> &rarr; Container memory limit (512Mi)</div>
          <div><span className="text-yellow-400">allow_shell: false</span> &rarr; Non-root Docker user</div>
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
