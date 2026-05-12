export function GuardrailsSection() {
  return (
    <section className="w-full px-4 py-16 max-w-6xl mx-auto">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <div className="text-xs font-semibold tracking-widest text-blue-400 uppercase mb-3">agent.guard.yml</div>
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">
            Guardrails built in,<br />not bolted on.
          </h2>
          <p className="text-neutral-400 mb-6 leading-relaxed">
            Every AgentVoy project ships with <code className="text-green-400 bg-neutral-900 px-1.5 py-0.5 rounded text-sm font-mono">agent.guard.yml</code> —
            a universal declarative config for permissions, cost limits, and behavior constraints.
            One format that works across every framework.
          </p>
          <div className="space-y-3">
            {[
              ["🔒", "Network permissions", "Allowlist/denylist domains your agent can reach"],
              ["💰", "Cost limits", "Hard cap spend per run — never get a surprise bill"],
              ["🔁", "Iteration caps", "Set max tool calls and loop iterations"],
              ["🛡️", "Prompt injection blocking", "Detect and block prompt injection attacks"],
              ["👁️", "PII detection", "Warn or block when sensitive data is present"],
            ].map(([icon, title, desc]) => (
              <div key={title as string} className="flex gap-3">
                <span className="text-lg">{icon}</span>
                <div>
                  <div className="text-sm font-semibold text-white">{title as string}</div>
                  <div className="text-xs text-neutral-500">{desc as string}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-neutral-950 border border-neutral-800 rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-800">
            <div className="flex gap-1.5">
              <span className="w-3 h-3 rounded-full bg-red-500/70" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
              <span className="w-3 h-3 rounded-full bg-green-500/70" />
            </div>
            <span className="text-xs font-mono text-neutral-500">agent.guard.yml</span>
          </div>
          <pre className="p-5 text-xs font-mono leading-relaxed overflow-x-auto">
{`\u001b`}<code>{`\x1b[2m# Universal guardrails — works across all frameworks\x1b[0m`}</code>
            <code className="text-neutral-300">{`version: `}</code><code className="text-yellow-300">{`"1.0"`}</code>{`

`}<code className="text-blue-400">{`model:`}</code>{`
  `}<code className="text-blue-400">{`provider:`}</code><code className="text-green-400">{` anthropic`}</code>{`
  `}<code className="text-blue-400">{`model:`}</code><code className="text-green-400">{` claude-sonnet-4-20250514`}</code>{`

`}<code className="text-blue-400">{`permissions:`}</code>{`
  `}<code className="text-blue-400">{`network:`}</code>{`
    `}<code className="text-blue-400">{`mode:`}</code><code className="text-green-400">{` restricted`}</code>{`
    `}<code className="text-blue-400">{`allow:`}</code><code className="text-yellow-300">{` ["*.github.com"]`}</code>{`
  `}<code className="text-blue-400">{`execution:`}</code>{`
    `}<code className="text-blue-400">{`allow_shell:`}</code><code className="text-purple-400">{` false`}</code>{`

`}<code className="text-blue-400">{`guardrails:`}</code>{`
  `}<code className="text-blue-400">{`input:`}</code>{`
    `}<code className="text-blue-400">{`block_prompt_injection:`}</code><code className="text-purple-400">{` true`}</code>{`
    `}<code className="text-blue-400">{`pii_detection:`}</code><code className="text-green-400">{` warn`}</code>{`
  `}<code className="text-blue-400">{`behavior:`}</code>{`
    `}<code className="text-blue-400">{`max_iterations:`}</code><code className="text-green-400">{` 20`}</code>{`
    `}<code className="text-blue-400">{`cost_limit:`}</code><code className="text-yellow-300">{` "$1.00"`}</code>{`
    `}<code className="text-blue-400">{`timeout:`}</code><code className="text-green-400">{` 5m`}</code>
          </pre>
        </div>
      </div>
    </section>
  )
}
