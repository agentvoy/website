const traceEvents = [
  { event: "agent_start", data: "agent name, prompt, model", color: "text-blue-400" },
  { event: "llm_call", data: "model, latency, tokens in/out", color: "text-green-400" },
  { event: "tool_call", data: "tool name, input, output, latency", color: "text-yellow-400" },
  { event: "guard_check", data: "check type, pass/fail, details", color: "text-red-400" },
  { event: "pipeline_stage", data: "stage name, index, status", color: "text-purple-400" },
  { event: "agent_complete", data: "agent name, result preview", color: "text-cyan-400" },
]

const endpoints = [
  { method: "GET", path: "/dev", desc: "DevTools dashboard" },
  { method: "WS", path: "/ws/trace", desc: "Real-time trace stream" },
  { method: "GET", path: "/dev/events", desc: "All events as JSON" },
  { method: "POST", path: "/run", desc: "Run your agent" },
  { method: "GET", path: "/health", desc: "Health check" },
]

export function DevToolsSection() {
  return (
    <section className="w-full px-4 py-16 max-w-6xl mx-auto">
      <div className="text-xs font-semibold tracking-widest text-indigo-400 uppercase mb-3">DevTools</div>
      <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-3">
        See your agent think.
      </h2>
      <p className="text-neutral-400 mb-10 max-w-xl">
        Every app-mode project includes a real-time DevTools dashboard. Start with <code className="text-neutral-300 font-mono text-sm">agentvoy dev</code> and open <code className="text-neutral-300 font-mono text-sm">/dev</code>.
      </p>

      <div className="grid md:grid-cols-2 gap-6 mb-10">
        {/* Left: simulated dashboard */}
        <div className="bg-[#06080f] border border-neutral-800 rounded-xl overflow-hidden">
          {/* Title bar */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-800">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
              <span className="text-xs text-neutral-500 font-mono ml-2">localhost:8080/dev</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs text-green-400">Connected</span>
            </div>
          </div>

          {/* Stats bar */}
          <div className="flex items-center gap-4 px-4 py-2.5 border-b border-neutral-800/50 text-xs">
            <span className="text-neutral-500">Events: <span className="text-white">12</span></span>
            <span className="text-neutral-500">Tokens: <span className="text-white">3,847</span></span>
            <span className="text-neutral-500">Latency: <span className="text-white">1.2s</span></span>
          </div>

          {/* Event timeline */}
          <div className="p-4 space-y-2.5">
            {traceEvents.map((e) => (
              <div key={e.event} className="flex items-center gap-3">
                <span className={`text-xs font-mono font-semibold w-28 ${e.color}`}>{e.event}</span>
                <span className="text-xs text-neutral-500">{e.data}</span>
              </div>
            ))}
          </div>

          {/* Pipeline bar */}
          <div className="px-4 pb-4">
            <div className="flex items-center gap-1">
              <div className="flex-1 h-2 rounded-full bg-green-500/80" />
              <div className="flex-1 h-2 rounded-full bg-green-500/80" />
              <div className="flex-1 h-2 rounded-full bg-indigo-500/60 animate-pulse" />
            </div>
            <div className="flex justify-between text-[10px] text-neutral-600 mt-1 font-mono">
              <span>researcher</span>
              <span>writer</span>
              <span>reviewer</span>
            </div>
          </div>
        </div>

        {/* Right: details */}
        <div className="space-y-6">
          {/* agentvoy dev card */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5">
            <div className="font-semibold text-white mb-2">agentvoy dev</div>
            <p className="text-xs text-neutral-400 mb-3">
              Starts your agent server with hot-reload, opens the DevTools dashboard, and streams trace events via WebSocket. Zero config needed.
            </p>
            <code className="text-xs font-mono text-green-400 bg-black/40 px-2.5 py-1.5 rounded-lg block">
              $ agentvoy dev
            </code>
          </div>

          {/* Endpoints */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5">
            <div className="font-semibold text-white mb-3">API Endpoints</div>
            <div className="space-y-2">
              {endpoints.map((ep) => (
                <div key={ep.path} className="flex items-center gap-3 text-xs">
                  <span className={`font-mono font-semibold w-8 ${ep.method === "WS" ? "text-purple-400" : ep.method === "POST" ? "text-yellow-400" : "text-blue-400"}`}>
                    {ep.method}
                  </span>
                  <code className="text-neutral-300 font-mono">{ep.path}</code>
                  <span className="text-neutral-600">—</span>
                  <span className="text-neutral-500">{ep.desc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Model switching */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5">
            <div className="font-semibold text-white mb-2">Dynamic model switching</div>
            <p className="text-xs text-neutral-400">
              The Streamlit chat UI auto-detects API keys from <code className="text-neutral-300">.env</code> and shows available models — GPT-4o, Claude Sonnet, Gemini Flash, and more. Switch models on the fly without restarting.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
