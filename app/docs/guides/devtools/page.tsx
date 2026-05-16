export default function DevToolsGuidePage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-2">DevTools Dashboard</h1>
      <p className="text-neutral-400 mb-8">Real-time agent observability built into every app-mode project.</p>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-white mb-4">Quick start</h2>
        <Code>{`cd my-project-app
agentvoy dev`}</Code>
        <p className="text-sm text-neutral-400 mt-3">This starts your agent server with hot-reload and opens the DevTools dashboard at <code className="text-neutral-200 bg-neutral-800 px-1.5 py-0.5 rounded text-xs">http://localhost:8080/dev</code>.</p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-white mb-4">What you see</h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {[
            { title: "Real-time event feed", desc: "WebSocket-powered stream showing every agent action as it happens", color: "text-blue-400" },
            { title: "Event timeline", desc: "agent_start, llm_call, tool_call, guard_check, pipeline_stage, agent_complete", color: "text-green-400" },
            { title: "Pipeline visualization", desc: "See multi-agent stages progress in real time with status bars", color: "text-purple-400" },
            { title: "Detail inspector", desc: "Click any event to see full payload — model, tokens, latency, tool I/O", color: "text-yellow-400" },
          ].map(item => (
            <div key={item.title} className="bg-neutral-900 border border-neutral-800 rounded-xl p-4">
              <div className={`font-semibold text-sm mb-1 ${item.color}`}>{item.title}</div>
              <div className="text-xs text-neutral-400">{item.desc}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-white mb-4">API Endpoints</h2>
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4">
          <table className="w-full text-sm">
            <thead><tr className="text-neutral-500 text-left"><th className="pb-2 w-16">Method</th><th className="pb-2">Path</th><th className="pb-2">Description</th></tr></thead>
            <tbody className="text-neutral-300">
              <tr><td className="py-1.5 font-mono text-blue-400">GET</td><td className="py-1.5 font-mono">/dev</td><td>DevTools dashboard UI</td></tr>
              <tr><td className="py-1.5 font-mono text-purple-400">WS</td><td className="py-1.5 font-mono">/ws/trace</td><td>Real-time trace event stream</td></tr>
              <tr><td className="py-1.5 font-mono text-blue-400">GET</td><td className="py-1.5 font-mono">/dev/events</td><td>All events as JSON</td></tr>
              <tr><td className="py-1.5 font-mono text-yellow-400">POST</td><td className="py-1.5 font-mono">/run</td><td>Run your agent</td></tr>
              <tr><td className="py-1.5 font-mono text-blue-400">GET</td><td className="py-1.5 font-mono">/health</td><td>Health check</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-white mb-4">Trace events</h2>
        <p className="text-sm text-neutral-400 mb-4">All 7 framework adapters are instrumented out of the box. The tracer collects:</p>
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4">
          <table className="w-full text-sm">
            <thead><tr className="text-neutral-500 text-left"><th className="pb-2">Event</th><th className="pb-2">Data captured</th></tr></thead>
            <tbody className="text-neutral-300">
              <tr><td className="py-1.5 font-mono text-blue-400">agent_start</td><td>Agent name, prompt, model</td></tr>
              <tr><td className="py-1.5 font-mono text-green-400">llm_call</td><td>Model, latency, tokens in/out</td></tr>
              <tr><td className="py-1.5 font-mono text-yellow-400">tool_call</td><td>Tool name, input, output, latency</td></tr>
              <tr><td className="py-1.5 font-mono text-red-400">guard_check</td><td>Check type (input/output), pass/fail</td></tr>
              <tr><td className="py-1.5 font-mono text-purple-400">pipeline_stage</td><td>Stage name, index, status</td></tr>
              <tr><td className="py-1.5 font-mono text-cyan-400">agent_complete</td><td>Agent name, result preview</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-white mb-4">Using the WebSocket stream</h2>
        <p className="text-sm text-neutral-400 mb-3">Connect programmatically to receive trace events in real time:</p>
        <Code>{`import json
import websockets

async def stream_events():
    async with websockets.connect("ws://localhost:8080/ws/trace") as ws:
        async for message in ws:
            event = json.loads(message)
            print(f"[{event['event']}] {event.get('data', {})}")`}</Code>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-white mb-4">Fetch all events as JSON</h2>
        <Code>{`curl http://localhost:8080/dev/events | python -m json.tool`}</Code>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-white mb-4">Enabling tracing</h2>
        <p className="text-sm text-neutral-400 mb-3">Tracing is enabled by default in app-mode projects. To configure it, edit <code className="text-neutral-200 bg-neutral-800 px-1.5 py-0.5 rounded text-xs">agent.guard.yml</code>:</p>
        <Code>{`observability:
  tracing: true       # Enable/disable tracing
  log_level: info     # debug | info | warn | error
  cost_tracking: true # Track API costs per session`}</Code>
      </section>
    </div>
  )
}

function Code({ children }: { children: React.ReactNode }) {
  return (
    <pre className="bg-black/50 border border-neutral-800 rounded-lg px-4 py-3 font-mono text-sm text-green-400 overflow-x-auto whitespace-pre-wrap">{children}</pre>
  )
}
