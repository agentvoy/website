import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-neutral-950 flex flex-col items-center justify-center px-4 text-center">
      <div className="text-8xl font-bold text-neutral-800 mb-4 font-mono">404</div>
      <h1 className="text-2xl font-bold text-white mb-2">Page not found</h1>
      <p className="text-neutral-500 mb-8 max-w-sm">
        This page doesn&apos;t exist. But your AI agent can.
      </p>
      <div className="flex gap-4">
        <Link
          href="/"
          className="px-5 py-2.5 bg-white text-black text-sm font-semibold rounded-lg hover:bg-neutral-200 transition-colors"
        >
          Back to home
        </Link>
        <a
          href="https://github.com/agentvoy/agentvoy"
          target="_blank"
          rel="noopener noreferrer"
          className="px-5 py-2.5 border border-neutral-700 text-neutral-300 text-sm font-semibold rounded-lg hover:border-neutral-500 transition-colors"
        >
          GitHub
        </a>
      </div>
      <div className="mt-12 font-mono text-xs text-neutral-700">
        npx agentvoy create my-agent
      </div>
    </div>
  );
}
