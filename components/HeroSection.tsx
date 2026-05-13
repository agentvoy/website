'use client'

import { SplineScene } from "@/components/ui/splite"
import { Card } from "@/components/ui/card"
import { Spotlight } from "@/components/ui/spotlight"
import { Copy, Check } from "lucide-react"
import { useState } from "react"

export function HeroSection() {
  const [copied, setCopied] = useState(false)

  const copyCmd = () => {
    navigator.clipboard.writeText('npx agentvoy create my-agent')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section className="w-full px-4 pt-8 pb-16">
      <Card className="w-full min-h-[560px] bg-black/[0.96] relative overflow-hidden border-neutral-800">
        <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="white" />

        <div className="flex flex-col md:flex-row h-full min-h-[560px]">
          {/* Left */}
          <div className="flex-1 p-8 md:p-12 relative z-10 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neutral-800 bg-neutral-900/50 text-neutral-400 text-xs font-medium mb-6 w-fit">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
              v0.4.0 — scaffold, guard, and deploy
            </div>

            <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 leading-tight mb-4">
              Build and deploy<br />
              <span className="text-blue-400">AI agents anywhere.</span>
            </h1>

            <p className="mt-2 text-neutral-400 max-w-md text-base leading-relaxed mb-8">
              Scaffold production-ready agents or full agentic apps — with API, chat UI, and one-command cloud deploy. Any framework. Any model.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex items-center gap-3 bg-neutral-900 border border-neutral-700 rounded-lg px-4 py-3 font-mono text-sm">
                <span className="text-neutral-500">$</span>
                <span className="text-green-400">npx agentvoy create my-project</span>
                <button
                  onClick={copyCmd}
                  className="text-neutral-500 hover:text-neutral-300 transition-colors ml-1"
                >
                  {copied
                    ? <Check size={14} className="text-green-400" />
                    : <Copy size={14} />
                  }
                </button>
              </div>
            </div>

            <div className="flex items-center gap-4 mt-6">
              <a
                href="https://github.com/agentvoy/agentvoy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-neutral-400 hover:text-neutral-200 transition-colors flex items-center gap-1"
              >
                GitHub →
              </a>
              <a
                href="https://www.npmjs.com/package/agentvoy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-neutral-400 hover:text-neutral-200 transition-colors"
              >
                npm →
              </a>
            </div>
          </div>

          {/* Right — Spline 3D */}
          <div className="flex-1 relative min-h-[300px] md:min-h-0">
            <SplineScene
              scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
              className="w-full h-full"
            />
          </div>
        </div>
      </Card>
    </section>
  )
}
