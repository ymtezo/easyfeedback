import { BarChart3, Gift, Globe, Lock, Webhook, Layers } from "lucide-react"

const features = [
  {
    icon: BarChart3,
    title: "Advanced Analytics",
    description:
      "Track NPS, CSAT, and CES scores with industry benchmarks. Visualize trends and identify improvement areas.",
  },
  {
    icon: Gift,
    title: "Reward System",
    description:
      "Incentivize users with points and badges. Increase response rates and build a loyal feedback community.",
  },
  {
    icon: Lock,
    title: "Privacy Protection",
    description: "Anonymous feedback options with differential privacy. GDPR and CCPA compliant by design.",
  },
  {
    icon: Webhook,
    title: "REST API & Webhooks",
    description: "Integrate with any application. Real-time webhooks notify you instantly when feedback arrives.",
  },
  {
    icon: Globe,
    title: "Iframe Embedding",
    description: "Embed feedback widgets anywhere with a simple iframe. Customize to match your brand.",
  },
  {
    icon: Layers,
    title: "Benchmark Comparison",
    description: "Compare your scores against industry averages and competitors. Know where you stand.",
  },
]

export function Features() {
  return (
    <section id="features" className="border-t border-neutral-200 bg-neutral-50 px-4 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-neutral-900 md:text-4xl">Everything You Need</h2>
          <p className="mt-4 text-lg text-neutral-600">
            Powerful features for developers. Simple experience for respondents.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-xl border border-neutral-200 bg-white p-6 transition-shadow hover:shadow-md"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-neutral-900">
                <feature.icon className="h-5 w-5 text-white" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-neutral-900">{feature.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
