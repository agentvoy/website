import { Navbar } from "@/components/Navbar"
import { HeroSection } from "@/components/HeroSection"
import { FrameworksSection } from "@/components/FrameworksSection"
import { GuardrailsSection } from "@/components/GuardrailsSection"
import { FeaturesSection } from "@/components/FeaturesSection"
import { DevToolsSection } from "@/components/DevToolsSection"
import { QuickStartSection } from "@/components/QuickStartSection"
import { DeploySection } from "@/components/DeploySection"
import { DeployTargetsStrip } from "@/components/DeployTargetsStrip"

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <div className="max-w-6xl mx-auto">
        <HeroSection />

        <DeployTargetsStrip />

        <div className="border-t border-neutral-900" id="frameworks">
          <FrameworksSection />
        </div>

        <div className="border-t border-neutral-900" id="devtools">
          <DevToolsSection />
        </div>

        <div className="border-t border-neutral-900" id="guardrails">
          <GuardrailsSection />
        </div>

        <div className="border-t border-neutral-900">
          <FeaturesSection />
        </div>

        <div className="border-t border-neutral-900" id="deploy">
          <DeploySection />
        </div>

        <div className="border-t border-neutral-900" id="quickstart">
          <QuickStartSection />
        </div>

        {/* CTA */}
        <div className="border-t border-neutral-900 text-center px-4 py-20">
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-3">
            Start building your agent.
          </h2>
          <p className="text-neutral-400 mb-8">One command. Any framework. Deploy anywhere.</p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <div className="flex items-center gap-3 bg-neutral-900 border border-neutral-700 rounded-lg px-4 py-3 font-mono text-sm">
              <span className="text-neutral-500">$</span>
              <span className="text-green-400">npx agentvoy create my-project</span>
            </div>
            <a
              href="/create"
              className="px-4 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-medium transition-colors"
            >
              Create visually →
            </a>
            <a
              href="https://github.com/agentvoy/agentvoy"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-3 border border-neutral-700 rounded-lg text-sm text-neutral-300 hover:text-white hover:border-neutral-500 transition-colors"
            >
              GitHub →
            </a>
          </div>
        </div>
      </div>

      <footer className="border-t border-neutral-900 px-6 py-5 flex items-center justify-between text-xs text-neutral-500 flex-wrap gap-3">
        <span>
          © 2026 AgentVoy · Apache 2.0 ·{" "}
          <a href="https://github.com/ChinmayMurugkar" target="_blank" rel="noopener noreferrer" className="hover:text-neutral-300 transition-colors">
            Chinmay Murugkar
          </a>
        </span>
        <div className="flex gap-4">
          <a href="https://github.com/agentvoy/agentvoy" target="_blank" rel="noopener noreferrer" className="hover:text-neutral-300 transition-colors">GitHub</a>
          <a href="https://www.npmjs.com/package/agentvoy" target="_blank" rel="noopener noreferrer" className="hover:text-neutral-300 transition-colors">npm</a>
          <a href="https://github.com/agentvoy/agentvoy/blob/main/LICENSE" target="_blank" rel="noopener noreferrer" className="hover:text-neutral-300 transition-colors">License</a>
        </div>
      </footer>
    </main>
  )
}
