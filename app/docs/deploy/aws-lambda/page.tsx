export default function AWSLambdaDeployPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-2">Deploy to AWS Lambda</h1>
      <p className="text-neutral-400 mb-8">Serverless deployment on AWS using SAM (Serverless Application Model).</p>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-white mb-4">Prerequisites</h2>
        <ul className="space-y-2 text-sm text-neutral-300">
          <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">1.</span> <span><strong className="text-white">AWS account</strong> &mdash; <a href="https://aws.amazon.com/free" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">aws.amazon.com/free</a></span></li>
          <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">2.</span> <span><strong className="text-white">AWS CLI</strong> &mdash; <a href="https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">docs.aws.amazon.com</a></span></li>
          <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">3.</span> <span><strong className="text-white">AWS SAM CLI</strong> &mdash; <a href="https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/install-sam-cli.html" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Install SAM CLI</a></span></li>
          <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">4.</span> <span>AWS credentials configured via <code className="text-neutral-200 bg-neutral-800 px-1.5 py-0.5 rounded text-xs">aws configure</code></span></li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-white mb-4">Step-by-step</h2>

        <Step n="1" title="Install AWS CLI and SAM CLI">
          <Code>{`# macOS
brew install awscli aws-sam-cli

# Linux
pip install aws-sam-cli

# Verify installation
aws --version
sam --version`}</Code>
        </Step>

        <Step n="2" title="Configure AWS credentials">
          <Code>{`aws configure
# Enter your:
#   AWS Access Key ID
#   AWS Secret Access Key
#   Default region (e.g., us-east-1)
#   Default output format (json)`}</Code>
          <p className="text-sm text-neutral-400 mt-2">Get your access keys from the <a href="https://console.aws.amazon.com/iam/home#/security_credentials" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">AWS IAM Console</a>.</p>
        </Step>

        <Step n="3" title="Create your project with AWS Lambda target">
          <Code>npx agentvoy create my-project --build-mode app --deploy-target aws-lambda --yes</Code>
        </Step>

        <Step n="4" title="Configure your .env">
          <Code>{`cd my-project-app
cp .env.example .env
# Add your API key to .env`}</Code>
        </Step>

        <Step n="5" title="Deploy">
          <Code>agentvoy deploy --target aws-lambda</Code>
          <p className="text-sm text-neutral-400 mt-2">AgentVoy runs <code className="text-neutral-200 bg-neutral-800 px-1.5 py-0.5 rounded text-xs">sam build</code> and <code className="text-neutral-200 bg-neutral-800 px-1.5 py-0.5 rounded text-xs">sam deploy --guided</code> for you.</p>
        </Step>

        <Step n="6" title="Access your API">
          <Code>{`# Get the API Gateway URL
sam list stack-outputs --stack-name my-project

# View logs
sam logs -n AgentFunction --stack-name my-project --tail`}</Code>
        </Step>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-white mb-4">Generated files</h2>
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4">
          <div className="space-y-1 font-mono text-sm">
            <div className="text-neutral-400"><span className="text-green-500">+</span> Dockerfile</div>
            <div className="text-neutral-400"><span className="text-green-500">+</span> .dockerignore</div>
            <div className="text-neutral-400"><span className="text-green-500">+</span> deploy/template.yaml <span className="text-neutral-600">(SAM template)</span></div>
            <div className="text-neutral-400"><span className="text-green-500">+</span> deploy/lambda_handler.py</div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-white mb-4">Important notes</h2>
        <div className="bg-yellow-500/5 border border-yellow-500/30 rounded-xl p-4 text-sm text-yellow-400/80 space-y-2">
          <p>AWS Lambda has a 15-minute maximum execution timeout. Long-running agent tasks may need to be broken into smaller steps.</p>
          <p>The DevTools WebSocket endpoint (<code className="bg-neutral-800 px-1 py-0.5 rounded">/ws/trace</code>) is not available on Lambda since it does not support persistent connections. Use CloudWatch Logs instead.</p>
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
