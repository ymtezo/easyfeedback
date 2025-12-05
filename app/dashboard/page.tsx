import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { MessageSquare, TrendingUp, Users, FolderKanban, Plus, ArrowRight } from "lucide-react"

export default async function DashboardPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Get user's organization
  const { data: membership } = await supabase
    .from("organization_members")
    .select("organization_id")
    .eq("user_id", user?.id)
    .single()

  // Get projects count
  const { count: projectsCount } = await supabase
    .from("projects")
    .select("*", { count: "exact", head: true })
    .eq("organization_id", membership?.organization_id)

  // Get feedback count
  const { count: feedbackCount } = await supabase
    .from("feedback")
    .select("*", { count: "exact", head: true })
    .in(
      "project_id",
      (await supabase.from("projects").select("id").eq("organization_id", membership?.organization_id)).data?.map(
        (p) => p.id,
      ) || [],
    )

  // Get recent feedback
  const { data: recentFeedback } = await supabase
    .from("feedback")
    .select("*, projects(name)")
    .in(
      "project_id",
      (await supabase.from("projects").select("id").eq("organization_id", membership?.organization_id)).data?.map(
        (p) => p.id,
      ) || [],
    )
    .order("created_at", { ascending: false })
    .limit(5)

  const stats = [
    {
      title: "Total Feedback",
      value: feedbackCount || 0,
      icon: MessageSquare,
      description: "All time responses",
    },
    {
      title: "NPS Score",
      value: "—",
      icon: TrendingUp,
      description: "Need more data",
    },
    {
      title: "Active Projects",
      value: projectsCount || 0,
      icon: FolderKanban,
      description: "Collecting feedback",
    },
    {
      title: "Response Rate",
      value: "—",
      icon: Users,
      description: "Need more data",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-neutral-900">Overview</h2>
          <p className="text-neutral-600">Welcome back! Here&apos;s your feedback summary.</p>
        </div>
        <Button asChild>
          <Link href="/dashboard/projects/new">
            <Plus className="mr-2 h-4 w-4" />
            New Project
          </Link>
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="border-neutral-200">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-neutral-600">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-neutral-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-neutral-900">{stat.value}</div>
              <p className="text-xs text-neutral-500">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Feedback */}
        <Card className="border-neutral-200">
          <CardHeader>
            <CardTitle>Recent Feedback</CardTitle>
            <CardDescription>Latest responses from your projects</CardDescription>
          </CardHeader>
          <CardContent>
            {recentFeedback && recentFeedback.length > 0 ? (
              <div className="space-y-4">
                {recentFeedback.map((feedback) => (
                  <div key={feedback.id} className="flex items-start gap-4 rounded-lg border border-neutral-100 p-3">
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-neutral-100 text-sm font-medium text-neutral-700">
                      {feedback.score ?? "?"}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-neutral-900 truncate">{feedback.comment || "No comment provided"}</p>
                      <p className="text-xs text-neutral-500">
                        {(feedback.projects as { name: string })?.name} · {feedback.type.toUpperCase()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <MessageSquare className="h-10 w-10 text-neutral-300" />
                <p className="mt-2 text-sm text-neutral-600">No feedback yet</p>
                <p className="text-xs text-neutral-500">Create a project to start collecting</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="border-neutral-200">
          <CardHeader>
            <CardTitle>Quick Start</CardTitle>
            <CardDescription>Get started with EasyFeedback</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Link
              href="/dashboard/projects/new"
              className="flex items-center justify-between rounded-lg border border-neutral-200 p-4 transition-colors hover:bg-neutral-50"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-neutral-100">
                  <FolderKanban className="h-5 w-5 text-neutral-700" />
                </div>
                <div>
                  <p className="text-sm font-medium text-neutral-900">Create a Project</p>
                  <p className="text-xs text-neutral-500">Set up a new feedback channel</p>
                </div>
              </div>
              <ArrowRight className="h-4 w-4 text-neutral-400" />
            </Link>

            <Link
              href="/dashboard/api-keys"
              className="flex items-center justify-between rounded-lg border border-neutral-200 p-4 transition-colors hover:bg-neutral-50"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-neutral-100">
                  <svg
                    className="h-5 w-5 text-neutral-700"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M15 7h3a5 5 0 0 1 5 5 5 5 0 0 1-5 5h-3m-6 0H6a5 5 0 0 1-5-5 5 5 0 0 1 5-5h3" />
                    <line x1="8" y1="12" x2="16" y2="12" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-neutral-900">Generate API Key</p>
                  <p className="text-xs text-neutral-500">Connect via REST API</p>
                </div>
              </div>
              <ArrowRight className="h-4 w-4 text-neutral-400" />
            </Link>

            <Link
              href="/docs"
              className="flex items-center justify-between rounded-lg border border-neutral-200 p-4 transition-colors hover:bg-neutral-50"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-neutral-100">
                  <svg
                    className="h-5 w-5 text-neutral-700"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                    <polyline points="10 9 9 9 8 9" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-neutral-900">Read Documentation</p>
                  <p className="text-xs text-neutral-500">Learn how to integrate</p>
                </div>
              </div>
              <ArrowRight className="h-4 w-4 text-neutral-400" />
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
