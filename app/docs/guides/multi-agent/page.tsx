export default function MultiAgentGuidePage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-2">Multi-Agent Pipelines</h1>
      <p className="text-neutral-400 mb-8">Build sequential agent pipelines where each agent builds on the previous stage&apos;s output.</p>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-white mb-4">How it works</h2>
        <p className="text-sm text-neutral-400 mb-4">A multi-agent pipeline chains agents sequentially. Each agent receives the output of the previous agent as its input:</p>
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 flex items-center justify-center gap-2 font-mono text-sm">
          <span className="px-3 py-1.5 bg-blue-500/10 border border-blue-500/30 rounded-lg text-blue-400">researcher</span>
          <span className="text-neutral-600">&rarr;</span>
          <span className="px-3 py-1.5 bg-purple-500/10 border border-purple-500/30 rounded-lg text-purple-400">writer</span>
          <span className="text-neutral-600">&rarr;</span>
          <span className="px-3 py-1.5 bg-green-500/10 border border-green-500/30 rounded-lg text-green-400">reviewer</span>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-white mb-4">Create a multi-agent project</h2>

        <Step n="1" title="Interactive mode">
          <Code>npx agentvoy create my-project</Code>
          <p className="text-sm text-neutral-400 mt-2">Choose <strong className="text-white">App</strong> &rarr; <strong className="text-white">Multi-agent</strong> &rarr; set agent count and names.</p>
        </Step>

        <Step n="2" title="Non-interactive mode">
          <Code>npx agentvoy create my-project --build-mode app --agent-mode multi --yes</Code>
          <p className="text-sm text-neutral-400 mt-2">Creates a default 3-agent pipeline: researcher &rarr; writer &rarr; reviewer.</p>
        </Step>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-white mb-4">Project structure</h2>
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 font-mono text-sm text-neutral-400 space-y-1">
          <div>my-project-app/</div>
          <div className="ml-4">src/</div>
          <div className="ml-8"><span className="text-green-500">agents/</span></div>
          <div className="ml-12">researcher.py <span className="text-neutral-600"># Stage 1</span></div>
          <div className="ml-12">writer.py <span className="text-neutral-600"># Stage 2</span></div>
          <div className="ml-12">reviewer.py <span className="text-neutral-600"># Stage 3</span></div>
          <div className="ml-8"><span className="text-purple-400">pipeline.py</span> <span className="text-neutral-600"># Orchestration</span></div>
          <div className="ml-4">server.py <span className="text-neutral-600"># FastAPI (calls pipeline)</span></div>
          <div className="ml-4">streamlit_app.py <span className="text-neutral-600"># Chat UI with stage display</span></div>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-white mb-4">How pipeline.py works</h2>
        <Code>{`"""Multi-agent pipeline — agents run in sequence."""
from agentvoy_guard import Guard

guard = Guard.from_config()

def run_pipeline(prompt: str) -> dict:
    with guard.session() as session:
        session.check_input(prompt)

        # Stage 1: Researcher
        from src.agents.researcher import run_agent as research
        research_result = research(prompt)
        session.tick()

        # Stage 2: Writer (receives researcher's output)
        from src.agents.writer import run_agent as write
        writer_result = write(research_result)
        session.tick()

        # Stage 3: Reviewer (receives writer's output)
        from src.agents.reviewer import run_agent as review
        final_result = review(writer_result)
        session.tick()

        session.check_output(str(final_result))

    return {
        "result": final_result,
        "stages": ["researcher", "writer", "reviewer"],
        "guard_summary": guard.last_summary,
    }`}</Code>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-white mb-4">Customizing your agents</h2>
        <p className="text-sm text-neutral-400 mb-3">Each agent file has the same structure. Customize the system prompt and tools for each stage:</p>
        <Code>{`# src/agents/researcher.py
def create_agent():
    """Customize the system prompt for this stage."""
    agent = AssistantAgent(
        name="researcher",
        system_message="""You are a research specialist.
Your job is to gather information and present findings clearly.
Focus on facts and cite sources.""",
        ...
    )
    return agent`}</Code>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-white mb-4">DevTools pipeline view</h2>
        <p className="text-sm text-neutral-400 mb-3">The DevTools dashboard shows pipeline progress in real time:</p>
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4">
          <div className="flex items-center gap-1 mb-2">
            <div className="flex-1 h-3 rounded-full bg-green-500/80" />
            <div className="flex-1 h-3 rounded-full bg-green-500/80" />
            <div className="flex-1 h-3 rounded-full bg-indigo-500/60 animate-pulse" />
          </div>
          <div className="flex justify-between text-xs text-neutral-500 font-mono">
            <span className="text-green-400">researcher (done)</span>
            <span className="text-green-400">writer (done)</span>
            <span className="text-indigo-400">reviewer (running)</span>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-white mb-4">Framework-specific behavior</h2>
        <div className="bg-yellow-500/5 border border-yellow-500/30 rounded-xl p-4 text-sm text-yellow-400/80 space-y-2">
          <p><strong>CrewAI and Google ADK</strong> handle multi-agent orchestration internally. When you use these frameworks with multi-agent mode, AgentVoy generates their native crew/sub-agent structure instead of a pipeline.py file.</p>
          <p>All other frameworks (OpenAI, Anthropic, LangGraph, LlamaIndex, AutoGen) use the sequential pipeline.</p>
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
