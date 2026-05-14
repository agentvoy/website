import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://agentvoy.com"),
  title: {
    default: "AgentVoy — Universal AI Agent Development Platform",
    template: "%s | AgentVoy",
  },
  description:
    "AgentVoy is the open-source CLI to scaffold, develop, and deploy production-ready AI agents. Real-time DevTools, one-command deploy, 7 frameworks (OpenAI, CrewAI, LangGraph, Google ADK, Anthropic, LlamaIndex, AutoGen). Deploy to Docker or Fly.io in one command.",
  keywords: [
    "AgentVoy",
    "AI agent",
    "agent scaffold",
    "deploy AI agent",
    "agentic app",
    "agent DevTools",
    "agent tracing",
    "LangGraph",
    "CrewAI",
    "OpenAI Agents SDK",
    "Google ADK",
    "Anthropic",
    "LlamaIndex",
    "AutoGen",
    "agent framework",
    "agent guardrails",
    "agent CLI",
    "multi-agent pipeline",
    "agentvoy",
  ],
  authors: [{ name: "Chinmay Murugkar", url: "https://github.com/ChinmayMurugkar" }],
  creator: "Chinmay Murugkar",
  publisher: "AgentVoy",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    type: "website",
    title: "AgentVoy — Universal AI Agent Development Platform",
    description:
      "Scaffold and deploy production-ready AI agents in seconds. Real-time DevTools, one-command deploy, 7 frameworks. Open source.",
    url: "https://agentvoy.com",
    siteName: "AgentVoy",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "AgentVoy — Universal AI Agent Development Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AgentVoy — Universal AI Agent Development Platform",
    description:
      "Scaffold and deploy production-ready AI agents in seconds. Real-time DevTools, one-command deploy, 7 frameworks.",
    images: ["/og.png"],
    creator: "@agentvoy",
  },
  alternates: {
    canonical: "https://agentvoy.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
