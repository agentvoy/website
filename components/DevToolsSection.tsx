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

      {/* Full-width demo video */}
      <div className="mb-10">
        <div className="bg-[#06080f] border border-neutral-800 rounded-xl overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-800">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
              <span className="text-xs text-neutral-500 font-mono ml-2">Chat + DevTools — split view</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs text-green-400">Live demo</span>
            </div>
          </div>
          <video
            src="/demos/demo-devtools.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
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
    </section>
  )
}
