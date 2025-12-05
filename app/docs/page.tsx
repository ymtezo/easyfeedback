import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Header } from "@/components/landing/header"
import { Footer } from "@/components/landing/footer"
import { Code, Zap, Shield } from "lucide-react"

const endpoints = [
  {
    method: "POST",
    path: "/api/v1/feedback",
    description: "Submit new feedback",
    example: `{
  "type": "nps",
  "score": 9,
  "comment": "Great product!",
  "respondent_id": "user_123",
  "is_anonymous": false
}`,
  },
  {
    method: "GET",
    path: "/api/v1/feedback",
    description: "List feedback with pagination",
    example: `// Query params
?type=nps&limit=50&offset=0`,
  },
  {
    method: "GET",
    path: "/api/v1/feedback/stats",
    description: "Get aggregated statistics",
    example: `// Query params
?days=30`,
  },
  {
    method: "GET",
    path: "/api/v1/respondents/:id",
    description: "Get respondent details",
    example: `// Response includes points, badges, feedback history`,
  },
]

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="mx-auto max-w-4xl px-4 py-16">
        <div className="mb-12">
          <h1 className="text-3xl font-bold text-neutral-900">API Documentation</h1>
          <p className="mt-2 text-lg text-neutral-600">
            Integrate EasyFeedback with your application using our REST API
          </p>
        </div>

        {/* Quick Start */}
        <section className="mb-12">
          <h2 className="mb-4 text-xl font-semibold text-neutral-900">Quick Start</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="border-neutral-200">
              <CardHeader className="pb-2">
                <Zap className="h-5 w-5 text-neutral-600" />
                <CardTitle className="text-base">1. Get your API Key</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-neutral-600">
                  Create an API key from your dashboard under API Keys section.
                </p>
              </CardContent>
            </Card>
            <Card className="border-neutral-200">
              <CardHeader className="pb-2">
                <Code className="h-5 w-5 text-neutral-600" />
                <CardTitle className="text-base">2. Make your first request</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-neutral-600">
                  Use the API key in the Authorization header as a Bearer token.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Authentication */}
        <section className="mb-12">
          <h2 className="mb-4 text-xl font-semibold text-neutral-900">Authentication</h2>
          <Card className="border-neutral-200">
            <CardContent className="pt-6">
              <p className="mb-4 text-sm text-neutral-600">
                All API requests require authentication using a Bearer token:
              </p>
              <div className="rounded-lg bg-neutral-900 p-4">
                <code className="text-sm text-neutral-300">Authorization: Bearer ef_your_api_key_here</code>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Feedback Types */}
        <section className="mb-12">
          <h2 className="mb-4 text-xl font-semibold text-neutral-900">Feedback Types</h2>
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="border-neutral-200">
              <CardHeader>
                <CardTitle className="text-base">NPS</CardTitle>
                <CardDescription>Net Promoter Score</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-neutral-600">Score: 0-10</p>
                <p className="text-xs text-neutral-500 mt-1">Promoters (9-10), Passives (7-8), Detractors (0-6)</p>
              </CardContent>
            </Card>
            <Card className="border-neutral-200">
              <CardHeader>
                <CardTitle className="text-base">CSAT</CardTitle>
                <CardDescription>Customer Satisfaction</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-neutral-600">Score: 1-5</p>
                <p className="text-xs text-neutral-500 mt-1">1 = Very Unsatisfied, 5 = Very Satisfied</p>
              </CardContent>
            </Card>
            <Card className="border-neutral-200">
              <CardHeader>
                <CardTitle className="text-base">CES</CardTitle>
                <CardDescription>Customer Effort Score</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-neutral-600">Score: 1-7</p>
                <p className="text-xs text-neutral-500 mt-1">1 = Very Difficult, 7 = Very Easy</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Endpoints */}
        <section className="mb-12">
          <h2 className="mb-4 text-xl font-semibold text-neutral-900">API Endpoints</h2>
          <div className="space-y-4">
            {endpoints.map((endpoint) => (
              <Card key={endpoint.path} className="border-neutral-200">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <span
                      className={`rounded px-2 py-0.5 text-xs font-medium ${
                        endpoint.method === "POST" ? "bg-emerald-100 text-emerald-700" : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {endpoint.method}
                    </span>
                    <code className="text-sm text-neutral-700">{endpoint.path}</code>
                  </div>
                  <CardDescription>{endpoint.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-lg bg-neutral-900 p-4">
                    <pre className="text-sm text-neutral-300 overflow-x-auto">{endpoint.example}</pre>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Rate Limits */}
        <section>
          <h2 className="mb-4 text-xl font-semibold text-neutral-900">Rate Limits</h2>
          <Card className="border-neutral-200">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <Shield className="h-5 w-5 text-neutral-600 mt-0.5" />
                <div>
                  <p className="text-sm text-neutral-900 font-medium">Request Limits</p>
                  <ul className="mt-2 space-y-1 text-sm text-neutral-600">
                    <li>Free: 1,000 requests/day</li>
                    <li>Pro: 100,000 requests/day</li>
                    <li>Enterprise: Unlimited</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      <Footer />
    </div>
  )
}
