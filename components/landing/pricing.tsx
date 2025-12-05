import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import { PRICING_PLANS } from "@/lib/config/pricing"

export function Pricing() {
  return (
    <section id="pricing" className="border-t border-neutral-200 bg-neutral-50 px-4 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-neutral-900 md:text-4xl">
            Simple, Transparent Pricing
          </h2>
          <p className="mt-4 text-lg text-neutral-600">
            Choose the plan that fits your needs. Upgrade or downgrade anytime.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Free Plan */}
          <div className="flex flex-col rounded-xl border border-neutral-200 bg-white p-6">
            <div>
              <h3 className="text-lg font-semibold text-neutral-900">{PRICING_PLANS.free.name}</h3>
              <p className="mt-1 text-sm text-neutral-500">{PRICING_PLANS.free.subtitle}</p>
            </div>
            <div className="mt-6">
              <span className="text-4xl font-bold text-neutral-900">${PRICING_PLANS.free.price}</span>
              <span className="text-neutral-500">/month</span>
            </div>
            <ul className="mt-6 flex-1 space-y-3">
              {PRICING_PLANS.free.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-500" />
                  <span className="text-sm text-neutral-600">{feature}</span>
                </li>
              ))}
            </ul>
            <Button variant="outline" className="mt-8 w-full bg-transparent" asChild>
              <Link href="/auth/sign-up">Get Started Free</Link>
            </Button>
          </div>

          {/* Pro Plan */}
          <div className="relative flex flex-col rounded-xl border-2 border-neutral-900 bg-white p-6">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <span className="rounded-full bg-neutral-900 px-3 py-1 text-xs font-medium text-white">Most Popular</span>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-neutral-900">{PRICING_PLANS.pro.name}</h3>
              <p className="mt-1 text-sm text-neutral-500">{PRICING_PLANS.pro.subtitle}</p>
            </div>
            <div className="mt-6">
              <span className="text-4xl font-bold text-neutral-900">${PRICING_PLANS.pro.price}</span>
              <span className="text-neutral-500">/month</span>
            </div>
            <ul className="mt-6 flex-1 space-y-3">
              {PRICING_PLANS.pro.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-500" />
                  <span className="text-sm text-neutral-600">{feature}</span>
                </li>
              ))}
            </ul>
            <Button className="mt-8 w-full" asChild>
              <Link href="/auth/sign-up?plan=pro">Start Pro Trial</Link>
            </Button>
          </div>

          {/* Enterprise Plan */}
          <div className="flex flex-col rounded-xl border border-neutral-200 bg-white p-6">
            <div>
              <h3 className="text-lg font-semibold text-neutral-900">{PRICING_PLANS.enterprise.name}</h3>
              <p className="mt-1 text-sm text-neutral-500">{PRICING_PLANS.enterprise.subtitle}</p>
            </div>
            <div className="mt-6">
              <span className="text-4xl font-bold text-neutral-900">Custom</span>
            </div>
            <ul className="mt-6 flex-1 space-y-3">
              {PRICING_PLANS.enterprise.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-500" />
                  <span className="text-sm text-neutral-600">{feature}</span>
                </li>
              ))}
            </ul>
            <Button variant="outline" className="mt-8 w-full bg-transparent" asChild>
              <Link href="/contact">Contact Sales</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
