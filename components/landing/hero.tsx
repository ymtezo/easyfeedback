import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Code2, Zap, Shield } from "lucide-react"

export function Hero() {
  return (
    <section className="relative overflow-hidden px-4 py-24 md:py-32">
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />

      <div className="mx-auto max-w-4xl text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-4 py-1.5 text-sm text-neutral-600">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
          </span>
          Now with REST API support
        </div>

        <h1 className="text-balance text-4xl font-bold tracking-tight text-neutral-900 md:text-6xl">
          Collect Feedback
          <br />
          <span className="text-neutral-400">That Actually Matters</span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg text-neutral-600 md:text-xl">
          The easiest way to gather, analyze, and act on user feedback. Built for developers, loved by users. Reward
          your respondents and gain insights.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button size="lg" asChild>
            <Link href="/auth/sign-up">
              Start Free Trial
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="#how-it-works">See How It Works</Link>
          </Button>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-3">
          <div className="flex flex-col items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-neutral-100">
              <Code2 className="h-5 w-5 text-neutral-700" />
            </div>
            <span className="text-sm font-medium text-neutral-900">5-Minute Setup</span>
            <span className="text-xs text-neutral-500">Simple REST API integration</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-neutral-100">
              <Zap className="h-5 w-5 text-neutral-700" />
            </div>
            <span className="text-sm font-medium text-neutral-900">Real-time Analytics</span>
            <span className="text-xs text-neutral-500">NPS, CSAT, CES metrics</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-neutral-100">
              <Shield className="h-5 w-5 text-neutral-700" />
            </div>
            <span className="text-sm font-medium text-neutral-900">Privacy First</span>
            <span className="text-xs text-neutral-500">Anonymous feedback support</span>
          </div>
        </div>
      </div>
    </section>
  )
}
