export default function GuardrailsGuidePage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-2">Guardrails</h1>
      <p className="text-neutral-400 mb-8">Configure security, permissions, and behavior constraints for your agent using agent.guard.yml.</p>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-white mb-4">What is agent.guard.yml?</h2>
        <p className="text-sm text-neutral-400 mb-4">Every AgentVoy project includes an <code className="text-neutral-200 bg-neutral-800 px-1.5 py-0.5 rounded text-xs">agent.guard.yml</code> file &mdash; a universal declarative config that defines what your agent can and cannot do. It controls:</p>
        <div className="grid sm:grid-cols-2 gap-3">
          {[
            { title: "Input filtering", desc: "Block prompt injection, limit token count, detect PII" },
            { title: "Output filtering", desc: "Block harmful content, limit output length" },
            { title: "Permissions", desc: "Network access, filesystem, shell execution, tool approval" },
            { title: "Behavior", desc: "Max iterations, timeouts, cost limits" },
          ].map(item => (
            <div key={item.title} className="bg-neutral-900 border border-neutral-800 rounded-xl p-4">
              <div className="font-semibold text-white text-sm mb-1">{item.title}</div>
              <div className="text-xs text-neutral-400">{item.desc}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-white mb-4">Full config reference</h2>
        <Code>{`version: "1.0"

identity:
  name: my-agent
  description: Research assistant agent
  version: 0.1.0

model:
  provider: openai              # openai | anthropic | google | ollama | groq | mistral
  model: gpt-4o                 # Model name
  api_key_env: OPENAI_API_KEY   # Env var containing your API key

permissions:
  network:
    mode: restricted             # open | restricted | blocked
    allow:                       # Allowed domains (when restricted)
      - "*.github.com"
      - "*.stackoverflow.com"
  filesystem:
    read: ["./**"]               # Glob patterns for read access
    write: ["./output/**"]       # Glob patterns for write access
  tools:
    require_approval:            # Tools that need user confirmation
      - "delete_*"
      - "send_*"
      - "deploy_*"
  execution:
    allow_shell: false           # Allow shell command execution
    allow_subprocess: false      # Allow spawning subprocesses

guardrails:
  input:
    block_prompt_injection: true # Detect and block injection attempts
    max_tokens: 4096             # Maximum input token count
    pii_detection: warn          # off | warn | block
    content_filter: moderate     # off | moderate | strict
  output:
    block_harmful_content: true  # Filter harmful output
    max_output_tokens: 8192      # Maximum output token count
  behavior:
    max_iterations: 20           # Max agent loops
    timeout: 5m                  # Maximum execution time
    cost_limit: "$1.00"          # Maximum cost per session

observability:
  tracing: true                  # Enable execution tracing
  log_level: info                # debug | info | warn | error
  cost_tracking: true            # Track API costs`}</Code>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-white mb-4">Runtime enforcement</h2>
        <p className="text-sm text-neutral-400 mb-4">Install the Python guard package to enforce rules at runtime:</p>
        <Code>pip install agentvoy-guard</Code>
        <p className="text-sm text-neutral-400 mt-4 mb-2">Use it in your agent code:</p>
        <Code>{`from agentvoy_guard import Guard

guard = Guard.from_config()  # reads agent.guard.yml

with guard.session() as session:
    session.check_input(user_prompt)    # validates input
    result = my_agent.run(user_prompt)  # your agent logic
    session.check_output(result)        # validates output

print(guard.last_summary)  # see what checks ran`}</Code>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-white mb-4">Common configurations</h2>

        <h3 className="text-sm font-semibold text-neutral-300 mb-2 mt-6">Strict mode (production)</h3>
        <Code>{`permissions:
  network:
    mode: restricted
    allow: ["api.openai.com"]
  execution:
    allow_shell: false
    allow_subprocess: false
guardrails:
  input:
    block_prompt_injection: true
    content_filter: strict
  output:
    block_harmful_content: true
  behavior:
    timeout: 2m
    cost_limit: "$0.50"`}</Code>

        <h3 className="text-sm font-semibold text-neutral-300 mb-2 mt-6">Development mode (permissive)</h3>
        <Code>{`permissions:
  network:
    mode: open
  execution:
    allow_shell: true
guardrails:
  input:
    content_filter: off
  behavior:
    timeout: 10m
    cost_limit: "$5.00"`}</Code>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-white mb-4">Guard-to-infrastructure mapping</h2>
        <p className="text-sm text-neutral-400 mb-3">When you deploy, guard settings automatically flow into infrastructure configs:</p>
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 font-mono text-sm text-neutral-300 space-y-2">
          <div><span className="text-yellow-400">timeout: 5m</span> &rarr; Docker HEALTHCHECK, Cloud Run timeout, Lambda timeout</div>
          <div><span className="text-yellow-400">cost_limit: $1.00</span> &rarr; Container memory limits</div>
          <div><span className="text-yellow-400">allow_shell: false</span> &rarr; Non-root Docker user</div>
          <div><span className="text-yellow-400">tracing: true</span> &rarr; DevTools /dev endpoint enabled</div>
        </div>
      </section>
    </div>
  )
}

function Code({ children }: { children: React.ReactNode }) {
  return (
    <pre className="bg-black/50 border border-neutral-800 rounded-lg px-4 py-3 font-mono text-sm text-green-400 overflow-x-auto whitespace-pre-wrap">{children}</pre>
  )
}
