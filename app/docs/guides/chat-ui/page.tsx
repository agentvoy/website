export default function ChatUIGuidePage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-2">Streamlit Chat UI</h1>
      <p className="text-neutral-400 mb-8">Every app-mode project includes a production-ready chat interface with dynamic model switching.</p>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-white mb-4">Quick start</h2>
        <Code>{`cd my-project-app
pip install -r requirements.txt

# Start the API server (terminal 1)
uvicorn server:app --reload --port 8080

# Start the chat UI (terminal 2)
streamlit run streamlit_app.py`}</Code>
        <p className="text-sm text-neutral-400 mt-3">The chat UI opens at <code className="text-neutral-200 bg-neutral-800 px-1.5 py-0.5 rounded text-xs">http://localhost:8501</code>.</p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-white mb-4">Features</h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {[
            { title: "Glassmorphism dark theme", desc: "Styled with backdrop blur and gradient accents" },
            { title: "Dynamic model switching", desc: "Auto-detects API keys from .env and shows available models" },
            { title: "Guard summary sidebar", desc: "Displays guardrail results for each response" },
            { title: "Chat history", desc: "Full conversation history with user/assistant messages" },
          ].map(item => (
            <div key={item.title} className="bg-neutral-900 border border-neutral-800 rounded-xl p-4">
              <div className="font-semibold text-white text-sm mb-1">{item.title}</div>
              <div className="text-xs text-neutral-400">{item.desc}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-white mb-4">Dynamic model switching</h2>
        <p className="text-sm text-neutral-400 mb-3">The chat UI reads your <code className="text-neutral-200 bg-neutral-800 px-1.5 py-0.5 rounded text-xs">.env</code> file and auto-detects which API keys are present. Based on that, it populates a model picker dropdown:</p>
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 text-sm">
          <table className="w-full">
            <thead><tr className="text-neutral-500 text-left"><th className="pb-2">If this key exists in .env</th><th className="pb-2">These models appear</th></tr></thead>
            <tbody className="text-neutral-300">
              <tr><td className="py-1.5 font-mono text-yellow-400">OPENAI_API_KEY</td><td>gpt-4o, gpt-4o-mini, gpt-4.1, o1</td></tr>
              <tr><td className="py-1.5 font-mono text-yellow-400">ANTHROPIC_API_KEY</td><td>claude-sonnet-4, claude-haiku-4.5</td></tr>
              <tr><td className="py-1.5 font-mono text-yellow-400">GOOGLE_API_KEY</td><td>gemini-2.0-flash, gemini-2.5-pro</td></tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-neutral-400 mt-3">You can add multiple API keys to get access to models from multiple providers in the same chat UI.</p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-white mb-4">Changing the default model</h2>
        <p className="text-sm text-neutral-400 mb-3">Set the default model in your <code className="text-neutral-200 bg-neutral-800 px-1.5 py-0.5 rounded text-xs">.env</code> file:</p>
        <Code>DEFAULT_MODEL=claude-sonnet-4-20250514</Code>
        <p className="text-sm text-neutral-400 mt-3">This sets what model is pre-selected when the chat UI loads. Users can still switch models from the dropdown at any time.</p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-white mb-4">Customizing the UI</h2>
        <p className="text-sm text-neutral-400 mb-3">The chat UI is a single Python file (<code className="text-neutral-200 bg-neutral-800 px-1.5 py-0.5 rounded text-xs">streamlit_app.py</code>) that you can customize:</p>
        <ul className="text-sm text-neutral-400 space-y-2 ml-4 list-disc">
          <li>Change the page title and icon in <code className="text-neutral-200 bg-neutral-800 px-1.5 py-0.5 rounded text-xs">st.set_page_config()</code></li>
          <li>Modify the CSS in the <code className="text-neutral-200 bg-neutral-800 px-1.5 py-0.5 rounded text-xs">st.markdown()</code> block at the top</li>
          <li>Add custom sidebar content</li>
          <li>Change the API URL if your server runs on a different port</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-white mb-4">Running with agentvoy dev</h2>
        <p className="text-sm text-neutral-400 mb-3">Instead of starting two terminals manually, use:</p>
        <Code>agentvoy dev</Code>
        <p className="text-sm text-neutral-400 mt-3">This starts both the FastAPI server and the Streamlit UI, plus enables the DevTools dashboard at <code className="text-neutral-200 bg-neutral-800 px-1.5 py-0.5 rounded text-xs">/dev</code>.</p>
      </section>
    </div>
  )
}

function Code({ children }: { children: React.ReactNode }) {
  return (
    <pre className="bg-black/50 border border-neutral-800 rounded-lg px-4 py-3 font-mono text-sm text-green-400 overflow-x-auto whitespace-pre-wrap">{children}</pre>
  )
}
