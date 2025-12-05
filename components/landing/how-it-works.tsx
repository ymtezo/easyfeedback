import { Code } from "lucide-react"

const steps = [
  {
    step: "01",
    title: "Create a Project",
    description: "Sign up and create a project in seconds. Configure your feedback types and branding.",
  },
  {
    step: "02",
    title: "Integrate via API",
    description: "Use our REST API to collect feedback. Simple endpoints, comprehensive documentation.",
  },
  {
    step: "03",
    title: "Analyze & Act",
    description: "View real-time analytics, compare with benchmarks, and improve your product.",
  },
]

const codeExample = `// Collect feedback via REST API
const response = await fetch(
  'https://api.easyfeedback.dev/v1/feedback',
  {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ef_xxxxx',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      type: 'nps',
      score: 9,
      comment: 'Great product!',
      respondent_id: 'user_123'
    })
  }
);`

export function HowItWorks() {
  return (
    <section id="how-it-works" className="px-4 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-neutral-900 md:text-4xl">How It Works</h2>
          <p className="mt-4 text-lg text-neutral-600">
            Get started in minutes, not hours. Simple integration, powerful results.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div className="flex flex-col gap-8">
            {steps.map((item, index) => (
              <div key={item.step} className="flex gap-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-neutral-900 text-sm font-semibold text-white">
                  {index + 1}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-neutral-900">{item.title}</h3>
                  <p className="mt-1 text-neutral-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-xl border border-neutral-200 bg-neutral-900 p-4">
            <div className="flex items-center gap-2 border-b border-neutral-700 pb-3">
              <Code className="h-4 w-4 text-neutral-400" />
              <span className="text-sm text-neutral-400">api-example.js</span>
            </div>
            <pre className="mt-4 overflow-x-auto text-sm">
              <code className="text-neutral-300">{codeExample}</code>
            </pre>
          </div>
        </div>
      </div>
    </section>
  )
}
