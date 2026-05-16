export default function GCPCloudRunDeployPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-2">Deploy to GCP Cloud Run</h1>
      <p className="text-neutral-400 mb-8">Serverless container deployment on Google Cloud Platform.</p>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-white mb-4">Prerequisites</h2>
        <ul className="space-y-2 text-sm text-neutral-300">
          <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">1.</span> <span><strong className="text-white">Google Cloud account</strong> &mdash; <a href="https://console.cloud.google.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">console.cloud.google.com</a> ($300 free credits for new accounts)</span></li>
          <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">2.</span> <span><strong className="text-white">gcloud CLI</strong> &mdash; <a href="https://cloud.google.com/sdk/docs/install" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">cloud.google.com/sdk/docs/install</a></span></li>
          <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">3.</span> <span>A GCP project with billing enabled</span></li>
          <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">4.</span> <span>Logged in via <code className="text-neutral-200 bg-neutral-800 px-1.5 py-0.5 rounded text-xs">gcloud auth login</code></span></li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-white mb-4">Step-by-step</h2>

        <Step n="1" title="Install gcloud CLI">
          <Code>{`# macOS
brew install google-cloud-sdk

# Linux
curl https://sdk.cloud.google.com | bash

# Or download from:
# https://cloud.google.com/sdk/docs/install`}</Code>
        </Step>

        <Step n="2" title="Authenticate and set project">
          <Code>{`gcloud auth login
gcloud config set project YOUR_PROJECT_ID`}</Code>
          <p className="text-sm text-neutral-400 mt-2">Enable the required APIs:</p>
          <Code>{`gcloud services enable run.googleapis.com
gcloud services enable cloudbuild.googleapis.com
gcloud services enable artifactregistry.googleapis.com`}</Code>
        </Step>

        <Step n="3" title="Create your project with GCP target">
          <Code>npx agentvoy create my-project --build-mode app --deploy-target gcp-cloud-run --yes</Code>
        </Step>

        <Step n="4" title="Configure your .env">
          <Code>{`cd my-project-app
cp .env.example .env
# Add your API key to .env`}</Code>
        </Step>

        <Step n="5" title="Deploy">
          <Code>agentvoy deploy --target gcp-cloud-run</Code>
          <p className="text-sm text-neutral-400 mt-2">AgentVoy builds the container with Cloud Build, pushes to Artifact Registry, and deploys to Cloud Run.</p>
        </Step>

        <Step n="6" title="Access your app">
          <Code>{`# Get the service URL
gcloud run services describe my-project --format="value(status.url)"

# View logs
gcloud run services logs read my-project`}</Code>
        </Step>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-white mb-4">Generated files</h2>
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4">
          <div className="space-y-1 font-mono text-sm">
            <div className="text-neutral-400"><span className="text-green-500">+</span> Dockerfile</div>
            <div className="text-neutral-400"><span className="text-green-500">+</span> .dockerignore</div>
            <div className="text-neutral-400"><span className="text-green-500">+</span> deploy/cloud-run.yaml</div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-white mb-4">Guard-to-Cloud Run mapping</h2>
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 font-mono text-sm text-neutral-300 space-y-1">
          <div><span className="text-yellow-400">timeout: 5m</span> &rarr; Cloud Run request timeout</div>
          <div><span className="text-yellow-400">cost_limit: $1.00</span> &rarr; Memory: 512Mi, CPU: 1</div>
          <div><span className="text-yellow-400">allow_shell: false</span> &rarr; Non-root container user</div>
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
