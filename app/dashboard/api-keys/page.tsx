import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Key, Copy, Trash2 } from "lucide-react"
import { CreateApiKeyDialog } from "@/components/dashboard/create-api-key-dialog"

export default async function ApiKeysPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Get user's organization projects
  const { data: membership } = await supabase
    .from("organization_members")
    .select("organization_id")
    .eq("user_id", user?.id)
    .single()

  const { data: projects } = await supabase
    .from("projects")
    .select("id, name")
    .eq("organization_id", membership?.organization_id)

  // Get API keys
  const { data: apiKeys } = await supabase
    .from("api_keys")
    .select("*, projects(name)")
    .in("project_id", projects?.map((p) => p.id) || [])
    .order("created_at", { ascending: false })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-neutral-900">API Keys</h2>
          <p className="text-neutral-600">Manage API keys for REST API access</p>
        </div>
        <CreateApiKeyDialog projects={projects || []} />
      </div>

      <Card className="border-neutral-200">
        <CardHeader>
          <CardTitle className="text-base">Your API Keys</CardTitle>
          <CardDescription>Use these keys to authenticate API requests. Keep them secure!</CardDescription>
        </CardHeader>
        <CardContent>
          {apiKeys && apiKeys.length > 0 ? (
            <div className="space-y-3">
              {apiKeys.map((key) => (
                <div
                  key={key.id}
                  className="flex items-center justify-between rounded-lg border border-neutral-200 p-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-neutral-100">
                      <Key className="h-5 w-5 text-neutral-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-neutral-900">{key.name}</p>
                      <p className="text-xs text-neutral-500">
                        {(key.projects as { name: string })?.name} · {key.key_prefix}...
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm">
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-neutral-100">
                <Key className="h-6 w-6 text-neutral-400" />
              </div>
              <h3 className="mt-3 text-sm font-medium text-neutral-900">No API keys</h3>
              <p className="mt-1 text-xs text-neutral-500">Create an API key to start using the REST API</p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="border-neutral-200">
        <CardHeader>
          <CardTitle className="text-base">API Usage</CardTitle>
          <CardDescription>Quick example of how to use your API key</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg bg-neutral-900 p-4">
            <pre className="text-sm text-neutral-300 overflow-x-auto">
              {`curl -X POST https://api.easyfeedback.dev/v1/feedback \\
  -H "Authorization: Bearer ef_your_api_key" \\
  -H "Content-Type: application/json" \\
  -d '{
    "type": "nps",
    "score": 9,
    "comment": "Great product!"
  }'`}
            </pre>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
